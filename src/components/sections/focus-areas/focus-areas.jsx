import React from 'react';
import PropTypes from 'prop-types';
import { Section } from '@layout/section';
import { AreaItem } from '@ui/area-item';
import * as styles from './focus-areas.module.scss';

const selectVariant = (idx) => {
	if (idx % 3 === 0) {
		return 'primary';
	}

	if (idx % 3 === 1) {
		return 'secondary';
	}

	if (idx % 3 === 2) {
		return 'accent';
	}

	return null;
};

export function FocusAreas({ researchFiles }) {
	return (
		<Section variant="no_indent">
			<h4 className={styles.title}>Focus areas</h4>
			{researchFiles.map(({ title, description, href, animation }, idx) => (
				<div key={title}>
					<AreaItem
						number={`0${idx + 1}`}
						title={title}
						text={description}
						href={href}
						variant={selectVariant(idx)}
						reverse={idx % 2 === 0}
						animation={animation}
					/>
				</div>
			))}
		</Section>
	);
}

FocusAreas.propTypes = {
	researchFiles: PropTypes.arrayOf(PropTypes.shape).isRequired,
};

export default FocusAreas;
