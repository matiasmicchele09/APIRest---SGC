//* para las multiples conexiones a la base de datos
//* Aca manejamos sequelize
//Sequelize es la libreria, sequelize es una instancia. Diferencia entre "s" y "S"
// import { Sequelize } from "sequelize";

// export const sequelize = new Sequelize('SGC', 'postgres', 'Bocajuniors12', {
//     host: 'localhost',
//     dialect: 'postgres'
// })
// src/database/db.js
import { Sequelize } from 'sequelize';
import { DB_URI, ENV } from '../config.js';

export const sequelize = new Sequelize(DB_URI, {
  dialect: 'postgres',
  logging: ENV === 'development' ? console.log : false,
  dialectOptions: ENV === 'production'
    ? { ssl: { rejectUnauthorized: false } }
    : {}
});

// Opcional: verificar conexión al arrancar
sequelize.authenticate()
  .then(() => console.log(`✅ Sequelize conectado [${ENV}]`))
  .catch(err => console.error('❌ Error Sequelize:', err));
