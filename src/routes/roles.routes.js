import { Router } from 'express';
import { createRol } from '../controllers/roles.controllers.js'
const router = Router();

router.post('/roles', createRol);
export default router;