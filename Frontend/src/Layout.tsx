import {Link, Outlet} from "react-router-dom";
import "./style/Layout.css"

export function Layout() {
	return (
		<div>
			<div className="navigationPanel">
				<Link to="/" className="button">Home</Link>
				<Link to="/tickets" className="button">Tickets</Link>
			</div>
			<Outlet />
		</div>
	)
}