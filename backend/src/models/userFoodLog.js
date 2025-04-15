// src/models/userFoodLog.js

import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

import { Users } from "./users.js";
import { Food } from "./food.js";
import { CustomFood } from "./customFood.js";


export const UserFoodLog = sequelize.define(
  "UserFoodLog",
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
    food_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: Food,
        key: "id",
      },
      onDelete: "SET NULL",
    },
    custom_food_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: CustomFood,
        key: "id",
      },
      onDelete: "SET NULL",
    },
    calories: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    protein: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    fat: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    carbs: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.DOUBLE,
      defaultValue: 1,
    },
    meal_type: {
      type: DataTypes.TEXT,
      validate: {
        isIn: [["breakfast", "lunch", "dinner", "snack"]],
      },
    },
    logged_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "user_food_log",
    schema: "soft_tracker",
    timestamps: true,
    underscored: true,
  }
);

