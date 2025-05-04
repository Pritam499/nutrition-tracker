// src/controllers/auth/updateProfileController.js
import updateProfileService from '../../services/auth/updateProfileService.js';
import generateResponse from '../../utils/generateResponse.js';

const updateProfileController = async (req, res) => {
  try {
    const result = await updateProfileService(req.user.userId, req.body);
    res.status(200).json(generateResponse(true, result, 'Profile updated'));
  } catch (error) {
    res.status(400).json(generateResponse(false, {}, 'Update failed', error.message));
  }
};

export default updateProfileController;
