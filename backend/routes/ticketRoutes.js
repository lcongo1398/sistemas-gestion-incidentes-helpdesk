const express = require('express');
const router = express.Router();
const Ticket = require('../models/Ticket');
const xss = require('xss-clean'); // Protección anti-XSS

// Obtener todos los tickets
router.get('/', async (req, res) => {
  try {
    const tickets = await Ticket.find().sort({ fechaCreacion: -1 });
    res.json(tickets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Crear ticket (Desinfección de variables con xss-clean)
router.post('/', async (req, res) => {
  try {
    const nuevoTicket = new Ticket({
      titulo: req.body.titulo,
      descripcion: req.body.descripcion,
      prioridad: req.body.prioridad
    });
    const ticketGuardado = await nuevoTicket.save();
    res.status(201).json(ticketGuardado);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Actualizar estado
router.put('/:id', async (req, res) => {
  try {
    const ticketActualizado = await Ticket.findByIdAndUpdate(
      req.params.id,
      { estado: req.body.estado },
      { new: true }
    );
    res.json(ticketActualizado);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Eliminar ticket
router.delete('/:id', async (req, res) => {
  try {
    await Ticket.findByIdAndDelete(req.params.id);
    res.json({ mensaje: 'Ticket eliminado correctamente' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;