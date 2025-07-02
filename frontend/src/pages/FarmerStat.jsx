import React, { useContext, useEffect, useState } from "react";
import {
  Wheat,
  Sun,
  PlusSquare,
  ShoppingBag,
  Menu,
  DollarSign,
  MapPin,
  AlertTriangle,
  List,
} from "lucide-react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../component/context/StoreContext";

const cropYieldData = [
  { month: "Jan", wheat: 40, corn: 30, soybeans: 20, grains: 50 },
  { month: "Feb", wheat: 50, corn: 40, soybeans: 25, grains: 45 },
  { month: "Mar", wheat: 55, corn: 45, soybeans: 35, grains: 25 },
  { month: "Apr", wheat: 60, corn: 50, soybeans: 40, grains: 30 },
];
const weatherData = [
  { day: "Mon", temp: 22, humidity: 65 },
  { day: "Tue", temp: 25, humidity: 70 },
  { day: "Wed", temp: 23, humidity: 60 },
  { day: "Thu", temp: 26, humidity: 75 },
  { day: "Fri", temp: 24, humidity: 68 },
  { day: "Sat", temp: 27, humidity: 72 },
  { day: "Sun", temp: 25, humidity: 66 },
];
const getStatusColor = (status) => {
  switch (status) {
    case "Completed":
      return "text-green-600";
    case "Pending":
      return "text-yellow-500";
    case "In Progress":
      return "text-blue-500";
    default:
      return "text-gray-500";
  }
};

const recentActivities = [
  {
    id: 1,
    field: "North Field A",
    activity: "Wheat Planting",
    quantity: "25 acres",
    status: "Completed",
    date: "2024-06-20",
  },
  {
    id: 2,
    field: "South Field B",
    activity: "Corn Irrigation",
    quantity: "15 acres",
    status: "In Progress",
    date: "2024-06-22",
  },
  {
    id: 3,
    field: "East Field C",
    activity: "Soybean Harvest",
    quantity: "30 acres",
    status: "Scheduled",
    date: "2024-06-25",
  },
  {
    id: 4,
    field: "West Field D",
    activity: "Soil Testing",
    quantity: "20 acres",
    status: "Pending",
    date: "2024-06-23",
  },
];

const fieldStatusData = [
  { name: "Planted", value: 40, color: "#22c55e" },
  { name: "Harvested", value: 30, color: "#3b82f6" },
  { name: "Fallow", value: 20, color: "#f59e0b" },
  { name: "Irrigated", value: 10, color: "#ef4444" },
  { name: "Weed Control", value: 5, color: "#8b5cf6" },
];

const MetricCard = ({ title, value, change, icon: Icon, color }) => (
  <div className="bg-white shadow rounded-lg p-4 flex items-center space-x-4">
    <div
      className={`p-2 rounded-full`}
      style={{ backgroundColor: `${color}20` }}
    >
      <Icon className="w-6 h-6" style={{ color }} />
    </div>
    <div>
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-xl font-bold text-gray-800">{value}</p>
      <p className="text-sm text-gray-400">{change}</p>
    </div>
  </div>
);

const FarmerStat = () => {
  const { user, token } = useContext(StoreContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token || user?.role !== "farmer") {
      navigate("/");
    }
  }, [user, token, navigate]);

  if (!user) return <div className="p-10 text-center text-gray-500">Loading...</div>;

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Main Section */}
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          {/* Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <MetricCard
              title="Total Revenue"
              value="$125,000"
              change="+12.5%"
              icon={DollarSign}
              color="#16a34a"
            />
            <MetricCard
              title="Active Fields"
              value="12"
              change="+2"
              icon={MapPin}
              color="#3b82f6"
            />
            <MetricCard
              title="Livestock Count"
              value="255"
              change="+8"
              icon={Wheat}
              color="#9333ea"
            />
            <MetricCard
              title="Weather Alerts"
              value="2"
              change="High Priority"
              icon={AlertTriangle}
              color="#f97316"
            />
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Crop Yield Bar Chart */}
            <div className="bg-white rounded-lg shadow p-6 lg:col-span-2">
              <h3 className="text-lg font-bold text-gray-800 mb-1">
                Crop Yield Trends
              </h3>
              <p className="text-sm text-gray-500 mb-4">
                Monthly yield comparison across different crops
              </p>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={cropYieldData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="wheat" fill="#22c55e" name="Wheat" />
                  <Bar dataKey="corn" fill="#3b82f6" name="Corn" />
                  <Bar dataKey="grains" fill="" name="Grains" />
                  <Bar dataKey="soybeans" fill="#10b981" name="Soybeans" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Field Status Pie Chart */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-1">
                Field Status
              </h3>
              <p className="text-sm text-gray-500 mb-4">
                Current status of all fields
              </p>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={fieldStatusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {fieldStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-4 space-y-2">
                {fieldStatusData.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-sm">{item.name}</span>
                    </div>
                    <span className="text-sm font-medium">{item.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Recent Activities */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-1">
              Recent Field Activities
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              Latest farming operations and tasks
            </p>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex flex-col space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{activity.field}</span>
                      <span
                        className={`text-xs font-medium ${getStatusColor(
                          activity.status
                        )}`}
                      >
                        {activity.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{activity.activity}</p>
                    <p className="text-xs text-gray-500">
                      {activity.quantity} • {activity.date}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Weather Forecast */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-1">
              7-Day Weather Forecast
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              Temperature and humidity trends
            </p>

            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={weatherData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="temp"
                  stroke="#f59e0b"
                  name="Temperature (°C)"
                />
                <Line
                  type="monotone"
                  dataKey="humidity"
                  stroke="#3b82f6"
                  name="Humidity (%)"
                />
              </LineChart>
            </ResponsiveContainer>

            <div className="mt-4 grid grid-cols-7 gap-2 text-center">
              {weatherData.map((day, index) => (
                <div key={index}>
                  <p className="text-xs font-medium">{day.day}</p>
                  <Sun className="h-4 w-4 mx-auto text-yellow-500 my-1" />
                  <p className="text-xs">{day.temp}°C</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmerStat;