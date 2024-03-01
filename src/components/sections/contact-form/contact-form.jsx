/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';
import classNames from 'classnames';
import { useForm } from 'react-hook-form';
import { AsideLayout } from '@ui/aside-layout';
import { Spinner } from '@ui/spinner';
import { InputField } from '@ui/input-field';
import { FORM_ENDPOINT, FORM_MESSAGES, PROMISE_STATUS } from '@utils/constants';
import * as styles from './contact-form.module.scss';

export function ContactForm() {
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [status, setStatus] = useState(PROMISE_STATUS.idle);
	const [message, setMessage] = useState('');

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm();

	const onSubmit = async (data) => {
		setIsSubmitted(false);
		setStatus('');
		setStatus(PROMISE_STATUS.pending);

		const formData = new FormData();

		Object.keys(data).forEach((key) => {
			formData.append(key, data[key] || 'not specified');
		});

		try {
			const response = await fetch(FORM_ENDPOINT, {
				method: 'POST',
				body: formData,
				headers: {
					Accept: 'application/json',
				},
			});

			if (response.status === 200) {
				setMessage(FORM_MESSAGES.success);
				setStatus(PROMISE_STATUS.fulfilled);
				reset();
			} else {
				throw new Error(FORM_MESSAGES.error);
			}
		} catch (error) {
			setMessage(error.message);
			setStatus(PROMISE_STATUS.rejected);
		} finally {
			setIsSubmitted(true);
		}
	};

	return (
		<AsideLayout
			className={styles.section}
			asideMod={styles.aside}
			label="Contact Us"
			captionMod="captionMod2"
		>
			<div className={styles.formW}>
				<form
					className={styles.form}
					onSubmit={handleSubmit(onSubmit)}
					method="POST"
					acceptCharset="UTF-8"
					encType="multipart/form-data"
				>
					<div className={styles.inputsW}>
						<div className={styles.inputs}>
							<InputField
								register={register}
								errors={errors}
								name="firstName"
								placeholder="Your first name"
								type="text"
								label="First Name"
								isRequired
							/>
							<InputField
								register={register}
								errors={errors}
								name="lastName"
								placeholder="Your last name"
								type="text"
								label="Last Name"
							/>
						</div>
						<div className={styles.inputW}>
							<InputField
								register={register}
								errors={errors}
								name="email"
								placeholder="your.address@email.com"
								type="email"
								label="Email Address"
								isRequired
							/>
						</div>
						<div className={styles.inputW}>
							<InputField
								register={register}
								errors={errors}
								name="organization"
								placeholder="Your organization"
								type="text"
								label="Organization (optional)"
							/>
						</div>
					</div>
					<div className={styles.textareaW}>
						<InputField
							register={register}
							errors={errors}
							name="message"
							placeholder="Please write a short message for our team describing your inquiry..."
							label="Message"
							isRequired
							isTextarea
						/>
					</div>
					<button className={styles.button} type="submit">
						{status === PROMISE_STATUS.pending ? <Spinner /> : 'Send'}
					</button>
					{isSubmitted && (
						<span
							className={classNames(styles.status, {
								[styles.success]: status === PROMISE_STATUS.fulfilled,
								[styles.error]: status === PROMISE_STATUS.rejected,
							})}
						>
							{message}
						</span>
					)}
				</form>
			</div>
		</AsideLayout>
	);
}

export default ContactForm;
