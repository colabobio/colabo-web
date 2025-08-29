/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import * as styles from './input-item.module.scss';

export function InputItem({ register, name, placeholder, type = 'text', isRequired = false }) {
	return (
		<input
			className={styles.input}
			{...register(name, { required: isRequired })}
			placeholder={placeholder}
			type={type}
		/>
	);
}

InputItem.propTypes = {
	register: PropTypes.func.isRequired,
	name: PropTypes.string.isRequired,
	placeholder: PropTypes.string.isRequired,
	type: PropTypes.oneOf(['text', 'email']),
	isRequired: PropTypes.bool,
};

export default InputItem;
