import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import userModel from "../models/userModel.js";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

export const checkAdmin = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "❌ No token provided" });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await userModel.findById(decoded.id);

    if (!user || !user.isAdmin) {
      return res.status(403).json({ message: "❌ Access denied. Admins only." });
    }

    req.user = user; // Optional: attach admin user to request
    next();
  } catch (err) {
    console.error("Admin auth error:", err);
    res.status(401).json({ message: "❌ Unauthorized" });
  }
};

// Middleware to check if user is admin
export const isAdmin = (req, res, next) => {
    // Assuming req.user is set after authentication and contains the user's role
    if (req.user && req.user.role === "admin") {
        return next();
    }
    return res.status(403).json({ message: "Access denied. Admins only." });
}

