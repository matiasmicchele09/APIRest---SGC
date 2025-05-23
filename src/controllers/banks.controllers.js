import { Banks } from "../models/banks.js";

export const getAll = async (req, res) => { 
    try {
        const banks = await Banks.findAll();
        res.json(banks)        
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}