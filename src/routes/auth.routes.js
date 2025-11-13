import { Router } from "express";
import {
  createUsers,
  login,
  logOut,
} from "../controllers/users.controllers.js";
const router = Router();

router.post("/login", login);
router.post("/logout", logOut);
router.post("/users", createUsers);
export default router;
