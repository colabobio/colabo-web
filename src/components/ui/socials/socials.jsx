import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import { Twitter, Facebook, Linkedin } from '@icons';
import { component, link, socialIcon } from './socials.module.scss';

const selectIcon = (iconName) => {
	switch (iconName) {
		case 'facebook':
			return <Facebook />;

		case 'linkedin':
			return <Linkedin />;

		default:
			return <Twitter />;
	}
};

export function Socials({ list }) {
	return (
		<ul className={component}>
			{list.map(({ icon, url }) => {
				const Icon = selectIcon(icon);

				return (
					<li key={icon}>
						<Link className={link} to={url} aria-label={`social icon: ${icon}`}>
							<span className={socialIcon}>{Icon}</span>
						</Link>
					</li>
				);
			})}
		</ul>
	);
}

Socials.propTypes = {
	list: PropTypes.arrayOf(
		PropTypes.shape({
			icon: PropTypes.string.isRequired,
			url: PropTypes.string.isRequired,
		}),
	).isRequired,
};

export default Socials;
