import express from 'express';
import usersRoutes from './routes/users.routes.js'
import rolesRoutes from './routes/roles.routes.js'
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();

//* Middlewares
app.use(cors());
app.use(express.json()); 
app.use(cookieParser());
app.use((req, res, next) => {
    const token = req.cookies.access_token;
    let data = null;

    try {
        data = jwt.verify(token, SECRET_JWT_KEY);
        req.session.user = data;
    } catch (error) {}
    next() //seguir a la siguiente ruta o middleware

});
//Cada vez que manden un json a la aplicación voy a poder interpretarlo y voy a poder guardarlo dentro de un req.body
//Así que cada vez que llame al req.body voy a poder utilizar los datos que el cliente me este enviando
app.use(rolesRoutes);
app.use(usersRoutes);
export default app;