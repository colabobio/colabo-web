import React from 'react';
import PropTypes from 'prop-types';
import { label } from './publication-label.module.scss';

export function PublicationLabel({ children }) {
	return <div className={label}>{children}</div>;
}

PublicationLabel.propTypes = {
	children: PropTypes.node.isRequired,
};

export default PublicationLabel;
