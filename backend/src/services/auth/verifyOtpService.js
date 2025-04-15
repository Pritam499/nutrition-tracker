// import jwt from 'jsonwebtoken';
// import {Users} from '../../models/users.js';
// import dotenv from 'dotenv';
// dotenv.config();

// const verifyOtpService = async ({ email, otp }) => {
//   const user = await Users.findOne({ where: { email } });

//   if (!user) {
//     throw new Error('User not found');
//   }

//   if (!user.otp || user.otp !== otp) {
//     throw new Error('Invalid OTP');
//   }

//   if (new Date() > user.otp_expires_at) {
//     throw new Error('OTP expired');
//   }

//   user.isVerified = true;
//   user.otp = null;
//   user.otp_expires_at = null;
//   await user.save();

//   const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });

//   return {
//     token,
//     user: {
//       id: user.id,
//       email: user.email,
//       name: user.name,
//       isVerified: user.isVerified
//     }
//   };
// };

// export default verifyOtpService;

import jwt from "jsonwebtoken";
import { Users } from "../../models/users.js";
import dotenv from "dotenv";
dotenv.config();

const verifyOtpService = async ({ email, otp }) => {
  // Input sanitization
  email = email.toLowerCase().trim();
  otp = otp.toString().trim();

  // Find user
  const user = await Users.findOne({
    where: { email },
    attributes: ["id", "email", "name", "otp", "otp_expires_at", "isVerified"],
  });

  if (!user) {
    throw new Error("User not found");
  }

  // Check if user is already verified
  // if (user.isVerified) {
  //   throw new Error('User is already verified');
  // }

  // OTP verification
  if (!user.otp) {
    throw new Error("No OTP generated for this user");
  }

  if (user.otp !== otp) {
    throw new Error("Invalid OTP code");
  }

  // if (new Date() > new Date(user.otp_expires_at)) {
  //   throw new Error('OTP has expired');
  // }

  // Update user
  user.isVerified = true;
  user.otp = null;
  user.otp_expires_at = null;
  await user.save();

  // Generate JWT token
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  return {
    token,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      isVerified: user.isVerified,
    },
  };
};

export default verifyOtpService;
