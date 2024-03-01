export const SLIDER_SETTINGS = {
	speedMs: 500,
	speedS: 0.5,
	autoplay: { delay: 5000, disableOnInteraction: true },
	breakpoints: {
		320: {
			allowTouchMove: true,
			autoplay: false,
		},
		1024: {
			allowTouchMove: false,
			parallax: false,
		},
	},
};

export default SLIDER_SETTINGS;
