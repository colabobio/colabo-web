import React, { useEffect } from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import { Layout } from '@layout/layout';
import { Seo } from '@ui/seo';
import { useAnimatedBg } from '@hooks';
import { Article } from '../components/sections/article';

function BasicPage({ data }) {
	const { tl, handleAnimatedBg } = useAnimatedBg();
	const content = data?.content?.childMarkdownRemark?.html;

	useEffect(() => {
		handleAnimatedBg();

		return () => {
			if (tl) {
				tl.kill();
			}
		};
	}, []);

	return (
		<Layout>
			<Seo title="Basic Page" />
			<Article data={content} />
		</Layout>
	);
}

BasicPage.propTypes = {
	data: PropTypes.shape.isRequired,
};

export default BasicPage;

export const pageQuery = graphql`
	query {
		site {
			siteMetadata {
				title
			}
		}

		content: file(
			sourceInstanceName: { eq: "basic" }
			extension: { eq: "md" }
		) {
			childMarkdownRemark {
				html
			}
		}
	}
`;
