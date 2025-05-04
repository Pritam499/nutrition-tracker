// src/services/food/foodDetailsService.js
import { Food } from '../../models/food.js';

export const getFoodDetailById = async (fdcId) => {
  return await Food.findOne({
    where: { fdc_id: fdcId },
    attributes: ['fdc_id', 'description', 'data_type', 'food_category_id', 'publication_date', 'nutrients'],
  });
};