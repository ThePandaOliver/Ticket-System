import SimpleMarkdown, {ReactRules, Rules} from "@khanacademy/simple-markdown";

export default function Markdown({children}: {children: string}) {
	const rules: ReactRules = {
		...SimpleMarkdown.defaultRules,
		paragraph: {
			...SimpleMarkdown.defaultRules.paragraph,
            react: (node: any, output: any, state: any) => <p key={state.key}>{output(node.content, state)}</p>,
        },
		newline: {
			match: (source, state, prevCapture) => ,
			react: (node: any, output: any, state: any) => <br key={state.key}/>,
		}
	}
	// @ts-ignore
	const parser = SimpleMarkdown.parserFor(rules)
	const output = SimpleMarkdown.outputFor(rules, "react")

	const blockSource = children + "\n\n"
	const parseTree = parser(blockSource, {inline: false})
	const outputResult = output(parseTree);
	return (
		<div>
			{
				outputResult
			}
		</div>
	)
}