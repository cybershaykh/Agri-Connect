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
    return res.status(400).json({ error: "❌Please provide name, email and password." });
  }

  try {
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "❌User already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await userModel.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign({ id: newUser._id }, JWT_SECRET, { expiresIn: '7d' });

    const user = await newUser.save();
    await sendWelcomeEmail(user.email, user.name);
    res.status(201).json({
      success: true,
      message: "✅User registered successfully.",
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ error: "❌Something went wrong." });
  }
};

// Login user
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "❌Please provide email and password." });
  }

  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "❌User not found." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "❌Invalid credentials." });
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '7d' });

    res.status(200).json({
      success: true,
      message: "✅Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "❌Login failed." });
  }
};

// Logout user
export const logoutUser = (req, res) => {
  res.clearCookie('jwt');
  res.status(200).json({ success: true, message: '✅Logout successful' });
};

// Verify user email
export const verifyUser = async (req, res) => {
  const { token } = req.body;

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await userModel.findById(decoded.id);

    if (!user) {
      return res.status(404).json({ error: "❌User not found." });
    }

    if (user.verified) {
      return res.status(400).json({ error: "❌Email already verified." });
    }

    user.verified = true;
    await user.save();

    res.status(200).json({ success: true, message: "✅Email verified successfully." });
  } catch (err) {
    console.error("Email verification error:", err);
    res.status(500).json({ error: "❌Failed to verify email." });
  }
};
