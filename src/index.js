// //* este archivo, index, arranca nuestro proyecto
import app from './app.js';
import { PORT, ENV } from './config.js';
import UserRoutes from './routes/users.routes.js';
import { sequelize } from './database/db.js';

async function main() {
  try {
    // 1) Autenticación
    await sequelize.authenticate();
    console.log(`✅ DB OK [${ENV}]`);

    // 2) Sincronizar (force: false para no borrar datos)
    await sequelize.sync({ force: false });

    // 3) Montar rutas
    //app.use('/api/users', UserRoutes);

    // 4) Levantar servidor
    app.listen(PORT, () =>
      console.log(`🚀 Server en puerto ${PORT} [${ENV}]`)
    );

  } catch (error) {
    console.error('❌ No se pudo iniciar la app:', error);
  }
}

main();
