import { Tax_Condition } from "../models/tax_condition.js";

export const getAll = async(req,res) =>{
    try{
        const tax_conditions = await Tax_Condition.findAll();
        res.json(tax_conditions)
    }
    catch(error){
        return res.status(500).json({message: error.message})
    }
}

