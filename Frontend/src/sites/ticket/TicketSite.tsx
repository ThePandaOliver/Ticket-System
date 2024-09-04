import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Message, Ticket} from "../../api/models/Ticket.ts";
import {API} from "../../api/API.ts";
import {Spinner} from "../../components/Spinner.tsx";
import {format} from "date-fns";
import "../../style/sites/TicketSite.less"
import {Main} from "../../Main.tsx";
import {TextArea} from "../../components/TextArea.tsx";
import {Markdown} from "../../components/Markdown.tsx";

export function TicketSite() {
	const {ticketId} = useParams();
	if (!ticketId) {
		throw new Error("No such ticket id is required");
	}
	const [loading, setLoading] = useState(true);
	const [ticket, setTicket] = useState<Ticket>();
	const [message, setMessage] = useState<String>("");

	const navigation = useNavigate();

	useEffect(() => {
		setLoading(true);
		API.getTicket(ticketId)
			.then(value => setTicket(value))
			.catch(() => navigation("/NoPage"))
			.finally(() => setLoading(false));
	}, [ticketId])

	useEffect(() => {
		document.title = Main.makePageName("Ticket");
	}, [])

	if (loading) {
		return (
			<div style={{margin:"100px", display:"flex", justifyContent:"center"}}>
				<Spinner />
			</div>
		);
	}

	return (
        <div id="page">
			<div style={{width:'30%'}} />
			<div style={{width:"100%", display:"grid", gap:"30px"}}>
				<div className="panel" style={{padding:"0 20px"}}>
					<h2>{ticket?.title}</h2>
				</div>
				<div id="messageContainer">
					{
						ticket?.messages.map((message) => (createMessage(message)))
					}
				</div>
				<div id="replyContainer">
					<TextArea id="replyInput" placeholder="Reply message..."
							  onInput={event => setMessage(event.currentTarget.value)} style={{width:"100%"}} />
					<button style={{width:"100px", marginLeft:"auto"}} onClick={() => sendMessage(message)}>Reply</button>
				</div>
			</div>

			<div className="infoContainer panel">
				<p>Status: {ticket?.status}</p>
			</div>
        </div>
    );
}

function createMessage(message: Message) {
	const date = new Date(message.createdAt);
	return (
		<div key={message.id} className="panel" style={{display:"flex", flexDirection:"column", padding:"0 20px"}}>
			<Markdown>
				{message.content}
			</Markdown>
			<p style={{marginLeft:"auto", marginTop:"auto"}}>{format(date, "PPpp")}</p>
		</div>
	)
}

function sendMessage(messageText: String) {

}