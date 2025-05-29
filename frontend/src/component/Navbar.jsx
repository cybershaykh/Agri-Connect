import React, { useState, useEffect, useRef } from "react";
import {
  Menu,
  X,
  ShoppingBasket,
  User,
  LogIn,
  LayoutDashboard,
  LogOut
} from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Simulate auth status
  const userMenuRef = useRef(null);

  useEffect(() => {
    AOS.init({ duration: 800 });

    // Example: fetch login state from localStorage
    const token = localStorage.getItem("authToken");
    setIsLoggedIn(!!token);

    const handleClickOutside = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setUserDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsLoggedIn(false);
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50" data-aos="fade-down">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="text-2xl font-extrabold text-green-600 tracking-wide hover:text-green-700 transition">
          🌾 Agrone
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-6">
          <a href="/" className="text-gray-600 hover:text-green-600 font-medium">Home</a>
          <a href="/products" className="text-gray-600 hover:text-green-600 font-medium">Products</a>
          <a href="/farmers" className="text-gray-600 hover:text-green-600 font-medium">Farmers</a>
          <a href="/about" className="text-gray-600 hover:text-green-600 font-medium">About</a>
          <a href="#contact" className="text-gray-600 hover:text-green-600 font-medium">Contact</a>
        </nav>

        {/* Right Buttons */}
        <div className="flex items-center space-x-4 relative">
          {/* User Icon Dropdown */}
          <div ref={userMenuRef} className="relative">
            <button
              onClick={() => setUserDropdownOpen(!userDropdownOpen)}
              className="text-gray-600 hover:text-green-600"
            >
              <User className="w-6 h-6" />
            </button>
            {userDropdownOpen && (
              <div className="absolute right-0 mt-2 w-44 bg-white border rounded-md shadow-md z-50">
                {!isLoggedIn ? (
                  <a href="/login" className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-600">
                    <LogIn className="w-4 h-4" />
                    Login
                  </a>
                ) : (
                  <>
                    <a href="/dashboard" className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-600">
                      <LayoutDashboard className="w-4 h-4" />
                      Dashboard
                    </a>
                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center gap-2 px-4 py-2 text-left text-gray-700 hover:bg-green-50 hover:text-green-600"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Get Started Button (desktop only) */}
          <a href="#" className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition hidden md:inline-block">
            Get Started
          </a>

          {/* Cart Icon */}
          <a href="/cart" className="relative text-gray-600 hover:text-green-600">
            <ShoppingBasket className="w-6 h-6" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-green-600 rounded-full"></span>
          </a>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-gray-600"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white px-4 py-4 border-t border-gray-200 space-y-3">
          <a href="/" className="block text-gray-600 hover:text-green-600">Home</a>
          <a href="/products" className="block text-gray-600 hover:text-green-600">Products</a>
          <a href="/farmers" className="block text-gray-600 hover:text-green-600">Farmers</a>
          <a href="/about" className="block text-gray-600 hover:text-green-600">About</a>
          <a href="#contact" className="block text-gray-600 hover:text-green-600">Contact</a>

          {/* Mobile Auth Dropdown */}
          <div className="mt-2">
            <div className="text-gray-600 font-medium mb-1">Account</div>
            {!isLoggedIn ? (
              <a href="/login" className="flex items-center gap-2 text-gray-600 hover:text-green-600 px-2 py-1">
                <LogIn className="w-4 h-4" />
                Login
              </a>
            ) : (
              <>
                <a href="/dashboard" className="flex items-center gap-2 text-gray-600 hover:text-green-600 px-2 py-1">
                  <LayoutDashboard className="w-4 h-4" />
                  Dashboard
                </a>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-gray-600 hover:text-green-600 px-2 py-1"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
