import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const ProductList = () => {
  const url = "https://backend1-uyy5.onrender.com";
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/product/getall`);
      setProducts(response.data.products || []);
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  const removeProduct = async (productId) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await axios.delete(`${url}/api/product/delete/${productId}`);
      setProducts((prev) => prev.filter((item) => item._id !== productId));
      toast.success("Product deleted successfully");
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Failed to delete product");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="flex-1 min-h-screen flex flex-col p-4 md:p-8 bg-gray-50">
      <h2 className="pb-4 text-xl font-semibold text-green-800">All Products</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm bg-white rounded shadow">
          <thead className="text-left text-gray-700 bg-gray-100 border-b">
            <tr>
              <th className="px-4 py-3 whitespace-nowrap">Product</th>
              <th className="px-4 py-3 whitespace-nowrap hidden sm:table-cell">Category</th>
              <th className="px-4 py-3 whitespace-nowrap">Price</th>
              <th className="px-4 py-3 whitespace-nowrap">Stock</th>
              <th className="px-4 py-3 whitespace-nowrap">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y text-gray-600">
            {products.map((product, index) => (
              <tr key={index} className="hover:bg-gray-50 transition">
                <td className="px-4 py-3 flex items-center space-x-3">
                  <div className="w-14 h-14 flex-shrink-0 bg-gray-100 rounded">
                    <img
                      src={product.image[0]}
                      alt="Product"
                      className="w-full h-full object-cover rounded"
                    />
                  </div>
                  <div className="truncate">{product.name}</div>
                </td>
                <td className="px-4 py-3 hidden sm:table-cell">{product.category}</td>
                <td className="px-4 py-3">₦{product.offerPrice}</td>
                <td className="px-4 py-3">
                  {product.inStock ? (
                    <span className="text-green-600 font-semibold">In Stock</span>
                  ) : (
                    <span className="text-red-600 font-semibold">Out of Stock</span>
                  )}
                </td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => removeProduct(product._id)}
                    className="text-red-600 hover:text-red-800 font-semibold"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {products.length === 0 && !loading && (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-400">
                  No products available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductList;
