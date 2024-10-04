import {NavLink, Outlet} from "react-router-dom";
import {Fragment} from "react";
import "./Layout.less"
import {Button, Divider} from "@mui/material";

export default function Layout() {
	return (
		<Fragment>
			<nav className="navContainer">
				<Button className="navButton" to="/" component={NavLink}>Dashboard</Button>
				<Button className="navButton" to="/ticket" component={NavLink}>Tickets</Button>
			</nav>
			<Divider />
			<Outlet />
		</Fragment>
	)
}