import React, { useEffect, useState } from "react";
import axios from "axios";
import { Trash2, Pencil } from "lucide-react";
import { toast } from "react-hot-toast";

const AllFarmers = () => {
  const url = "http://localhost:3000";
  const [farmers, setFarmers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFarmers = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${url}/api/farmer/getall`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFarmers(res.data.farmers || []);
    } catch (err) {
      console.error("❌ Failed to fetch farmers:", err);
    } finally {
      setLoading(false);
    }
  };

  const deleteFarmer = async (id) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`${url}/api/farmer/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Farmer deleted successfully!");
      setFarmers((prev) => prev.filter((f) => f._id !== id));
    } catch (err) {
      console.error("❌ Failed to delete farmer:", err);
      toast.error("Failed to delete farmer.");
    }
  };

  const handleEdit = (farmer) => {
    // TODO: Implement modal or navigation to edit page
    toast(`Editing farmer: ${farmer.name}`);
  };

  useEffect(() => {
    fetchFarmers();
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen text-sm font-sans">
      <h2 className="text-2xl font-bold mb-6 text-green-800">All Registered Farmers</h2>

      {loading ? (
        <p className="text-gray-600">Loading farmers...</p>
      ) : farmers.length === 0 ? (
        <p className="text-gray-500">No farmers found.</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow border">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-green-700 text-white">
              <tr>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Farm Name</th>
                <th className="px-4 py-2 text-left">Location</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">Registered</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {farmers.map((farmer) => (
                <tr key={farmer._id} className="hover:bg-green-50 transition duration-150">
                  <td className="px-4 py-3 font-medium text-gray-800">{farmer.name}</td>
                  <td className="px-4 py-3 text-gray-700">{farmer.email}</td>
                  <td className="px-4 py-3 text-gray-700">{farmer.farmName || "-"}</td>
                  <td className="px-4 py-3 text-gray-700">{farmer.location || "-"}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-block px-3 py-1 text-xs rounded-full font-semibold ${
                        farmer.status === "Verified"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {farmer.status || "Pending"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-600">
                    {farmer.createdAt
                      ? new Date(farmer.createdAt).toLocaleDateString()
                      : "-"}
                  </td>
                  <td className="px-4 py-3 flex gap-3 items-center">
                    <button
                      onClick={() => handleEdit(farmer)}
                      className="text-blue-600 hover:text-blue-800"
                      title="Edit Farmer"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteFarmer(farmer._id)}
                      className="text-red-600 hover:text-red-800"
                      title="Delete Farmer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AllFarmers;
