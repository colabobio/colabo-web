import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { TeamMember } from '../team-member';
import {
	header,
	textW,
	text,
	descr,
	membersList,
	memberItem,
	threePerRow,
	fourPerRow,
} from './team-group.module.scss';
import { useWindowSize } from '../../../../../hooks';
import { BREAKPOINTS } from '../../../../../utils/constants';

export function TeamGroup({ variant, title, members }) {
	const [memberPerRow, setMemberPerRow] = useState(null);

	const { width } = useWindowSize();

	useEffect(() => {
		if (width >= BREAKPOINTS.tabletMaxPoint) {
			const value = variant === 'fourPerRow' ? 4 : 3;
			setMemberPerRow(value);
		} else if (width < BREAKPOINTS.tabletMaxPoint) {
			setMemberPerRow(2);
		}
	}, [width, variant]);

	const handleMouseEvent = (e, indexAction) => {
		const $li = e.target.closest('li');
		if (!$li) return;

		const currentZIndex = window.getComputedStyle($li).zIndex;

		$li.style.zIndex =
			indexAction === 'decrease'
				? Number(currentZIndex) + 1
				: Number(currentZIndex) - 1;
	};

	return (
		<>
			<div className={header}>
				<div className={textW}>
					<span className={text}>Our Team</span>
				</div>
				<div className={descr}>{title}</div>
			</div>
			<ul
				className={classNames(membersList, {
					[threePerRow]: variant === 'threePerRow',
					[fourPerRow]: variant === 'fourPerRow',
				})}
			>
				{members.map(({ avatar, avatarHover, name, html }, idx) => {
					const zIndex = 10 + Math.floor(idx / memberPerRow);

					return (
						<li
							className={classNames(memberItem, {
								[threePerRow]: variant === 'threePerRow',
								[fourPerRow]: variant === 'fourPerRow',
							})}
							key={name}
							style={{
								zIndex,
							}}
							onMouseEnter={(e) => handleMouseEvent(e, 'increase')}
							onMouseLeave={(e) => handleMouseEvent(e, 'decrease')}
						>
							<TeamMember
								name={name}
								avatar={avatar}
								avatarHover={avatarHover}
								html={html}
							/>
						</li>
					);
				})}
			</ul>
		</>
	);
}

TeamGroup.propTypes = {
	variant: PropTypes.oneOf(['threePerRow', 'fourPerRow']).isRequired,
	title: PropTypes.string.isRequired,
	members: PropTypes.arrayOf(PropTypes.shape).isRequired,
};

export default TeamGroup;
