export interface Ticket {
	id: number;
	title: string;
	status: "OPEN" | "CLOSED";
	messages: Message[];
}

export interface Message {
	id: number;
	content: string;
	createdAt: string;
}