import React from 'react';
import PropTypes from 'prop-types';
import { PublicationLabel } from '../publication-label';
import { row, column } from './publication-row.module.scss';

export function PublicationRow({ label, children }) {
	return (
		<div className={row}>
			<div className={column}>
				<PublicationLabel>{label}</PublicationLabel>
			</div>
			<div className={column}>{children}</div>
		</div>
	);
}

PublicationRow.propTypes = {
	label: PropTypes.string.isRequired,
	children: PropTypes.node.isRequired,
};

export default PublicationRow;
