import {NavLink, Outlet} from "react-router-dom";
import "./styles/Layout.less"
import React from "react";

export function Layout() {
	return (
		<React.Fragment>
			<nav className="navigationPanel">
				<NavLink to="/" className="button navigationButton">Home</NavLink>
				<NavLink to="/tickets" className="button navigationButton">Tickets</NavLink>
			</nav>
			<Outlet />
		</React.Fragment>
	)
}