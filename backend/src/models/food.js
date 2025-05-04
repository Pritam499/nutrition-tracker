// // src/models/food.js

import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const Food = sequelize.define(
  "Food",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    fdc_id: {
      type: DataTypes.BIGINT,
      unique: true,
      allowNull: false,
    },
    data_type: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    food_category_id: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    publication_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    nutrients: {
      type: DataTypes.JSONB,
      allowNull: true,
      defaultValue: {},
    },
    nutrient_id: {
      type: DataTypes.INTEGER,
      allowNull: true,  // Allowing null if no nutrient_id exists
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "foods",
    schema: "soft_tracker",
    timestamps: true,
    underscored: true,
  }
);
