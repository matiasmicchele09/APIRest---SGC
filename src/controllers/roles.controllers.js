import { Roles } from "../models/roles.js";

export const createRol = async (req, res) =>{
    const { descripcion } = req.body;

    const newRol = await Roles.create({        
        descripcion: descripcion,        
    })

    res.send('Creando Roles')
    console.log(newRol);
}

export const getRoles = async (req, res) => {
    try {
        //Genero un arreglo de usuarios y lo envío al cliente    
        const roles = await Roles.findAll();
        res.json(roles)
        console.log(roles)        
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const getRol = async (req, res) => {    
    const { id } = req.params;
    try {        
        const rol = await Roles.findOne({
            where:{
                id_rol: id 
            }
        })
        if (!rol) return res.status(404).json({message: 'Rol does not exist'})
        res.json(rol)        
    } catch (error) {
        return res.status(500).json({message: error.message})        
    }
}

export const updateRol = async(req, res) =>{
    const { id } = req.params;
    const { descripcion } = req.body;
    
    try {
        //Busco rol
        const rol = await Roles.findByPk(id);
        
        //Actualizo datos
        rol.descripcion = descripcion;
        
        //Guardo en la base de datos
        await rol.save();
        
        res.json(rol)
        
    } catch (error) {
        return res.status(500).json({message: error.message})                
    }
    
}

export const deleteRol = async(req, res) =>{
    const { id } = req.params;
    try {
        await Roles.destroy({
            where:{
                id_rol: id
            }
        })
        res.sendStatus(204);        
    } catch (error) {
        return res.status(500).json({message: error.message})                        
    }
}
