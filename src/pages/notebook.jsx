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

function NotebookPage({ data }) {
	const { tl, handleAnimatedBg } = useAnimatedBg();

	const allNotes = data.notes.nodes.map((post) => post.childMarkdownRemark);
	const notesImages = notesParser(allNotes);

	// Client-side fetching only, no server-side rendering for GitHub Pages compatibility
	const [clientSidePosts, setClientSidePosts] = React.useState([]);
	const [isLoading, setIsLoading] = React.useState(true);
	
	useEffect(() => {
		// Always fetch on client side since GitHub Pages doesn't support SSR
		setIsLoading(true);
		MEDIUM_API.getLatestPosts()
			.then(result => {
				if (result?.items) {
					setClientSidePosts(result.items);
				}
				setIsLoading(false);
			})
			.catch(err => {
				console.error("Error fetching Medium posts on client side:", err);
				setIsLoading(false);
			});
		
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
	
	// Only client-side data is used
	const displayPosts = processMediumPosts(clientSidePosts);

	return (
		<Layout>
			<Seo title="Notebook" image="/images/notebook.png" />
			<NotebookHero />
			{isLoading ? (
				<Section variant="no_indent">
					<div style={{ textAlign: 'center', padding: '50px 0' }}>
						<h3>Loading Medium posts...</h3>
						<p>Please wait while we fetch the latest articles...</p>
					</div>
				</Section>
			) : (
				<ConditionalComponent 
					data={displayPosts} 
					fallback={
						<Section variant="no_indent">
							<div style={{ textAlign: 'center', padding: '50px 0' }}>
								<h3>No Medium posts found</h3>
								<p>Please visit <a href="https://colabobio.medium.com/" target="_blank" rel="noopener noreferrer">our Medium page</a> directly to view our articles.</p>
							</div>
						</Section>
					}
				>
					<Notes notes={displayPosts} images={notesImages} />
					{displayPosts.length > 0 && (
						<div style={{ textAlign: 'center', padding: '20px 0', fontSize: '14px', opacity: 0.7 }}>
							Showing the latest {displayPosts.length} notebook articles, please visit <a href="https://colabobio.medium.com/" target="_blank" rel="noopener noreferrer">our Medium page</a> to read more.
						</div>
					)}
				</ConditionalComponent>
			)}
		</Layout>
	);
}

NotebookPage.propTypes = {
	data: PropTypes.shape({
		notes: PropTypes.object
	}).isRequired
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

// Removed getServerData function to make compatible with GitHub Pages
