import React from 'react';
import PropTypes from 'prop-types';
import { Section } from '@layout/section';
import * as styles from './home-hero.module.scss';

export function HomeHero({ children }) {
	return <Section className={styles.section}>{children}</Section>;
}

HomeHero.propTypes = {
	children: PropTypes.node,
};

HomeHero.defaultProps = {
	children: undefined,
};

export default HomeHero;
