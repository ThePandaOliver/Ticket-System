import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Message, Ticket} from "../../api/models/Ticket.ts";
import {API} from "../../api/API.ts";
import {Spinner} from "../../components/Spinner.tsx";
import {format} from "date-fns";
import "../../style/sites/TicketSite.css"

export function TicketSite() {
	const { ticketId } = useParams();
	if (!ticketId) {
		throw new Error("No such ticket id is required");
	}
	const [loading, setLoading] = useState(true);
	const [ticket, setTicket] = useState<Ticket>();

	const navigation = useNavigate();

	useEffect(() => {
		setLoading(true);
		API.getTicket(ticketId)
			.then(value => setTicket(value))
			.catch(() => navigation("/NoPage"))
			.finally(() => setLoading(false));
	}, [ticketId])

	if (loading) {
		return (
			<div style={{margin:"100px", display:"flex", justifyContent:"center"}}>
				<Spinner />
			</div>
		);
	}

	return (
        <div className="page">
			<div className="panel" style={{padding:"0 20px"}}>
				<h2>{ticket?.title}</h2>
			</div>
			<div id="messageContainer">
				{
					ticket?.messages.map((message) => (createMessage(message)))
				}
			</div>
			<div id="replyContainer">
				<input id="replyInput" type="text" placeholder="Reply message..." />
				<button>Reply</button>
			</div>
        </div>
    );
}

function createMessage(message: Message) {
	const date = new Date(message.createdAt);
	return (
		<div className="panel" style={{padding:"0 20px", height:"100px"}}>
			<p>{message.content}</p>
			<p style={{marginLeft:"auto", marginTop:"auto"}}>{format(date, "PPpp")}</p>
		</div>
	)
}