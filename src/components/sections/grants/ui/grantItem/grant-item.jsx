import React from 'react';
import PropTypes from 'prop-types';
import Img from 'gatsby-image';
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
						<Img fluid={image.childImageSharp.fluid} alt={text} />
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
