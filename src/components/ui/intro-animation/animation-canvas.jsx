/* eslint-disable no-param-reassign */
/* eslint-disable react/no-unknown-property */
import gsap from 'gsap';
import * as T from 'three';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { extend, useFrame, useThree } from '@react-three/fiber';
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';
import Lottie from 'lottie-web';
import { Observer } from 'gsap/Observer';
import { floating } from './animations/floating';
import { BLOBS_DESKTOP, BLOBS_MOBILE } from './constants';

import animation from './logo-animation.json';
import {
	logoDistAnimation,
	logoStandByAnim,
} from './animations/logo-distortion';
import { blobColorChangeAnim } from './animations/blobs-color-change';
import { blobMaterial } from './materials/blob-material';
import { LogoMaterial } from './materials/logo-material';

let observer;
gsap.registerPlugin(Observer);

export function AnimationCanvas({ initialAspect }) {
	const { size, gl } = useThree();
	const isTouchDevice =
		'ontouchstart' in window ||
		window.navigator.maxTouchPoints > 0 ||
		window.navigator.msMaxTouchPoints > 0;

	const isMobile = size.width < 1024;

	const BLOBS = isMobile ? BLOBS_MOBILE : BLOBS_DESKTOP;

	const pointsInitialBufferRef = useRef([]);
	const [pointsBuffer, setPointsBuffer] = useState([]);

	const $canvasRef = useRef(document.createElement('canvas'));
	const $lottieMeshRef = useRef(null);
	const $blobsMeshRef = useRef(null);
	const lottieAnimationActive = useRef(true);
	const lottieCanvasRef = useRef(new T.Texture());

	const aspect = size.width / size.height;
	const flatBuffer = pointsBuffer.flat(1);

	const initLottie = () => {
		lottieAnimationActive.current = true;
		$canvasRef.current.width = window.innerWidth / 2;
		$canvasRef.current.height = window.innerHeight / 2;
		const context = $canvasRef.current.getContext('2d');

		const lottiePlayer = Lottie.loadAnimation({
			container: document.body,
			renderer: 'canvas',
			rendererSettings: {
				context,
				className: 'lottie-intro-anim',
			},
			animationData: animation,
			loop: false,
		});

		// Safely add event listener with error handling
		try {
			lottiePlayer.addEventListener('complete', () => {
				lottieAnimationActive.current = false;
			});
		} catch (err) {
			console.warn('Could not add lottie complete listener', err);
		}

		try {
			lottieCanvasRef.current = new T.CanvasTexture(lottiePlayer.container);
			if ($lottieMeshRef?.current?.material)
				$lottieMeshRef.current.material.uniforms.uTexture.value =
					lottieCanvasRef.current;
		} catch (err) {
			console.warn('Could not set lottie canvas texture', err);
		}

		return () => {
			lottieAnimationActive.current = false;
			try {
				if (lottiePlayer && typeof lottiePlayer.stop === 'function') {
					lottiePlayer.stop();
					lottiePlayer.destroy();
				}
			} catch (err) {
				console.warn('Could not cleanup lottie player', err);
			}
		};
	};

	const setGeometry = () => {
		BLOBS.forEach((blob, index) => {
			const { scale, pointSize = 0.6, indent = 0.03 * blob.scale } = blob;

			// const pointsCountMultiplier = 0.5;
			const pointsCountMultiplier = isMobile ? 0.3 : 0.15;

			const pointsBaseCount = 48 * pointsCountMultiplier;

			const blobPoints = pointsBaseCount * scale;
			const blobPointsSqrt = Math.floor(Math.sqrt(blobPoints));
			pointsInitialBufferRef.current[index] = [];
			// --------------------------------------------- Points for "blob texture"

			const pointIndent = indent / pointsCountMultiplier;

			const blobSize = blobPointsSqrt * pointIndent;

			const blobHalfSize = blobSize / 2;

			const blobPosition = {
				x: blobHalfSize + blob.position.x * aspect,
				y: blobHalfSize + blob.position.y,
			};

			const centerPointPos = {
				x: blobHalfSize - blobPosition.x,
				y: blobHalfSize - blobPosition.y,
			};

			for (let i = 0; i < blobPointsSqrt; i += 1) {
				for (let j = 0; j < blobPointsSqrt; j += 1) {
					const initPointPos = {
						x: i * pointIndent - blobPosition.x,
						y: j * pointIndent - blobPosition.y,
						z: (pointSize / pointsCountMultiplier) * 1.8,
					};

					const pointPosVec = new T.Vector3(...Object.values(initPointPos));

					pointPosVec.offsetFromCenter = {
						x: (centerPointPos.x - initPointPos.x) / (blobSize / 2),
						y: (centerPointPos.y - initPointPos.y) / (blobSize / 2),
					};
					pointPosVec.randomRange = blob.randomRange;
					pointPosVec.pointerPower = new T.Vector2(0, 0);
					pointPosVec.offset = new T.Vector2(0, 0);
					pointPosVec.blobOffset = new T.Vector2(0, 0);

					pointsInitialBufferRef.current[index].push(pointPosVec);
				}
			}

			// --------------------------------------------- Points for "blob texture"###
		});

		pointsInitialBufferRef.current.forEach((blob) => {
			blob.forEach((point) => {
				const centerPointIndex = Math.floor(blob.length / 2);

				point.pointDiffFromCenter = {
					x: blob[centerPointIndex].x / point.x || 0,
					y: blob[centerPointIndex].x / point.y || 0,
				};
			});
		});

		setPointsBuffer(
			pointsInitialBufferRef.current.map((blob) =>
				blob.map((vector) => vector.clone()),
			),
		);
	};

	const initEvents = () => {
		let fisrtMove = true;
		let isMouseEnter = true;
		const pointer = {};
		let deltaX = 0;
		let deltaY = 0;
		// const lottieMeshUniforms = $lottieMeshRef.current?.material.uniforms;

		const pointerTl = gsap.timeline();

		const pointerLeaveAnim = () => {
			pointerTl.clear();
			pointerTl.to(
				$blobsMeshRef.current?.material.uniforms.uPointerPower.value,
				{
					x: 0,
					y: 0,
					duration: 1,
				},
			);
		};

		const handleMouseEnter = () => {
			isMouseEnter = true;
			fisrtMove = false;
		};

		const handleMouseLeave = () => {
			isMouseEnter = false;
			fisrtMove = true;
			if (!isTouchDevice && $blobsMeshRef.current?.material.uniforms)
				pointerLeaveAnim();
		};

		const handleMouseMove = (event) => {
			if (!$blobsMeshRef.current?.material.uniforms) return;

			const newX = (event.clientX / size.width - 0.5) * aspect;
			const newY =
				(event.clientY - gl.domElement.getBoundingClientRect().top) /
					size.height -
				0.5;

			if (!fisrtMove) {
				deltaX = event.movementX;
				deltaY = event.movementY;
			}

			pointer.x = newX;
			pointer.y = newY;

			if ($blobsMeshRef.current?.material.uniforms) {
				gsap.to($blobsMeshRef.current.material.uniforms.uPointer.value, {
					x: pointer.x / aspect + 0.5,
					y: pointer.y + 0.5,
					duration: 1,
				});
			}

			pointerTl.clear();
			pointerTl.to(
				$blobsMeshRef.current?.material.uniforms.uPointerPower.value,
				{
					x: -gsap.utils.clamp(-0.05, 0.05, deltaX / 400),
					y: gsap.utils.clamp(-0.15, 0.15, deltaY / (400 * aspect)),
					duration: 1,
					ease: 'Power1.inOut',
					onComplete: () => pointerLeaveAnim(),
				},
			);
		};

		gl.domElement.addEventListener('mouseleave', handleMouseLeave);
		gl.domElement.addEventListener('mouseenter', handleMouseEnter);

		let throttling = false;
		let timeout = null;

		gl.domElement.addEventListener(
			'pointermove',
			(event) => {
				if (!throttling && isMouseEnter && !isTouchDevice) {
					throttling = true;
					clearTimeout(timeout);
					timeout = setTimeout(() => {
						throttling = false;
						handleMouseMove(event);
					}, 2);
				}
				event.stopImmediatePropagation();
			},
			true,
		);
		window.addEventListener(
			'mousemove',
			(event) => {
				event.stopImmediatePropagation();
			},
			true,
		);

		return () => {
			observer?.kill();
			gl.domElement.removeEventListener('mouseleave', handleMouseLeave);
			gl.domElement.removeEventListener('mouseenter', handleMouseEnter);
		};
	};

	const updateBuffer = () => {
		if (!pointsBuffer.length) return;

		// --------------------------------------------- translate points on each frame

		pointsInitialBufferRef.current.forEach((blob, index) => {
			if (!pointsBuffer[index]) return;
			blob.forEach((point, j) => {
				const { offset, blobOffset, pointerPower } = point;

				pointsBuffer[index][j].x =
					point.x + offset.x + blobOffset.x + pointerPower.x;
				pointsBuffer[index][j].y =
					point.y + offset.y + blobOffset.y + pointerPower.y;
			});
		});
	};

	const initFloating = () => {
		const timelines = [];

		pointsInitialBufferRef.current.forEach((blob, index) => {
			if (!BLOBS[index]) return;

			const offset = {
				x: 0,
				y: 0,
			};

			timelines.push(
				floating({
					target: offset,
					rangeX: BLOBS[index].rangeX,
					rangeY: BLOBS[index].rangeY,
					onUpdate: () => {
						blob.forEach((point) => {
							point.blobOffset = offset;
						});
					},
				}),
			);

			blob.forEach((point) => {
				const pointOffset = {
					x: 0,
					y: 0,
				};

				const { randomRange = 0.05 } = point;

				timelines.push(
					floating({
						target: pointOffset,
						rangeX: { min: -randomRange, max: randomRange },
						rangeY: { min: -randomRange, max: randomRange },
						onUpdate: () => {
							point.offset = pointOffset;
						},
					}),
				);
			});
		});

		return timelines;
	};

	let throttling = true;

	useFrame(() => {
		if (throttling) {
			throttling = false;
			return;
		}

		throttling = true;

		try {
			updateBuffer();
		} catch (err) {
			console.warn('Error updating buffer', err);
		}
		
		try {
			if ($lottieMeshRef.current?.material?.uniforms) {
				if (lottieAnimationActive.current && $lottieMeshRef.current.material.uniforms.uTexture?.value) {
					$lottieMeshRef.current.material.uniforms.uTexture.value.needsUpdate = true;
				}
				$lottieMeshRef.current.material.uniforms.uTime.value += 0.01;
			}
		} catch (err) {
			console.warn('Error updating Lottie animation frame', err);
		}
	});

	useEffect(() => {
		let destroyLottie;
		
		try {
			destroyLottie = initLottie();
		} catch (err) {
			console.warn('Failed to initialize Lottie animation', err);
			destroyLottie = () => {}; // Provide a fallback empty function
		}
		
		const killEvents = initEvents();
		setGeometry();

		const timeoutId = setTimeout(() => {
			try {
				destroyLottie();
			} catch (err) {
				console.warn('Failed to destroy Lottie on timeout', err);
			}
		}, 20000);

		const handleRepeatAnimation = (e) => {
			if (lottieAnimationActive.current || !gl.domElement) return;

			const canvasSize = {
				x: gl.domElement.offsetWidth,
				y: gl.domElement.offsetHeight,
			};

			const aspectSize =
				canvasSize.x > canvasSize.y ? canvasSize.y : canvasSize.x;

			const v1 = e.offsetX - canvasSize.x / 2;
			const v2 = e.offsetY - canvasSize.y / 2;

			const dist = Math.sqrt(v1 * v1 + v2 * v2);

			if (dist > aspectSize / 2) return;

			try {
				destroyLottie();
				destroyLottie = initLottie();
			} catch (err) {
				console.warn('Failed to reinitialize Lottie animation', err);
			}
		};

		if (gl?.domElement) {
			gl.domElement.addEventListener('click', handleRepeatAnimation);
		}

		return () => {
			if (gl?.domElement) {
				gl.domElement.removeEventListener('click', handleRepeatAnimation);
			}
			
			try {
				destroyLottie();
			} catch (err) {
				console.warn('Failed to cleanup Lottie animation', err);
			}
			
			clearTimeout(timeoutId);
			killEvents();
		};
	}, []);

	useLayoutEffect(() => {
		if (!$lottieMeshRef.current) return;

		let logoStandByTl;
		let logoDistTween;
		let changeColorsTl;
		let timelines = [];

		try {
			const lottieMeshUniforms = $lottieMeshRef.current.material.uniforms;
			
			logoStandByTl = logoStandByAnim(lottieMeshUniforms);
			logoDistTween = logoDistAnimation(lottieMeshUniforms, () => {
				try {
					logoStandByTl?.play();
				} catch (err) {
					console.warn('Error playing logo standby animation', err);
				}
			});

			if ($blobsMeshRef.current?.material?.uniforms) {
				changeColorsTl = blobColorChangeAnim(
					$blobsMeshRef.current.material.uniforms,
				);
			}

			timelines = initFloating();

			if ($lottieMeshRef.current?.material?.uniforms?.uTexture) {
				$lottieMeshRef.current.material.uniforms.uTexture.value = lottieCanvasRef.current;
			}
		} catch (err) {
			console.warn('Error setting up animations in layout effect', err);
		}

		// eslint-disable-next-line consistent-return
		return () => {
			try {
				if (logoStandByTl && typeof logoStandByTl.kill === 'function') logoStandByTl.kill();
				if (logoDistTween && typeof logoDistTween.kill === 'function') logoDistTween.kill();
				
				if (changeColorsTl) {
					if (typeof changeColorsTl.clear === 'function') changeColorsTl.clear();
					if (typeof changeColorsTl.kill === 'function') changeColorsTl.kill();
				}
				
				if (Array.isArray(timelines)) {
					timelines.forEach((killFn) => {
						if (typeof killFn === 'function') {
							try {
								killFn();
							} catch (err) {
								console.warn('Error killing timeline', err);
							}
						}
					});
				}
			} catch (err) {
				console.warn('Error cleaning up animations in layout effect', err);
			}
		};
	}, [pointsBuffer]);

	if (!flatBuffer.length) return null;

	const BlobMaterial = blobMaterial(flatBuffer, []);
	extend({ BlobMaterial });
	extend({ LogoMaterial });

	return (
		<>
			<mesh ref={$blobsMeshRef}>
				<blobMaterial
					key={BlobMaterial.key}
					uColor={new T.Color(0xc6ff55)}
					uSpeadPower={1300}
					uPointer={new T.Vector2()}
					uPointerPower={new T.Vector2()}
					uAspect={aspect}
					uTime={1}
				/>
				<planeGeometry args={[aspect, 1, 2, 2]} />
			</mesh>
			<mesh ref={$lottieMeshRef}>
				<planeGeometry args={[initialAspect, 1, 2, 2]} />
				<logoMaterial
					uPointer={new T.Vector2()}
					uPointerPower={new T.Vector2()}
					uTexture={new T.Texture()}
					transparent
					alphaTest
					uTime={1}
					uAspect={aspect}
					uDistProgress={1}
					key={LogoMaterial.key}
				/>
			</mesh>
		</>
	);
}

AnimationCanvas.propTypes = {
	initialAspect: PropTypes.number.isRequired,
};

export default AnimationCanvas;
