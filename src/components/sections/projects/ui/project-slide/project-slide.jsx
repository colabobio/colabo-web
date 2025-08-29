import React from 'react';
import PropTypes from 'prop-types';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { ProjectContent } from '../project-content';
import { component, bg, image, body } from './project-slide.module.scss';

export function ProjectSlide({ img, title, content, url = undefined }) {
	return (
		<div className={component}>
			<div
				data-swiper-parallax-x="100%"
				data-swiper-parallax-opacity="0"
				className={bg}
			>
				<GatsbyImage
						className={image}
						image={getImage(img)}
						alt={title}
					/>
			</div>
			<div className={body}>
				<div>
					<ProjectContent className={body} {...{ content, url, title }} />
				</div>
			</div>
		</div>
	);
}

ProjectSlide.propTypes = {
	img: PropTypes.object.isRequired, // Changed from string to object for GatsbyImage
	title: PropTypes.string.isRequired,
	content: PropTypes.string.isRequired,
	url: PropTypes.string,
};

export default ProjectSlide;
