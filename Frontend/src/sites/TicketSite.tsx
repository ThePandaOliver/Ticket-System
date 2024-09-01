import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Ticket} from "../api/models/Ticket.ts";
import {getTicket} from "../api/API.ts";

export function TicketSite() {
	const { ticketId } = useParams();
	if (!ticketId) {
		throw new Error("No such ticket id is required");
	}
	const [loading, setLoading] = useState(true);
	const [ticket, setTicket] = useState<Ticket | undefined>(undefined);

	useEffect(() => {
		const fetchTicket = async () => {
			setLoading(true);
			setTicket(await getTicket(ticketId));
			setLoading(false);
		}
		fetchTicket()
	}, [ticketId])

	if (loading) {
		return <div>Loading...</div>;
	}

	return (
        <div>
            <h1>{ticket?.title}</h1>
			<p>{ticket?.description}</p>
        </div>
    );
}