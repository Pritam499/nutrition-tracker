// src/models/workouts.js

import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import { Users } from "./users.js";

export const Workouts = sequelize.define(
  "Workouts",
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
    steps: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    calories_burned: {
      type: DataTypes.DOUBLE,
      defaultValue: 0,
    },
    workout_duration: {
      type: DataTypes.DOUBLE,
    },
    workout_type: {
      type: DataTypes.TEXT,
    },
    intensity: {
      type: DataTypes.TEXT,
      validate: {
        isIn: [["low", "medium", "high"]],
      },
    },
    heart_rate: {
      type: DataTypes.INTEGER,
    },
    synced_from: {
      type: DataTypes.TEXT,
      validate: {
        isIn: [["Google Fit", "Apple Health", "Fitbit"]],
      },
    },
    logged_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "workouts",
    schema: "soft_tracker",
    timestamps: true,
    underscored: true,
  }
);
