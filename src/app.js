import express from 'express';
import usersRoutes from './routes/users.routes.js'
import rolesRoutes from './routes/roles.routes.js'
import authRoutes from './routes/auth.routes.js'
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { validationToken } from './middlewares/validationToken.js';
const app = express();

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
app.use(validationToken);
app.use(usersRoutes);
app.use(rolesRoutes);

export default app;