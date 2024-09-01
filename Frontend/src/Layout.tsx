import {Link, Outlet} from "react-router-dom";
import "./style/Layout.css"
import React from "react";

export function Layout() {
	return (
		<React.Fragment>
			<div className="navigationPanel">
				<Link to="/" className="button">Home</Link>
				<Link to="/tickets" className="button">Tickets</Link>
			</div>
			<Outlet />
		</React.Fragment>
	)
}