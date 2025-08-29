import React from 'react';
import PropTypes from 'prop-types';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import {
	grant,
	content,
	imgW,
	title,
	link,
	org,
} from './grant-item.module.scss';

export function GrantItem({ image, text, organization, href }) {
	return (
		<div className={grant}>
			<a href={href} className={link} target="_blank" rel="noreferrer">
				<div className={content}>
					<div className={imgW}>
						<GatsbyImage image={getImage(image)} alt={text} />
					</div>
					<div className={title}>
						{text}
						<span className={org}>{organization}</span>
					</div>
				</div>
			</a>
		</div>
	);
}

GrantItem.propTypes = {
	image: PropTypes.string,
	text: PropTypes.string,
	organization: PropTypes.string,
	href: PropTypes.string.isRequired,
};

GrantItem.defaultProps = {
	image: undefined,
	text: undefined,
	organization: undefined,
};

export default GrantItem;
