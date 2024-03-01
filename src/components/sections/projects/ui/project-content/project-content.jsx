import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Title } from '@ui/title';
import { SanitaizedText } from '@ui/sanitaized-text';
import { Arrow } from '@icons/arrow';
import { Link } from 'gatsby';
import {
	component,
	heading,
	body,
	link,
	icon,
} from './project-content.module.scss';

export function ProjectContent({ className, title, content, url }) {
	return (
		<div className={classNames(component, className)}>
			<Title className={heading} tag="h2" size="h5">
				{title}
			</Title>
			<SanitaizedText className={body}>{content}</SanitaizedText>
			{url && (
				<Link
					className={link}
					to={url}
					target="_blank"
					rel="noopener noreferrer"
				>
					Visit The Site
					<span className={icon}>
						<Arrow />
					</span>
				</Link>
			)}
		</div>
	);
}

ProjectContent.propTypes = {
	title: PropTypes.string.isRequired,
	content: PropTypes.string.isRequired,
	className: PropTypes.string,
	url: PropTypes.string,
};

ProjectContent.defaultProps = {
	className: undefined,
	url: undefined,
};

export default ProjectContent;
