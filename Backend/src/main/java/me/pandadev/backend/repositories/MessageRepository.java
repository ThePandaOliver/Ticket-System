package me.pandadev.backend.repositories;

import me.pandadev.backend.entities.Message;
import me.pandadev.backend.entities.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MessageRepository extends JpaRepository<Message, Long> {
}
