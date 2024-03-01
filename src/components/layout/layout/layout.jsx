/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import isMobile from 'ismobilejs';
import { Header } from '@layout/header';
import { Footer } from '@layout/footer';
import { useWindowSize } from '@hooks';

const isTouchDevice = () =>
	'ontouchstart' in window ||
	window.navigator.maxTouchPoints > 0 ||
	window.navigator.msMaxTouchPoints > 0;

export function Layout({ children, wrapperMod }) {
	const { height } = useWindowSize();

	useEffect(() => {
		const isMobileData = isMobile();
		const isApple = isMobileData.apple.phone;
		const isAndroid = isMobileData.android.phone;
		const isSeven = isMobileData.seven_inch;

		if (isApple || isAndroid || isSeven || isTouchDevice()) {
			const vh = window.innerHeight * 0.01;
			document.documentElement.style.setProperty('--vh', `${vh}px`);
		}

		if (navigator.userAgent.indexOf('Mac OS') !== -1) {
			document.body.classList.add('body--mac_mod');
		}
	}, [height]);

	return (
		<>
			<Header />
			<div
				className={classNames('wrapper', {
					'wrapper--projects_mod': wrapperMod === 'projects',
				})}
			>
				<div className="base">{children}</div>
			</div>
			<Footer />
		</>
	);
}

Layout.propTypes = {
	children: PropTypes.node.isRequired,
	wrapperMod: PropTypes.oneOf(['projects']),
};

Layout.defaultProps = {
	wrapperMod: undefined,
};

export default Layout;
