import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { wrapper, image, contain, cover } from './image.module.scss';

export function Image({ wrapperClassName = undefined, imgClassname = undefined, src, alt, variant = 'cover' }) {
	return (
		<div className={classNames(wrapper, wrapperClassName)}>
			<img
				className={classNames(image, imgClassname, {
					[contain]: variant === 'contain',
					[cover]: variant === 'cover',
				})}
				src={src}
				alt={alt}
			/>
		</div>
	);
}

Image.propTypes = {
	wrapperClassName: PropTypes.string,
	imgClassname: PropTypes.string,
	src: PropTypes.string.isRequired,
	alt: PropTypes.string.isRequired,
	variant: PropTypes.oneOf(['contain', 'cover']),
};

export default Image;
