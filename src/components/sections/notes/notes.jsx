/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import { getPostByGuid, getGuidFromLink } from '@utils/helpers';
import { Section } from '../../layout/section';
import { NoteItem } from '../../ui/note-item';
import * as styles from './notes.module.scss';

export function Notes({ notes, images }) {
	return (
		<Section variant="no_indent">
			<ul className={styles.notes}>
				{notes.map((item) => {
					const guid = getGuidFromLink(item.guid);
					const currentPost = getPostByGuid(guid, images);

					return (
						<li className={styles.notesItem} key={item.title}>
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
