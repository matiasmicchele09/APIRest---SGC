# APIRest SGC (Sistema de Gestión Contable)

API RESTful desarrollada en **Node.js**, **Express** y **PostgreSQL** para la gestión contable.

## Características

- Autenticación de usuarios con JWT y cookies seguras.
- Gestión de usuarios, roles, clientes, bancos, provincias, condiciones impositivas, tipos de persona y sexos.
- Relaciones entre entidades modeladas con Sequelize.
- Documentación interactiva con Swagger en `/api-docs`.
- CORS configurado para frontend en Angular.
- Variables de entorno por ambiente (`.env.development`, `.env.production`, `.env.testing`).

## Estructura del proyecto

```
src/
  app.js
  index.js
  config.js
  config/
    swagger.js
  controllers/
  database/
  middlewares/
  models/
  routes/
.env.development
.env.production
.env.testing
package.json
README.md
```

## Instalación

1. Clona el repositorio.
2. Instala dependencias:
   ```sh
   npm install
   ```
3. Configura las variables de entorno en los archivos `.env.*`.
4. Ejecuta la base de datos PostgreSQL y asegúrate de que la URI esté correcta.

## Scripts

- `npm run dev` — Ejecuta el servidor en modo desarrollo.
- `npm start` — Ejecuta en modo producción.
- `npm run start:dev` — Usa nodemon para recarga automática.
- `npm run start:test` — Ejecuta en modo testing.

## Endpoints principales

- `/api/login` — Login de usuario.
- `/api/users` — CRUD de usuarios.
- `/api/customers` — CRUD de clientes.
- `/api/roles` — CRUD de roles.
- `/api/banks` — Listado de bancos.
- `/api/provinces` — Listado de provincias.
- `/api/tax-conditions` — Listado de condiciones impositivas.
- `/api/types_person` — Listado de tipos de persona.
- `/api/sex` — Listado de sexos.

## Documentación

Accede a la documentación Swagger en: [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

---

Desarrollado por Matías Micchele