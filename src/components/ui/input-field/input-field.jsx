/* eslint-disable react/forbid-prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import PropTypes from 'prop-types';
import { InputItem } from './ui/input-item';
import { TextareaItem } from './ui/textarea-item';
import { Star } from '../icons';
import * as styles from './input-field.module.scss';

export function InputField({
	register,
	errors,
	name,
	placeholder,
	type,
	label,
	isRequired,
	isTextarea,
}) {
	return (
		<label className={styles.label}>
			{errors[name] && (
				<span className={styles.errorMessage}>*required field</span>
			)}
			{isTextarea ? (
				<TextareaItem
					register={register}
					name={name}
					isRequired={isRequired}
					placeholder={placeholder}
				/>
			) : (
				<InputItem
					register={register}
					name={name}
					placeholder={placeholder}
					type={type}
					isRequired={isRequired}
				/>
			)}
			<div className={styles.labelW}>
				<span className={styles.labelText}>{label}</span>
				{isRequired && (
					<span className={styles.icon}>
						<Star />
					</span>
				)}
			</div>
		</label>
	);
}

InputField.propTypes = {
	register: PropTypes.func.isRequired,
	errors: PropTypes.object.isRequired,
	name: PropTypes.string.isRequired,
	placeholder: PropTypes.string.isRequired,
	type: PropTypes.oneOf(['text', 'email']),
	label: PropTypes.string.isRequired,
	isRequired: PropTypes.bool,
	isTextarea: PropTypes.bool,
};

InputField.defaultProps = {
	isRequired: false,
	isTextarea: false,
	type: 'text',
};

export default InputField;
