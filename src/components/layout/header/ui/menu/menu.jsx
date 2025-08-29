import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link } from 'gatsby';
import { nav, list, hoverState, item, link } from './menu.module.scss';

const mouseEvent = {
	enter: 'enter',
	leave: 'leave',
};

export function Menu({ menuItems, className = undefined }) {
	const [isHovered, setHovered] = useState(false);
	const menuLength = menuItems.length - 1;

	const handleMouse = (index, event) => {
		if (index < menuLength) {
			const hovered = event === mouseEvent.enter;
			setHovered(hovered);
		}
	};

	return (
		<nav className={classNames(nav, className)}>
			<ul className={classNames(list, { [hoverState]: isHovered })}>
				{menuItems?.map(({ title, url }, index) => (
					<li key={title} className={item}>
						<Link
							className={link}
							to={url}
							onMouseEnter={() => handleMouse(index, mouseEvent.enter)}
							onMouseLeave={() => handleMouse(index, mouseEvent.leave)}
						>
							<span>{title}</span>
						</Link>
					</li>
				))}
			</ul>
		</nav>
	);
}

Menu.propTypes = {
	className: PropTypes.string,
	menuItems: PropTypes.arrayOf(
		PropTypes.shape({
			title: PropTypes.string.isRequired,
			url: PropTypes.string.isRequired,
		}),
	).isRequired,
};

export default Menu;
