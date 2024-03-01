import React, { useEffect, useRef } from 'react';
import { loader } from './loader.module.scss';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(SplitText);

const ANIM_SETTINGS = {
	duration: 0.3,
	stagger: 0.1,
	label: 'start',
	ease: 'power4.inOut',
};

const initLoadingAnimation = (splitText, $loader) => {
	const { duration, stagger, label, ease } = ANIM_SETTINGS;

	const tl = gsap.timeline({ repeat: -1, yoyo: true, repeatDelay: duration });

	tl.to(
		splitText.chars,
		{
			y: 6,
			duration,
			stagger,
			ease,
		},
		label,
	).to(
		$loader,
		{
			y: -6,
			duration,
			stagger,
			ease,
		},
		label,
	);

	return tl;
};

export function Loader() {
	const $loaderRef = useRef(null);

	useEffect(() => {
		const $loader = $loaderRef.current;
		if (!$loader) return;

		const splitText = new SplitText($loader, { chars: true });
		const tl = initLoadingAnimation(splitText, $loader);

		return () => {
			tl.kill();
		};
	}, []);

	return (
		<div ref={$loaderRef} className={loader}>
			Loading...
		</div>
	);
}

export default Loader;
