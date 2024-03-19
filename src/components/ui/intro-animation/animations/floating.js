import gsap from 'gsap';

export function floating({ target, onUpdate, rangeX, rangeY }) {
	const moveXTL = gsap.timeline();
	const moveYTL = gsap.timeline();

	function getRandomFloat(min, max) {
		return Math.random() * (max - min) + min;
	}

	const randomX = () => getRandomFloat(rangeX.min, rangeX.max);
	const randomY = () => getRandomFloat(rangeY.min, rangeY.max);
	const randomTime = () => getRandomFloat(4, 7);

	function moveX(direction) {
		moveXTL.clear();
		moveXTL.to(target, {
			duration: randomTime(),
			x: randomX(direction),
			ease: 'sine.inOut',
			onComplete: moveX,
			onCompleteParams: [direction * -1],
			onUpdate,
		});
	}

	function moveY(direction) {
		moveYTL.clear();
		moveYTL.to(target, {
			y: randomY(direction),
			duration: randomTime(),
			ease: 'sine.inOut',
			onComplete: moveY,
			onCompleteParams: [direction * -1],
			onUpdate,
		});
	}

	moveX(target, 1);
	moveY(target, -1);

	const killTimelines = () => {
		moveXTL.kill();
		moveYTL.kill();
	};

	return killTimelines;
}

export default floating;
