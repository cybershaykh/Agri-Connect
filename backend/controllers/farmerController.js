import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import farmerModel from "../models/farmerModel.js"
import dotenv from 'dotenv';
import { sendFarmerApprovalEmail } from '../utils/farmerMailer.js';

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

// Register a new farmer
export const registerFarmer = async (req, res) => {
  const { name, email, password, farmName, location } = req.body;

  if (!name || !email || !password || !farmName || !location) {
    return res.status(400).json({
      success: false,
      message: "❌ Please provide all required fields."
    });
  }

  try {
    const existingFarmer = await farmerModel.findOne({ email });

    if (existingFarmer) {
      return res.status(409).json({
        success: false,
        message: "❌ Farmer with this email already exists."
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newFarmer = await farmerModel.create({
      name,
      email,
      password: hashedPassword,
      farmName,
      location
    });

    const token = jwt.sign(
      { id: newFarmer._id, role: "farmer" },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(201).json({
      success: true,
      message: "✅ Farmer registered successfully.",
      token,
      famer: {
        id: newFarmer._id,
        name: newFarmer.name,
        email: newFarmer.email,
        farmName: newFarmer.farmName,
        location: newFarmer.location
      }
    });

  } catch (error) {
    console.error("Register error:", error.message);
    res.status(500).json({
      success: false,
      message: "🚨 Server error. Please try again later."
    });
  }
};

// Login an existing farmer
export const loginFarmer = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "❌ Please provide both email and password."
    });
  }

  try {
    const farmer = await farmerModel.findOne({ email });

    if (!farmer) {
      return res.status(404).json({
        success: false,
        message: "❌ Farmer not found."
      });
    }

    const isMatch = await bcrypt.compare(password, farmer.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "❌ Incorrect password."
      });
    }

    const token = jwt.sign(
      { id: farmer._id, role: "farmer" },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      success: true,
      message: "✅ Login successful.",
      token,
      farmer: {
        id: farmer._id,
        name: farmer.name,
        email: farmer.email,
        farmName: farmer.farmName,
        farmSize: farmer.farmSize,
        location: farmer.location,
        role: "farmer"
      }
    });

  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({
      success: false,
      message: "🚨 Server error during login."
    });
  }
};

// logout farmer
export const logoutFarmer = async (req, res) => {
  res.clearCookie("jwt");
  res.status(200).json({
    success: true,
    message: "✅ Logged out"
  });
};

// get all farmer
export const getAllFarmers = async (req, res) => {
  try {
    const farmers = await farmerModel.find().select("-password"); 

    res.status(200).json({
      success: true,
      message: "✅ All farmers fetched successfully.",
      farmers,
    });
  } catch (error) {
    console.error("Error fetching farmers:", error.message);
    res.status(500).json({
      success: false,
      message: "🚨 Server error while fetching farmers.",
    });
  }
};
// getfarmerwithtoken
export const getFarmerWithToken = async (req, res) => {
  try {
    const authHeader = req.req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "❌ No token provided."
      });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const farmer = await farmerModel.findById(decoded.id).select("-password");

    if (!farmer) {
      return res.status(404).json({
        success: false,
        message: "❌ Farmer not found."
      });
    }

    res.status(200).json({
      success: true,
      message: "✅ Farmer fetched successfully.",
      farmer
    });
  } catch (error) {
    console.error("Error fetching farmer with token:", error.message);
    res.status(500).json({
      success: false,
      message: "🚨 server error while fetching"
    })
  }
}
// Approve or reject a farmer
export const approveFarmer = async (req, res) => {
  const { status, farmerId } = req.body;

  if (!status || !farmerId) {
    return res.status(400).json({
      success: false,
      message: "❌ Please provide status and farmer ID."
    });
  }

  try {
    const updatedFarmer = await farmerModel.findByIdAndUpdate(
      farmerId,
      { status },
      { new: true }
    );

    if (!updatedFarmer) {
      return res.status(404).json({
        success: false,
        message: "❌ Farmer not found."
      });
    }
    await sendFarmerApprovalEmail(updatedFarmer.email, updatedFarmer.name, status);

    res.status(200).json({
      success: true,
      message: `✅ Farmer status updated to ${status}.`,
      farmer: updatedFarmer
    });
  } catch (error) {
    console.error("Error updating farmer status:", error.message);
    res.status(500).json({
      success: false,
      message: "🚨 server error while updating farmer."
    });
  }
}