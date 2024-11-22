import { Users } from "../models/users.js";

export const getUsers = (req, res) =>{
    res.send('Obteniendo usuarios')
}

export const createUsers = async (req, res) =>{
    const {email, password, id_rol } = req.body;

    const newUser = await Users.create({        
        email: email,
        password: password,
        id_rol: id_rol
    })
    res.send('Creando Usuarios')
    console.log(newUser);
}