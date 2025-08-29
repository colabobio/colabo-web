import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {
	title,
	h1Size,
	h2Size,
	h3Size,
	h4Size,
	h5Size,
	h5BoldSize,
	h6Size,
} from './title.module.scss';

const selectClassnames = ({ size }) =>
	classNames(title, {
		[h1Size]: size === 'h1',
		[h2Size]: size === 'h2',
		[h3Size]: size === 'h3',
		[h4Size]: size === 'h4',
		[h5Size]: size === 'h5',
		[h5BoldSize]: size === 'h5_bold',
		[h6Size]: size === 'h6',
	});

export function Title({ children, className = undefined, tag = 'div', size = 'h4' }) {
	const Tag = tag;
	const titleClassname = selectClassnames({ size });

	return (
		<Tag className={classNames(titleClassname, className)}>{children}</Tag>
	);
}

Title.propTypes = {
	children: PropTypes.node.isRequired,
	className: PropTypes.string,
	tag: PropTypes.oneOfType([PropTypes.string, PropTypes.elementType]),
	size: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'h5_bold', 'h6']),
};

export default Title;
