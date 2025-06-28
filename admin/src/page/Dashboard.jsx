import React from "react";
import {
  Users,
  Tractor,
  UserCheck,
  DollarSign,
} from "lucide-react";

// Dummy Data (replace with API if needed)
const dashboardStats = {
  totalUsers: 1280,
  totalFarmers: 560,
  activeConnections: 312,
  monthlyRevenue: 93400,
  userGrowth: 8.5,
  farmerGrowth: 5.2,
  connectionGrowth: 6.8,
  revenueGrowth: 12.3,
};

const recentUsers = [
  { id: 1, name: "John Doe", email: "john@example.com", status: "Active", avatar: "" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", status: "Pending", avatar: "" },
];

const recentFarmers = [
  { id: 1, name: "Farmer Mike", location: "Kano", status: "Verified", avatar: "" },
  { id: 2, name: "Sarah Green", location: "Lagos", status: "Pending", avatar: "" },
];

const Dashboard = () => {
  return (
    <div className="p-4 md:p-6 w-full bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-semibold mb-6 text-green-800">Admin Dashboard</h1>

      {/* Top Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          {
            title: "Total Users",
            icon: <Users className="h-5 w-5 text-green-700" />,
            value: dashboardStats.totalUsers,
            growth: dashboardStats.userGrowth,
          },
          {
            title: "Total Farmers",
            icon: <Tractor className="h-5 w-5 text-green-700" />,
            value: dashboardStats.totalFarmers,
            growth: dashboardStats.farmerGrowth,
          },
          {
            title: "Active Connections",
            icon: <UserCheck className="h-5 w-5 text-green-700" />,
            value: dashboardStats.activeConnections,
            growth: dashboardStats.connectionGrowth,
          },
          {
            title: "Monthly Revenue",
            icon: <DollarSign className="h-5 w-5 text-green-700" />,
            value: `₦${dashboardStats.monthlyRevenue.toLocaleString()}`,
            growth: dashboardStats.revenueGrowth,
          },
        ].map((stat, idx) => (
          <div
            key={idx}
            className="bg-white p-4 rounded-lg border shadow-sm space-y-2"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-600">{stat.title}</p>
              {stat.icon}
            </div>
            <div className="text-2xl font-bold text-green-900">
              {stat.value}
            </div>
            <p className="text-xs text-gray-500">
              <span className="text-green-600">+{stat.growth}%</span> from last
              month
            </p>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid gap-6 mt-10 lg:grid-cols-2">
        {/* Recent Users */}
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h3 className="text-lg font-semibold mb-2 text-green-800">Recent Users</h3>
          <p className="text-sm text-gray-500 mb-4">Latest user registrations</p>
          <div className="space-y-4">
            {recentUsers.map((user) => (
              <div key={user.id} className="flex items-center gap-4">
                <img
                  src={user.avatar || "/placeholder.svg"}
                  alt={user.name}
                  className="h-10 w-10 rounded-full object-cover bg-gray-100"
                />
                <div className="flex-1">
                  <p className="text-sm font-medium">{user.name}</p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                    user.status === "Active"
                      ? "bg-green-100 text-green-700"
                      : user.status === "Pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {user.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Farmers */}
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h3 className="text-lg font-semibold mb-2 text-green-800">Recent Farmers</h3>
          <p className="text-sm text-gray-500 mb-4">Latest farmer sign-ups</p>
          <div className="space-y-4">
            {recentFarmers.map((farmer) => (
              <div key={farmer.id} className="flex items-center gap-4">
                <img
                  src={farmer.avatar || "/placeholder.svg"}
                  alt={farmer.name}
                  className="h-10 w-10 rounded-full object-cover bg-gray-100"
                />
                <div className="flex-1">
                  <p className="text-sm font-medium">{farmer.name}</p>
                  <p className="text-xs text-gray-500">{farmer.location}</p>
                </div>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                    farmer.status === "Verified"
                      ? "bg-green-100 text-green-700"
                      : farmer.status === "Pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {farmer.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
