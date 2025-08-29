/* eslint-disable import/no-extraneous-dependencies */
import React, { useRef, useEffect } from 'react';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import PropTypes from 'prop-types';
import { SanitaizedText } from '@ui/sanitaized-text';
import { useWindowSize } from '../../../../../hooks';
import {
	memberContent,
	imageContainer,
	imageHoverW,
	imageW,
	info,
	image,
	title,
	text,
} from './team-member.module.scss';

export function TeamMember({ avatar, avatarHover, name, html }) {
	const { width } = useWindowSize();

	const $infoBlock = useRef(null);

	useEffect(() => {
		$infoBlock.current.style.marginLeft = 0;
		const offsetX = $infoBlock.current.getBoundingClientRect().left;
		$infoBlock.current.style.marginLeft = `-${offsetX}px`;
	}, [width]);

	return (
		<div className={memberContent}>
			<div className={imageContainer}>
				<div className={imageHoverW}>
					<GatsbyImage
						image={getImage(avatar)}
						alt={name}
						className={image}
					/>
				</div>
				<div className={imageW}>
					<GatsbyImage
						image={getImage(avatarHover)}
						alt={name}
						className={image}
					/>
				</div>
			</div>
			<div className={info} ref={$infoBlock}>
				<div className={title}>{name}</div>
				<div className={text}>
					<SanitaizedText>{html}</SanitaizedText>
				</div>
			</div>
		</div>
	);
}

TeamMember.propTypes = {
	avatar: PropTypes.shape.isRequired,
	avatarHover: PropTypes.shape.isRequired,
	name: PropTypes.string.isRequired,
	html: PropTypes.string.isRequired,
};

export default TeamMember;
