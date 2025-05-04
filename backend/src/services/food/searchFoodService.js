import { Food } from '../../models/food.js';
import { Op } from 'sequelize';

export const searchFoodByQuery = async (query) => {
  return await Food.findAll({
    where: {
      description: {
        [Op.iLike]: `%${query}%`
      },
      nutrients: {
        [Op.ne]: {} // Only return if nutrients are not empty
      }
    },
    attributes: ['fdc_id', 'description', 'data_type', 'food_category_id', 'nutrients'],
    limit: 15,
    order: [['description', 'ASC']]
  });
};

export default {
  searchFoodByQuery
};
