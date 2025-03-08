import { Users } from "../models/users.js";
import { SALT_ROUNDS, SECRET_JWT_KEY } from "../config.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


export const createUsers = async (req, res) =>{
    const {email, password, id_rol } = req.body;   
    
    const user = await Users.findOne({
        where:{
            email: email,
            // password: pass
        }})

    if (user) return res.status(409).json({message: 'User already exists'})
    
    //const hashPassword = bcrypt.hashSync(password, SALT_ROUNDS); // el hashSync -> bloquea el código hasta que termine de hashear la contraseña
    //porque bloquea el thread principal, por eso se usa el hash, que es asincrónico y que por lo tanto, funciona con una promesa
    const hashPassword = await bcrypt.hash(password, SALT_ROUNDS);
    try {
        const newUser = await Users.create({        
            email: email,
            password: hashPassword,
            id_rol: id_rol
        });    
        res.json(newUser);        
    } catch (error) {
        return res.status(500).json({message: error.message})        
    }    
}

export const login = async(req, res) =>{
    const {email, pass} = req.body;
    console.log(req.body)
    console.log(email, pass)

    try {
        const user = await Users.findOne({
            where:{
                email: email,
                // password: pass. busco solo por email, ya que validé que el email sea único
            }
        })        
        const isValid = await bcrypt.compare(pass, user.password);
        //No desencripta la pass del user, sino que encrypta la pass que le pasamos y la compara con la pass encriptada que tiene el user
        if (!user) return res.status(404).json({message: 'Usuario no existe'})
        if (!isValid) return res.status(401).json({message: 'Usuario y/o contraseña incorrectos'})

        //En la firma (sign) del token, guardo la información que quiero que tenga el token
        //El SECRECT_KEY lo guardo en un archivo .env, para que no se vea en el código
        const token = jwt.sign({
            id: user.id_user,
            email: user.email,
            id_rol: user.id_rol,
            apellido: user.apellido,
            nombre: user.nombre
        }, SECRET_JWT_KEY, {expiresIn: '1h'});

        const {password, ...userData} = user.dataValues;
        res.cookie('access_token', token, {
            httpOnly: true, //Solo se puede acceder al token desde el servidor, no vas a poder acceder al token desde el cliente o desde javascript
            secure: process.env.NODE_ENV === 'production' ? true : false, //Solo se puede acceder al token si la conexión es segura (https)
            sameSite: 'strict', //Solo se puede acceder al token si la petición es del mismo sitio (mismo dominio)
            maxAge: 1000 * 60 * 60 //la cookie solo tiene validez por una hora
        })
        res.json(userData); //Esto es para que no devuelva la pass en el json, tambien podría sacar el id y el rol, pero por ahora saco solo la pass        
        

    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const getUser = async (req, res) => {    
    
    const { user }= req.session; //tomamos el user al quue le pusimos la info en el middleware de app.js, req.session.user = data;
    // const token = req.cookies.access_token; 
    // if (!token) return res.status(401).json({message: 'Unauthorized'})  
    if (!user) return res.status(401).json({message: 'Unauthorized'})          
    
    try {
        //const user = await Users.findByPk(id);
        //Ahora lo hacemos con findOne para ver como funciona, pero con findByPk estaba bien
        //la diferencia entre ambos es que findOne te permite buscar por otros campos, findByPk solo por la pk

        // const data = jwt.verify(token, SECRET_JWT_KEY);         
        const userFound = await Users.findOne({
            where:{
                id_user: user.id 
            }
        })
        if (!userFound) return res.status(404).json({message: 'User does not exist'})
        const {password, ...userData} = userFound.dataValues;    
        res.json(userData)        
    } catch (error) {
        //return res.status(500).json({message: error.message})        
        if (!user) return res.status(500).json({message: 'Internal server error'})  
    }
}

export const logOut = async(req, res) =>{
    res.clearCookie('access_token');
    res.json({message: 'Logged out'})
}

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

export const getUserByRol = async(req, res) =>{
    const {id} = req.params;
    try {        
        const user = await Users.findAll({
            where:{
                id_rol: id 
            }
        })
        if (!user) return res.status(404).json({message: 'User does not exist'})
        res.json(user)        
    } catch (error) {
        return res.status(500).json({message: error.message})        
    }
}