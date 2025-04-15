// src/models/reminders.js

import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import { Users } from "./users.js";

export const Reminder = sequelize.define(
  "Reminder",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Users,
        key: "id",
      },
      onDelete: "CASCADE",
    },
    reminder_type: {
      type: DataTypes.TEXT,
      allowNull: true,
      validate: {
        isIn: [["meal", "hydration", "workout", "sleep"]],
      },
    },
    time: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    tableName: "reminders",
    schema: "soft_tracker",
    timestamps: true,
    underscored: true,
  }
);
