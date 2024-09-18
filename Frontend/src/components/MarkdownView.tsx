import "highlight.js/styles/github-dark.css";
import "../styles/components/Markdown.less";
import {marked, MarkedOptions} from "marked";
import hljs from "highlight.js";

// @ts-ignore
export function MarkdownView({children}) {
	const renderer = new marked.Renderer();
	renderer.code = ({text, lang}) => {
		const validLanguage = hljs.getLanguage(lang ?? "plaintext") ? (lang ?? "plaintext") : "plaintext";
		const highlighted = hljs.highlight(text, {
			language: validLanguage,
		}).value;
		return `<pre><code class="hljs ${validLanguage}">${highlighted}</code></pre>`
	}

	const options: MarkedOptions = {
		gfm: true,
		breaks: true,
		renderer: renderer,
	}

	return (
		<div dangerouslySetInnerHTML={{__html: marked(children || "", options)}} />
	)
}