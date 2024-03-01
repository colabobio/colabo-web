/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import PropTypes from 'prop-types';
import * as styles from './textarea-item.module.scss';

export function TextareaItem({ register, name, isRequired, placeholder }) {
	return (
		<textarea
			className={styles.textarea}
			{...register(name, { required: isRequired })}
			placeholder={placeholder}
		/>
	);
}

TextareaItem.propTypes = {
	register: PropTypes.func.isRequired,
	name: PropTypes.string.isRequired,
	placeholder: PropTypes.string.isRequired,
	isRequired: PropTypes.bool,
};

TextareaItem.defaultProps = {
	isRequired: false,
};

export default TextareaItem;
