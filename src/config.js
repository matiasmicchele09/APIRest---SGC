//* Archivo para guardar en que puerto se esta ejecutando la aplicación, cual es la dirección de la base de datos
export const {
    PORT = 3000,
    SALT_ROUNDS = 10,
    SECRET_JWT_KEY = 'this-is-an-awesome-secret-key',
} = process.env;
