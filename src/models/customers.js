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
    active:{
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    created_at:{
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }, 
    deactivated_at:{
        type: DataTypes.DATE,
        defaultValue: null
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
    tax_key:{
        type: DataTypes.STRING
    },    
    id_user:{
        type: DataTypes.INTEGER
    },   
    activity:{
        type: DataTypes.STRING
    },
    cuit:{
        type: DataTypes.STRING
    },
    id_tax_condition:{
        type: DataTypes.INTEGER
    },
    id_province:{
        type: DataTypes.INTEGER
    },
},{
    timestamps: false
  }


);
  //la provincia seruía una foreign key a la tabla provincias, pero no la tengo creada, por eso lo comento 

