//* este archivo, index, arranca nuestro proyecto
import express from 'express';
import { PORT } from './config.js';
const app = express();

app.listen(PORT)
console.log('Server on port', PORT);