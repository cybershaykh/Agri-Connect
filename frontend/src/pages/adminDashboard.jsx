// AdminDashboard.jsx
import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Home,
  Users,
  X,
  BarChart3,
  Tractor,
  ShoppingCart,
  List,
} from "lucide-react";

import AllUsers from "./AllUsers";
import AllFarmers from "./AllFarmer";
import ProductList from "./AllProduct";
import Dashboard from "./DashboardStat";
import { StoreContext } from "../component/context/StoreContext";

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Dashboard");

  const { user, token } = useContext(StoreContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token || user.role !== "admin") {
      navigate("/"); 
    }
  }, [user, token, navigate]);
  if (!user) return <div className="p-10 text-center text-gray-500">Loading...</div>;


  const components = {
    Dashboard: <Dashboard />,
    "All Users": <AllUsers />,
    "All Farmers": <AllFarmers />,
    "All Products": <ProductList />,
  };

  const sidebarItems = [
    { icon: Home, label: "Dashboard" },
    { icon: Users, label: "All Users" },
    { icon: Tractor, label: "All Farmers" },
    { icon: List, label: "All Products" },
    { icon: ShoppingCart, label: "All Orders" },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-green-900 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}
      >
        <div className="flex items-center justify-between h-16 px-6 bg-green-800">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">A</span>
            </div>
            <span className="text-white font-semibold">AdminPanel</span>
          </div>
          <button
            className="lg:hidden text-white"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="px-4 py-6">
          <div className="mb-6">
            <div className="flex items-center space-x-3 p-3 bg-green-500 rounded-lg">
              <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                AD
              </div>
              <div className="text-white">
                <p className="text-sm font-medium">Admin</p>
                <p className="text-xs opacity-90">Dashboard</p>
              </div>
            </div>
          </div>

          <nav className="space-y-2">
            {sidebarItems.map((item, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(item.label)}
                className={`w-full text-left flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === item.label
                    ? "bg-green-800 text-white"
                    : "text-gray-300 hover:bg-green-800 hover:text-white"
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-auto">
        <div className="lg:hidden mb-4">
          <button
            className="bg-gray-200 px-4 py-2 rounded text-sm"
            onClick={() => setSidebarOpen(true)}
          >
            Open Menu
          </button>
        </div>

        <h1 className="text-2xl font-bold text-green-800 mb-4">{activeTab}</h1>
        <div className="bg-white shadow rounded-lg p-6">
          {components[activeTab] || <div>Component not found</div>}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
