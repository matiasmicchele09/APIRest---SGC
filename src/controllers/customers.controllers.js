import { Customers } from "../models/customers.js";

export const getAll = async (req, res) => {
    try {
        const customers = await Customers.findAll();
        res.json(customers)
        console.log(customers)        
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}   