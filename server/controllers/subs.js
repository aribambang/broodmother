import User from '../models/user';

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export const prices = async (req, res) => {
  const prices = await stripe.prices.list();

  res.json(prices.data.reverse());
};

export const createSubscription = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: req.body.priceId,
          quantity: 1,
        },
      ],
      customer: user.stripe_customer_id,
      success_url: process.env.STRIPE_SUCCESS_URL,
      cancel_url: process.env.STRIPE_CANCEL_URL,
    });
    console.log(session);
    res.json(session.url);
  } catch (err) {
    console.log(err);
    res.status(500).json('Server Error');
  }
};

export const subscriptionStatus = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    const subscription = await stripe.subscriptions.list({
      customer: user.stripe_customer_id,
      status: 'all',
      expand: ['data.default_payment_method'],
    });

    const updated = await User.findByIdAndUpdate(
      user._id,
      {
        subscriptions: subscription.data,
      },
      { new: true },
    ).select('-password');

    res.json(updated);
  } catch (err) {
    res.status(500).json('Server Error');
  }
};

export const subscriptions = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    const subscriptions = await stripe.subscriptions.list({
      customer: user.stripe_customer_id,
      status: 'all',
      expand: ['data.default_payment_method'],
    });

    res.json(subscriptions);
  } catch (err) {
    res.status(500).json('Server Error');
  }
};
