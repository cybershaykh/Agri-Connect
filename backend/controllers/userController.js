import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';
import dotenv from 'dotenv';
import { sendWelcomeEmail } from '../utils/mailer.js';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

// Register a new user
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: "❌ Please provide name, email, and password." });
  }

  try {
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "❌ User already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await userModel.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign({ id: newUser._id }, JWT_SECRET, { expiresIn: '7d' });

    await sendWelcomeEmail(newUser.email, newUser.name);

    res.status(201).json({
      success: true,
      message: "✅ User registered successfully.",
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ error: "❌ Something went wrong." });
  }
};

// Login user
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "❌ Please provide email and password." });
  }

  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "❌ User not found." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "❌ Invalid credentials." });
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '7d' });

    res.status(200).json({
      success: true,
      message: "✅ Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "❌ Login failed." });
  }
};

// Logout user
export const logoutUser = (req, res) => {
  res.clearCookie('jwt');
  res.status(200).json({ success: true, message: '✅ Logout successful' });
};

// Verify user email
export const verifyUser = async (req, res) => {
  const { token } = req.body;

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await userModel.findById(decoded.id);

    if (!user) {
      return res.status(404).json({ error: "❌ User not found." });
    }

    if (user.verified) {
      return res.status(400).json({ error: "❌ Email already verified." });
    }

    user.verified = true;
    await user.save();

    res.status(200).json({ success: true, message: "✅ Email verified successfully." });
  } catch (err) {
    console.error("Email verification error:", err);
    res.status(500).json({ error: "❌ Failed to verify email." });
  }
};

// Get all users (admin only)
export const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find().select('-password'); // Secure: exclude password
    res.status(200).json({ success: true, users });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ success: false, message: '❌ Server error' });
  }
};

// Get user using token (for user dashboard/profile)
export const getUserWithToken = async (req, res) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ success: false, message: '❌ Authorization token missing' });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await userModel.findById(decoded.id).select('-password');

    if (!user) {
      return res.status(404).json({ success: false, message: '❌ User not found' });
    }

    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Error in getUserWithToken:', error);

    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ success: false, message: '❌ Invalid token' });
    }

    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ success: false, message: '❌ Token expired' });
    }

    res.status(500).json({ success: false, message: '❌ Server error' });
  }
};
