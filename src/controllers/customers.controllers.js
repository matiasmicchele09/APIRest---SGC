import { Customers } from "../models/customers.js";

export const getAll = async (req, res) => {    
    const id_user = parseInt(req.query.id_user)
    //console.log(req.query.id_user);
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
        
    const { name, email, phone, address, city, surname, activity, cuit, active, created_at,
        deactivated_at, id_user, id_tax_condition, id_province, tax_key } = req.body;
    try {
        const newCustomer = await Customers.create({
            active, 
            activity,
            address,
            city,
            created_at,
            cuit,
            deactivated_at,
            email,
            id_province,
            id_tax_condition,
            id_user,
            name,
            phone,
            surname,
            tax_key
        });
        res.json(newCustomer);
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const updateCustomers = async (req, res) => {
    const { id } = req.params;
    const { name, email, phone, address, city, surname, activity, cuit, active, created_at,
        deactivated_at, id_user, id_tax_condition, id_province, tax_key } = req.body;
    try {
        const customer = await Customers.findByPk(id);
        if (!customer) return res.status(404).json({message: 'Customer not found'})


        const allAttributes = Customers.getAttributes();
        const allowedFields = Object.keys(allAttributes);
        const updateData = {};
        for (const field of allowedFields) {
            if (field !== 'id' && req.body.hasOwnProperty(field)) {
                updateData[field] = req.body[field];
            }
        }
        await Customers.update(updateData, { where: { id } });
        res.json({message: 'Customer updated'});
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}