import React from 'react';
import PropTypes from 'prop-types';
import { Section } from '../../layout/section';
import { article } from './article.module.scss';

export function Article({ data = undefined }) {
	return (
		<Section containerMod="md">
			<div className={article} dangerouslySetInnerHTML={{ __html: data }} />
		</Section>
	);
}

Article.propTypes = {
	data: PropTypes.node,
};

export default Article;
