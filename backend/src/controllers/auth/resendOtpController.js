import resendOtpService from '../../services/auth/resendOtpService.js';
import generateResponse from '../../utils/generateResponse.js';

const resendOtpController = async (req, res) => {
  try {
    const result = await resendOtpService(req.body);
    res.status(200).json(generateResponse(true, result, 'OTP resent successfully.'));
  } catch (error) {
    res.status(400).json(generateResponse(false, {}, 'Failed to resend OTP', error.message));
  }
};

export default resendOtpController;