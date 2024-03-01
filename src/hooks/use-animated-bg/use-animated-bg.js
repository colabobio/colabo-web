import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { ANIMATED_BG_COLORS } from '@utils/constants';

gsap.registerPlugin(ScrollTrigger);

export function useAnimatedBg() {
	const tl = gsap.timeline({ repeat: -1 });

	const handleAnimatedBg = () => {
		ANIMATED_BG_COLORS.forEach((color) => {
			tl.to(document.documentElement, {
				'--animated-bg-color': color,
				ease: 'none',
				duration: 5,
			});
		});
	};

	return { tl, handleAnimatedBg };
}

export default useAnimatedBg;
