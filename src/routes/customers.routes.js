import { Router } from 'express';
import { getAll } from '../controllers/customers.controllers.js';

const router = Router();

router.get('/customers', getAll);   
export default router;  