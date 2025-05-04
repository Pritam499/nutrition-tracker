import Workouts from '../../models/workouts.js';
import { Op } from 'sequelize';

export const logWorkoutService = async (userId, data) => {
    return await Workouts.create({
      user_id: userId,
      steps: data.steps,
      calories_burned: data.calories_burned,
      workout_duration: data.workout_duration,
      workout_type: data.workout_type,
      intensity: data.intensity,
      heart_rate: data.heart_rate,
      synced_from: data.synced_from || null,
      logged_at: data.logged_at || new Date(),
    });
  };
  

export const getWorkoutHistoryService = async (userId) => {
  const fromDate = new Date();
  fromDate.setDate(fromDate.getDate() - 7); // Last 7 days

  return await Workouts.findAll({
    where: {
      user_id: userId,
      logged_at: { [Op.gte]: fromDate },
    },
    order: [['logged_at', 'DESC']],
  });
};
