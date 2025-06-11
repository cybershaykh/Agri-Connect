import userModel from "../models/userModel.js";


// Middleware to check if user is admin
export function isAdmin(req, res, next) {
    // Assuming req.user is set after authentication and contains the user's role
    if (req.user && req.user.role === "admin") {
        return next();
    }
    return res.status(403).json({ message: "Access denied. Admins only." });
}