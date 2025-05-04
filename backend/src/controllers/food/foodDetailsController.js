import { getFoodDetailById } from '../../services/food/foodDetailsService.js';
import generateResponse from '../../utils/generateResponse.js';

export const getFoodDetail = async (req, res) => {
  try {
    const result = await getFoodDetailById(req.params.fdcId);
    if (!result) {
      return res.status(404).json(generateResponse(false, {}, 'Food not found'));
    }
    res.status(200).json(generateResponse(true, result, 'Food details retrieved successfully'));
  } catch (error) {
    res.status(400).json(generateResponse(false, {}, 'Failed to retrieve food detail', error.message));
  }
};
