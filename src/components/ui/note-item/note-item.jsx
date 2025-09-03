/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { SanitaizedText } from '@ui/sanitaized-text';
import { formatDate } from '@utils/helpers';
import { useIntersectionObserver } from '@hooks';
import * as styles from './note-item.module.scss';

export function NoteItem({ 
	img = undefined, 
	link, 
	title = "Untitled Post", 
	author = "Unknown Author", 
	pubDate = "", 
	thumbnail = undefined 
}) {
	const date = formatDate(pubDate) || '';
	
	// Use Medium thumbnail if available and no custom image is provided
	const imageToDisplay = img || thumbnail;

	// Use intersection observer for mobile scroll-triggered animations
	const { targetRef, isIntersecting } = useIntersectionObserver({
		threshold: 0.5, // Trigger when 50% of the element is visible
		rootMargin: '0px 0px -10% 0px', // Trigger slightly before element comes into view
	});

	// Combine classes for note item - add visible class when intersecting
	const noteClassNames = classNames(styles.note, {
		[styles.visible]: isIntersecting,
	});

	return (
		<a
			ref={targetRef}
			href={link}
			className={noteClassNames}
			target="_blank"
			rel="noopener noreferrer"
		>
			<div className={styles.imageW}>
				{imageToDisplay && <img className={styles.image} src={imageToDisplay} alt={title} />}
			</div>
			<div className={styles.contentW}>
				<div className={styles.content}>
					<div className={styles.header}>
						<SanitaizedText className={styles.title}>{title || "Untitled Post"}</SanitaizedText>
						{/* {text && <div className={styles.text}>{text}</div>} */}
					</div>
					<div className={styles.info}>
						<div className={styles.author}>By {author || "Unknown Author"}</div>
						<div className={styles.date}>{date}</div>
					</div>
				</div>
				<div className={styles.hint}>
					<span className={styles.hintIconW}>
						<svg className={styles.hintIcon} viewBox="0 0 17 16" fill="none">
							<path
								d="M10.0156 14.0332L15.9677 8.08115L16.6748 7.37404L15.9677 6.66694L10.0156 0.714883L8.60136 2.12909L12.8571 6.3848L0.567712 6.3848L0.567711 8.3848L12.8356 8.3848L8.60136 12.619L10.0156 14.0332Z"
								fill="currentColor"
							/>
						</svg>
					</span>
					<span className={styles.hintText}>Read Article</span>
				</div>
			</div>
		</a>
	);
}

NoteItem.propTypes = {
	link: PropTypes.string.isRequired,
	title: PropTypes.string,
	author: PropTypes.string,
	pubDate: PropTypes.string,
	img: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
	thumbnail: PropTypes.string,
	// text: PropTypes.string,
};

export default NoteItem;
