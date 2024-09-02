import {useEffect} from "react";
import {Main} from "../Main.tsx";

export function NoPage() {
	useEffect(() => {
		document.title = Main.makePageName("404");
	}, [])

	return (
		<div>
			<h1>404 Page Not Found</h1>
		</div>
	);
}