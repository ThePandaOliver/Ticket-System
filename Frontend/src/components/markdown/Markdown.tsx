import {marked} from "marked";

export default function Markdown({children}: {children: string}) {
	marked.setOptions({
		gfm: true,
		breaks: true,
	})

	return (
		<div dangerouslySetInnerHTML={{__html: marked.parse(children)}}></div>
	)
}