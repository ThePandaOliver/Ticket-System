import React, {useEffect, useState} from "react";
import {Link, useNavigate, useSearchParams} from "react-router-dom";
import {Ticket} from "../../api/models/Ticket.ts";
import {Buffers} from "../../components/Buffers.tsx";
import {Main} from "../../Main.tsx";
import "../../style/sites/TicketSelectionSite.less"
import {getTickets} from "../../api/TicketApi.ts";

export function TicketSelectionSite() {
	const [searchParams] = useSearchParams();
	const ticketStatus = searchParams.get("ticketStatus") || "all";

	const [loading, setLoading] = useState(true);
	const [tickets, setTickets] = React.useState<Ticket[]>([]);

	const navigation = useNavigate();

    useEffect(() => {
		setLoading(true);
		getTickets()
			.then(value => setTickets(value))
			.catch(() => navigation("/NoPage"))
			.finally(() => setLoading(false));
    }, [ticketStatus]);

	useEffect(() => {
		document.title = Main.makePageName("Tickets");
	}, [])

	return (
        <div className="page">
			<div className="panel" style={{width:"auto", padding:"5px", margin:"20px", gap:".5rem"}}>
				<Link to="?ticketStatus=all" className="button">All</Link>
				<Link to="?ticketStatus=open" className="button">Open</Link>
				<Link to="?ticketStatus=closed" className="button">Closed</Link>
			</div>
			{loading ? (
				<div style={{margin:"100px", display:"flex", justifyContent:"center"}}>
					<Buffers />
				</div>
				) :
				tickets.map((ticket: Ticket) => (createTicketEntry(ticket)))
			}
        </div>
    );
}

function createTicketEntry(ticket: Ticket) {
	return (
		<Link to={`/tickets/${ticket.id}`} key={ticket.id} className="panel" style={{width:"auto", height:"auto", padding:"5px", margin:"20px", gap:".5rem"}}>
			<div style={{padding:"5px 30px", width:"100%"}}>
                <div style={{display:"flex", width:"auto"}}>
					<h3>{ticket.title}</h3>
					<p style={{marginLeft:"auto"}}>ID: {ticket.id}</p>
				</div>
            </div >
		</Link>
	)
}