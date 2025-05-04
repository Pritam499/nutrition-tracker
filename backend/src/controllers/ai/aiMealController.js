import {fetchAIMealSuggestions} from '../../services/ai/aiMealService.js';
import generateResponse from '../../utils/generateResponse.js';

const aiMealController = async (req, res) => {
  try {
    const result = await fetchAIMealSuggestions(req.user.userId);
    res.status(200).json(generateResponse(true, result, 'AI Suggestions loaded'));
  } catch (err) {
    res.status(400).json(generateResponse(false, {}, 'Failed', err.message));
  }
};

export default aiMealController;
