import React from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import { Layout } from '@layout/layout';
import { Seo } from '@ui/seo';
import { ConditionalComponent } from '@ui/conditional-component';
import { Projects } from '@sections/projects';

function ProjectsPage({ data }) {
	const { projects } = data.projects.childMarkdownRemark.frontmatter;

	return (
		<Layout wrapperMod="projects">
			<Seo title="Projects" image="/images/projects.png" />
			<ConditionalComponent data={projects}>
				<Projects projects={projects} />
			</ConditionalComponent>
		</Layout>
	);
}

ProjectsPage.propTypes = {
	data: PropTypes.shape({
		site: PropTypes.object,
		projects: PropTypes.object
	}).isRequired,
};

export default ProjectsPage;

export const pageQuery = graphql`
	query {
		site {
			siteMetadata {
				title
			}
		}

		projects: file(
			sourceInstanceName: { eq: "projects" }
			extension: { eq: "md" }
		) {
			childMarkdownRemark {
				frontmatter {
					projects {
						img {
							childImageSharp {
								gatsbyImageData(width: 1920, quality: 100, layout: FULL_WIDTH)
							}
						}
						title
						url
						content
					}
				}
			}
		}
	}
`;
