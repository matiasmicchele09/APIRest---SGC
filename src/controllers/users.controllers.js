import { Users } from "../models/users.js";

export const getUsers = async (req, res) => {
    try {
        //Genero un arreglo de usuarios y lo envío al cliente    
        const users = await Users.findAll();
        res.json(users)
        console.log(users)        
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const getUser = async (req, res) => {    
    const {id} = req.params;
    try {
        //const user = await Users.findByPk(id);
        //Ahora lo hacemos con findOne para ver como funciona, pero con findByPk estaba bien
        //la diferencia entre ambos es que findOne te permite buscar por otros campos, findByPk solo por la pk
        const user = await Users.findOne({
            where:{
                id_user: id 
            }
        })
        if (!user) return res.status(404).json({message: 'User does not exist'})
        res.json(user)        
    } catch (error) {
        return res.status(500).json({message: error.message})        
    }
}

export const createUsers = async (req, res) =>{
    const {email, password, id_rol } = req.body;
    
    try {
        const newUser = await Users.create({        
            email: email,
            password: password,
            id_rol: id_rol
        })
        res.send('Creando Usuarios')
        res.json(newUser);        
    } catch (error) {
        return res.status(500).json({message: error.message})        
    }    
}

export const updateUser = async(req, res) =>{
    const {id} = req.params;
    const {email, password, id_rol} = req.body;
    
    try {
        //Busco user
        const user = await Users.findByPk(id);
        
        //Actualizo datos
        user.email = email;
        user.password = password;
        user.id_rol = id_rol;
        
        //Guardo en la base de datos
        await user.save();
        
        res.json(user)
        
    } catch (error) {
        return res.status(500).json({message: error.message})                
    }
    
}

export const deleteUser = async(req, res) =>{
    const {id} = req.params;
    try {
        await Users.destroy({
            where:{
                id_user: id
            }
        })
        res.sendStatus(204);        
    } catch (error) {
        return res.status(500).json({message: error.message})                        
    }
}