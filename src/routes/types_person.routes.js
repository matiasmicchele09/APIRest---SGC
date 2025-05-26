import { Router } from "express";   
import { getAll } from "../controllers/types_person.controllers.js"; // ← importamos el controlador que contiene la lógica de negocio

const router = Router();
router.get('/types_person', getAll); // ← endpoint para obtener todos los bancos
export default router; // ← exportamos el router para usarlo en el index.js