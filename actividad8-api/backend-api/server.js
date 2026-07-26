const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const rutasTickets = require('./routes/tickets');

const app = express();
const PUERTO = 3000;

app.use(cors());
app.use(express.json());

// Conexión a la base
sequelize.authenticate()
  .then(() => console.log('✅ CONECTADO A POSTGRESQL'))
  .catch(err => console.log('❌ ERROR:', err));

// Crear tablas
sequelize.sync({ force: false })
  .then(() => console.log('📋 Tablas listas'));

// Conectar las rutas
app.use('/tickets', rutasTickets);

// Iniciar servidor
app.listen(PUERTO, () => {
  console.log(`🚀 Servidor en http://localhost:${PUERTO}`);
});