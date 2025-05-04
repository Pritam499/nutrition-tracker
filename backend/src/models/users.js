import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const Users = sequelize.define(
  "Users",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    email: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true,
    },
    password_hash: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
    },
    weight: {
      type: DataTypes.DOUBLE,
    },
    height: {
      type: DataTypes.DOUBLE,
    },
    goal_weight: {
      type: DataTypes.DOUBLE,
    },
    gender: {
      type: DataTypes.ENUM("male", "female", "other"),
    },
    activity_level: {
      type: DataTypes.ENUM("sedentary", "active", "athlete"),
    },
    fitness_goal: {
      type: DataTypes.ENUM("muscle_gain", "fat_loss", "maintenance"),
    },
    diet_preference: {
      type: DataTypes.ENUM(
        "vegan",
        "vegetarian",
        "non-veg",
        "keto",
        "paleo",
        "other"
      ),
    },
    otp: {
      type: DataTypes.STRING(6),
      allowNull: true,
    },
    otp_expires_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    reset_token: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    reset_token_expiry: {
      type: DataTypes.DATE,
      allowNull: true,
    },    
  },
  {
    tableName: "users",
    schema: "soft_tracker",
    timestamps: true,
    underscored: true,
  }
);
