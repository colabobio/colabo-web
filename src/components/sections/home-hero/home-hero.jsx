import React from 'react';
import PropTypes from 'prop-types';
import { Section } from '@layout/section';
import * as styles from './home-hero.module.scss';

export function HomeHero({ children = undefined }) {
	return <Section className={styles.section}>{children}</Section>;
}

HomeHero.propTypes = {
	children: PropTypes.node,
};

export default HomeHero;
