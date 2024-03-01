import gsap from 'gsap';
import * as T from 'three';

const colorsArray = [0xffdd4a, 0xff7bce, 0x9b84ff, 0x5ecdff, 0xc6ff55];

export const blobColorChangeAnim = (blobUniform) => {
	const tl = gsap.timeline({ repeat: -1 });

	colorsArray.forEach((color) => {
		tl.to(blobUniform.uColor.value, {
			...new T.Color(color),
			ease: 'none',
			duration: 8,
		});
	});

	return tl;
};

export default blobColorChangeAnim;
