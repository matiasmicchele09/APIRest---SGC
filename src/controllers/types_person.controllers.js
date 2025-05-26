import { Types_person } from "../models/types_person.js";

export const getAll = async (req, res) => { 
    try {
        const types = await Types_person.findAll();
        res.json(types)        
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}