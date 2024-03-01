import React from 'react';
import PropTypes from 'prop-types';
import { Title } from '@ui/title';
import * as styles from './news-feed.module.scss';

export function NewsFeed({ title, buttons }) {
	return (
		<div className={styles.component}>
			<Title className={styles.title}>{title}</Title>
			{buttons}
		</div>
	);
}

NewsFeed.propTypes = {
	title: PropTypes.string.isRequired,
	buttons: PropTypes.arrayOf(
		PropTypes.shape({
			title: PropTypes.string.isRequired,
			url: PropTypes.string.isRequired,
			decorVariant: PropTypes.string,
			colorVariant: PropTypes.string,
		}),
	).isRequired,
};

export default NewsFeed;
