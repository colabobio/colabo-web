import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { groupBy, shuffleArray } from '@utils/helpers';
import { Section } from '../../layout/section';
import { TeamGroup } from './ui/team-group';
import {
	section,
	sectionLg,
	sectionLayoutMod1,
	sectionLayoutMod2,
	sectionLayoutMod3,
} from './team.module.scss';

export function Team({ team }) {
	const grupedTeam = groupBy(team, 'category');
	const members = shuffleArray(grupedTeam.member);
	const collaborators = shuffleArray(grupedTeam.collaborator);
	const alumnis = shuffleArray(grupedTeam.former_student);

	return (
		<>
			<Section className={classNames(section, sectionLayoutMod1)}>
				<TeamGroup
					variant="threePerRow"
					title="Current Members"
					members={shuffleArray(members)}
				/>
			</Section>
			<Section className={classNames(section, sectionLayoutMod2)}>
				<TeamGroup
					variant="fourPerRow"
					title="Collaborators"
					members={shuffleArray(collaborators)}
				/>
			</Section>
			<Section className={classNames(section, sectionLg, sectionLayoutMod3)}>
				<TeamGroup variant="fourPerRow" title="Alumni" members={alumnis} />
			</Section>
		</>
	);
}

Team.propTypes = {
	team: PropTypes.arrayOf(PropTypes.shape).isRequired,
};

export default Team;
