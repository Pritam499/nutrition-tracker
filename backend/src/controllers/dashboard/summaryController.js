import summaryService from '../../services/dashboard/summaryService.js';
import generateResponse from '../../utils/generateResponse.js';

const summaryController = async (req, res) => {
  try {
    const summary = await summaryService(req.user.userId);
    res.status(200).json(generateResponse(true, summary, 'Daily summary'));
  } catch (err) {
    res.status(400).json(generateResponse(false, {}, 'Failed to load summary', err.message));
  }
};

export default summaryController;
