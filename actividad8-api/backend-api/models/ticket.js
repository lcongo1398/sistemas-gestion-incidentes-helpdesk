const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Ticket = sequelize.define('Ticket', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  titulo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  categoria: {
    type: DataTypes.ENUM('Red', 'Hardware', 'Software'),
    allowNull: false
  },
  prioridad: {
    type: DataTypes.ENUM('Alta', 'Media', 'Baja'),
    allowNull: false
  },
  estado: {
    type: DataTypes.ENUM('Abierto', 'En Progreso', 'Cerrado'),
    defaultValue: 'Abierto'
  }
}, {
  tableName: 'tickets',
  timestamps: true
});

module.exports = Ticket;