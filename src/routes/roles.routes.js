import { Router } from 'express';
import { createRol, getRoles, getRol, updateRol, deleteRol } from '../controllers/roles.controllers.js'
const router = Router();

router.post('/roles', createRol);
router.get('/roles', getRoles)
router.get('/roles/:id', getRol);
router.put('/roles/:id', updateRol);
router.delete('/roles/:id', deleteRol);
export default router;