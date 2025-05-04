import { searchFoodByQuery } from '../../services/food/searchFoodService.js';
import generateResponse from '../../utils/generateResponse.js';

export const searchFoods = async (req, res) => {
  try {
    const result = await searchFoodByQuery(req.query.query);
    res.status(200).json(generateResponse(true, result, 'Foods fetched successfully'));
  } catch (error) {
    res.status(400).json(generateResponse(false, {}, 'Search failed', error.message));
  }
};
