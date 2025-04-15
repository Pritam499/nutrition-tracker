// src/models/food.js

import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const Food = sequelize.define(
  "Food",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    calories: {
      type: DataTypes.DOUBLE,
    },
    protein: {
      type: DataTypes.DOUBLE,
    },
    fat: {
      type: DataTypes.DOUBLE,
    },
    carbs: {
      type: DataTypes.DOUBLE,
    },
    serving_size: {
      type: DataTypes.TEXT,
    },
    barcode: {
      type: DataTypes.TEXT,
      unique: true,
    },
    brand_name: {
      type: DataTypes.TEXT,
    },
    food_category: {
      type: DataTypes.TEXT,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "food",
    schema: "soft_tracker",
    timestamps: true,
    underscored: true,
  }
);

