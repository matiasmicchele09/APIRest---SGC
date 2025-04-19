import { Router } from 'express';
import { getAll, createCustomers } from '../controllers/customers.controllers.js';

const router = Router();

router.get('/customers', getAll);   
router.post('/customers', createCustomers);   
export default router;  