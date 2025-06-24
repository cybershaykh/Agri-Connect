import { PackageCheck, PlusSquare, ShoppingBag } from 'lucide-react';
import React from 'react';

const Sidebar = () => {
  const menuItems = [
    { name: 'Add Product', icon: <PlusSquare className="w-5 h-5" />, href: '/addproduct' },
    { name: 'Product List', icon: <PackageCheck className="w-5 h-5" />, href: '/product-list' },
    { name: 'Orders', icon: <ShoppingBag className="w-5 h-5" />, href: '/orders' },
  ];

  return (
    <div className="w-64 min-h-screen bg-green-900 text-white p-6 shadow-lg">
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
    </div>
  );
};

export default Sidebar;
