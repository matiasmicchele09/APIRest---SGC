// src/config/index.js
const path = require('path');
const dotenv = require('dotenv');

// 1) Determinar entorno (development por defecto)
const env = process.env.NODE_ENV || 'development';

// 2) Cargar .env correspondiente
dotenv.config({
  path: path.resolve(__dirname, `../.env.${env}`)
});

module.exports = {
  port: process.env.PORT,
  dbUri: process.env.DB_URI,
  jwtSecret: process.env.JWT_SECRET,
  nodeEnv: env
};
