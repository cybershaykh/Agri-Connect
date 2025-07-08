import React, { useEffect, useState, useContext } from "react";
import axios from "axios";

const AllUsers = () => {
  const url = "https://backend1-uyy5.onrender.com"; 
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${url}/api/user/getall`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data.users);
    } catch (err) {
      console.error("❌ Failed to fetch users:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <h2 className="text-2xl font-bold text-green-800 mb-6">👥 All Users</h2>

      {loading ? (
        <div className="text-center text-gray-600">Loading users...</div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow border">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-green-800 text-white">
              <tr>
                <th className="px-4 py-3 border">#</th>
                <th className="px-4 py-3 border">Name</th>
                <th className="px-4 py-3 border">Email</th>
                <th className="px-4 py-3 border">Role</th>
                <th className="px-4 py-3 border">Joined</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, i) => (
                <tr key={user._id} className="hover:bg-green-50">
                  <td className="px-4 py-2 border text-center">{i + 1}</td>
                  <td className="px-4 py-2 border">{user.name}</td>
                  <td className="px-4 py-2 border">{user.email}</td>
                  <td className="px-4 py-2 border">
                    <span
                      className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold ${
                        user.isAdmin
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      {user.isAdmin ? "Admin" : "User"}
                    </span>
                  </td>
                  <td className="px-4 py-2 border">
                    {new Date(user.createdAt).toLocaleDateString()}
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

export default AllUsers;
