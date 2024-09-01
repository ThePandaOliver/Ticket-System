import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Message, Ticket} from "../../api/models/Ticket.ts";
import {API} from "../../api/API.ts";
import {Spinner} from "../../components/Spinner.tsx";
import {format} from "date-fns";

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
        <div>
			<div className="panel" style={{margin:"30px", padding:"0 20px", display:"flex"}}>
				<h2>{ticket?.title}</h2>
			</div>
			{
				ticket?.messages.map((message) => (createMessage(message)))
			}
        </div>
    );
}

function createMessage(message: Message) {
	const date = new Date(message.createdAt);
	return (
		<div className="panel" style={{margin:"20px 30px", padding:"0 20px", display:"flex"}}>
			<p>{message.content}</p>
			<p style={{marginLeft:"auto", marginTop:"auto"}}>{format(date, "PPpp")}</p>
		</div>
	)
}