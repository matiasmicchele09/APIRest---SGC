import jwt from 'jsonwebtoken'; 
import { SECRET_JWT_KEY } from './../config.js';

export const validationToken = (req, res, next) => {    
    const token = req.cookies.access_token;    
    
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized (no token)' });
    }

    try {    
        const data = jwt.verify(token, SECRET_JWT_KEY);               
        req.user = data;                    
        next() //seguir a la siguiente ruta o middleware
    } catch (error) {        
        return res.status(401).json({message: 'Unauthorized'})                
    }
}