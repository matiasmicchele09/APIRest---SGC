import { Sex } from "../models/sex.js";

export const getAll = async (req, res) => { 
    try {
        const sex = await Sex.findAll();
        res.json(sex)        
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}