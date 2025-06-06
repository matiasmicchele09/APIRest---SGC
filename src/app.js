import { validationToken } from './middlewares/validationToken.js';

import associations from './models/associations.js';
import authRoutes from './routes/auth.routes.js'
import banksRoutes from './routes/banks.routes.js'
import customerRoutes from './routes/customers.routes.js' 
import rolesRoutes from './routes/roles.routes.js'
import usersRoutes from './routes/users.routes.js'
import tax_conditionRoutes from './routes/tax_conditions.routes.js'
import provincesRoutes from './routes/provinces.routes.js'
import type_personRoutes from './routes/types_person.routes.js';

import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import swaggerUI from 'swagger-ui-express';
import specs from './config/swagger.js';
const app = express();

//*Llama a la función de asociaciones para establecer las relaciones entre los modelos 
associations();  

//* Middlewares
// app.use(cors({
//     origin: function(origin, callback) {
//       if (!origin || 'http://localhost:4200/') {
//         // || origin === 'http://localhost:4200/' debería ser así pero no me lo toma
//         callback(null, true);
//       } else {
//         callback(new Error('CORS not allowed'), false); 
//       }
//     },
//     credentials: true, // Permite el uso de credenciales (cookies, cabeceras de autenticación, etc.)
//     methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
//     allowedHeaders: ['Content-Type', 'Authorization']
//   }));
app.use(cors({
  origin: function(origin, callback) {
    const allowedOrigins = ['http://localhost:4200'];
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('CORS not allowed'), false); 
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json()); //Cada vez que manden un json a la aplicación voy a poder interpretarlo y voy a poder guardarlo dentro de un req.body
//Así que cada vez que llame al req.body voy a poder utilizar los datos que el cliente me este enviando

app.use(cookieParser());
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs));

//* En esta ruta se hace el login y se crea el token
app.use(authRoutes);

//*Middleware para verificar el token para las rutas de la aplicacion
app.use(validationToken);

app.use(usersRoutes);
app.use(rolesRoutes);
app.use(customerRoutes);
app.use(tax_conditionRoutes);
app.use(provincesRoutes)
app.use(banksRoutes);
app.use(type_personRoutes)
//07/04/2025-Lo tengo comentado porque no hace falta que este aca, al tener el guard en el front ya tengo las rutas protegidas. 
//Al menos para /home. Si dejo descomentado esto me verifica 2 veces la sesion, una en el front y otra en el back. 

export default app;