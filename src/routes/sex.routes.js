import { Router } from 'express';
import { getAll } from '../controllers/sex.controllers.js'; // Importamos el controlador que contiene la lógica de negocio

const router = Router();
router.get('/sex', getAll); // Endpoint para obtener todos los sexos
export default router; // Exportamos el router para usarlo en el index.js