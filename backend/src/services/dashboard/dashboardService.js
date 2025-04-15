// src/services/dashboard/dashboardService.js
import { Op } from "sequelize";
import { Users } from "../../models/users.js";
import { UserFoodLog } from "../../models/userFoodLog.js";
import {Workouts} from "../../models/workouts.js";
import {UserWater} from "../../models/userWater.js";
import {
  calculateMacros,
  suggestAITips,
} from "../../utils/dashboard/dashboardUtils.js";

export const fetchUserSummary = async (userId) => {
  const user = await Users.findByPk(userId);
  const today = new Date().toISOString().split("T")[0];

  const foodLogs = await UserFoodLog.findAll({
    where: {
      user_id: userId,
      logged_at: { [Op.gte]: today },
    },
  });

  const caloriesConsumed = foodLogs.reduce((sum, log) => sum + log.calories, 0);

  return {
    currentWeight: user.weight,
    goalWeight: user.goal_weight,
    caloriesConsumed,
  };
};

export const calculateMacroProgress = async (userId) => {
  const user = await Users.findByPk(userId);
  const today = new Date().toISOString().split("T")[0];

  const foodLogs = await UserFoodLog.findAll({
    where: {
      user_id: userId,
      logged_at: { [Op.gte]: today },
    },
  });

  return calculateMacros(user, foodLogs);
};

export const getRecentUserActivities = async (userId) => {
  const last7Days = new Date();
  last7Days.setDate(last7Days.getDate() - 7);

  return await Workouts.findAll({
    where: {
      user_id: userId,
      logged_at: { [Op.gte]: last7Days },
    },
    order: [["logged_at", "DESC"]],
  });
};

export const generateAITips = async (userId) => {
  const user = await Users.findByPk(userId);
  const foodLogs = await UserFoodLog.findAll({
    where: { user_id: userId },
  });
  return suggestAITips(user, foodLogs);
};

export const getTodaysWater = async (userId) => {
  const today = new Date().toISOString().split("T")[0];

  const water = await UserWater.findOne({
    where: {
      user_id: userId,
      logged_at: { [Op.gte]: today },
    },
  });

  return {
    total: water?.amount || 0,
    goal: 3000, // 3000 ml default goal
  };
};
