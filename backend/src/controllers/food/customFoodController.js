// src/controllers/food/customFoodController.js

import customFoodService from '../../services/food/customFoodService.js';
import generateResponse from '../../utils/generateResponse.js';

export const createCustomFood = async (req, res) => {
  try {
    const food = await customFoodService.create(req.user.userId, req.body);
    res.status(201).json(generateResponse(true, food, 'Custom food created'));
  } catch (err) {
    res.status(400).json(generateResponse(false, {}, 'Creation failed', err.message));
  }
};

export const getCustomFoods = async (req, res) => {
  try {
    const foods = await customFoodService.getAll(req.user.userId);
    res.json(generateResponse(true, foods, 'Fetched custom foods'));
  } catch (err) {
    res.status(400).json(generateResponse(false, {}, 'Fetch failed', err.message));
  }
};

export const updateCustomFood = async (req, res) => {
  try {
    const food = await customFoodService.update(req.params.id, req.user.userId, req.body);
    res.json(generateResponse(true, food, 'Updated custom food'));
  } catch (err) {
    res.status(400).json(generateResponse(false, {}, 'Update failed', err.message));
  }
};

export const deleteCustomFood = async (req, res) => {
  try {
    await customFoodService.remove(req.params.id, req.user.userId);
    res.json(generateResponse(true, {}, 'Deleted custom food'));
  } catch (err) {
    res.status(400).json(generateResponse(false, {}, 'Delete failed', err.message));
  }
};
