// src/models/userWater.js

import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

export const UserWater = sequelize.define(
  'UserWater',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    amount: {
      type: DataTypes.INTEGER, // in milliliters (ml)
      allowNull: false,
    },
    logged_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    tableName: 'user_water',
    schema: 'soft_tracker',
    timestamps: true,
    underscored: true,
  }
);

