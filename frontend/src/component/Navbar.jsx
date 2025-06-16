import React, { useState, useEffect, useRef, useContext } from "react";
import {
  Menu,
  X,
  ShoppingBasket,
  User,
  LogIn,
  LayoutDashboard,
  LogOut,
  UserCircle
} from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";
import { StoreContext } from "./context/StoreContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const { token, setToken, user } = useContext(StoreContext);
  const navigate = useNavigate();
  const userMenuRef = useRef(null);

  useEffect(() => {
    AOS.init({ duration: 800 });

    const handleClickOutside = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setUserDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("cart");
    setToken("");
    navigate("/")
    setUserDropdownOpen(false);
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
              className="flex items-center gap-1 text-gray-600 hover:text-green-600"
            >
              {user ? (
                <>
                  <span className="hidden md:inline text-sm font-medium">{user?.name || 'My Account'}</span>
                  {user?.avatar ? (
                    <img 
                      src={user.avatar} 
                      alt="Profile" 
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <UserCircle className="w-6 h-6" />
                  )}
                </>
              ) : (
                <User className="w-6 h-6" />
              )}
            </button>
            {userDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white border rounded-md shadow-md z-50">
                {!token ? (
                  <>
                    <a 
                      href="/login" 
                      className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-600"
                      onClick={() => setUserDropdownOpen(false)}
                    >
                      <LogIn className="w-4 h-4" />
                      Login
                    </a>
                    <a 
                      href="/register" 
                      className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-600 border-t border-gray-100"
                      onClick={() => setUserDropdownOpen(false)}
                    >
                      <User className="w-4 h-4" />
                      Register
                    </a>
                  </>
                ) : (
                  <>
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900 truncate">{user?.name || 'Welcome'}</p>
                      <p className="text-xs text-gray-500 truncate">{user?.email || ''}</p>
                    </div>
                    <a 
                      href="/profile" 
                      className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-600"
                      onClick={() => setUserDropdownOpen(false)}
                    >
                      <User className="w-4 h-4" />
                      My Profile
                    </a>
                    <a 
                      href="/orders" 
                      className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-600"
                      onClick={() => setUserDropdownOpen(false)}
                    >
                      <ShoppingBasket className="w-4 h-4" />
                      My Orders
                    </a>
                    <button
                      onClick={logout}
                      className="flex w-full items-center gap-2 px-4 py-2 text-left text-gray-700 hover:bg-green-50 hover:text-green-600 border-t border-gray-100"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Get Started Button (desktop only) - only show when not logged in */}
          {/* {!token && (
            <a href="/register" className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition hidden md:inline-block">
              Get Started
            </a>
          )} */}

          {/* Cart Icon */}
          <a href="/cart" className="relative text-gray-600 hover:text-green-600">
            <ShoppingBasket className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-green-600 text-white text-xs rounded-full flex items-center justify-center">
              {user?.cartItemsCount || 0}
            </span>
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
          <a href="/" className="block text-gray-600 hover:text-green-600" onClick={() => setMobileMenuOpen(false)}>Home</a>
          <a href="/products" className="block text-gray-600 hover:text-green-600" onClick={() => setMobileMenuOpen(false)}>Products</a>
          <a href="/farmers" className="block text-gray-600 hover:text-green-600" onClick={() => setMobileMenuOpen(false)}>Farmers</a>
          <a href="/about" className="block text-gray-600 hover:text-green-600" onClick={() => setMobileMenuOpen(false)}>About</a>
          <a href="#contact" className="block text-gray-600 hover:text-green-600" onClick={() => setMobileMenuOpen(false)}>Contact</a>

          {/* Mobile Auth Dropdown */}
          <div className="mt-4 pt-2 border-t border-gray-200">
            <div className="text-gray-600 font-medium mb-1">Account</div>
            {!token ? (
              <>
                <a 
                  href="/login" 
                  className="flex items-center gap-2 text-gray-600 hover:text-green-600 px-2 py-1"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <LogIn className="w-4 h-4" />
                  Login
                </a>
                <a 
                  href="/register" 
                  className="flex items-center gap-2 text-gray-600 hover:text-green-600 px-2 py-1"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <User className="w-4 h-4" />
                  Register
                </a>
              </>
            ) : (
              <>
                <div className="px-2 py-1 mb-1">
                  <p className="text-sm font-medium text-gray-900">{user?.name || 'Welcome'}</p>
                  <p className="text-xs text-gray-500">{user?.email || ''}</p>
                </div>
                <a 
                  href="/profile" 
                  className="flex items-center gap-2 text-gray-600 hover:text-green-600 px-2 py-1"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <User className="w-4 h-4" />
                  My Profile
                </a>
                <a 
                  href="/orders" 
                  className="flex items-center gap-2 text-gray-600 hover:text-green-600 px-2 py-1"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <ShoppingBasket className="w-4 h-4" />
                  My Orders
                </a>
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="flex w-full items-center gap-2 text-gray-600 hover:text-green-600 px-2 py-1 mt-1"
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