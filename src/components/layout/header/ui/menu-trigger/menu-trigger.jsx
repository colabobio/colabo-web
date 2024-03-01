import React from 'react';
import PropTypes from 'prop-types';
import { trigger } from './menu-trigger.module.scss';

export function MenuTrigger({ handleClick }) {
	return (
		<button
			className={trigger}
			onClick={handleClick}
			type="button"
			aria-label="Toggle menu"
		>
			<span />
		</button>
	);
}

MenuTrigger.propTypes = {
	handleClick: PropTypes.func.isRequired,
};

export default MenuTrigger;
