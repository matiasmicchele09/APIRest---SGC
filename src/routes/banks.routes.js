import { Router } from "express";   
import { getAll } from "../controllers/banks.controllers.js";

const router = Router();
router.get('/banks', getAll); // ← endpoint para obtener todos los bancos
export default router; // ← exportamos el router para usarlo en el index.js