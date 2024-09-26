import "./TicketOverviewPage.less"
import {Link} from "react-router-dom";
import Ticket, {TicketStatus} from "../api/models/Ticket.ts";
import {useState} from "react";

export default function TicketOverviewPage() {
	const [tickets, setTickets] = useState<Ticket[]>([
		{
			id: 1,
			title: "Ticket Test 1",
			status: TicketStatus.OPEN,
			messages: []
		},
		{
			id: 1,
			title: "Ticket Test 2",
			status: TicketStatus.CLOSED,
			messages: []
		},
		{
			id: 1,
			title: "Ticket Test 3",
			status: TicketStatus.OPEN,
			messages: []
		}
	]);

	return (
		<div className="ticketListContainer">
			{
				tickets.map(value => (<TicketEntry ticket={value} />))
			}
		</div>
	)
}

function TicketEntry({ticket}: {ticket: Ticket}) {
	return (
		<Link to={`/tickets/${ticket.id}`} className="ticketEntry panel">
			<div style={{display: "flex", flexDirection: "row", gap: "5px"}}>
				<h3 style={{width: "100%"}}>{ticket.title}</h3>
				<p>{ticket.status}</p>
			</div>
		</Link>
	)
}