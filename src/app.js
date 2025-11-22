import { validationToken } from "./middlewares/validationToken.js";

import associations from "./models/associations.js";
import authRoutes from "./routes/auth.routes.js";
import banksRoutes from "./routes/banks.routes.js";
import customerRoutes from "./routes/customers.routes.js";
import provincesRoutes from "./routes/provinces.routes.js";
import rolesRoutes from "./routes/roles.routes.js";
import tax_conditionRoutes from "./routes/tax_conditions.routes.js";
import type_personRoutes from "./routes/types_person.routes.js";
import usersRoutes from "./routes/users.routes.js";

//import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import swaggerUI from "swagger-ui-express";
import specs from "./config/swagger.js";
const app = express();
const STATIC_ORIGINS = [
  "http://localhost:4200",
  "http://127.0.0.1:8080",
  "https://nexostudio.vercel.app", // <-- reemplazá por tu URL fija de prod en Vercel
  // 'https://tu-dominio.com',  // <-- si tenés dominio propio, agregalo aquí
];
//*Llama a la función de asociaciones para establecer las relaciones entre los modelos
associations();

//* Middlewares

app.set("trust proxy", 1); // importante en Render para cookies "secure"
//app.use(cookieParser());
function isAllowedOrigin(origin) {
  if (!origin) return true; // Postman/cURL o navegadores sin Origin en same-site
  if (STATIC_ORIGINS.includes(origin)) return true;

  // Permitir previews de Vercel: https://<hash>-<project>.vercel.app
  try {
    const u = new URL(origin);
    if (u.protocol === "https:" && u.hostname.endsWith(".vercel.app"))
      return true;
  } catch (_) {}
  return false;
}

const corsOptions = {
  origin: (origin, cb) => {
    const ok = isAllowedOrigin(origin);
    cb(ok ? null : new Error("CORS not allowed"), ok);
  },
  credentials: false, // En TRUE si usara cookies
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

// Para garantizar que OPTIONS responde siempre OK:
app.use(cors(corsOptions));
// ¡La preflight OPTIONS debe usar las mismas opciones!
app.options("*", cors(corsOptions));
//app.options('*', cors());

app.use(express.json()); //Cada vez que manden un json a la aplicación voy a poder interpretarlo y voy a poder guardarlo dentro de un req.body
//Así que cada vez que llame al req.body voy a poder utilizar los datos que el cliente me este enviando

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

//* En esta ruta se hace el login y se crea el token
app.use(authRoutes);

//*Middleware para verificar el token para las rutas de la aplicacion
app.use(validationToken);

//Valida si la session esta activa desde el front, esto lo uso en el guard de angular
app.get("/validateSession", (req, res) => res.json(req.user));
// Rutas protegidas
app.use(usersRoutes);
app.use(customerRoutes);

app.use(rolesRoutes);
app.use(tax_conditionRoutes);
app.use(provincesRoutes);
app.use(banksRoutes);
app.use(type_personRoutes);

export default app;

// app.use(cors({
//   origin: function(origin, callback) {
//     const allowedOrigins = ['http://localhost:4200', 'http://127.0.0.1:8080'];
//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error('CORS not allowed'), false);
//     }
//   },
//   credentials: true,
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization']
// }));
