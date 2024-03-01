/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React, { useEffect } from 'react';
import { graphql } from 'gatsby';
import { Layout } from '@layout/layout';
import { useAnimatedBg } from '@hooks';
import { Seo } from '@ui/seo';
import { Article } from '../components/sections/article';

function BlogPostTemplate({ data }) {
	const { tl, handleAnimatedBg } = useAnimatedBg();

	const post = data.markdownRemark;

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
			<Seo
				title={post.frontmatter.title}
				description={post.frontmatter.description || post.excerpt}
			/>
			<Article
				data={`<h1>${data.markdownRemark.frontmatter.title}</h1>${data.markdownRemark.html}`}
			/>
		</Layout>
	);
}

export default BlogPostTemplate;

export const pageQuery = graphql`
	query ResearchQuery(
		$id: String!
		$previousPostId: String
		$nextPostId: String
	) {
		site {
			siteMetadata {
				title
			}
		}
		markdownRemark(id: { eq: $id }) {
			id
			excerpt(pruneLength: 160)
			html
			frontmatter {
				title
				date(formatString: "MMMM DD, YYYY")
				description
			}
		}
		previous: markdownRemark(id: { eq: $previousPostId }) {
			fields {
				slug
			}
			frontmatter {
				title
			}
		}
		next: markdownRemark(id: { eq: $nextPostId }) {
			fields {
				slug
			}
			frontmatter {
				title
			}
		}
	}
`;
