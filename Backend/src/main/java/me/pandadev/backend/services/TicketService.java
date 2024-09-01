package me.pandadev.backend.services;

import me.pandadev.backend.entities.Message;
import me.pandadev.backend.entities.Ticket;
import me.pandadev.backend.repositories.MessageRepository;
import me.pandadev.backend.repositories.TicketRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class TicketService {
	@Autowired
	private TicketRepository ticketRepository;
	@Autowired
	private MessageRepository messageRepository;

	public List<Ticket> getAllTickets() {
		return ticketRepository.findAll();
	}

	public Ticket getTicketById(Long ticketId) {
		return ticketRepository.findById(ticketId).orElse(null);
	}

	public Ticket createTicket(Ticket ticket) {
		return ticketRepository.save(ticket);
	}

	public Ticket updateTicket(Long ticketId, Ticket ticketDetails) {
		Ticket ticket = ticketRepository.findById(ticketId).orElse(null);
		if (ticket != null) {
			ticket.setTitle(ticketDetails.getTitle());
			return ticketRepository.save(ticket);
		}
		return null;
	}

	public void deleteTicket(Long id) {
		ticketRepository.deleteById(id);
	}

	public Message addMessageToTicket(Long ticketId, Message message) {
		Optional<Ticket> optionalTicket = ticketRepository.findById(ticketId);
		if (optionalTicket.isPresent()) {
			Ticket ticket = optionalTicket.get();
			message.setCreatedAt(LocalDateTime.now());
			message.setTicket(ticket);
			return messageRepository.save(message);
		} else {
			throw new IllegalArgumentException("Ticket not found");
		}
	}

	public List<Message> getMessagesForTicket(Long ticketId) {
		return ticketRepository.findById(ticketId)
				.map(Ticket::getMessages)
				.orElseThrow(() -> new IllegalArgumentException("Ticket not found"));
	}
}
