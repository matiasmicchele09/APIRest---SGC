import { DataTypes } from 'sequelize';
import { sequelize } from '../database/db.js'
import { Users } from './users.js';


//Users ponele que sería el esquema
export const Roles = sequelize.define('roles',{
    id_rol:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,  
    },
    descripcion: {
        type: DataTypes.STRING
    }
},{
    timestamps: false
  }
);

