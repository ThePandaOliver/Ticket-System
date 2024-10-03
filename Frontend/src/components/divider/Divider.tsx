import {HTMLAttributes} from "react";
import "./Divider.less"

export interface DividerProps extends HTMLAttributes<HTMLDivElement> {
	direction?: "horizontal" | "vertical";
}

export default function Divider(props: DividerProps) {
	return (
		<div {...props}
			 className={`divider ${props.direction == undefined || props.direction == "horizontal" ? "dividerHorizontal" : "dividerVertical"}`}
		></div>
	)
}