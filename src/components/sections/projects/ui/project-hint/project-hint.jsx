import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import gsap from 'gsap';
import { useWindowSize } from '@hooks';
import { BREAKPOINTS } from '@utils/constants';
import { hint, copy } from './project-hint.module.scss';

const SETTINGS = {
	label: 'start',
	delay: 4,
	speedOut: 1.2,
	speedIn: 0.6,
	easeOut: 'power3.out',
	easeIn: 'back.out',
};

export function ProjectHint({ className, label, isVisible }) {
	const { width } = useWindowSize();
	const $wrapperRef = useRef(null);
	const isFirstRender = useRef(true);

	useEffect(() => {
		const $wrapper = $wrapperRef.current;
		if (!$wrapper || width >= BREAKPOINTS.tabletMaxPoint) return undefined;

		const hintWidth = $wrapper.clientWidth;
		const $childrens = $wrapper.children;
		const $lastLabel = $childrens[$childrens.length - 1];
		const $primaryLabels = Array.from($wrapper.children).slice(0, -1);

		if (isFirstRender.current) {
			isFirstRender.current = false;
		}

		if (isVisible && isFirstRender) {
			const tl = gsap.timeline({
				repeat: -1,
				repeatDelay: SETTINGS.delay,
				delay: SETTINGS.delay,
			});

			$primaryLabels.forEach(($label, index) => {
				tl.fromTo(
					$label,
					{
						opacity: 1,
						xPercent: 100 * index,
					},
					{
						x: -hintWidth * 2,
						duration: SETTINGS.speedOut,
						ease: SETTINGS.easeOut,
						opacity: 0.1,
					},
					SETTINGS.label,
				);
			});

			tl.fromTo(
				$lastLabel,
				{
					opacity: 1,
					xPercent: 100,
				},
				{
					xPercent: 0,
					duration: SETTINGS.speedIn,
					ease: SETTINGS.easeIn,
				},
			);

			return () => {
				tl.kill();
			};
		} else {
			gsap.to($wrapper, {
				opacity: 0,
			});
		}

		return undefined;
	}, [$wrapperRef, isVisible, width]);

	return (
		<div ref={$wrapperRef} className={classNames(hint, className)}>
			{Array.from({ length: 4 }, (_, index) => (
				<span key={index} className={classNames({ [copy]: index !== 0 })}>
					{label}
				</span>
			))}
		</div>
	);
}

ProjectHint.propTypes = {
	className: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	isVisible: PropTypes.bool.isRequired,
};

export default ProjectHint;
