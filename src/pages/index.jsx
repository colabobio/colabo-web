import React from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import { ConditionalComponent } from '@ui/conditional-component';
import { Layout } from '@layout/layout';
import { Seo } from '@ui/seo';
import { HomeHero } from '@sections/home-hero';
import { NewsFeed } from '@sections/news-feed';
import { IntroAnimation } from '../components/ui/intro-animation';

function IndexPage({ data }) {
	const { news } = data.news.childMarkdownRemark.frontmatter;

	return (
		<Layout>
			<Seo title="Colabo" image="/images/home.png" />
			<HomeHero>
				<IntroAnimation />
				<ConditionalComponent data={news}>
					<NewsFeed newsItems={news} />
				</ConditionalComponent>
			</HomeHero>
		</Layout>
	);
}

IndexPage.propTypes = {
	data: PropTypes.shape.isRequired,
};

export default IndexPage;

export const pageQuery = graphql`
	query {
		site {
			siteMetadata {
				title
			}
		}

		news: file(sourceInstanceName: { eq: "news" }, extension: { eq: "md" }) {
			childMarkdownRemark {
				frontmatter {
					news {
						decorVariant
						title
						url
						colorVariant
					}
				}
			}
		}
	}
`;
