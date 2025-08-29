/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet-async';
import { useStaticQuery, graphql } from 'gatsby';

export function Seo({ description, meta, title, image }) {
	const { site } = useStaticQuery(graphql`
		query {
			site {
				siteMetadata {
					title
					description
				}
			}
		}
	`);

	const metaDescription = description || site.siteMetadata.description;
	const defaultTitle = site.siteMetadata?.title;

	return (
		<Helmet
			title={title}
			titleTemplate={defaultTitle ? `%s | ${defaultTitle}` : null}
			meta={[
				{
					name: `description`,
					content: metaDescription,
				},
				{
					property: `og:title`,
					content: title,
				},
				{
					property: `og:image`,
					content: image,
				},
				{
					property: `og:description`,
					content: metaDescription,
				},
				{
					property: `og:type`,
					content: `website`,
				},
				{
					name: `twitter:card`,
					content: `summary`,
				},
				{
					name: `twitter:creator`,
					content: site.siteMetadata?.author || ``,
				},
				{
					name: `twitter:title`,
					content: title,
				},
				{
					name: `twitter:description`,
					content: metaDescription,
				},
			].concat(meta)}
		>
			<link rel="icon" href="/images/favicon.png" type="image/png" />
		</Helmet>
	);
}

Seo.defaultProps = {
	meta: [],
	description: ``,
	image: ``,
};

Seo.propTypes = {
	description: PropTypes.string,
	meta: PropTypes.arrayOf(PropTypes.shape),
	title: PropTypes.string.isRequired,
	image: PropTypes.string,
};

export default Seo;
