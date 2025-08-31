import React from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import { ConditionalComponent } from '@ui/conditional-component';
import { Layout } from '@layout/layout';
import { Seo } from '@ui/seo';
import { HomeHero } from '@sections/home-hero';
import { NewsFeed } from '@sections/news-feed';
import { NetworkAnimation } from '../components/ui/intro-animation/network-animation';
// import { IntroAnimation } from '../components/ui/intro-animation';
// import { StaticPlaceholder } from '../components/ui/intro-animation/static-placeholder';

function IndexPage({ data }) {
	const { news } = data.news.childMarkdownRemark.frontmatter;

	return (
		<Layout>
			<Seo title="Colabo" image="/images/home.png" />
			<HomeHero>
				{/* D3.js Network Animation showing real-time contact networks */}
				<NetworkAnimation />
				<ConditionalComponent data={news}>
					<NewsFeed newsItems={news} />
				</ConditionalComponent>
			</HomeHero>
		</Layout>
	);
}

IndexPage.propTypes = {
	data: PropTypes.shape({
		site: PropTypes.object,
		news: PropTypes.object
	}).isRequired,
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
