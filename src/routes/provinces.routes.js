import { Router } from "express";
import { getAll } from "../controllers/provinces.controllers.js";   

const router = Router();
router.get('/provinces', getAll); 
export default router;