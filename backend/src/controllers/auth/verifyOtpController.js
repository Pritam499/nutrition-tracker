// src/controllers/auth/verifyOtpController.js
import verifyOtpService from '../../services/auth/verifyOtpService.js';
import generateResponse from '../../utils/generateResponse.js';

const verifyOtpController = async (req, res) => {
  try {
    const { email, otp } = req.body;
    
    // Basic validation
    if (!email || !otp) {
      return res.status(400).json(generateResponse(false, null, 'Email and OTP are required'));
    }

    const result = await verifyOtpService({ email, otp });
    res.status(200).json(generateResponse(true, result, 'OTP verified successfully'));
  } catch (error) {
    console.error('OTP Verification Error:', error);
    res.status(400).json(generateResponse(false, null, error.message));
  }
};

export default verifyOtpController;