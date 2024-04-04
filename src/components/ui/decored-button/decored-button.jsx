import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import { BUTTON_DECOR_VARIANTS } from '@utils/constants';
import classNames from 'classnames';
import {
	button,
	container,
	decorsWrap,
	decor,
	squareDecor,
	roundedDecor,
	elipsesDecor,
	circlesDecor,
	v1Color,
	v2Color,
	v3Color,
	v4Color,
} from './decored-button.module.scss';

const selectClassnames = ({ decorVariant, colorVariant }) =>
	classNames(button, {
		[squareDecor]: decorVariant === BUTTON_DECOR_VARIANTS.square,
		[roundedDecor]: decorVariant === BUTTON_DECOR_VARIANTS.rounded,
		[elipsesDecor]: decorVariant === BUTTON_DECOR_VARIANTS.elipses,
		[circlesDecor]: decorVariant === BUTTON_DECOR_VARIANTS.circles,

		[v1Color]: colorVariant === '1' || !colorVariant,
		[v2Color]: colorVariant === '2',
		[v3Color]: colorVariant === '3',
		[v4Color]: colorVariant === '4',
	});

const selectDecorParams = (variant) => {
	switch (variant) {
		case BUTTON_DECOR_VARIANTS.elipses:
			return { decorSize: 154, decorOffset: 4 };

		case BUTTON_DECOR_VARIANTS.circles:
			return { decorSize: 34, decorOffset: 30 };

		default:
			return { decorSize: 0, decorOffset: 0 };
	}
};

const renderDecors = (number, decoOffset) => {
	const offset = decoOffset / number;
	const decorWidth = (100 - offset) / number;

	return Array.from({ length: number }, (_, index) => {
		const left = `${(decorWidth * index - offset).toFixed(3)}%`;
		const width = `${(decorWidth + offset).toFixed(3)}%`;

		return (
			<span
				key={index}
				className={decor}
				style={{
					width,
					left,
				}}
			/>
		);
	});
};

export function DecoredButton({ children, url, decorVariant, colorVariant }) {
	const [decorNumber, setDecorNumber] = useState(3);
	const $buttonRef = useRef();

	const buttonClassnames = selectClassnames({
		decorVariant,
		colorVariant,
	});
	const { decorSize, decorOffset } = selectDecorParams(decorVariant);

	useEffect(() => {
		const $button = $buttonRef.current;

		if (
			$button &&
			(decorVariant === BUTTON_DECOR_VARIANTS.elipses ||
				decorVariant === BUTTON_DECOR_VARIANTS.circles)
		) {
			const width = $button.offsetWidth;
			const numbers = Math.max(2, Math.ceil(width / decorSize));

			setDecorNumber(numbers);
			$button.style.setProperty('--offset', `${decorOffset / numbers}%`);
		}
	}, [$buttonRef, decorVariant]);

	return (
		<div ref={$buttonRef} className={container}>
			{url !== '#' ? (
				<Link target="_blank" to={url} className={buttonClassnames}>
					{children}
					{(decorVariant === BUTTON_DECOR_VARIANTS.elipses ||
						decorVariant === BUTTON_DECOR_VARIANTS.circles) && (
						<span className={decorsWrap}>
							{renderDecors(decorNumber, decorOffset)}
						</span>
					)}
				</Link>
			) : (
				<div
					className={buttonClassnames}
					style={{ cursor: 'default' }}
				>
					{children}
					{(decorVariant === BUTTON_DECOR_VARIANTS.elipses ||
						decorVariant === BUTTON_DECOR_VARIANTS.circles) && (
						<span className={decorsWrap}>
							{renderDecors(decorNumber, decorOffset)}
						</span>
					)}
				</div>
			)}
		</div>
	);
}

DecoredButton.propTypes = {
	children: PropTypes.node.isRequired,
	url: PropTypes.string,
	decorVariant: PropTypes.oneOf([
		BUTTON_DECOR_VARIANTS.square,
		BUTTON_DECOR_VARIANTS.rounded,
		BUTTON_DECOR_VARIANTS.elipses,
		BUTTON_DECOR_VARIANTS.circles,
	]),
	colorVariant: PropTypes.oneOf(['1', '2', '3', '4']),
};

DecoredButton.defaultProps = {
	url: '#',
	decorVariant: BUTTON_DECOR_VARIANTS.square,
	colorVariant: '1',
};

export default DecoredButton;
