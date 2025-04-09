import { DataTypes } from 'sequelize';
import { sequelize } from '../database/db.js'

//Users ponele que sería el esquema
export const Customers = sequelize.define('customers',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,  
    },
    name: {
        type: DataTypes.STRING
    },
    surname:{
        type: DataTypes.STRING
    },
    email:{
        type: DataTypes.STRING
    },
    phone:{
        type: DataTypes.STRING
    },
    address:{
        type: DataTypes.STRING
    },
    city:{
        type: DataTypes.STRING
    },
    id_user:{
        type: DataTypes.INTEGER
    },    
},{
    timestamps: false
  }


  //la provincia seruía una foreign key a la tabla provincias, pero no la tengo creada, por eso lo comento 
);

