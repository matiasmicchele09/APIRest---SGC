import { DataTypes } from "sequelize";
import { sequelize } from "../database/db.js";

export const Types_person = sequelize.define("types_person", {
    id_type: {
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