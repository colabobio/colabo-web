import React, { useEffect } from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import { useAnimatedBg } from '@hooks';
import { Layout } from '@layout/layout';
import { Seo } from '@ui/seo';
import { ConditionalComponent } from '@ui/conditional-component';
import { FocusAreas } from '@sections/focus-areas';
import { ResearchHero } from '@sections/research-hero';
import { Publications } from '@sections/publications';

const researchParser = (files = []) =>
	files.map((research, index) => {
		const title = research.frontmatter.title || research.fields.slug;
		const { description } = research.frontmatter;
		const { slug } = research.fields;
		const href = `/research${slug}`;
		const { animation } = research.frontmatter;
		return { index, title, description, href, animation };
	});

function ResearchPage({ data }) {
	const { tl, handleAnimatedBg } = useAnimatedBg();

	const allResearchFiles = data.files.nodes.map(
		(post) => post.childMarkdownRemark,
	);

	const researchs = researchParser(allResearchFiles);

	const publicationsItems = data.publications.nodes.map(
		(post) => post.childMarkdownRemark.frontmatter,
	);

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
			<Seo title="Research" image="/images/research.png" />
			<ResearchHero />

			<ConditionalComponent data={allResearchFiles}>
				<FocusAreas researchFiles={researchs} />
			</ConditionalComponent>

			<ConditionalComponent data={publicationsItems}>
				<Publications publicationsItems={publicationsItems} />
			</ConditionalComponent>
		</Layout>
	);
}

ResearchPage.propTypes = {
	data: PropTypes.shape({
		files: PropTypes.object,
		heros: PropTypes.object,
		publications: PropTypes.object
	}).isRequired,
};

export default ResearchPage;

export const pageQuery = graphql`
	query {
		files: allFile(
			filter: {sourceInstanceName: {eq: "research"}, ext: {eq: ".md"}}
			sort: {childrenMarkdownRemark: {frontmatter: {order: ASC}}}
		) {
			nodes {
			childMarkdownRemark {
				id
				fields {
				slug
				}
				frontmatter {
				title
				description
				href
				animation
				}
			}
			}
		}
		heros: allFile(
			filter: {sourceInstanceName: {eq: "heros"}, extension: {eq: "md"}}
		) {
			nodes {
			childMarkdownRemark {
				frontmatter {
				description
				img {
					childImageSharp {
					gatsbyImageData(layout: FULL_WIDTH)
					}
				}
				page
				}
			}
			}
		}
		publications: allFile(
			filter: {sourceInstanceName: {eq: "publications"}, extension: {eq: "md"}}
			sort: {childMarkdownRemark: {frontmatter: {order: ASC}}}
		) {
			nodes {
			childMarkdownRemark {
				frontmatter {
				title
				authors
				publication
				links {
					text
					url
				}
				}
			}
			}
		}
	}
`;
