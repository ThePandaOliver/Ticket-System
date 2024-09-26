import Message from "./Message.ts";

export default interface Ticket {
	id?: number;
	title: string;
	status: TicketStatus;
	messages: Message[];
}

export enum TicketStatus {
	OPEN = "OPEN",
	CLOSED = "CLOSED",
}