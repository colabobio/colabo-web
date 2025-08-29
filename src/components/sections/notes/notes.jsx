/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import { getPostByGuid, getGuidFromLink } from '@utils/helpers';
import { Section } from '../../layout/section';
import { NoteItem } from '../../ui/note-item';
import * as styles from './notes.module.scss';

export function Notes({ notes = [], images = [] }) {
	if (!notes || notes.length === 0) {
		return (
			<Section variant="no_indent">
				<div className={styles.notes}>
					<p>Loading Medium posts...</p>
				</div>
			</Section>
		);
	}

	return (
		<Section variant="no_indent">
			<ul className={styles.notes}>
				{notes.map((item) => {
					if (!item || !item.guid) return null;
					
					const guid = getGuidFromLink(item.guid);
					const currentPost = getPostByGuid(guid, images);

					return (
						<li className={styles.notesItem} key={item.title || item.guid}>
							<NoteItem {...item} img={currentPost?.img} />
						</li>
					);
				})}
			</ul>
		</Section>
	);
}

Notes.propTypes = {
	notes: PropTypes.arrayOf(PropTypes.shape).isRequired,
	images: PropTypes.arrayOf(PropTypes.shape).isRequired,
};

export default Notes;
