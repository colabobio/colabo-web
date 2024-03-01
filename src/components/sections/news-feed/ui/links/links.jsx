import React from 'react';
import PropTypes from 'prop-types';
import { DecoredButton } from '@ui/decored-button';
import { list, item } from './links.module.scss';

export function Links({ links }) {
	return (
		<ul className={list}>
			{links.map(({ title, url, decorVariant, colorVariant }, index) => {
				const key = `${title}${index}`;

				return (
					<li key={key} className={item}>
						<DecoredButton
							url={url}
							decorVariant={decorVariant}
							colorVariant={colorVariant}
						>
							{title}
						</DecoredButton>
					</li>
				);
			})}
		</ul>
	);
}

Links.propTypes = {
	links: PropTypes.arrayOf(
		PropTypes.shape({
			title: PropTypes.string.isRequired,
			url: PropTypes.string.isRequired,
			decorVariant: PropTypes.string,
			colorVariant: PropTypes.string,
		}),
	).isRequired,
};

export default Links;
