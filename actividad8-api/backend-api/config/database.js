const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  'helpdesk_db',        // Nombre de la base (puedes crearla antes en pgAdmin)
  'postgres',           // Tu usuario de PostgreSQL
  '1718411398Lc',      // Tu contraseña de PostgreSQL
  {
    host: 'localhost',
    dialect: 'postgres',
    logging: false
  }
);

module.exports = sequelize;