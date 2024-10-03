import {useParams} from "react-router-dom";
import {useState} from "react";
import Message from "../../api/models/Message.ts";
import {format} from "date-fns";
import "./TicketPage.less"
import Ticket, {TicketStatus} from "../../api/models/Ticket.ts";
import Markdown from "../../components/markdown/Markdown.tsx";
import {Tab, TabList, TabPanel, Tabs} from "react-aria-components";
import Divider from "../../components/divider/Divider.tsx";

export default function TicketPage() {
	const {id} = useParams()
	const [ticket, setTicket] = useState<Ticket>({
		id: Number.parseInt(id ?? "-1"),
		status: TicketStatus.OPEN,
		title: "Test Ticket",
		messages: [
			{
				id: 1,
				content: "Hello there,\nI have an issue i would like help with.",
				createdAt: "0"
			},
			{
				id: 2,
				content: "Hello, whats your issue?",
				createdAt: "0"
			},
			{
				id: 3,
				content: "# Hello World\nThis is a **markdown** text rendered in *React*.\n\n - Item 1\n - Item 2\n - Item 3\n\n\`\`\`javascript\nconsole.log('Hello, world!');\n\`\`\`",
				createdAt: "0"
			}
		]
	})

	return (
		<div className="ticketPage">
			<div className="ticketHeader">
				<h2>{ticket.title}</h2>
				<Divider direction="horizontal" />
			</div>
			<div className="messageListContainer">
				{
					ticket.messages.map(value => (<MessageEntry key={value.id} message={value} />))
				}
			</div>
			<ReplyContainer />
		</div>
	)

	function MessageEntry({message}: {message: Message}) {
		return (
			<div className="panel messageEntry">
				<div style={{display: "flex"}}>
					<Markdown>{message.content}</Markdown>
				</div>
				<p style={{textAlign: "end", color: "grey"}}>{format(new Date(message.createdAt ?? "0"), "MM/dd/yyyy HH:mm aa")}</p>
			</div>
		)
	}

	function ReplyContainer() {
		const [replyMessage, setReplyMessage] = useState("")

		// Todo Make markdown preview support
		return (
			<div className="panel reply">
				<Tabs>
					<div className="replyActionBar">
						<TabList className="replyViewButtonContainer">
							<Tab id="write" className="replyViewButton">Write</Tab>
							<Tab id="preview" className="replyViewButton">Preview</Tab>
						</TabList>
					</div>
					<TabPanel id="write" className="replyInputContainer">
						<textarea className="replyInputField" placeholder={"Reply..."} rows={4}
								  onInput={event => setReplyMessage(event.currentTarget.value)} value={replyMessage}
								  inputMode="text"/>
					</TabPanel>
					<TabPanel id="preview" className="messageEntry">
						<Markdown>{replyMessage}</Markdown>
					</TabPanel>
				</Tabs>
			</div>
		)
	}
}