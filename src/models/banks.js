import { DataTypes } from "sequelize";
import { sequelize } from "../database/db.js";

export const Banks = sequelize.define("banks", {
    id_bank: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    network: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
  }
);