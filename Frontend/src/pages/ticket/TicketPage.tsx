import {useParams} from "react-router-dom";
import {useState} from "react";
import Message from "../../api/models/Message.ts";
import {format} from "date-fns";
import "./TicketPage.less"
import Ticket, {TicketStatus} from "../../api/models/Ticket.ts";

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
				content: "# I dont know if my Markdown is working, \n## could you tell me if it is.",
				createdAt: "0"
			}
		]
	})

	return (
		<div className="ticketPage">
			<div className="panel ticketHeader">
				<h2>{ticket.title}</h2>
			</div>
			<div className="messageListContainer">
				{
					ticket.messages.map(value => (<MessageEntry key={value.id} message={value} />))
				}
			</div>
			<div className="panel replyBar">
				<span contentEditable={true} className="replyInput" data-placeholder={"Reply..."} />
			</div>
		</div>
	)

	function MessageEntry({message}: {message: Message}) {
		return (
			<div className="panel messageEntry">
				<div style={{display: "flex"}}>
					<p style={{width: "100%"}}>{message.content}</p>
					<p style={{color: "grey"}}>{message.id}</p>
				</div>
				<p style={{textAlign: "end", color: "grey"}}>{format(new Date(message.createdAt ?? "0"), "MM/dd/yyyy HH:mm aa")}</p>
			</div>
		)
	}
}