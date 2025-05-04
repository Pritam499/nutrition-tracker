// src/controllers/aiRecommendationController.js
import { fetchUserProteinRecommendation } from '../../services/ai/proteinRecommendation.js';

export const getProteinRecommendation = async (req, res) => {
  try {
    const userId = req.user.id;
    const result = await fetchUserProteinRecommendation(userId);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
