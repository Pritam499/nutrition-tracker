import {Users} from '../../models/users.js';
import OTPService from '../../utils/otpService.js';
import sendEmail from '../../utils/sendEmail.js';
import bcrypt from 'bcrypt';

const signupService = async ({ name, email, password }) => {
  const existingUser = await Users.findOne({ where: { email } });
  
  if (existingUser) {
    throw new Error('User already exists.');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  const user = await Users.create({ 
    name, 
    email, 
    password_hash: hashedPassword,
    otp,
    otp_expires_at: new Date(Date.now() + 5 * 60 * 1000), // 5 minutes expiry
    isVerified: false
  });

  // Send OTP via email
  await sendEmail(
    email,
    'Your OTP Code',
    `Your OTP code is: ${otp}`
  );

  return { email, message: 'OTP sent successfully' };
};

export default signupService;