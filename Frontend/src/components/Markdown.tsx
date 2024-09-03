import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import "../style/components/MarkdownCodeHighlight.less";

// @ts-ignore
export function Markdown({children}) {
	return (
		<div style={{whiteSpace: "pre-wrap"}}>
			<ReactMarkdown rehypePlugins={[rehypeHighlight]}>
				{children}
			</ReactMarkdown>
		</div>
	)
}