const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const xss = require('xss-clean');
require('dotenv').config();

const ticketRoutes = require('./routes/ticketRoutes');

const app = express();

// Middlewares de Seguridad y configuración
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(xss()); // Aplica limpieza anti-XSS global

// Conexión a MongoDB Atlas
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✓ Conectado a MongoDB Atlas'))
  .catch((err) => console.error('Error de conexión:', err));

// Rutas
app.use('/api/tickets', ticketRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor en puerto ${PORT}`));