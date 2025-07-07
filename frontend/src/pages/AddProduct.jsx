import React, { useContext, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { StoreContext } from "../component/context/StoreContext";

const AddProduct = () => {
  const { url } = useContext(StoreContext);
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
    farmerEmail: "",
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

      if (response.data.success) {
        toast.success("✅ Product added successfully!");
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
          farmerEmail: "",
        });
        setImage([]);
        setFarmerImageFile(null);
      } else {
        toast.error("Failed to add product.");
      }
    } catch (err) {
      toast.error("❌ Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <div className="flex-1 p-4 md:p-10">
        <Toaster />
        <form onSubmit={onSubmitHandler} className="space-y-6 max-w-3xl mx-auto w-full">
          <h2 className="text-xl font-semibold text-green-800">Add New Product</h2>

          {/* Product Images */}
          <div>
            <p className="text-base font-medium">Product Images</p>
            <div className="flex flex-wrap gap-3 mt-2">
              {[...Array(4)].map((_, index) => (
                <label key={index} htmlFor={`image${index}`} className="cursor-pointer">
                  <input
                    type="file"
                    id={`image${index}`}
                    hidden
                    accept="image/*"
                    onChange={(e) => {
                      const updatedFiles = [...image];
                      updatedFiles[index] = e.target.files[0];
                      setImage(updatedFiles);
                    }}
                  />
                  <div className="w-24 h-24 border border-dashed rounded bg-gray-100 flex items-center justify-center text-xs text-gray-500">
                    {image[index] ? (
                      <img
                        src={URL.createObjectURL(image[index])}
                        alt={`preview-${index}`}
                        className="w-full h-full object-cover rounded"
                      />
                    ) : (
                      <span>No File</span>
                    )}
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-3">
            <input
              type="text"
              name="name"
              placeholder="Product Name"
              className="w-full border rounded px-4 py-2"
              value={data.name}
              onChange={onChangeHandler}
              required
            />
            <textarea
              name="description"
              placeholder="Product Description"
              className="w-full border rounded px-4 py-2"
              rows="3"
              value={data.description}
              onChange={onChangeHandler}
              required
            ></textarea>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <select
                name="inStock"
                className="border rounded px-3 py-2"
                onChange={onChangeHandler}
                value={data.inStock}
              >
                <option value="false">Out of Stock</option>
                <option value="true">In Stock</option>
              </select>

              <input
                name="rating"
                type="number"
                placeholder="Rating (e.g. 4.5)"
                className="border rounded px-3 py-2"
                onChange={onChangeHandler}
                value={data.rating}
                required
              />

              <input
                name="location"
                type="text"
                placeholder="Location"
                className="border rounded px-3 py-2 sm:col-span-2"
                onChange={onChangeHandler}
                value={data.location}
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <select
                name="category"
                className="border rounded px-3 py-2"
                onChange={onChangeHandler}
                value={data.category}
              >
                <option>Fruits</option>
                <option>Vegetables</option>
                <option>Grains</option>
                <option>Legumes</option>
                <option>Root Crops</option>
                <option>Spices</option>
                <option>Potatoes</option>
                <option>Root Vegetable</option>
              </select>

              <input
                name="price"
                type="number"
                placeholder="Price"
                className="border rounded px-3 py-2"
                onChange={onChangeHandler}
                value={data.price}
                required
              />

              <input
                name="offerPrice"
                type="number"
                placeholder="Offer Price"
                className="border rounded px-3 py-2"
                onChange={onChangeHandler}
                value={data.offerPrice}
                required
              />
            </div>
          </div>

          {/* Farmer Info */}
          <div className="pt-6 border-t">
            <h3 className="font-semibold mb-2">Farmer Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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

              <div className="col-span-1 sm:col-span-2">
                <label className="block">
                  <span className="font-medium text-sm">Upload Farmer Image</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="mt-1 block"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) setFarmerImageFile(file);
                    }}
                  />
                  {farmerImageFile && (
                    <img
                      src={URL.createObjectURL(farmerImageFile)}
                      alt="Farmer"
                      className="w-24 h-24 mt-2 object-cover rounded border"
                    />
                  )}
                </label>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`px-8 py-2.5 bg-green-600 text-white font-medium rounded ${
              loading ? "opacity-60 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Adding..." : "Add Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
