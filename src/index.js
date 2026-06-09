// //* este archivo, index, arranca nuestro proyecto
import app from "./app.js";
import { ENV, PORT } from "./config.js";
import { sequelize } from "./database/db.js";

async function ensureBusinessIndexes() {
  const queryInterface = sequelize.getQueryInterface();
  const indexes = await queryInterface.showIndex("customers");
  const hasCustomerCuitIndex = indexes.some(
    (index) => index.name === "customers_id_user_cuit_unique",
  );

  if (!hasCustomerCuitIndex) {
    await queryInterface.addIndex("customers", ["id_user", "cuit"], {
      unique: true,
      name: "customers_id_user_cuit_unique",
    });
  }
}

async function main() {
  try {
    // 1) Autenticación
    await sequelize.authenticate();
    console.log(`✅ DB OK [${ENV}]`);

    // 2) Sincronizar (force: false para no borrar datos)
    await sequelize.sync({ force: false });

    try {
      await ensureBusinessIndexes();
    } catch (error) {
      console.error(
        "⚠️ No se pudo crear el indice unico de customers:",
        error.message,
      );
    }

    // 3) Montar rutas
    //app.use('/api/users', UserRoutes);

    // 4) Levantar servidor
    app.listen(PORT, () => console.log(`🚀 Server en puerto ${PORT} [${ENV}]`));
  } catch (error) {
    console.error("❌ No se pudo iniciar la app:", error);
  }
}

main();
