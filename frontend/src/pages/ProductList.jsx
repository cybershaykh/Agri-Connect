import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { StoreContext } from "../component/context/StoreContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "../component/Sidebar";

const ProductList = () => {
  const { url } = useContext(StoreContext);
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
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 w-full md:p-10 p-4">
        <h2 className="pb-4 text-lg font-semibold text-green-900">All Products</h2>

        {loading ? (
          <p className="text-center text-gray-500">Loading products...</p>
        ) : products.length === 0 ? (
          <p className="text-center text-gray-500">No products found.</p>
        ) : (
          <div className="flex flex-col items-center max-w-5xl w-full overflow-hidden rounded-md bg-white border border-gray-300">
            <table className="table-fixed w-full">
              <thead className="text-gray-900 text-sm text-left bg-green-100">
                <tr>
                  <th className="w-2/3 md:w-2/5 px-4 py-3 font-medium truncate">Product</th>
                  <th className="px-4 py-3 font-medium truncate max-sm:hidden">Category</th>
                  <th className="px-4 py-3 font-medium truncate">Price</th>
                  <th className="px-4 py-3 font-medium truncate">In Stock</th>
                  <th className="px-4 py-3 font-medium truncate max-sm:hidden">Action</th>
                </tr>
              </thead>
              <tbody className="text-sm text-gray-600">
                {products.map((product, index) => (
                  <tr key={index} className="border-t border-gray-200 hover:bg-gray-50">
                    <td className="md:px-4 pl-2 md:pl-4 py-3 flex items-center space-x-3">
                      <div className="bg-gray-100 rounded p-1">
                        <img
                          src={product.image[0]}
                          alt="Product"
                          className="w-14 h-14 object-cover rounded"
                        />
                      </div>
                      <span className="truncate font-medium text-gray-800">{product.name}</span>
                    </td>
                    <td className="px-4 py-3 max-sm:hidden">{product.category}</td>
                    <td className="px-4 py-3 font-semibold">₦{product.offerPrice}</td>
                    <td className="px-4 py-3 text-center">{product.inStock ? "Yes" : "No"}</td>
                    <td className="px-4 py-3 max-sm:hidden">
                      <button
                        onClick={() => removeProduct(product._id)}
                        className="text-red-600 hover:text-red-800 font-semibold"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;
