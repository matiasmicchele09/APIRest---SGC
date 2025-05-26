import { DataTypes } from "sequelize";
import { sequelize } from "../database/db.js";

export const Sex = sequelize.define("sex", {
    id_sex: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    description: {
      type: DataTypes.STRING,
    },    
  },
  {
    timestamps: false,
  }
);