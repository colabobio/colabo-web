import React, { useRef, useEffect } from 'react';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import Lottie from 'react-lottie-player';
import classNames from 'classnames';
import { useIntersectionObserver } from '@hooks';
import * as styles from './area-item.module.scss';
import epidemologyAnimation from './lotties/epidemology.json';
import visualizationAnimation from './lotties/visualization.json';
import learningAnimation from './lotties/learning.json';

const selectClassnames = ({ reverse, variant, isVisible }) =>
	classNames(styles.area, {
		[styles.reverse]: reverse,
		[styles.primary]: variant === 'primary',
		[styles.secondary]: variant === 'secondary',
		[styles.accent]: variant === 'accent',
		[styles.visible]: isVisible,
	});

const animations = {
	epidemology: epidemologyAnimation,
	learning: learningAnimation,
	visualization: visualizationAnimation,
};

export function AreaItem({
	reverse = undefined,
	variant = undefined,
	number,
	title,
	text,
	href,
	animation,
}) {
	const { targetRef, isIntersecting } = useIntersectionObserver({
		threshold: 0.4, // Trigger when 40% of the element is visible
		rootMargin: '0px 0px -20% 0px', // Trigger slightly before element comes into view
	});

	const areaClassname = selectClassnames({ reverse, variant, isVisible: isIntersecting });

	const lottieRef = useRef(null);

	// Animation state is now controlled by intersection observer
	const [isPlaying, setIsPlaying] = React.useState(false);

	// Update animation state based on visibility
	React.useEffect(() => {
		setIsPlaying(isIntersecting);
	}, [isIntersecting]);

	return (
		<Link
			ref={targetRef}
			to={href}
			className={areaClassname}
		>
			<div className={styles.contentW}>
				<div className={styles.content}>
					<h3 className={styles.title}>
						<span className={styles.titleNumber}>{number}</span>
						<span className={styles.titleText}>{title}</span>
					</h3>
					<div className={styles.text}>{text}</div>
				</div>
			</div>
			<div className={styles.image}>
				<Lottie
					ref={lottieRef}
					loop
					animationData={animations[animation]}
					play={isPlaying}
					style={{ width: '100%', height: '100%' }}
				/>
			</div>
		</Link>
	);
}

AreaItem.propTypes = {
	reverse: PropTypes.bool,
	variant: PropTypes.string,
	number: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	text: PropTypes.string.isRequired,
	href: PropTypes.string.isRequired,
	animation: PropTypes.string.isRequired,
};

export default AreaItem;
