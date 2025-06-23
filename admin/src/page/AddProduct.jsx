import React, { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const AddProduct = () => {
  const url = "http://localhost:3000";
  const [image, setImage] = useState([]);
  const [loading, setLoading] = useState(false);
  const [farmerImageFile, setFarmerImageFile] = useState(null);

  const [data, setData] = useState({
    name: "",
    description: "",
    category: "Fruits",
    price: "",
    offerPrice: "",
    inStock: "false",
    rating: "",
    location: "",
    farmerAddress: "",
    farmerName: "",
    farmerPhone: "",
    farmerEmail: ""
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (image.length === 0 || !image[0]) {
      return toast.error("Please upload at least one product image.");
    }

    if (!farmerImageFile) {
      return toast.error("Please upload a farmer image.");
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("price", Number(data.price));
      formData.append("offerPrice", Number(data.offerPrice));
      formData.append("rating", Number(data.rating));
      formData.append("category", data.category);
      formData.append("location", data.location);
      formData.append("inStock", data.inStock);

      image.forEach((img) => formData.append("images", img));
      formData.append("farmerImage", farmerImageFile);
      formData.append("farmerAddress", data.farmerAddress);
      formData.append("farmerName", data.farmerName);
      formData.append("farmerPhone", data.farmerPhone);
      formData.append("farmerEmail", data.farmerEmail);

      const response = await axios.post(`${url}/api/product/add`, formData);
      setLoading(false);

      if (response.data.success) {
        toast.success("✅ Product added successfully!");
        // Reset form
        setData({
          name: "",
          description: "",
          category: "Fruits",
          price: "",
          offerPrice: "",
          inStock: "false",
          rating: "",
          location: "",
          farmerAddress: "",
          farmerName: "",
          farmerPhone: "",
          farmerEmail: ""
        });
        setImage([]);
        setFarmerImageFile(null);
      } else {
        toast.error("❌ Failed to add product.");
      }
    } catch (err) {
      setLoading(false);
      console.error("Submit error:", err);
      toast.error("❌ Something went wrong.");
    }
  };

  return (
    <div className="flex-1 min-h-screen flex flex-col justify-between">
      <Toaster />
      <form onSubmit={onSubmitHandler} className="md:p-10 p-4 space-y-5 max-w-lg">
        {/* Product Image Upload */}
        <div>
          <p className="text-base font-medium">Product Images</p>
          <div className="flex flex-wrap items-center gap-3 mt-2">
            {[...Array(4)].map((_, index) => (
              <label key={index} htmlFor={`image${index}`}>
                <input
                  onChange={(e) => {
                    const updatedFiles = [...image];
                    updatedFiles[index] = e.target.files[0];
                    setImage(updatedFiles);
                  }}
                  type="file"
                  id={`image${index}`}
                  hidden
                />
                <div className="border w-24 h-24 bg-gray-100 flex items-center justify-center cursor-pointer">
                  {image[index] ? (
                    <img
                      src={URL.createObjectURL(image[index])}
                      alt={`preview-${index}`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-xs text-gray-500">Click to Upload</span>
                  )}
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Product Info Fields */}
        <div className="flex flex-col gap-1 max-w-md">
          <label className="text-base font-medium" htmlFor="name">Product Name</label>
          <input
            name="name"
            type="text"
            placeholder="Type here"
            className="w-full border rounded-lg px-4 py-2"
            onChange={onChangeHandler}
            value={data.name}
            required
          />
        </div>

        <div className="flex flex-col gap-1 max-w-md">
          <label className="text-base font-medium" htmlFor="description">Product Description</label>
          <textarea
            name="description"
            rows={4}
            className="w-full border rounded-lg px-4 py-2"
            placeholder="Type here"
            onChange={onChangeHandler}
            value={data.description}
            required
          ></textarea>
        </div>

        <div className="flex items-center gap-5 flex-wrap">
          <div className="flex flex-col gap-1 w-32">
            <label htmlFor="inStock" className="text-base font-medium">In Stock</label>
            <select
              name="inStock"
              className="w-full border rounded-lg px-4 py-2"
              onChange={onChangeHandler}
              value={data.inStock}
            >
              <option value="false">false</option>
              <option value="true">true</option>
            </select>
          </div>

          <div className="flex flex-col gap-1 w-32">
            <label htmlFor="rating" className="text-base font-medium">Rating</label>
            <input
              name="rating"
              type="number"
              placeholder="5.0"
              className="w-full border rounded-lg px-4 py-2"
              onChange={onChangeHandler}
              value={data.rating}
              required
            />
          </div>

          <div className="flex flex-col gap-1 w-32">
            <label htmlFor="location" className="text-base font-medium">Location</label>
            <input
              name="location"
              type="text"
              placeholder="e.g., Kaduna"
              className="w-full border rounded-lg px-4 py-2"
              onChange={onChangeHandler}
              value={data.location}
              required
            />
          </div>
        </div>

        <div className="flex items-center gap-5 flex-wrap">
          <div className="flex flex-col gap-1 w-32">
            <label htmlFor="category" className="text-base font-medium">Category</label>
            <select
              name="category"
              className="w-full border rounded-lg px-4 py-2"
              onChange={onChangeHandler}
              value={data.category}
            >
              <option value="Fruits">Fruits</option>
              <option value="Root Vegetable">Root Vegetable</option>
              <option value="Grains">Grains</option>
              <option value="Root Crops">Root Crops</option>
              <option value="Legumes">Legumes</option>
              <option value="Spices">Spices</option>
              <option value="Potatoes">Potatoes</option>
              <option value="Vegetables">Vegetables</option>
            </select>
          </div>

          <div className="flex flex-col gap-1 w-32">
            <label htmlFor="price" className="text-base font-medium">Price</label>
            <input
              name="price"
              type="number"
              placeholder="0"
              className="w-full border rounded-lg px-4 py-2"
              onChange={onChangeHandler}
              value={data.price}
              required
            />
          </div>

          <div className="flex flex-col gap-1 w-32">
            <label htmlFor="offerPrice" className="text-base font-medium">Offer Price</label>
            <input
              name="offerPrice"
              type="number"
              placeholder="0"
              className="w-full border rounded-lg px-4 py-2"
              onChange={onChangeHandler}
              value={data.offerPrice}
              required
            />
          </div>
        </div>

        {/* Farmer Info Section */}
        <div className="pt-4 border-t">
          <h2 className="text-lg font-semibold mb-2">Farmer Information</h2>
          <div className="flex flex-col gap-3">
            <input
              type="text"
              name="farmerName"
              placeholder="Farmer Name"
              className="border px-4 py-2 rounded"
              value={data.farmerName}
              onChange={onChangeHandler}
            />
            <input
              type="text"
              name="farmerAddress"
              placeholder="Farmer Address"
              className="border px-4 py-2 rounded"
              value={data.farmerAddress}
              onChange={onChangeHandler}
            />
            <input
              type="tel"
              name="farmerPhone"
              placeholder="Phone Number"
              className="border px-4 py-2 rounded"
              value={data.farmerPhone}
              onChange={onChangeHandler}
            />
            <input
              type="email"
              name="farmerEmail"
              placeholder="Email Address"
              className="border px-4 py-2 rounded"
              value={data.farmerEmail}
              onChange={onChangeHandler}
            />
            <div className="flex flex-col gap-2">
              <label className="font-medium">Farmer Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    setFarmerImageFile(file);
                  }
                }}
              />
              {farmerImageFile && (
                <img
                  src={URL.createObjectURL(farmerImageFile)}
                  alt="Farmer Preview"
                  className="w-24 h-24 object-cover border rounded"
                />
              )}
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`px-8 py-2.5 bg-green-600 text-white font-medium rounded ${
            loading ? "opacity-60 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Adding..." : "ADD"}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
