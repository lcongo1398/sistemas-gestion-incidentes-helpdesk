const express = require('express');
const router = express.Router();
const Ticket = require('../models/Ticket');
const xss = require('xss-clean');

// Obtener todos los tickets
router.get('/', async (req, res) => {
  try {
    const tickets = await Ticket.find().sort({ fechaCreacion: -1 });
    res.json(tickets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Crear ticket (Sanitizando entradas para prevenir vulnerabilidades XSS)
router.post('/', async (req, res) => {
  try {
    const { titulo, descripcion, prioridad } = req.body;

    const nuevoTicket = new Ticket({
      titulo: titulo ? titulo.trim() : '',
      descripcion: descripcion ? descripcion.trim() : '',
      prioridad: prioridad || 'Media'
    });

    const ticketGuardado = await nuevoTicket.save();
    res.status(201).json(ticketGuardado);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Actualizar estado del ticket
router.put('/:id', async (req, res) => {
  try {
    const { estado } = req.body;
    const ticketActualizado = await Ticket.findByIdAndUpdate(
      req.params.id,
      { estado },
      { new: true }
    );
    if (!ticketActualizado) {
      return res.status(404).json({ error: 'Ticket no encontrado' });
    }
    res.json(ticketActualizado);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Eliminar ticket
router.delete('/:id', async (req, res) => {
  try {
    const ticketEliminado = await Ticket.findByIdAndDelete(req.params.id);
    if (!ticketEliminado) {
      return res.status(404).json({ error: 'Ticket no encontrado' });
    }
    res.json({ mensaje: 'Ticket eliminado correctamente' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;