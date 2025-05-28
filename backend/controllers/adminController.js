import userModel from "../models/userModel.js";
import resourceModel from "../models/resourceModel.js";

// Get all users (Admin only)
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
        const { buyerId, action } = req.body;

        if (!buyerId || !action) {
            return res.status(400).json({ error: "❌ User ID and action are required." });
        }
        if (action !== "block" && action !== "unblock") {
            return res.status(400).json({ error: "❌ Invalid action. Use 'block' or 'unblock'." });
        }
        const buyer = await userModel.findById(buyerId);
        if (!buyer) {
            return res.status(404).json({ error: "❌ User not found." });
        }

        buyer.isBlocked = action === "block";
        await buyer.save();

        res.status(200).json({
            success: true,
            message: `✅ User has been ${action}ed successfully.`,
            buyer
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "❌ Internal server error." });
    }
}