import userModel from '../models/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import Admin from '../models/adminModel.js';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

// 🆕 Register an Admin User
export const adminRegister = async (req, res) => {
  const { name, email, password } = req.body;

  // ✅ Basic validation
  if (!name || !email || !password) {
    return res.status(400).json({ error: "❌ Please provide name, email, and password." });
  }

  try {
    // 🔍 Check for existing user
    const existingUser = await Admin.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "❌ Admin already exists." });
    }

    // 🔐 Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Create admin user
    const newAdmin = await Admin.create({
      name,
      email,
      password: hashedPassword,
      isAdmin: true,
      role: 'admin'
    });

    // 🎟️ Generate JWT
    const token = jwt.sign({ id: newAdmin._id, isAdmin: true }, JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({
      success: true,
      message: "✅ Admin registered successfully.",
      token,
      user: {
        id: newAdmin._id,
        name: newAdmin.name,
        email: newAdmin.email,
        isAdmin: true,
        role: 'admin'
      },
    });
  } catch (err) {
    console.error("Admin registration error:", err);
    res.status(500).json({ error: "❌ Server error." });
  }
};

// 🛡️ Admin Login Controller
export const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  // ✅ Validate fields
  if (!email || !password) {
    return res.status(400).json({ success: false, message: "❌ Email and password are required." });
  }

  try {
    const admin = await Admin.findOne({ email, isAdmin: true });
    if (!admin) {
      return res.status(403).json({ success: false, message: "❌ Access denied. Not an admin." });
    }
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "❌ Invalid credentials." });
    }

    // 🎟️ Sign JWT
    const token = jwt.sign({ id: admin._id, isAdmin: true }, JWT_SECRET, { expiresIn: '7d' });

    res.status(200).json({
      success: true,
      message: "✅ Admin login successful.",
      token,
      user: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        isAdmin: true,
        role: 'admin'
      },
    });
  } catch (error) {
    console.error("Admin login error:", error);
    res.status(500).json({ success: false, message: "❌ Server error." });
  }
};

export const getAllUsers = async (req, res) => {
    try {
        const users = await userModel.find().select("-password").sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            message: "✅ Users fetched successfully.",
            users
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "❌ Internal server error." });
    }
};

//Block or unblock a user (Admin only)
export const blockUser = async (req, res) => {
    try {
        const { userId, action } = req.body;

        if (!userId || !action) {
            return res.status(400).json({ error: "❌ User ID and action are required." });
        }
        if (action !== "block" && action !== "unblock") {
            return res.status(400).json({ error: "❌ Invalid action. Use 'block' or 'unblock'." });
        }
        const user = await userModel.findById(userId);
        if (!userId) {
            return res.status(404).json({ error: "❌ User not found." });
        }

        user.isBlocked = action === "block";
        await user.save();

        res.status(200).json({
            success: true,
            message: `✅ User has been ${action}ed successfully.`,
            user
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "❌ Internal server error." });
    }
}