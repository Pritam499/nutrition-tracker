// src/models/customFood.js

import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import {Users} from "./users.js";

export const CustomFood = sequelize.define(
  "CustomFood",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: Users,
        key: "id",
      },
      onDelete: "CASCADE",
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
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "custom_foods",
    schema: "soft_tracker",
    timestamps: true,
    underscored: true,
  }
);
