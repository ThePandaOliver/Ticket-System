import {Message, Ticket} from "./models/Ticket.ts";

const apiUrl = "http://localhost:8080/api"

export class API {
	public static async getTicket(id: string): Promise<Ticket> {
		try {
			const response = await fetch(`${apiUrl}/tickets/${id}`, {method: "GET"});

			const data = await response.json();
			return this.createTicket(data);
		} catch (e) {
			return Promise.reject(e);
		}
	}

	public static async getTickets(): Promise<Ticket[]> {
		try {
			const response = await fetch(`${apiUrl}/tickets`, {method: "GET"});

			const data = await response.json();
			return data.map((ticketJson: any): Ticket => this.createTicket(ticketJson));
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