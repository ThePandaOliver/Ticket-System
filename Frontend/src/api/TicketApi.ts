import {Message, Ticket} from "./models/Ticket.ts";
import {apiUrl, getHttpRequest, postHttpRequest} from "./API.ts";

function createTicketModel(json: any): Ticket {
	return ({
		id: json.id,
		title: json.title,
		status: json.status,
		messages: json.messages.map((messageJson: any): Message => createMessageModel(messageJson)),
	})
}

function createMessageModel(json: any): Message {
	return ({
		id: json.id,
		content: json.content,
		createdAt: json.createdAt,
	})
}

export async function getTickets(): Promise<Ticket[]> {
	const response = await getHttpRequest(`${apiUrl}/tickets`);
	return (await response.json()).map(createTicketModel)
}

export async function getTicket(ticketId: string): Promise<Ticket> {
	const response = await getHttpRequest(`${apiUrl}/tickets/${ticketId}`);
	return createTicketModel(await response.json());
}

export async function postMessage(ticketId: string, message: Message): Promise<Ticket> {
	const response = await postHttpRequest(`${apiUrl}/tickets/${ticketId}/messages`, message)
	return createTicketModel(await response.json());
}