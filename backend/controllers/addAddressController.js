import connectDB from "../config/db.js";
import AddAddressModel from "../models/addAddressModel.js";

export const addAddress = async (req, res) => {
  try {
    const { address } = req.body;
    const userId = req.user.id; 

    if (
      !address.fullName ||
      !address.phoneNumber ||
      !address.pincode ||
      !address.area ||
      !address.city ||
      !address.state
    ) {
      return res.json({
        success: false,
        message: "Please provide all required address fields.",
      });
    }

    await connectDB();
    const newAddress = new AddAddressModel({
      userId: userId,
      fullName: address.fullName,
      phoneNumber: address.phoneNumber,
      pincode: address.pincode,
      area: address.area,
      city: address.city,
      state: address.state,
    });

    const savedAddress = await newAddress.save();

    return res.json({
      success: true,
      message: "Address added successfully.",
      address: savedAddress,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong while adding the address.",
      error: error.message,
    });
  }
};
