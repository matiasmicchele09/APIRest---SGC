import { Provinces } from '../models/provinces.js';

export const getAll = async (req, res) => {   
    try {
        const provinces = await Provinces.findAll();
        res.json(provinces)        
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}