import { hashPassword, comparePassword } from '../helpers/auth';
import User from '../models/user';
import jwt from 'jsonwebtoken';
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export const register = async (req, res) => {
  try {
    const { name, email, password: passwd } = req.body;
    if (!name) return res.status(400).json({ message: 'Name is required' });
    if (!passwd || passwd.length < 6) {
      return res
        .status(400)
        .json({ message: 'Password is required and should be 6 characters long' });
    }

    const exist = await User.findOne({ email });
    if (exist) return res.status(400).json({ message: 'Email is taken' });

    const hashedPassword = await hashPassword(passwd);

    const customer = await stripe.customers.create({
      email,
    });

    const user = await new User({
      name,
      email,
      password: hashedPassword,
      stripe_customer_id: customer.id,
    });

    user.save();

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    const { password, ...rest } = user._doc;

    return res.status(100).json({
      token,
      user: rest,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

export const login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).json({ message: 'User not found' });

    const matchPassword = await comparePassword(req.body.password, user.password);
    if (!matchPassword) return res.status(400).json({ message: 'Password not match' });

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    const { password, ...rest } = user._doc;

    return res.status(200).json({
      token,
      user: rest,
    });
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};
