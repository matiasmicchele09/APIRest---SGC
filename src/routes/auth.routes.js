//Autentitificación del usuario
import { Router } from "express";
import { createUsers, login } from "../controllers/users.controllers.js";
import { validationToken } from "../middlewares/validationToken.js";
const router = Router();

router.post("/login", login);
router.post("/users", createUsers);
router.get("/validateSession", validationToken, (req, res) => {
  res.json(req.user); // ← respondés con el usuario autenticado
}); //Valida si la session esta activa desde el front, esto lo uso en el guard de angular
export default router;
