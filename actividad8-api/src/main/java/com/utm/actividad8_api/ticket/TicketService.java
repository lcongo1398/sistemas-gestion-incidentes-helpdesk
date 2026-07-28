package com.utm.actividad8_api.ticket;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TicketService {
    private final TicketRepository repository;

    public TicketService(TicketRepository repository) {
        this.repository = repository;
    }

    public List<Ticket> listAll() {
        return repository.findAll();
    }

    public Ticket create(Ticket t) {
        return repository.save(t);
    }

    public Ticket update(Long id, Ticket t) {
        Ticket existing = repository.findById(id).orElseThrow(() -> new IllegalArgumentException("Ticket no encontrado"));
        existing.setTitulo(t.getTitulo());
        existing.setDescripcion(t.getDescripcion());
        existing.setCategoria(t.getCategoria());
        existing.setPrioridad(t.getPrioridad());
        existing.setEstado(t.getEstado());
        return repository.save(existing);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}
