import { recommendFoodsByNutrient } from '../../services/food/foodRecommendationService.js';
import generateResponse from '../../utils/generateResponse.js';

export const getFoodRecommendations = async (req, res) => {
  try {
    const { nutrient, limit = 10, maxCalories } = req.query;
    const foods = await recommendFoodsByNutrient(nutrient, parseInt(limit), maxCalories);
    res.status(200).json(generateResponse(true, foods, 'Recommended foods retrieved'));
  } catch (err) {
    res.status(500).json(generateResponse(false, {}, 'Failed to get recommendations', err.message));
  }
};
