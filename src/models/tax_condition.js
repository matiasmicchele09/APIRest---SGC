import { DataTypes } from 'sequelize';
import { sequelize } from '../database/db.js'

export const Tax_Condition = sequelize.define('tax_condition',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,  
    },
    description: {
        type: DataTypes.STRING
    },
},{
    timestamps: false
  }
);
  

