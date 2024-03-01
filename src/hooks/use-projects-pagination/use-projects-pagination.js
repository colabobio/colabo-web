/* eslint-disable import/prefer-default-export */
import { useRef, useCallback } from 'react';

const useProjectsPagination = () => {
	const $swiperRef = useRef(null);

	const slideTo = useCallback((index, speed) => {
		const $swiper = $swiperRef.current;
		if (!$swiper) return;

		$swiper.swiper.slideTo(index, speed);
	}, []);

	return {
		$swiperRef,
		slideTo,
	};
};

export default useProjectsPagination;
