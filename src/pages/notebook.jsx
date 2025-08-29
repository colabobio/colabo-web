import React, { useEffect } from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import { useAnimatedBg } from '@hooks';
import { Layout } from '@layout/layout';
import { Section } from '@layout/section';
import { Seo } from '@ui/seo';
import { MEDIUM_API } from '@api/medium';
import { ConditionalComponent } from '@ui/conditional-component';
import { NotebookHero } from '../components/sections/notebook-hero';
import { Notes } from '../components/sections/notes';

const notesParser = (files = []) =>
	files.map((file) => ({
		img: file.frontmatter.bg,
		guid: file.frontmatter.guid,
	}));

function NotebookPage({ data, serverData = {} }) {
	const { tl, handleAnimatedBg } = useAnimatedBg();

	const allNotes = data.notes.nodes.map((post) => post.childMarkdownRemark);
	const notesImages = notesParser(allNotes);

	// Handle the case where serverData is undefined or doesn't have items
	const mediumPosts = serverData?.items || [];
	
	// Add client-side fetching for GitHub Pages (which doesn't support SSR)
	const [clientSidePosts, setClientSidePosts] = React.useState([]);
	
	useEffect(() => {
		// If we don't have server-side data, fetch on the client side
		if (!mediumPosts.length) {
			MEDIUM_API.getLatestPosts()
				.then(result => {
					if (result?.items) {
						setClientSidePosts(result.items);
					}
				})
				.catch(err => {
					console.error("Error fetching Medium posts on client side:", err);
				});
		}
		
		handleAnimatedBg();

		return () => {
			if (tl) {
				tl.kill();
			}
		};
	}, []);
	
	// Process Medium posts to ensure they have all required fields
	const processMediumPosts = (posts) => {
		if (!Array.isArray(posts)) return [];
		
		return posts.map(post => ({
			...post,
			// Ensure these fields exist
			title: post.title || "Untitled Post",
			author: post.author || "Unknown Author",
			link: post.link || "#",
			pubDate: post.pubDate || "",
			// Use the Medium thumbnail if available
			thumbnail: post.thumbnail || ""
		}));
	};
	
	// Use either server-side data or client-side fetched data
	const displayPosts = processMediumPosts(mediumPosts.length ? mediumPosts : clientSidePosts);

	return (
		<Layout>
			<Seo title="Notebook" image="/images/notebook.png" />
			<NotebookHero />
			<ConditionalComponent 
				data={displayPosts} 
				fallback={
					<Section variant="no_indent">
						<div style={{ textAlign: 'center', padding: '50px 0' }}>
							<h3>Loading Medium posts...</h3>
							<p>Please visit <a href="https://colabobio.medium.com/" target="_blank" rel="noopener noreferrer">our Medium page</a> directly if posts don't appear.</p>
						</div>
					</Section>
				}
			>
				<Notes notes={displayPosts} images={notesImages} />
			</ConditionalComponent>
		</Layout>
	);
}

NotebookPage.propTypes = {
	data: PropTypes.shape().isRequired,
	serverData: PropTypes.shape().isRequired,
};

export default NotebookPage;

export const pageQuery = graphql`
	query {
		notes: allFile(
			filter: { sourceInstanceName: { eq: "notebook" }, ext: { eq: ".md" } }
		) {
			nodes {
				childMarkdownRemark {
					id
					fields {
						slug
					}
					frontmatter {
						bg
						guid
					}
				}
			}
		}
	}
`;

export async function getServerData() {
	try {
		const notesData = await MEDIUM_API.getLatestPosts();
		
		return {
			props: notesData,
			// Set a reasonable cache time to avoid hitting API rate limits
			status: 200,
			headers: {
				'Cache-Control': 'public, max-age=600', // Cache for 10 minutes
			},
		};
	} catch (error) {
		console.error("Error in getServerData:", error);
		return {
			props: { items: [] },
			status: 200, // Return 200 to avoid page not found errors
		};
	}
}
