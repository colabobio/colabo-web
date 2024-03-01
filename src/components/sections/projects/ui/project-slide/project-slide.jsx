import React from 'react';
import PropTypes from 'prop-types';
import Img from 'gatsby-image';
import { ProjectContent } from '../project-content';
import { component, bg, image, body } from './project-slide.module.scss';

export function ProjectSlide({ img, title, content, url }) {
	return (
		<div className={component}>
			<div
				data-swiper-parallax-x="100%"
				data-swiper-parallax-opacity="0"
				className={bg}
			>
				<Img
						className={image}
						fluid={img.childImageSharp.fluid}
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
	img: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	content: PropTypes.string.isRequired,
	url: PropTypes.string,
};

ProjectSlide.defaultProps = {
	url: undefined,
};

export default ProjectSlide;
