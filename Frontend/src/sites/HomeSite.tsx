import {useEffect} from "react";
import {Main} from "../Main.tsx";

export function HomeSite() {
	useEffect(() => {
		document.title = Main.makePageName("Home");
	}, [])

	return (
        <div>
        </div>
    );
}