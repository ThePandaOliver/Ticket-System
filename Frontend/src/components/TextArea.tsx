import {TextareaHTMLAttributes} from "react";

export function TextArea(attributes: TextareaHTMLAttributes<any>) {
	return (
		<textarea rows={4} {...attributes}></textarea>
	)
}