/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'prop-types';
import DOMPurify from 'isomorphic-dompurify';

export function SanitaizedText({ className, children }) {
	if (!children) return null;

	const formattedChildren = children.replace(/\n/g, '<br>');
	const sanitized = DOMPurify.sanitize(formattedChildren);

	return (
		<div
			className={className}
			dangerouslySetInnerHTML={{ __html: sanitized }}
		/>
	);
}

SanitaizedText.propTypes = {
	className: PropTypes.string.isRequired,
	children: PropTypes.node.isRequired,
};

export default SanitaizedText;
