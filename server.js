const express = require('express');
const cors = require('cors');
const path = require('path');
const sequelize = require('./config/database');
const rutasTickets = require('./routes/tickets');

const app = express();
const PUERTO = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Ruta correcta para cargar todo tu frontend/Interfaz
app.use(express.static(path.join(__dirname, './frontend/public')));

sequelize.authenticate()
.then(() => console.log('✅ CONECTADO A POSTGRESQL'))
.catch(err => console.log('❌ ERROR:', err));

sequelize.sync({ force: false })
.then(() => console.log('✅ Tablas listas'));

app.use('/tickets', rutasTickets);

app.listen(PUERTO, () => {
  console.log(`✅ Servidor corriendo en el puerto ${PUERTO}`);
});