import {Fragment} from "react";
import "../styles/components/Menu.less"

export interface MenuAttributes {
	isOpen: boolean
}

export function Menu({isOpen}: MenuAttributes) {
	if (!isOpen) {
		return (<Fragment />)
	}
	return (
		<div style={{width: "100%", display: "flex", justifyContent: "center"}}>
			<div className="panel menu">
				<button className={"menuButton"}>Delete</button>
			</div>
		</div>
	)
}