import React, { useEffect } from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import { useAnimatedBg } from '@hooks';
import { Layout } from '@layout/layout';
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

function NotebookPage({ data, serverData }) {
	const { tl, handleAnimatedBg } = useAnimatedBg();

	const allNotes = data.notes.nodes.map((post) => post.childMarkdownRemark);
	const notesImages = notesParser(allNotes);

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
			<Seo title="Notebook" image="/images/notebook.png" />
			<NotebookHero />
			<ConditionalComponent data={serverData?.items}>
				<Notes notes={serverData?.items} images={notesImages} />
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
	const notesData = await MEDIUM_API.getLatestPosts();

	return {
		props: notesData,
	};
}
