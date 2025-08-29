import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from '@gatsbyjs/reach-router';
import { useStaticQuery, graphql, Link } from 'gatsby';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { CSSTransition } from 'react-transition-group';
import { Logo } from '@ui/logo';
import { CLASSNAMES, BREAKPOINTS } from '@utils/constants';
import { useWindowSize } from '@hooks';
import { Socials } from '@ui/socials';
import { Menu } from './ui/menu';
import { MenuTrigger } from './ui/menu-trigger';
import {
	enter,
	enterActive,
	exit,
	exitActive,
	header,
	container,
	logoWrap,
	logo,
	body,
	menu,
	socials,
	unClickable,
} from './header.module.scss';

const transitionClassnames = {
	enter,
	enterActive,
	exit,
	exitActive,
};

export function Header({ menuTransitionTimeout }) {
	const data = useStaticQuery(graphql`
		query HeaderQuery {
			header: file(
				sourceInstanceName: { eq: "header" }
				extension: { eq: "md" }
			) {
				childMarkdownRemark {
					frontmatter {
						menuItems {
							title
							url
						}
						socialItems {
							icon
							url
						}
					}
				}
			}
		}
	`);

	const { menuItems, socialItems } =
		data.header.childMarkdownRemark.frontmatter;

	const [isMenuOpen, setMenuOpen] = useState(false);
	const $menuRef = useRef(null);
	const { width } = useWindowSize();
	const { pathname } = useLocation();

	const isHomePage = pathname === '/';

	const handleToggleMenu = (shouldOpen = false) => {
		if (shouldOpen) {
			document.body.classList.add(CLASSNAMES.bodyOpenMenuState);
			setMenuOpen(true);
		} else {
			document.body.classList.remove(CLASSNAMES.bodyOpenMenuState);
			setMenuOpen(false);
		}
	};

	const handleTriggerClick = () => {
		document.body.classList.toggle(CLASSNAMES.bodyOpenMenuState);
		setMenuOpen((prev) => !prev);
	};

	useEffect(() => {
		if (width >= BREAKPOINTS.tabletMaxPoint) {
			handleToggleMenu(true);
		} else {
			handleToggleMenu();
		}
	}, [width]);

	return (
		<header className={classNames(header, 'js-header')}>
			<div className={container}>
				<div className={logoWrap}>
					<Link
						to="/"
						className={classNames(logo, {
							[unClickable]: isHomePage,
						})}
					>
						<Logo />
					</Link>
				</div>
				<CSSTransition
					nodeRef={$menuRef}
					in={isMenuOpen}
					unmountOnExit
					classNames={transitionClassnames}
					timeout={menuTransitionTimeout}
				>
					<div ref={$menuRef} className={body}>
						<Menu className={menu} menuItems={menuItems} />
						{socials && (
							<div className={socials}>
								<Socials list={socialItems} />
							</div>
						)}
					</div>
				</CSSTransition>
				<MenuTrigger handleClick={handleTriggerClick} />
			</div>
		</header>
	);
}

Header.propTypes = {
	menuTransitionTimeout: PropTypes.number,
};

Header.defaultProps = {
	menuTransitionTimeout: 300,
};

export default Header;
