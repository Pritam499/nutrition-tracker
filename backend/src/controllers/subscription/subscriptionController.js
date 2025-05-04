// src/controllers/subscriptionController.js
import razorpay from '../../config/razorpay.js';
import crypto from 'crypto';
import Users from '../../models/users.js';

export const createSubscription = async (req, res) => {
  try {
    const { planId } = req.body; // Razorpay plan_id from dashboard
    const subscription = await razorpay.subscriptions.create({
      plan_id: planId,
      customer_notify: 1,
      total_count: 12, // Monthly billing for 12 months
    });

    res.status(200).json({ subscriptionId: subscription.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const verifyPayment = async (req, res) => {
  try {
    const { razorpay_signature, razorpay_payment_id, razorpay_subscription_id } = req.body;

    const generatedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(razorpay_payment_id + '|' + razorpay_subscription_id)
      .digest('hex');

    if (generatedSignature !== razorpay_signature) {
      return res.status(400).json({ error: 'Payment verification failed' });
    }

    // Update user as Pro
    await Users.update({ isPro: true }, { where: { id: req.user.id } });

    res.status(200).json({ message: 'Subscription successful' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
