// Dashboard.jsx
import React from "react";
import {
  Users,
  Wheat,
  DollarSign,
  ShoppingCart,
  ArrowUpRight,
  ArrowDownRight,
  BarChart3,
  Leaf,
  TrendingUp,
  Globe,
  MapPin,
  ShieldCheck,
} from "lucide-react";
import {
  BarChart,
  Bar,
  Pie,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart as RePieChart,
  Legend,
  LineChart,
  Line,
} from "recharts";

const cropStats = [
  { name: "Wheat", value: 450 },
  { name: "Maize", value: 300 },
  { name: "Rice", value: 200 },
  { name: "Cassava", value: 100 },
];

const COLORS = ["#16a34a", "#22c55e", "#84cc16", "#a3e635"];

const revenueData = [
  { month: "Jan", revenue: 240000 },
  { month: "Feb", revenue: 210000 },
  { month: "Mar", revenue: 280000 },
  { month: "Apr", revenue: 320000 },
  { month: "May", revenue: 300000 },
  { month: "Jun", revenue: 350000 },
];

const roleData = [
  { name: "Farmers", value: 8234, color: "#16a34a" },
  { name: "Users", value: 12847, color: "#3b82f6" },
];

const geoData = [
  { region: "North", farmers: 3400 },
  { region: "South", farmers: 2900 },
  { region: "East", farmers: 1800 },
  { region: "West", farmers: 2800 },
];

const Dashboard = () => {
  return (
    <div className="p-6 bg-white dark:bg-gray-900 min-h-screen text-gray-800 dark:text-gray-100">
      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard title="Total Users" value="12,847" percentage="+12.5% from last month" icon={<Users className="h-4 w-4" />} percentageColor="text-green-600" />
        <StatCard title="Active Farmers" value="8,234" percentage="+8.2% from last month" icon={<Wheat className="h-4 w-4" />} percentageColor="text-green-600" />
        <StatCard title="Total Revenue" value="$2.4M" percentage="+15.3% from last month" icon={<DollarSign className="h-4 w-4" />} percentageColor="text-green-600" />
        <StatCard title="Transactions" value="45,678" percentage="-2.1% from last month" icon={<ShoppingCart className="h-4 w-4" />} percentageColor="text-red-600" isNegative />
      </div>

      {/* Crop & Growth Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card icon={Users} title="Total Farmers" value="12,430" growth={6.2} />
        <Card icon={Wheat} title="Total Crops" value="78,290" growth={3.4} />
        <Card icon={Leaf} title="Top Crop" value="Wheat" growth={9.5} />
        <Card icon={TrendingUp} title="User Growth" value="1,230" growth={12.7} />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-lg font-semibold mb-2">Revenue Overview</h3>
          <p className="text-sm text-gray-500 mb-4">Monthly revenue for the past 6 months</p>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="revenue" fill="#16a34a" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-lg font-semibold mb-2">User Role Distribution</h3>
          <p className="text-sm text-gray-500 mb-4">Breakdown of user types</p>
          <ResponsiveContainer width="100%" height={300}>
            <RePieChart>
              <Pie data={roleData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                {roleData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </RePieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* More Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Top Crops Distribution</h3>
          <p className="text-sm text-gray-500 mb-4">Based on total production</p>
          <ResponsiveContainer width="100%" height={300}>
            <RePieChart>
              <Pie data={cropStats} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} innerRadius={40} paddingAngle={4}>
                {cropStats.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </RePieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Farmer Distribution by Region</h3>
          <p className="text-sm text-gray-500 mb-4">North, South, East, West</p>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={geoData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="region" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="farmers" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, percentage, icon, percentageColor, isNegative = false }) => (
  <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl shadow">
    <div className="flex items-center justify-between mb-2">
      <h4 className="text-sm font-medium text-gray-600 dark:text-gray-300">{title}</h4>
      <div className="text-gray-500 dark:text-gray-400">{icon}</div>
    </div>
    <div className="text-2xl font-bold">{value}</div>
    <div className={`text-xs mt-1 flex items-center ${percentageColor}`}>
      {isNegative ? <ArrowDownRight className="h-3 w-3 mr-1" /> : <ArrowUpRight className="h-3 w-3 mr-1" />} 
      {percentage}
    </div>
  </div>
);

const Card = ({ icon: Icon, title, value, growth }) => (
  <div className="bg-white p-5 rounded-xl shadow-md flex items-center justify-between">
    <div>
      <p className="text-sm text-gray-500">{title}</p>
      <h2 className="text-2xl font-bold text-gray-800">{value}</h2>
      <p className={`text-xs mt-1 ${growth >= 0 ? "text-green-600" : "text-red-600"}`}>
        <ArrowUpRight className="inline w-3 h-3 mr-1" />
        {growth >= 0 ? `+${growth}%` : `${growth}%`} from last month
      </p>
    </div>
    <div className={`p-3 rounded-full bg-green-50`}>
      <Icon className="w-6 h-6 text-green-600" />
    </div>
  </div>
);

export default Dashboard;
