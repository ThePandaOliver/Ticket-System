import {Ticket} from "./models/Ticket.ts";

const apiUrl = "http://localhost:8080/api"

export async function getTicket(id: string): Promise<Ticket> {
	const response = await fetch(`${apiUrl}/tickets/${id}`, {method: "GET"});
	if (!response.ok) {
		throw new Error(response.statusText);
	}

    const data = await response.json();
    return {
		id: data.id,
		description: data.description,
		title: data.title,
	};
}