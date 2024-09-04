import {Message, Ticket} from "./models/Ticket.ts";

export const apiUrl = "http://localhost:8080/api"

export class API {
	public static async getTicket(id: string): Promise<Ticket> {
		try {
			const response = await fetch(`${apiUrl}/tickets/${id}`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json"
				},
			});
			const data = await response.json();
			return this.createTicket(data);
		} catch (e) {
			return Promise.reject(e);
		}
	}

	public static async getTickets(): Promise<Ticket[]> {
		try {
			const response = await fetch(`${apiUrl}/tickets`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json"
				},
			});
			const data = await response.json();
			return data.map((ticketJson: any): Ticket => this.createTicket(ticketJson));
		} catch (e) {
			return Promise.reject(e);
		}
	}

	public static async postTicket(ticket: Ticket): Promise<Ticket> {
		try {
			const response = await fetch(`${apiUrl}/tickets`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(ticket),
			});

			const data = await response.json();
			return this.createTicket(data);
		} catch (e) {
			return Promise.reject(e);
		}
	}

	public static async postMessage(ticketId: String, message: Message): Promise<Message> {
		try {
			const response = await fetch(`${apiUrl}/tickets/${ticketId}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(message),
			});

			const data = await response.json();
			return this.createMessage(data);
		} catch (e) {
			return Promise.reject(e);
		}
	}

	private static createTicket(ticketJson: any): Ticket {
		return ({
			id: ticketJson.id,
			title: ticketJson.title,
			status: ticketJson.status,
			messages: ticketJson.messages.map((messageJson: any): Message => this.createMessage(messageJson))
		})
	}

	private static createMessage(messageJson: any): Message {
		return ({
			id: messageJson.id,
            content: messageJson.content,
			createdAt: messageJson.createdAt
		})
	}
}

export async function getHttpRequest(path: RequestInfo | URL, body?: {[key: string]: any}): Promise<Response> {
	return httpRequest(path, "GET", body);
}

export async function postHttpRequest(path: RequestInfo | URL, body?: {[key: string]: any}): Promise<Response> {
	return httpRequest(path, "POST", body);
}

export async function putHttpRequest(path: RequestInfo | URL, body?: {[key: string]: any}): Promise<Response> {
	return httpRequest(path, "PUT", body);
}

export async function delHttpRequest(path: RequestInfo | URL, body?: {[key: string]: any}): Promise<Response> {
	return httpRequest(path, "DELETE", body);
}

async function httpRequest(path: RequestInfo | URL, method: string, body?: any): Promise<Response> {
	const response = await fetch(path, {
		method: method,
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(body),
	});

	return response;
}