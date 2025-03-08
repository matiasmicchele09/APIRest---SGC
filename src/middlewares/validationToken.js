import jwt from 'jsonwebtoken'; 
import { SECRET_JWT_KEY } from './../config.js';

export const validationToken = (req, res, next) => {    
    const token = req.cookies.access_token;

    //Agrego información a la sesión
    req.session = {user: null};

    try {
       const data = jwt.verify(token, SECRET_JWT_KEY);
        req.session.user = data;
        next() //seguir a la siguiente ruta o middleware
    } catch (error) {        
        return res.status(401).json({message: 'Unauthorized'})                
    }
}