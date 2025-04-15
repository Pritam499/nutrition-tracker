// src/models/aiRecommendations.js

import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import { Users } from "./users.js";

export const AIRecommendation = sequelize.define(
  "AIRecommendation",
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
    recommended_protein: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    recommended_calories: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    recommended_carbs: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    recommended_fat: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    generated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "ai_recommendations",
    schema: "soft_tracker",
    timestamps: true,
    underscored: true,
  }
);
