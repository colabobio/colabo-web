import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { section, container, mdSize, noIndent } from './section.module.scss';

export function Section({ className, noTag, children, containerMod, variant }) {
	const Tag = noTag ? 'div' : 'section';

	return (
		<Tag
			className={classNames(section, className, {
				[noIndent]: variant === 'no_indent',
			})}
		>
			<div
				className={classNames(container, {
					[mdSize]: containerMod === 'md',
				})}
			>
				{children}
			</div>
		</Tag>
	);
}

Section.propTypes = {
	children: PropTypes.node.isRequired,
	className: PropTypes.string,
	containerMod: PropTypes.oneOf(['md']),
	noTag: PropTypes.bool,
	variant: PropTypes.oneOf(['no_indent']),
};

Section.defaultProps = {
	className: undefined,
	containerMod: undefined,
	noTag: false,
	variant: undefined,
};

export default Section;
