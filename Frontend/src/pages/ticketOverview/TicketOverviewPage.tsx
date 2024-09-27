import "./TicketOverviewPage.less"
import {Link} from "react-router-dom";
import Ticket, {TicketStatus} from "../../api/models/Ticket.ts";
import {useState} from "react";
import {MagnifyingGlassIcon} from "@heroicons/react/16/solid";

export default function TicketOverviewPage() {
	const [tickets, setTickets] = useState<Ticket[]>([
		{
			id: 1,
			title: "Ticket Test 1",
			status: TicketStatus.OPEN,
			messages: []
		},
		{
			id: 2,
			title: "Ticket Test 2",
			status: TicketStatus.CLOSED,
			messages: []
		},
		{
			id: 3,
			title: "Ticket Test 3",
			status: TicketStatus.OPEN,
			messages: []
		}
	]);
	const [search, setSearch] = useState("")

	return (
		<div className="ticketOverviewPage">
			<div className="panel actionBar">
				<input className="searchInput" placeholder="Search..."
					   value={search} onInput={event => setSearch(event.currentTarget.value)}/>
				<button onClick={runSearch} className="iconButton" style={{width: "22px", height: "22px"}}>
					<MagnifyingGlassIcon height={"100%"} width={"100%"}></MagnifyingGlassIcon>
				</button>
			</div>
			<div className="ticketListContainer">
				{
					tickets.map(value => (<TicketEntry ticket={value} key={value.id} />))
				}
			</div>
		</div>
	)

	function runSearch() {

	}
}

function TicketEntry({ticket}: {ticket: Ticket}) {
	return (
		<Link to={`/ticket/${ticket.id}`} className="ticketEntry panel">
			<div style={{display: "flex", flexDirection: "row", gap: "5px"}}>
				<h3 style={{width: "100%"}}>{ticket.title}</h3>
				<p>{ticket.status}</p>
			</div>
		</Link>
	)
}