import { Router } from 'express'
import { getAll } from "../controllers/tax_condition.controllers.js";

const router = Router();

router.get('/tax-conditions', getAll);

export default router;