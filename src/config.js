//* Archivo para guardar en que puerto se esta ejecutando la aplicación, cual es la dirección de la base de datos
// import dotenv from "dotenv";
// import path from "path";

// // 1) Defino entorno (por defecto 'development')
// const NODE_ENV = process.env.NODE_ENV || "development";

// // 2) Cargo el .env correspondiente desde la raíz
// dotenv.config({
//   path: path.resolve(".", `.env.${NODE_ENV}`),
// });

// // 3) Exporto todas las vars que usa la app
// export const ENV = NODE_ENV;
// export const PORT = Number(process.env.PORT || 3000);
// export const DB_URI = process.env.DB_URI;
// export const JWT_SECRET = process.env.SECRET_JWT_KEY;
// export const SALT_ROUNDS = Number.parseInt(process.env.SALT_ROUNDS || "10", 10);
import dotenv from "dotenv";
import path from "path";

const NODE_ENV = process.env.NODE_ENV || "development";

// Solo cargamos .env.* si NO estamos en Render (o si estamos en local)
if (!process.env.RENDER) {
  dotenv.config({
    path: path.resolve(".", `.env.${NODE_ENV}`),
  });
}

export const ENV = NODE_ENV;
export const PORT = Number(process.env.PORT || 3000);
export const DB_URI = process.env.DB_URI || process.env.DATABASE_URL;
export const JWT_SECRET = process.env.SECRET_JWT_KEY;
export const SALT_ROUNDS = Number.parseInt(process.env.SALT_ROUNDS || "10", 10);
