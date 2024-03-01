/* eslint-disable consistent-return */
import React from 'react';
import PropTypes from 'prop-types';
import { AsideLayout } from '@ui/aside-layout';
import { GrantItem } from './ui/grantItem';
import { section, aside, content } from './grants.module.scss';

export function Grants({ grants }) {
	return (
		<AsideLayout className={section} asideMod={aside} label="Grants & Funding">
			<div className={content}>
				<ul>
					{grants.map(({ href, img, title, list, organization }) => (
						<li key={title}>
							<GrantItem
								href={href}
								image={img}
								text={title}
								images={list}
								organization={organization}
							/>
						</li>
					))}
				</ul>
			</div>
		</AsideLayout>
	);
}

Grants.propTypes = {
	grants: PropTypes.arrayOf(PropTypes.shape).isRequired,
};

export default Grants;
