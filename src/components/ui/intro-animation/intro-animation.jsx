/* eslint-disable no-unsafe-optional-chaining */
// eslint-disable-next-line no-unused-vars
import * as T from 'three';
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import * as styles from './intro-animation.module.scss';
import { AnimationCanvas } from './animation-canvas';

// ROOT COMPONENT
// - Setup scene
// - Setup camera/refresh on resize
// - Preload assets
// --------------

function CanvasInner({ aspect }) {
	const { camera, size } = useThree();

	const updateCamera = () => {
		const { height } = size;

		camera.zoom = height;
		camera.updateProjectionMatrix();
		window.camera = camera;
	};

	useEffect(() => {
		updateCamera();
	}, [size]);

	useEffect(() => {
		updateCamera();
	}, []);

	return <AnimationCanvas initialAspect={aspect} />;
}

export function IntroAnimation() {
	// const [dpr, setDpr] = useState(1);
	const [aspect, setAspect] = useState(1);
	const $wrapperRef = useRef(null);
	const windowWidth = useRef(0);
	const [resizeInProgress, setResizeInProgress] = useState(false);
	const resizeTmRef = useRef(null);

	const frustumSize = 1;

	const handleResize = () => {
		if (window.innerWidth !== windowWidth.current) {
			clearTimeout(resizeTmRef.current);
			setResizeInProgress(true);
			windowWidth.current = window.innerWidth;

			resizeTmRef.current = setTimeout(() => {
				setResizeInProgress(false);

				setAspect(
					$wrapperRef.current?.clientWidth /
						$wrapperRef?.current.clientHeight || 1,
				);
			}, 500);
		}
	};

	useEffect(() => {
		// setDpr(Math.max(window.devicePixelRatio, 1));
		setAspect(
			$wrapperRef.current?.clientWidth / $wrapperRef?.current.clientHeight || 1,
		);

		windowWidth.current = window.innerWidth;

		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	return (
		<div className={styles.canvasWrap} ref={$wrapperRef}>
			{!resizeInProgress && (
				<Canvas
					// flat
					linear
					dpr={1}
					className={styles.canvasIn}
					resize={{ scroll: false }}
					camera={{
						near: -1000,
						far: 1000,
						left: frustumSize * aspect - 2,
						right: (frustumSize * aspect) / 2,
						top: frustumSize / 2,
						bottom: frustumSize / -2,
					}}
					orthographic
				>
					<CanvasInner aspect={aspect} />
				</Canvas>
			)}
		</div>
	);
}

CanvasInner.propTypes = {
	aspect: PropTypes.number.isRequired,
};

export default IntroAnimation;
