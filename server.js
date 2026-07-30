// server.js - Servidor completo para Help Desk
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Sequelize } = require('sequelize');

// Importar rutas
const ticketRoutes = require('./routes/Tickets.js');
const Ticket = require('./models/Ticket.js');
const app = express();

// Configuración
app.use(cors());
app.use(express.json());

// Conexión a PostgreSQL
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
  logging: false
});

// Probar conexión
sequelize.authenticate()
  .then(() => console.log('✅ CONECTADO A LA BASE DE DATOS'))
  .catch(err => console.error('❌ Error de conexión:', err));

// Rutas
app.use('/api/tickets', ticketRoutes);

// Puerto configurado para Render
const PUERTO = process.env.PORT || 3000;

app.listen(PUERTO, '0.0.0.0', () => {
  console.log(`🚀 SERVIDOR CORRIENDO EN EL PUERTO ${PUERTO}`);
});

module.exports = app;