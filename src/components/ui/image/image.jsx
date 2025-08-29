import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { wrapper, image, contain, cover } from './image.module.scss';

export function Image({ wrapperClassName, imgClassname, src, alt, variant }) {
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

Image.defaultProps = {
	wrapperClassName: undefined,
	imgClassname: undefined,
	variant: 'cover',
};

export default Image;
