import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useFixedAside } from '@hooks';
import { Section } from '@layout/section';
import {
	section,
	body,
	aside,
	caption,
	captionMod1,
	captionMod2,
} from './aside-layout.module.scss';

export function AsideLayout({
	className,
	asideMod,
	captionMod,
	label,
	children,
}) {
	const { $asideRef, $triggerRef, scrollTriggerRef, fixedAsideHandle } =
		useFixedAside();

	useEffect(() => {
		const headerHeight =
			document.querySelector('.js-header')?.clientHeight || 0;

		fixedAsideHandle({
			start: `top-=${headerHeight} top`,
			end: 'bottom center',
			pinType: 'fixed',
		});

		return () => {
			if (scrollTriggerRef.current) {
				scrollTriggerRef.current.kill();
			}
		};
	}, []);

	return (
		<Section className={classNames(section, className)}>
			<div ref={$triggerRef} className={body}>
				<aside ref={$asideRef} className={classNames(aside, asideMod)}>
					<h3
						className={classNames(caption, {
							[captionMod1]: captionMod === 'captionMod1',
							[captionMod2]: captionMod === 'captionMod2',
						})}
					>
						{label}
					</h3>
				</aside>
				{children}
			</div>
		</Section>
	);
}

AsideLayout.propTypes = {
	label: PropTypes.string.isRequired,
	children: PropTypes.node.isRequired,
	className: PropTypes.string,
	asideMod: PropTypes.string,
	captionMod: PropTypes.oneOf('captionMod1', 'captionMod2'),
};

AsideLayout.defaultProps = {
	className: undefined,
	asideMod: undefined,
	captionMod: 'captionMod1',
};

export default AsideLayout;
