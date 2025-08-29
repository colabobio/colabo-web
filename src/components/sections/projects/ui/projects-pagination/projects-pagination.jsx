import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import gsap from 'gsap';
import { useWindowSize } from '@hooks';
import { ProjectContent } from '../project-content';
import { ProjectHint } from '../project-hint';
import { SLIDER_SETTINGS } from '../../constants';
import {
	pagination,
	button,
	active,
	cursor,
	container,
	info,
	infoContent,
	leftMod,
	rightMod,
	centerMod,
	hint,
} from './projects-pagination.module.scss';

const selectClassnames = (activeIndex, index, length) =>
	classNames(container, {
		[active]: index === activeIndex,
		[leftMod]: index === 0 || index === 1,
		[rightMod]: index === length,
		[centerMod]: index !== 0 && index !== 1 && index !== length,
	});

export function ProjectsPagination({ slides, activeIndex, onClick }) {
	const { width } = useWindowSize();
	const $containerRef = useRef(null);
	const $cursorRef = useRef(null);
	const $buttonRefs = slides.map(() => useRef(null));
	const isFirstRender = useRef(true);

	const moveToPagination = ($button, skipAnimation) => {
		const $cursor = $cursorRef.current;
		const $container = $containerRef.current;

		if (!$cursor || !$button || !$container) return null;

		const buttonRect = $button.getBoundingClientRect();
		const containerRect = $container.getBoundingClientRect();
		const translateX = buttonRect.left - containerRect.left;

		if (!skipAnimation) {
			gsap.to($cursor, {
				translateX,
				duration: SLIDER_SETTINGS.speedS,
				ease: 'none',
			});
		} else {
			gsap.set($cursor, { translateX });
		}

		return null;
	};

	const moveToActiveSlide = (skipAnimation) => {
		const $activeButton = $buttonRefs?.[activeIndex]?.current;

		if ($activeButton) {
			moveToPagination($activeButton, skipAnimation);
		}
	};

	const handleButtonClick = ({ target }, index) => {
		onClick(index);
		moveToPagination(target);
	};

	useEffect(() => {
		moveToActiveSlide(isFirstRender.current);

		if (isFirstRender.current) {
			isFirstRender.current = false;
		}
	}, [activeIndex]);

	useEffect(() => {
		if (width) moveToActiveSlide(true);
	}, [width]);

	return (
		<div ref={$containerRef} className={pagination}>
			{slides.map(({ title, content, url }, index) => {
				const key = `slider pagination ${index}`;
				const containerClassnames = selectClassnames(
					activeIndex,
					index,
					slides.length - 1,
				);

				return (
					<div key={key} className={containerClassnames}>
						<div className={classNames(info, 'swiper-no-mousewheel')}>
							<ProjectContent
								className={infoContent}
								{...{ content, url, title }}
							/>
						</div>
						<button
							ref={$buttonRefs[index]}
							type="button"
							className={button}
							aria-label={key}
							onClick={(e) => handleButtonClick(e, index)}
						/>
					</div>
				);
			})}
			<ProjectHint
				className={hint}
				isVisible={activeIndex === 0}
				label="swipe"
			/>
			<div ref={$cursorRef} className={cursor} />
		</div>
	);
}

ProjectsPagination.propTypes = {
	slides: PropTypes.arrayOf(
		PropTypes.shape({
			img: PropTypes.object.isRequired, // Updated from string to object for GatsbyImage
			title: PropTypes.string.isRequired,
			content: PropTypes.string.isRequired,
			url: PropTypes.string,
		}),
	).isRequired,
	activeIndex: PropTypes.number.isRequired,
	onClick: PropTypes.func.isRequired,
};

export default ProjectsPagination;
