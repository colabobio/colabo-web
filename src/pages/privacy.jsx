import React, { useEffect } from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import { useAnimatedBg } from '@hooks';
import { Layout } from '@layout/layout';
import { Seo } from '@ui/seo';
import { Article } from '../components/sections/article';

function PrivacyPage({data}) {
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
			<Seo title="Privacy Page" />
			<Article data={content} />
		</Layout>
	);
}

PrivacyPage.propTypes = {
	data: PropTypes.shape.isRequired,
};


export default PrivacyPage;

export const pageQuery = graphql`
	query {
		site {
			siteMetadata {
				title
			}
		}

		content: file(sourceInstanceName: { eq: "privacy" }, extension: { eq: "md" }) {
			childMarkdownRemark {
				html
			}
		}
	}
`;
