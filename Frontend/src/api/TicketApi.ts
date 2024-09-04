import {Ticket} from "./models/Ticket.ts";
import {apiUrl, getHttpRequest} from "./API.ts";

function createTicketModel(json: any): Ticket {
	return ({
		id: json.id,
		title: json.title,
		status: json.status,
		messages: json.messages,
	})
}

export async function getTickets(): Promise<Ticket[]> {
	const response = await getHttpRequest(`${apiUrl}/tickets`);
	return (await response.json()).map(createTicketModel)
}

export async function getTicket(): Promise<Ticket[]> {
	const response = await getHttpRequest(`${apiUrl}/tickets`);
	return (await response.json()).map(createTicketModel)
}
