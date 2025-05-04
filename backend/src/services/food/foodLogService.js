import { UserFoodLog } from '../../models/userFoodLog.js';
import { Op } from 'sequelize';

const createLog = async (userId, data) => {
  return await UserFoodLog.create({
    ...data,
    user_id: userId,
    logged_at: new Date(),
  });
};

const getTodayDiary = async (userId) => {
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date();
  endOfDay.setHours(23, 59, 59, 999);

  return await UserFoodLog.findAll({
    where: {
      user_id: userId,
      logged_at: {
        [Op.between]: [startOfDay, endOfDay],
      },
    },
    order: [['logged_at', 'DESC']],
  });
};

const deleteLog = async (logId, userId) => {
  const log = await UserFoodLog.findOne({ where: { id: logId, user_id: userId } });
  if (!log) throw new Error('Log not found or unauthorized');
  await log.destroy();
};

export default {
  createLog,
  getTodayDiary,
  deleteLog,
};
