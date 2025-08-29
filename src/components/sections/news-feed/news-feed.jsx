import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Section } from '@layout/section';
import { Title } from '@ui/title';
import { Links } from './ui/links';
import { section, container, heading } from './news-feed.module.scss';

export function NewsFeed({ newsItems, marqueSpeed = 40 }) {
	const $containerRef = useRef(null);

	useEffect(() => {
		const $parent = $containerRef.current;

		if ($parent) {
			const listWidth = $parent.offsetWidth / 2;
			const duration = (listWidth / marqueSpeed).toFixed(1);

			$parent.style.setProperty('--animation-duration', `${duration}s`);
		}
	}, [$containerRef, newsItems, marqueSpeed]);

	return (
		<Section noTag className={section}>
			<Title tag="h2" className={heading}>
				Newsfeed
			</Title>
			<div ref={$containerRef} className={container}>
				<Links links={newsItems} />
				<Links links={newsItems} />
			</div>
		</Section>
	);
}

NewsFeed.propTypes = {
	marqueSpeed: PropTypes.number,
	newsItems: PropTypes.arrayOf(
		PropTypes.shape({
			title: PropTypes.string.isRequired,
			url: PropTypes.string.isRequired,
			decorVariant: PropTypes.string,
			colorVariant: PropTypes.string,
		}),
	).isRequired,
};

export default NewsFeed;
