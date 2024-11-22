import { Roles } from "../models/roles.js";

export const createRol = async (req, res) =>{
    const { descripcion } = req.body;

    const newRol = await Roles.create({        
        descripcion: descripcion,        
    })

    res.send('Creando Roles')
    console.log(newRol);
}