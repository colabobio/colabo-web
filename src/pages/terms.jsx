import React, { useEffect } from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import { useAnimatedBg } from '@hooks';
import { Layout } from '@layout/layout';
import { Seo } from '@ui/seo';
import { Article } from '../components/sections/article';

function TermsPage({data}) {
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
			<Seo title="Terms Page" />
			<Article data={content}/>
		</Layout>
	);
}

TermsPage.propTypes = {
	data: PropTypes.shape.isRequired,
};

export default TermsPage;

export const pageQuery = graphql`
	query {
		site {
			siteMetadata {
				title
			}
		}

		content: file(sourceInstanceName: { eq: "terms" }, extension: { eq: "md" }) {
			childMarkdownRemark {
				html
			}
		}
	}
`;
