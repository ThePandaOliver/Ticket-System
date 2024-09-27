import {marked} from "marked";

export default function Markdown({chidlren}) {
	return (
		<div>
			{
				marked.parse(chidlren, {

				})
			}
		</div>
	)
}