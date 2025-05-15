import { Router } from 'express';
import { getAll, createCustomers, updateCustomers } from '../controllers/customers.controllers.js';

const router = Router();

/**
 * @swagger
 * /customers:
 *   get:
 *     summary: Returns a list of all customers
 *     tags: [Customers]
 *     responses:
 *       200:
 *         description: Customers retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 
 *       404:
 *         description: Customers not found
 */
router.get('/customers', getAll);   
router.post('/customers', createCustomers);  

//* Tanto para actualizar como para eliminar un cliente, ya que el borrado es lógico
router.put('/customers/:id', updateCustomers);
export default router;  