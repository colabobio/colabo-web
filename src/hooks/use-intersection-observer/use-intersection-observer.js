import { useEffect, useState, useRef } from 'react';

export function useIntersectionObserver(options = {}) {
	const [isIntersecting, setIsIntersecting] = useState(false);
	const [hasBeenVisible, setHasBeenVisible] = useState(false);
	const targetRef = useRef(null);
	const observerRef = useRef(null);

	useEffect(() => {
		const target = targetRef.current;
		
		if (!target) return;

		const observerOptions = {
			threshold: 0.3, // Trigger when 30% of the element is visible
			rootMargin: '0px 0px -10% 0px', // Trigger slightly before element comes into view
			...options,
		};

		observerRef.current = new IntersectionObserver(([entry]) => {
			const isVisible = entry.isIntersecting;
			setIsIntersecting(isVisible);
			
			// Once visible, keep track that it has been seen
			if (isVisible && !hasBeenVisible) {
				setHasBeenVisible(true);
			}
		}, observerOptions);

		observerRef.current.observe(target);

		return () => {
			if (observerRef.current && target) {
				observerRef.current.unobserve(target);
			}
		};
	}, [options, hasBeenVisible]);

	return { targetRef, isIntersecting, hasBeenVisible };
}

export default useIntersectionObserver;
