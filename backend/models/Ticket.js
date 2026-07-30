const mongoose = require('mongoose');

const TicketSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  descripcion: { type: String, required: true },
  prioridad: { type: String, enum: ['Baja', 'Media', 'Alta'], default: 'Media' },
  estado: { type: String, enum: ['Abierto', 'En Proceso', 'Cerrado'], default: 'Abierto' },
  fechaCreacion: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Ticket', TicketSchema);