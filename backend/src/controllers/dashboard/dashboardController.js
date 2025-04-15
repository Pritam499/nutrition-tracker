// src/controllers/dashboard/dashboardController.js
import generateResponse from '../../utils/generateResponse.js';
import {
  fetchUserSummary,
  calculateMacroProgress,
  getRecentUserActivities,
  generateAITips,
  getTodaysWater
} from '../../services/dashboard/dashboardService.js';

export const getUserSummary = async (req, res) => {
  try {
    const data = await fetchUserSummary(req.user.id);
    res.status(200).json(generateResponse(true, data, 'User summary fetched.'));
  } catch (error) {
    res.status(500).json(generateResponse(false, {}, 'Failed to fetch summary', error.message));
  }
};

export const getMacroProgress = async (req, res) => {
  try {
    const data = await calculateMacroProgress(req.user.id);
    res.status(200).json(generateResponse(true, data, 'Macro progress fetched.'));
  } catch (error) {
    res.status(500).json(generateResponse(false, {}, 'Failed to fetch macros', error.message));
  }
};

export const getRecentActivities = async (req, res) => {
  try {
    const data = await getRecentUserActivities(req.user.id);
    res.status(200).json(generateResponse(true, data, 'Recent activities fetched.'));
  } catch (error) {
    res.status(500).json(generateResponse(false, {}, 'Failed to fetch activities', error.message));
  }
};

export const getAITips = async (req, res) => {
  try {
    const data = await generateAITips(req.user.id);
    res.status(200).json(generateResponse(true, data, 'AI tips generated.'));
  } catch (error) {
    res.status(500).json(generateResponse(false, {}, 'Failed to fetch AI tips', error.message));
  }
};

export const getWaterIntake = async (req, res) => {
  try {
    const data = await getTodaysWater(req.user.id);
    res.status(200).json(generateResponse(true, data, 'Water intake fetched.'));
  } catch (error) {
    res.status(500).json(generateResponse(false, {}, 'Failed to fetch water intake', error.message));
  }
};
