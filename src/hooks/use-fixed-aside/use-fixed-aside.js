import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

export function useFixedAside() {
	const $triggerRef = useRef(null);
	const $asideRef = useRef(null);
	const scrollTriggerRef = useRef(null);

	const fixedAsideHandle = (props) => {
		const $aside = $asideRef.current;
		const $trigger = $triggerRef.current;

		if ($aside && $trigger) {
			scrollTriggerRef.current = ScrollTrigger.create({
				trigger: $trigger,
				pin: $aside,
				pinSpacing: false,
				...props,
			});

			scrollTriggerRef.current.refresh();
		}
	};

	return { $triggerRef, $asideRef, scrollTriggerRef, fixedAsideHandle };
}

export default useFixedAside;
