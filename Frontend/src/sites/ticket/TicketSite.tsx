import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Message, Ticket} from "../../api/models/Ticket.ts";
import {Buffers} from "../../components/Buffers.tsx";
import {format} from "date-fns";
import "../../style/sites/TicketSite.less"
import {Main} from "../../Main.tsx";
import {TextArea} from "../../components/TextArea.tsx";
import {Markdown} from "../../components/Markdown.tsx";
import {getTicket, postMessage} from "../../api/TicketApi.ts";

export function TicketSite() {
	const {ticketId} = useParams();
	if (!ticketId) {
		throw new Error("No such ticket id is required");
	}
	const [loading, setLoading] = useState(true);
	const [ticket, setTicket] = useState<Ticket>();
	const [reply, setReply] = useState<string>("");

	const [replyErrorMessage, setReplyErrorMessage] = useState<string>("");

	const navigation = useNavigate();

	useEffect(() => {
		setLoading(true);
		getTicket(ticketId)
			.then(value => setTicket(value))
			.catch(() => navigation("/NoPage"))
			.finally(() => setLoading(false));
	}, [ticketId])

	useEffect(() => {
		document.title = Main.makePageName("Ticket");
	}, [])

	if (loading) {
		return (
			<div style={{margin: "100px", display: "flex", justifyContent: "center"}}>
				<Buffers/>
			</div>
		);
	}

	return (
		<div id="page">
			<div style={{width: '30%'}}/>
			<div style={{width: "100%", display: "grid", gap: "30px"}}>
				<div className="panel" style={{padding: "0 20px"}}>
					<h2>{ticket?.title}</h2>
				</div>
				<div id="messageContainer">
					{
						ticket?.messages.map((message) => (createMessageEntry(message)))
					}
				</div>
				<div id="replyContainer" className="panel">
					<TextArea id="replyInput" placeholder="Reply message..."
							  onInput={event => {
								  setReply(event.currentTarget.value)
							  }} value={reply} style={{width: "100%"}}/>
					<div style={{display: "flex", flexDirection: "row"}}>
						{
							replyErrorMessage.length > 0 ?? (<p style={{color: "red", marginTop: "4px", marginBottom: "4px"}}>ERROR: {replyErrorMessage}</p>)
						}
						<button style={{width: "100px", marginLeft: "auto"}} onClick={sendReply}>Reply</button>
					</div>
				</div>
			</div>

			<div className="infoContainer panel">
				<p>Status: {ticket?.status}</p>
			</div>
		</div>
	);

	// Actions

	function sendReply() {
		if (reply.length <= 0)
			return Promise.reject("Reply is empty");

		postMessage(ticketId || "0", ({content: reply}))
			.then(value => {
				setTicket(value);
				setReply("");
			})
			.catch(reason => setReplyErrorMessage(reason || "Unknown error"));
	}

	// Components

	function createMessageEntry(message: Message) {
		const date = new Date(message.createdAt || "0");
		return (
			<div key={message.id || "0"} className="panel" style={{display: "flex", flexDirection: "column", padding: "0 20px"}}>
				<div style={{display: "flex", flexDirection: "row"}}>
					<Markdown>
						{message.content}
					</Markdown>
					<MoreActions />
				</div>
				<p style={{marginLeft: "auto", marginTop: "auto"}}>{format(date, "PPpp")}</p>
			</div>
		)

		function MoreActions() {
			return (<div />)
		}
	}
}