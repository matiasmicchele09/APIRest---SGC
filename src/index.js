//* este archivo, index, arranca nuestro proyecto
import app from './app.js'
import { PORT } from './config.js';
import UserRoutes  from './routes/users.routes.js'
import { sequelize } from './database/db.js';

//app.use(UserRoutes);

async function main(){
    try {
        //*Esto es solo para probar la conexión
        /*await sequelize.authenticate();
        console.log('Connection has been established successfully.');*/

        //*Hacemos sincronización con la BD
        await sequelize.sync({force: false}); //* Con el force en true recreo las tablas. Ahora lo pongo en false para que no las recree cada vez que hago "save" al código
        //await sequelize.sync({ alter: true }); para que me haga los cambios que faltan en la base de datos.

        app.listen(PORT)
        console.log('Server on port', PORT);
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }    
}

main();

