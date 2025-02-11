import express from 'express';
import usersRoutes from './routes/users.routes.js'
import rolesRoutes from './routes/roles.routes.js'
const cors = require('cors');

const app = express();

//* Middlewares
app.use(cors());
app.use(express.json()); 
//Cada vez que manden un json a la aplicación voy a poder interpretarlo y voy a poder guardarlo dentro de un req.body
//Así que cada vez que llame al req.body voy a poder utilizar los datos que el cliente me este enviando
app.use(rolesRoutes);
app.use(usersRoutes);
export default app;