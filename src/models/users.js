import { DataTypes } from 'sequelize';
import { sequelize } from '../database/db.js'
import { Roles } from './roles.js';

//Users ponele que sería el esquema
export const Users = sequelize.define('users',{
    id_user:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,  
    },
    email: {
        type: DataTypes.STRING
    },
    password:{
        type: DataTypes.STRING
    },
    id_rol:{
        type: DataTypes.INTEGER
    },
},{
    timestamps: false
  }
);

//* Agrego relación clave foránea a la tabla Users.
Roles.hasOne(Users,{
    foreignKey: 'id_rol',
    sourceKey: 'id_rol'
})
// Users.belongsTo(Roles,{
//          foreignKey: 'id_rol',})