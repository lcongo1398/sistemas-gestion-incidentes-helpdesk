const express = require('express');
const router = express.Router();
const Ticket = require('../models/Ticket.js');

// GET todos
router.get('/', async (req, res) => {
  try {
    const tickets = await Ticket.findAll({ order: [['createdAt', 'DESC']] });
    res.status(200).json(tickets);
  } catch (err) {
    res.status(500).json({ mensaje: 'Error', error: err });
  }
});

// GET uno
router.get('/:id', async (req, res) => {
  try {
    const ticket = await Ticket.findByPk(req.params.id);
    if(!ticket) return res.status(404).json({ mensaje: 'No encontrado' });
    res.status(200).json(ticket);
  } catch (err) {
    res.status(500).json({ mensaje: 'Error', error: err });
  }
});

// POST crear
router.post('/', async (req, res) => {
  try {
    const nuevo = await Ticket.create(req.body);
    res.status(201).json({ mensaje: 'Creado', ticket: nuevo });
  } catch (err) {
    res.status(400).json({ mensaje: 'Error', error: err.message });
  }
});

// PUT actualizar
router.put('/:id', async (req, res) => {
  try {
    const [actualizado] = await Ticket.update(req.body, { where: { id: req.params.id } });
    if(actualizado === 0) return res.status(404).json({ mensaje: 'No encontrado' });
    res.status(200).json({ mensaje: 'Actualizado' });
  } catch (err) {
    res.status(400).json({ mensaje: 'Error', error: err.message });
  }
});

// DELETE
router.delete('/:id', async (req, res) => {
  try {
    const eliminado = await Ticket.destroy({ where: { id: req.params.id } });
    if(eliminado === 0) return res.status(404).json({ mensaje: 'No encontrado' });
    res.status(200).json({ mensaje: 'Eliminado' });
  } catch (err) {
    res.status(500).json({ mensaje: 'Error', error: err });
  }
});

module.exports = router;