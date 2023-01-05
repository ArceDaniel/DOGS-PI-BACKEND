import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const TEMPERAMENT = sequelize.define(
  "temperament",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  { timestamps: false }
);

export default TEMPERAMENT;
