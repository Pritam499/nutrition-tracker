import signupService from '../../services/auth/signupService.js';
import generateResponse from '../../utils/generateResponse.js';

const signupController = async (req, res) => {
  try {
    const result = await signupService(req.body);
    res.status(201).json(generateResponse(true, result, 'Signup successful. OTP sent.'));
  } catch (error) {
    res.status(400).json(generateResponse(false, {}, 'Signup failed', error.message));
  }
};

export default signupController;