package me.pandadev.backend.services;

import me.pandadev.backend.entities.Ticket;
import me.pandadev.backend.repositories.TicketRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TicketService {
	@Autowired
	private TicketRepository ticketRepository;

	public List<Ticket> getAllTickets() {
		return ticketRepository.findAll();
	}

	public Ticket getTicketById(Long id) {
		return ticketRepository.findById(id).orElse(null);
	}

	public Ticket createTicket(Ticket ticket) {
		return ticketRepository.save(ticket);
	}

	public Ticket updateTicket(Long id, Ticket ticketDetails) {
		Ticket ticket = ticketRepository.findById(id).orElse(null);
		if (ticket != null) {
			ticket.setTitle(ticketDetails.getTitle());
			ticket.setDescription(ticketDetails.getDescription());
			return ticketRepository.save(ticket);
		}
		return null;
	}

	public void deleteTicket(Long id) {
		ticketRepository.deleteById(id);
	}
}
