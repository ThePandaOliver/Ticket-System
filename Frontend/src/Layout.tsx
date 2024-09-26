import {NavLink, Outlet} from "react-router-dom";
import {Fragment} from "react";
import "./Layout.less"

export default function Layout() {
	return (
		<Fragment>
			<nav className="navContainer">
				<NavButton path="/" name="Dashboard" />
				<NavButton path="/ticket" name="Tickets" />
			</nav>
			<Outlet />
		</Fragment>
	)
}

function NavButton({path, name}: {path: string, name: string}) {
	return (
		<NavLink to={path} className="navButton">{name}</NavLink>
	)
}