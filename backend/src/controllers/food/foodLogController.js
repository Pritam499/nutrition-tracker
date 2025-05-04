// src/controllers/food/foodLogController.js

import foodLogService from '../../services/food/foodLogService.js';
import generateResponse from '../../utils/generateResponse.js';

export const createFoodLog = async (req, res) => {
  try {
    const result = await foodLogService.createLog(req.user.userId, req.body);
    res.status(201).json(generateResponse(true, result, 'Food logged successfully'));
  } catch (err) {
    res.status(400).json(generateResponse(false, {}, 'Logging failed', err.message));
  }
};


export const getFoodDiary = async (req, res) => {
  try {
    const result = await foodLogService.getTodayDiary(req.user.userId);
    res.status(200).json(generateResponse(true, result, 'Fetched today\'s food diary'));
  } catch (err) {
    res.status(400).json(generateResponse(false, {}, 'Fetch failed', err.message));
  }
};

export const deleteFoodLog = async (req, res) => {
  try {
    await foodLogService.deleteLog(req.params.id, req.user.userId);
    res.status(200).json(generateResponse(true, {}, 'Log deleted'));
  } catch (err) {
    res.status(400).json(generateResponse(false, {}, 'Delete failed', err.message));
  }
};
