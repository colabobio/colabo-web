import gsap from 'gsap';

export const logoStandByAnim = (lottieMeshUniforms) =>
	gsap
		.timeline({ paused: true, repeat: -1, delay: 1 })
		.fromTo(
			lottieMeshUniforms.uDistProgress,
			{
				value: 0,
			},
			{
				value: 1,
				ease: 'none',
				duration: 1.4,
				delay: 2,
			},
		)
		.fromTo(
			lottieMeshUniforms.uDistProgress,
			{
				value: 1,
			},
			{
				value: 0,
				ease: 'none',
				duration: 1.4,
				delay: 5,
			},
		);

export const logoDistAnimation = (lottieMeshUniforms, onComplete) =>
	gsap.to(lottieMeshUniforms.uDistProgress, {
		value: 0,
		delay: 15,
		onComplete,
	});
