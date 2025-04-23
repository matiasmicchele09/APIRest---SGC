import { Router } from 'express';
import { getAll, createCustomers, updateCustomers } from '../controllers/customers.controllers.js';

const router = Router();

router.get('/customers', getAll);   
router.post('/customers', createCustomers);  

//* Tanto para actualizar como para eliminar un cliente, ya que el borrado es lógico
router.put('/customers/:id', updateCustomers);
export default router;  