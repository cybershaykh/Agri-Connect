import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import productModel from "../models/productModel.js";

// create a new product
export const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      category,
      price,
      offerPrice,
      rating,
      inStock,
      location,
      farmerAddress,
      farmerName,
      farmerPhone,
      farmerEmail,
    } = req.body;

    const productImages = req.files["images"]?.map(file => file.path) || [];
    const farmerImage = req.files["farmerImage"]?.[0]?.path || "";

    if (!productImages.length || !farmerImage) {
      return res.status(400).json({
        success: false,
        message: "Product and farmer images are required.",
      });
    }

    const newProduct = new productModel({
      name,
      description,
      category,
      rating: Number(rating),
      price: Number(price),
      offerPrice: Number(offerPrice),
      inStock: inStock === "true",
      image: productImages,
      location,
      farmerImage,
      farmerAddress,
      farmerName,
      farmerPhone,
      farmerEmail,
    });

    await newProduct.save();

    res.status(201).json({
      success: true,
      message: "✅ Product added successfully",
      product: newProduct,
    });
  } catch (err) {
    console.error("Product add error:", err.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


//get all products
export const getAllProducts = async (req, res) => {
  try {
    const products = await productModel.find({}).sort({ createdAt: -1 });

    if (products.length === 0) {
      return res.status(404).json({ error: "❌No products found." });
    }

    res.status(200).json({
      success: true,
      message: "✅Products retrieved successfully.",
      products,
    });
  } catch (err) {
    console.error("Get all products error:", err);
    res
      .status(500)
      .json({ error: "❌Something went wrong while retrieving products." });
  }
};

// approve a product
export const approveProduct = async (req, res) => {
  try {
    const { productId } = req.body;

    if (!productId) {
      return res.status(400).json({ error: "❌Product ID is required." });
    }

    const productToApprove = await productModel.findById(productId);

    if (!productToApprove) {
      return res.status(404).json({ error: "❌Product not found." });
    }

    productToApprove.isApproved = true;
    productToApprove.approvedBy = req.user._id;
    productToApprove.approvalDate = new Date();

    const updatedProduct = await productToApprove.save();

    res.status(200).json({
      success: true,
      message: "✅Product approved successfully.",
      product: updatedProduct,
    });
  } catch (error) {
    console.error("Approve product error:", error);
    res
      .status(500)
      .json({ error: "❌Something went wrong while approving the product." });
  }
};

// get unapproved products
export const getUnapprovedProducts = async (req, res) => {
  // Uncomment the following code if you want to fetch unapproved products
  try {
    const products = await productModel
      .find({ isApproved: false })
      .populate("farmerId", "fullName");
    res.status(200).json({ success: true, products });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Failed to fetch products",
        error: error.message,
      });
  }
};

// get approved products
export const getApprovedProducts = async (req, res) => {
  try {
    const products = await productModel
      .find({ isApproved: true })
      .populate("farmerId", "fullName");
    res.status(200).json({ success: true, products });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Failed to fetch products",
        error: error.message,
      });
  }
};

// update a product
export const updateProduct = async (req, res) => {
  try {
    const { productId } = req.body;
    const updates = req.body;

    if (!productId) {
      return res.status(400).json({ error: "❌Product ID is required." });
    }

    const updatedProduct = await productModel.findByIdAndUpdate(
      productId,
      updates,
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ error: "❌Product not found." });
    }

    res.status(200).json({
      success: true,
      message: "✅Product updated successfully.",
      product: updatedProduct,
    });
  } catch (err) {
    console.error("Update product error:", err);
    res
      .status(500)
      .json({ error: "❌Something went wrong while updating the product." });
  }
};

// delete a product
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: "❌Product ID is required." });
    }

    const deletedProduct = await productModel.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ error: "❌Product not found." });
    }

    res.status(200).json({
      success: true,
      message: "✅Product deleted successfully.",
    });
  } catch (err) {
    console.error("Delete product error:", err);
    res
      .status(500)
      .json({ error: "❌Something went wrong while deleting the product." });
  }
};
