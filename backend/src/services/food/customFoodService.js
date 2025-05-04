// src/services/food/customFoodService.js

import { CustomFood } from '../../models/customFood.js';

const customFoodService = {
  create: async (userId, data) => {
    return await CustomFood.create({ ...data, user_id: userId });
  },

  getAll: async (userId) => {
    return await CustomFood.findAll({ where: { user_id: userId } });
  },

  update: async (id, userId, data) => {
    const food = await CustomFood.findOne({ where: { id, user_id: userId } });
    if (!food) throw new Error('Custom food not found');
    return await food.update(data);
  },

  remove: async (id, userId) => {
    const food = await CustomFood.findOne({ where: { id, user_id: userId } });
    if (!food) throw new Error('Custom food not found');
    await food.destroy();
  }
};

export default customFoodService;
