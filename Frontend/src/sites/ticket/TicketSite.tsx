import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Message, Ticket} from "../../api/models/Ticket.ts";
import {Spinner} from "../../components/Spinner.tsx";
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

	const [errorMessage, setErrorMessage] = useState<string>("test");

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
				<Spinner/>
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
						ticket?.messages.map((message) => (createMessage(message)))
					}
				</div>
				<div id="replyContainer" className="panel">
					<TextArea id="replyInput" placeholder="Reply message..."
							  onInput={event => {
								  setReply(event.currentTarget.value)
							  }} value={reply} style={{width: "100%"}}/>
					<div style={{display: "flex", flexDirection: "row"}}>
						{
							errorMessage.length > 0 ??
							(<p style={{color: "red", marginTop: "4px", marginBottom: "4px"}}>ERROR: {errorMessage}</p>)
						}
						<button style={{width: "100px", marginLeft: "auto"}} onClick={onReplyClick}>Reply</button>
					</div>
				</div>
			</div>

			<div className="infoContainer panel">
				<p>Status: {ticket?.status}</p>
			</div>
		</div>
	);

	function onReplyClick() {
		if (reply.length <= 0)
			return Promise.reject("Reply is empty");

		setLoading(true);
		postMessage(ticketId || "0", ({content: reply}))
			.then(value => {
				setTicket(value);
				setReply("");
			})
			.catch(reason => setErrorMessage(reason || "Unknown error"))
			.finally(() => setLoading(false));
	}

	function createMessage(message: Message) {
		const date = new Date(message.createdAt || "0");
		return (
			<div key={message.id || "0"} className="panel"
				 style={{display: "flex", flexDirection: "column", padding: "0 20px"}}>
				<Markdown>
					{message.content}
				</Markdown>
				<p style={{marginLeft: "auto", marginTop: "auto"}}>{format(date, "PPpp")}</p>
			</div>
		)
	}
}