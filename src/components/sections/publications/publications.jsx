import React from 'react';
import PropTypes from 'prop-types';
import { AsideLayout } from '@ui/aside-layout';
import { ConditionalComponent } from '@ui/conditional-component';
import { PublicationItem } from './ui/publication-item';
import { section, container, list, item } from './publications.module.scss';

export function Publications({ publicationsItems }) {
	return (
		<AsideLayout className={section} label="Publications">
			<ConditionalComponent data={publicationsItems}>
				<div className={container}>
					<ul className={list}>
						{publicationsItems?.map(
							({ title, authors, publication, links }, index) => {
								const key = title + index;

								return (
									<li className={item} key={key}>
										<PublicationItem
											title={title}
											authors={authors}
											publication={publication}
											links={links}
										/>
									</li>
								);
							},
						)}
					</ul>
				</div>
			</ConditionalComponent>
		</AsideLayout>
	);
}

Publications.propTypes = {
	publicationsItems: PropTypes.arrayOf(
		PropTypes.shape({
			title: PropTypes.string.isRequired,
			authors: PropTypes.string.isRequired,
			publication: PropTypes.string.isRequired,
			links: PropTypes.arrayOf(
				PropTypes.shape({
					text: PropTypes.string.isRequired,
					url: PropTypes.string.isRequired,
				}),
			).isRequired,
		}),
	).isRequired,
};

export default Publications;
