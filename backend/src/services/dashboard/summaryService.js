import { UserFoodLog } from '../../models/userFoodLog.js';
import { Op } from 'sequelize';

const summaryService = async (userId) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const logs = await UserFoodLog.findAll({
    where: {
      user_id: userId,
      logged_at: { [Op.gte]: today },
    },
  });

  const total = logs.reduce((acc, item) => {
    acc.calories += item.calories;
    acc.protein += item.protein;
    acc.fat += item.fat;
    acc.carbs += item.carbs;
    return acc;
  }, { calories: 0, protein: 0, fat: 0, carbs: 0 });

  return total;
};

export default summaryService;
