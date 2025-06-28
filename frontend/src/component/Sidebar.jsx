import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Wheat,
  PlusSquare,
  ShoppingBag,
  List,
  Menu,
  X,
} from "lucide-react";

const Sidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const NavItem = ({ icon: Icon, label, href = "#" }) => (
    <Link to={href} className="no-underline text-white">
      <div className="flex items-center space-x-3 cursor-pointer hover:bg-green-700 p-2 rounded-lg">
        <Icon className="w-5 h-5" />
        {sidebarOpen && <span className="font-medium">{label}</span>}
      </div>
    </Link>
  );

  return (
    <div
      className={`${
        sidebarOpen ? "w-64" : "w-16"
      } bg-gradient-to-b from-green-800 to-green-900 text-white transition-all duration-300 min-h-screen flex flex-col relative`}
    >
      {/* Toggle Button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="absolute top-4 right-4 text-white focus:outline-none z-10"
      >
        {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Header */}
      <div className="p-4 border-b border-green-700">
        <div className="flex items-center space-x-3">
          <div className="bg-green-600 p-2 rounded-lg">
            <Wheat className="h-6 w-6" />
          </div>
          {sidebarOpen && (
            <div>
              <h1 className="font-bold text-lg">FarmTrack</h1>
              <p className="text-green-200 text-sm">Farm Management</p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        <NavItem icon={PlusSquare} label="Add Product" href="/add-product" />
        <NavItem icon={ShoppingBag} label="Orders" href="/orders" />
        <NavItem icon={List} label="List Product" href="/list-product" />
      </nav>
    </div>
  );
};

export default Sidebar;
