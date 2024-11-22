//* para las multiples conexiones a la base de datos
//* Aca manejamos sequelize
//Sequelize es la libreria, sequelize es una instancia. Diferencia entre "s" y "S"
import { Sequelize } from "sequelize";

export const sequelize = new Sequelize('SGC', 'postgres', 'Bocajuniors12', {
    host: 'localhost',
    dialect: 'postgres'
})