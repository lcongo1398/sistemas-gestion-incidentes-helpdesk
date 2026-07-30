const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('postgresql://postgres:1718411398Lc.wgaqonisyyvujhlqgo.supabase.co:5432/postgres', {
  dialect: 'postgres',
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
});

module.exports = sequelize;