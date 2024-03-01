import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Parallax, Mousewheel } from 'swiper/modules';
import { Section } from '@layout/section';
import { useWindowSize } from '@hooks';
import { BREAKPOINTS } from '@utils/constants';
import { ProjectSlide } from './ui/project-slide';
import { ProjectsLabel } from './ui/projects-label';
import { ProjectsPagination } from './ui/projects-pagination';
import { SLIDER_SETTINGS } from './constants';
import { section, swiper, item, label } from './projects.module.scss';
import 'swiper/css';
import 'swiper/css/autoplay';

export function Projects({ projects }) {
	const $swiperRef = useRef(null);
	const { width } = useWindowSize();
	const [activeIndex, setActiveIndex] = useState(0);
	const [isMobile, setIsMobile] = useState(null);
	const [updateKey, setUpdateKey] = useState(0);

	const handlePaginationClick = (index) => {
		const $swiper = $swiperRef.current;
		if (!$swiper) return;

		$swiper.swiper.slideTo(index, SLIDER_SETTINGS.speedMs);
	};

	const handleSlideChange = (slider) => {
		setActiveIndex(slider.activeIndex);
	};

	useEffect(() => {
		const $swiper = $swiperRef.current;

		if ($swiper) {
			$swiper.style.setProperty(
				'--animation-duration',
				`${SLIDER_SETTINGS.speedS}s`,
			);
		}
	}, [$swiperRef, updateKey]);

	useEffect(() => {
		if (width >= BREAKPOINTS.tabletMaxPoint) {
			if (isMobile) {
				setUpdateKey((prev) => prev + 1);
			}
			setIsMobile(false);
		} else if (width < BREAKPOINTS.tabletMaxPoint) {
			if (!isMobile) {
				setUpdateKey((prev) => prev + 1);
			}
			setIsMobile(true);
		}
	}, [width]);

	return (
		<Section key={updateKey} className={section}>
			<Swiper
				ref={$swiperRef}
				className={swiper}
				modules={[Autoplay, Parallax, Mousewheel]}
				slidesPerView={1}
				onSlideChange={handleSlideChange}
				autoHeight
				parallax
				mousewheel
				autoplay={SLIDER_SETTINGS.autoplay}
				speed={SLIDER_SETTINGS.speedMs}
				breakpoints={SLIDER_SETTINGS.breakpoints}
			>
				{projects.map(({ img, title, content, url }) => (
					<SwiperSlide className={item} key={title}>
						<ProjectSlide {...{ img, title, content, url }} />
					</SwiperSlide>
				))}
				<ProjectsPagination
					slides={projects}
					onClick={handlePaginationClick}
					activeIndex={activeIndex}
				/>
				<div className={label}>
					<ProjectsLabel />
				</div>
			</Swiper>
		</Section>
	);
}

Projects.propTypes = {
	projects: PropTypes.arrayOf(
		PropTypes.shape({
			img: PropTypes.string.isRequired,
			title: PropTypes.string.isRequired,
			content: PropTypes.string.isRequired,
			url: PropTypes.string,
		}),
	).isRequired,
};

export default Projects;
