import { BarChart3, LayoutDashboard, PackageCheck, ShoppingBag, Tractor, Users } from 'lucide-react';
import React from 'react';

const Sidebar = () => {
  const menuItems = [
    { name: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" />, href: '/dashboard' },
    { name: 'Product List', icon: <PackageCheck className="w-5 h-5" />, href: '/all-products' },
    { name: 'Orders', icon: <ShoppingBag className="w-5 h-5" />, href: '/orders' },
    { name: 'All Users', icon: <Users className="w-5 h-5" />, href: '/all-users' },
    { name: 'All Farmers', icon: <Tractor className="w-5 h-5" />, href: '/all-farmers' },
    { name: 'Analytics', icon: <BarChart3 className='w-5 h-5' />, href: '/analytics' },

  ];

  return (
    // <div className="w-64 min-h-screen bg-green-900 text-white p-6 shadow-lg">
    <div className="w-64 min-h-screen bg-gradient-to-b from-green-800 to-green-900 text-white shadow-lg flex flex-col">
      {/* Logo / Title */}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-green-700">
        <div className="bg-white text-green-800 rounded-full p-2">
          <Tractor className="w-5 h-5" />
        </div>
        <div>
          <h1 className="text-lg font-bold">AgriConnect</h1>
          <p className="text-xs text-green-200">Admin Dashboard</p>
        </div>
      </div>
      <nav className="flex flex-col space-y-4 cursor-pointer">
        {menuItems.map((item) => (
          <a
            key={item.name}
            href={item.href}
            className="flex items-center gap-3 px-4 py-2 rounded-md hover:bg-gray-700 transition-all duration-200"
          >
            <span className="text-white">{item.icon}</span>
            <span className="text-sm font-medium">{item.name}</span>
          </a>
        ))}
      </nav>
      <div className="mt-auto px-4 py-2 border-t border-green-700">
        <p className="text-xs text-green-200">© 2025 AgriConnect. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Sidebar;
