import { Customers } from "../models/customers.js";

export const getAll = async (req, res) => {    
    const id_user = parseInt(req.query.id_user)
    console.log(req.query.id_user);
    try {
        const customers = await Customers.findAll({
            where:{
                id_user: id_user
            }});
        res.json(customers)        
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}   

export const createCustomers = async (req, res) => {
    const { name, email, phone, address, city, surname, activity, cuit } = req.body;
    try {
        const newCustomer = await Customers.create({
            name,
            email,
            phone,
            address,
            city,
            surname,
            activity,
            cuit
        });
        res.json(newCustomer);
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}