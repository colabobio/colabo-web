import React, { useEffect } from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import { Layout } from '@layout/layout';
import { Seo } from '@ui/seo';
import { ConditionalComponent } from '@ui/conditional-component';
import { useAnimatedBg } from '@hooks';
import { AboutHero } from '../components/sections/about-hero';
import { Team } from '../components/sections/team';
import { Grants } from '../components/sections/grants';
import { getHeroData } from '../utils/helpers';

function AboutPage({ data }) {
	const { tl, handleAnimatedBg } = useAnimatedBg();

	const team = data.team.nodes.map((post) => ({
		...post.childMarkdownRemark.frontmatter,
		html: post.childMarkdownRemark.html,
	}));

	const { description } = getHeroData(data, 'about');

	const grants = data.grants.nodes.map(
		(grant) => grant.childMarkdownRemark.frontmatter,
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
			<Seo title="About Us" image="/images/about.png" />
			<AboutHero description={description} />

			<ConditionalComponent data={team}>
				<Team team={team} />
			</ConditionalComponent>

			<ConditionalComponent data={grants}>
				<Grants grants={grants} />
			</ConditionalComponent>
		</Layout>
	);
}

AboutPage.propTypes = {
	data: PropTypes.shape.isRequired,
};

export default AboutPage;

export const pageQuery = graphql`
	query {
		team: allFile(
			filter: { sourceInstanceName: { eq: "team" }, extension: { eq: "md" } }
			sort: { fields: childMarkdownRemark___frontmatter___order, order: ASC }
		) {
			nodes {
				childMarkdownRemark {
					frontmatter {
						name
						category
						avatar {
							childImageSharp {
								gatsbyImageData(layout: FULL_WIDTH)
							}
						}
						avatarHover {
							childImageSharp {
								gatsbyImageData(layout: FULL_WIDTH)
							}
						}
					}
					html
				}
			}
		}
		heros: allFile(
			filter: { sourceInstanceName: { eq: "heros" }, extension: { eq: "md" } }
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
		grants: allFile(
			filter: { sourceInstanceName: { eq: "grants" }, extension: { eq: "md" } }
			sort: { fields: childMarkdownRemark___frontmatter___order, order: DESC }
		) {
			nodes {
				childMarkdownRemark {
					frontmatter {
						title
						organization
						img {
							childImageSharp {
								gatsbyImageData(layout: FULL_WIDTH)
							}
						}
						href
						order
					}
				}
			}
		}
	}
`;
