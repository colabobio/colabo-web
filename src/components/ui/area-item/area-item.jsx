import React, { useRef, useEffect } from 'react';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import Lottie from 'react-lottie-player';
import classNames from 'classnames';
import * as styles from './area-item.module.scss';
import epidemologyAnimation from './lotties/epidemology.json';
import visualizationAnimation from './lotties/visualization.json';
import learningAnimation from './lotties/learning.json';

const selectClassnames = ({ reverse, variant }) =>
	classNames(styles.area, {
		[styles.reverse]: reverse,
		[styles.primary]: variant === 'primary',
		[styles.secondary]: variant === 'secondary',
		[styles.accent]: variant === 'accent',
	});

const animations = {
	epidemology: epidemologyAnimation,
	learning: learningAnimation,
	visualization: visualizationAnimation,
};

export function AreaItem({
	reverse,
	variant,
	number,
	title,
	text,
	href,
	animation,
}) {
	const areaClassname = selectClassnames({ reverse, variant });

	const lottieRef = useRef(null);

	useEffect(
		() => () => {
			if (lottieRef.current) {
				lottieRef.current.destroy();
			}
		},
		[],
	);

	const [isPlaying, setIsPlaying] = React.useState(false);

	const playAnimation = () => {
		setIsPlaying(true);
	};

	const pauseAnimation = () => {
		setIsPlaying(false);
	};

	return (
		<Link
			to={href}
			className={areaClassname}
			onMouseEnter={playAnimation}
			onFocus={playAnimation}
			onMouseLeave={pauseAnimation}
			onBlur={pauseAnimation}
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
	reverse: PropTypes.string,
	variant: PropTypes.string,
	number: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	text: PropTypes.string.isRequired,
	href: PropTypes.string.isRequired,
	animation: PropTypes.string.isRequired,
};

AreaItem.defaultProps = {
	reverse: undefined,
	variant: undefined,
};

export default AreaItem;
