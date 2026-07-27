const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const rutasTickets = require('./routes/tickets');

const app = express();
const PUERTO = 3000;

app.use(cors());
app.use(express.json());

sequelize.authenticate()
.then(() => console.log('✅ CONECTADO A POSTGRESQL'))
.catch(err => console.log('❌ ERROR:', err));

sequelize.sync({ force: false })
.then(() => console.log('✅ Tablas listas'));

app.use('/tickets', rutasTickets);

app.listen(PUERTO, () => {
  console.log(`🚀 Servidor en http://localhost:${PUERTO}`);
});