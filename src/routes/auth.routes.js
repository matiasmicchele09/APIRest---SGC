//Autentitificación del usuario
import { Router } from "express";
import { login } from "../controllers/users.controllers.js";

const router = Router();

router.post('/login', login)

export default router

