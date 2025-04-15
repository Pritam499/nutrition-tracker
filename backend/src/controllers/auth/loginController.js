import loginService from '../../services/auth/loginService.js';
import generateResponse from '../../utils/generateResponse.js';

const loginController = async (req, res) => {
  try {
    const result = await loginService(req.body);
    res.status(200).json(generateResponse(true, result, 'Login successful.'));
  } catch (error) {
    res.status(400).json(generateResponse(false, {}, 'Login failed', error.message));
  }
};

export default loginController;