import React from 'react';
import { Section } from '../../layout/section';
import { section, imageW } from './research-hero.module.scss';

export function ResearchHero() {
	return (
		<Section className={section}>
			<div className={imageW}>
				<svg
					width="100%"
					height="100%"
					viewBox="0 0 656 154"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M625.188 74.916c14.499-19.546 49.103-66.587 11.83-72.715-18.467-4.416-62.535 65.084-72.594 84.473-.097-.049-.194-.11-.291-.158 9.986-15.446.097-36.23-18.188-36.133-17.435.51-39.421 24.982-49.892 39.045 4.853-18.346.898-17.678-13.917-31.037-29.957-27.021-48.157 8.02-56.942 27.336a14.126 14.126 0 00-1.965-.497c.206-1.99-5.375-3.204-4.223-4.89 8.567-12.57-.897-32.627-15.433-32.493-19.535.643-43.037 15.822-58.034 31.753 3.58-15.288-5.169-28.89-22.713-29.047-20.469.145-42.698 19.11-51.288 36.339-.182-.11-.352-.218-.534-.328.668-8.117-1.152-15.858-7.971-21.075 5.411-11.442-3.834-22.204-14.633-21.658-12.364 0-19.28 13.152-22.289 22.47-3.215 8.433-7.62 20.178-24.546 21.513 17.666-39.603-27.846-47.235-52.428-23.102C172.979-3.562 66.667.806 29.078 21.092c-18.37 9.671-31.231 45.986-3.446 51.01-7.365 7.23-15.336 20.056-10.386 30.078-5.387 7.899-13.941 21.985-13.201 27.822 0 9.124 6.65 18.369 19.353 18.369 11.708-.861 20.663-9.33 23.83-19.619.194-.473 1.007-2.184 3.652-6.237 13.613 6.686 31.024 14.839 43.097 21.719 19.717 14.038 39.567 9.525 38.803-17.472 15.178 28.78 51.19 14.936 67.558-6.758 17.047 32.323 49.625 22.956 70.822.983 11.721 35.065 51.445 23.308 69.73-.777-1.225 31.801 49.747 27.555 58.968-2.936-4.817 31.704 22.871 30.903 42.139-5.618 4.077 3.252 10.41 7.28 14.245 6.819 9.257 31.486 24.727 21.731 40.634 2.402 13.674 36.012 46.325 24.631 67.231 1.432-2.645 2.936.085 10.884 1.856 13.589 2.56 3.907 6.783 6.467 11.223 7.717 10.823 3.046 23.321-1.638 27.531-12.558-1.335 3.943 1.298 8.178 4.501 10.823 5.133 4.235 12.316 6.224 18.807 4.429 7.074-1.954 12.376-7.923 15.98-14.305 5.253-9.307 11.077-20.154 11.053-31.074-.024-10.01-4.805-19.195-13.589-24.206-2.645-1.517-11.612-5.387-14.281-1.783v-.025zm-503.254 28.162c-.606-.753-8.772-5.497-13.431-7.669 10.155-2.754 15.615-4.562 22.483-8.942-3.143 6.492-4.744 13.772-4.55 21.331a21.903 21.903 0 00-4.514-4.732l.012.012z"
						stroke="#000"
						strokeWidth={3}
						strokeMiterlimit={10}
					/>
				</svg>
			</div>
		</Section>
	);
}

export default ResearchHero;
