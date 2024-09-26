import {HTMLAttributes} from "react";

export default function Panel(attributes: HTMLAttributes<HTMLDivElement>) {
	return (
		<div {attributes...}></div>
	)
}