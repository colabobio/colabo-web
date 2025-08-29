import React from 'react';
import PropTypes from 'prop-types';
import Markdown from 'markdown-to-jsx';
import { Link } from 'gatsby';
import { ConditionalComponent } from '@ui/conditional-component';
import { PublicationRow } from '../publication-row';
import { PublicationLabel } from '../publication-label';
import {
	component,
	heading,
	text,
	row,
	label,
	linksRow,
	linksRowInner,
	link,
	info,
} from './publication-item.module.scss';

export function PublicationItem({ 
	title = undefined, 
	authors = undefined, 
	publication = undefined, 
	links = [] 
}) {
	return (
		<div className={component}>
			<ConditionalComponent data={title}>
				<PublicationRow label="Title">
					<h4 className={heading}>{title}</h4>
				</PublicationRow>
			</ConditionalComponent>
			<ConditionalComponent data={authors}>
				<PublicationRow label="AUTHORS">
					<div className={text}>
						<Markdown>{authors}</Markdown>
					</div>
				</PublicationRow>
			</ConditionalComponent>
			<ConditionalComponent data={publication}>
				<PublicationRow label="PUBLICATION">
					<div className={row}>
						<div className={label}>{publication}</div>
						<ConditionalComponent data={links}>
							<div className={linksRow}>
								<PublicationLabel>LINKS</PublicationLabel>
								<div className={linksRowInner}>
									{links?.map((item) =>
										item.url ? (
											// Use regular anchor tag for external links instead of Gatsby's Link
											<a
												key={item.text}
												className={link}
												href={item.url}
												target="_blank"
												rel="noopener noreferrer"
											>
												{item.text}
											</a>
										) : (
											<span key={item.text} className={info}>
												{item.text}
											</span>
										),
									)}
								</div>
							</div>
						</ConditionalComponent>
					</div>
				</PublicationRow>
			</ConditionalComponent>
		</div>
	);
}

PublicationItem.propTypes = {
	title: PropTypes.string,
	authors: PropTypes.string,
	publication: PropTypes.string,
	links: PropTypes.arrayOf(
		PropTypes.shape({
			text: PropTypes.string.isRequired,
			url: PropTypes.string.isRequired,
		}),
	),
};

export default PublicationItem;
