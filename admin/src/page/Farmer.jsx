import React, { useEffect, useState } from "react";
import axios from "axios";

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
                <th className="px-4 py-2 text-left">Phone</th>
                <th className="px-4 py-2 text-left">Location</th>
                <th className="px-4 py-2 text-left">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {farmers.map((farmer) => (
                <tr key={farmer._id} className="hover:bg-green-50 transition duration-150">
                  <td className="px-4 py-3 font-medium text-gray-800">{farmer.name}</td>
                  <td className="px-4 py-3 text-gray-700">{farmer.email}</td>
                  <td className="px-4 py-3 text-gray-700">{farmer.phone || "-"}</td>
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
