import { DataTypes } from 'sequelize';
import { sequelize } from '../database/db.js'
import { Users } from './users.js';

export const Provinces = sequelize.define('provinces',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,  
    },
    name: {
        type: DataTypes.STRING
    }
},{
    timestamps: false
  }
);

