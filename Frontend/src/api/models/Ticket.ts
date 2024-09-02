export interface Ticket {
	id: number;
	title: string;
	status: TicketStatus;
	messages: Message[];
}

export interface Message {
	id: number;
	content: string;
	createdAt: string;
}

export enum TicketStatus {
	OPEN = "OPEN",
	CLOSED = "CLOSED",
}