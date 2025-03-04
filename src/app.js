import express from 'express';
import usersRoutes from './routes/users.routes.js'
import rolesRoutes from './routes/roles.routes.js'
import cors from 'cors';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
import { getUserLogIn } from './controllers/users.controllers.js';  
import { SECRET_JWT_KEY } from './config.js';
const app = express();

//* Middlewares
app.use(cors());
app.use(express.json()); 
app.use(cookieParser());


//TODO: Ver como mejorar esto.
//TODO: tuve que poner el login aparte, porque ahi hago el jwt, y sino lo que pasaba era que...
//TODO: ...no tenia el re.cookies.access_token, porque no lo habia creado todavia...
//TODO: ...y si ponia primero todas las rutas del usuario con el login iba bien, pero despues no me tomaba ekl user, porque no tenia el token porque no lo habia guardado...
//TODO: ... como lo hago en el middleware de app.js
//TODO: ¿Y si hago lo del middleware en la ruta del logueo, si guardo ahi la session? no se, no me convece.
app.post('/login', getUserLogIn);
app.use((req, res, next) => {
    const token = req.cookies.access_token;
    
    //Agrego información a la sesión
    req.session = {user: null};

    try {
       const data = jwt.verify(token, SECRET_JWT_KEY);
        req.session.user = data;
    } catch (error) {
        res.json({error})
        //console.log(error);
    }
    next() //seguir a la siguiente ruta o middleware
});

app.use(usersRoutes);
//Cada vez que manden un json a la aplicación voy a poder interpretarlo y voy a poder guardarlo dentro de un req.body
//Así que cada vez que llame al req.body voy a poder utilizar los datos que el cliente me este enviando
app.use(rolesRoutes);

export default app;