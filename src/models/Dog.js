import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import TEMPERAMENT from "./Temperaments.js";

const BREED = sequelize.define(
  "breed",
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    height: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    weight: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    lifeSpan: {
      type: DataTypes.STRING,
    },
    isDB: {
      type: DataTypes.BOOLEAN,
    },

    image: {
      type: DataTypes.TEXT,
    },
  },
  { timestamps: false }
);

TEMPERAMENT.belongsToMany(BREED, {
  through: "TEMPERAMENT_BREED",
  timestamps: false,
});
BREED.belongsToMany(TEMPERAMENT, {
  through: "TEMPERAMENT_BREED",
  timestamps: false,
});

export default BREED;
