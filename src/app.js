import express from 'express';
import usersRoutes from './routes/users.routes.js'
import rolesRoutes from './routes/roles.routes.js'
import authRoutes from './routes/auth.routes.js'
import customerRoutes from './routes/customers.routes.js' 
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { validationToken } from './middlewares/validationToken.js';
import associations from './models/associations.js';
const app = express();

//*Llama a la función de asociaciones para establecer las relaciones entre los modelos 
associations();  
//* Middlewares

app.use(cors({
    origin: function(origin, callback) {
      if (!origin || 'http://localhost:4200/') {
        // || origin === 'http://localhost:4200/' debería ser así pero no me lo toma
        callback(null, true);
      } else {
        callback(new Error('CORS not allowed'), false); 
      }
    },
    credentials: true, // Permite el uso de credenciales (cookies, cabeceras de autenticación, etc.)
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }));

app.use(express.json()); //Cada vez que manden un json a la aplicación voy a poder interpretarlo y voy a poder guardarlo dentro de un req.body
//Así que cada vez que llame al req.body voy a poder utilizar los datos que el cliente me este enviando
app.use(cookieParser());

//* En esta ruta se hace el login y se crea el token
app.use(authRoutes);

//*Middleware para verificar el token para las rutas de la aplicacion
//app.use(validationToken); //07/04/2025-Lo tengo comentado porque no hace falta que este aca, al tener el guard en el front ya tengo las rutas protegidas. 
//Al menos para /home. Si dejo descomentado esto me verifica 2 veces la sesion, una en el front y otra en el back. 

app.use(usersRoutes);
app.use(rolesRoutes);
app.use(customerRoutes);

export default app;