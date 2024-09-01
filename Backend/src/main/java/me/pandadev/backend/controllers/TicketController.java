package me.pandadev.backend.controllers;

import me.pandadev.backend.entities.Message;
import me.pandadev.backend.entities.Ticket;
import me.pandadev.backend.services.TicketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/tickets")
public class TicketController {
    @Autowired
    private TicketService ticketService;

    @GetMapping
    public List<Ticket> getAllTickets() {
        return ticketService.getAllTickets();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Ticket> getTicketById(@PathVariable Long id) {
        Ticket ticket = ticketService.getTicketById(id);
        return ticket != null ? ResponseEntity.ok(ticket) : ResponseEntity.notFound().build();
    }

    @PostMapping
    public Ticket createTicket(@RequestBody Ticket ticket) {
        return ticketService.createTicket(ticket);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Ticket> updateTicket(@PathVariable Long id, @RequestBody Ticket ticketDetails) {
		Ticket ticket = ticketService.updateTicket(id, ticketDetails);
        return ticket != null ? ResponseEntity.ok(ticket) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTicket(@PathVariable Long id) {
        ticketService.deleteTicket(id);
        return ResponseEntity.noContent().build();
    }

	@PostMapping("/{ticketId}/messages")
	public ResponseEntity<Message> addMessageToTicket(@PathVariable Long ticketId, @RequestBody Message message) {
		try {
			Message savedMessage = ticketService.addMessageToTicket(ticketId, message);
			return ResponseEntity.ok(savedMessage);
		} catch (IllegalArgumentException e) {
			return ResponseEntity.notFound().build();
		}
	}

	@GetMapping("/{ticketId}/messages")
	public ResponseEntity<List<Message>> getMessagesForTicket(@PathVariable Long ticketId) {
		try {
			List<Message> messages = ticketService.getMessagesForTicket(ticketId);
			return ResponseEntity.ok(messages);
		} catch (IllegalArgumentException e) {
			return ResponseEntity.notFound().build();
		}
	}
}