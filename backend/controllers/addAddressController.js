import userModel from "../models/userModel.js";
import AddAddressModel from "../models/addAddressModel.js" 


// ➕ Add new address to user
export const addAddress = async (req, res) => {
  try {
    const { fullName, phoneNumber, pincode, area, city, state } = req.body;

    if (!fullName || !phoneNumber || !pincode || !area || !city || !state) {
      return res.status(400).json({
        success: false,
        message: "Please fill in all required fields.",
      });
    }

    const user = await userModel.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found." });
    }

    const newAddress = { fullName, phoneNumber, pincode, area, city, state };

    user.addresses.push(newAddress);
    await user.save();

    res.status(200).json({
      success: true,
      message: "Address saved to user profile.",
      addresses: user.addresses,
    });
  } catch (error) {
    console.error("Save address error:", error);
    res.status(500).json({ success: false, message: "Server error while saving address." });
  }
};

// 📦 Get user addresses
export const getUserAddresses = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await userModel.findById(userId).select("addresses");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    return res.status(200).json({
      success: true,
      addresses: user.addresses,
    });
  } catch (error) {
    console.error("Fetch Address Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch addresses.",
      error: error.message,
    });
  }
};
