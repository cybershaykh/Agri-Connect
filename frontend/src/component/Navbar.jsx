import React, { useState, useEffect, useRef, useContext } from "react";
import {
  Menu,
  X,
  User,
  LogIn,
  LogOut,
  UserCircle,
  ShoppingCart,
  ShieldCheck,
} from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "./context/StoreContext";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [animateCart, setAnimateCart] = useState(false);

  const { token, setToken, user, cartItems } = useContext(StoreContext);
  const navigate = useNavigate();
  const userMenuRef = useRef(null);

  const isFarmer = user?.role === "farmer";
  const isAdmin = user?.role === "admin";
  const totalCartItems = Object.values(cartItems || {}).reduce((a, b) => a + b, 0);

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

  useEffect(() => {
    if (totalCartItems > 0) {
      setAnimateCart(true);
      const timer = setTimeout(() => setAnimateCart(false), 500);
      return () => clearTimeout(timer);
    }
  }, [totalCartItems]);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("cart");
    setToken("");
    navigate("/");
    setUserDropdownOpen(false);
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50" data-aos="fade-down">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-extrabold text-green-600 tracking-wide hover:text-green-700 transition">
          🌾 AgriConnect
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-6">
          <Link to="/" className="text-gray-600 hover:text-green-600 font-medium">Home</Link>
          {isAdmin && <Link to="/admindashboard" className="text-gray-600 hover:text-green-600 font-medium">Admin Dashboard</Link>}
          {isFarmer && (
            <>
              <Link to="/farmerdashboard" className="text-gray-600 hover:text-green-600 font-medium">Dashboard</Link>
              <Link to="/add-product" className="text-gray-600 hover:text-green-600 font-medium">Add Product</Link>
            </>
          )}
          {!isAdmin && !isFarmer && (
            <>
              <Link to="/all-products" className="text-gray-600 hover:text-green-600 font-medium">Products</Link>
              <Link to="/farmers" className="text-gray-600 hover:text-green-600 font-medium">Farmers</Link>
            </>
          )}
          <Link to="/about" className="text-gray-600 hover:text-green-600 font-medium">About</Link>
          <a href="#contact" className="text-gray-600 hover:text-green-600 font-medium">Contact</a>
        </nav>

        {/* Icons */}
        <div className="flex items-center space-x-4 relative">
          {!isFarmer && !isAdmin && (
            <Link to="/cart" className="relative group">
              <ShoppingCart className={`h-6 w-6 ${animateCart ? "animate-bounce" : ""}`} />
              {totalCartItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalCartItems}
                </span>
              )}
            </Link>
          )}

          {/* User Icon */}
          <div ref={userMenuRef} className="relative">
            <button onClick={() => setUserDropdownOpen(!userDropdownOpen)} className="flex items-center gap-1 text-gray-600 hover:text-green-600">
              {user ? (
                isAdmin ? (
                  <ShieldCheck className="w-6 h-6 text-green-600" title="Admin" />
                ) : user?.avatar ? (
                  <img src={user.avatar} alt="user" className="w-8 h-8 rounded-full object-cover" />
                ) : (
                  <UserCircle className="w-6 h-6" />
                )
              ) : (
                <User className="w-6 h-6" />
              )}
            </button>

            {userDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white border rounded-md shadow-md z-50">
                {!token ? (
                  <>
                    <Link to="/login" className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-600" onClick={() => setUserDropdownOpen(false)}>
                      <LogIn className="w-4 h-4" /> Login
                    </Link>
                    <Link to="/register" className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-600 border-t border-gray-100" onClick={() => setUserDropdownOpen(false)}>
                      <User className="w-4 h-4" /> Register
                    </Link>
                  </>
                ) : (
                  <>
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900 truncate">{user?.name || "Welcome"}</p>
                      <p className="text-xs text-gray-500 truncate">{user?.email || ""}</p>
                    </div>
                    {isAdmin && (
                      <Link to="/admindashboard" className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-600" onClick={() => setUserDropdownOpen(false)}>
                        <ShieldCheck className="w-4 h-4" /> Admin Dashboard
                      </Link>
                    )}
                    {isFarmer && (
                      <>
                        <Link to="/farmerdashboard" className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-600" onClick={() => setUserDropdownOpen(false)}>
                          <User className="w-4 h-4" /> Dashboard
                        </Link>
                        <Link to="/add-product" className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-600" onClick={() => setUserDropdownOpen(false)}>
                          <ShoppingCart className="w-4 h-4" /> Add Product
                        </Link>
                      </>
                    )}
                    {!isAdmin && !isFarmer && (
                      <Link to="/myorders" className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-600" onClick={() => setUserDropdownOpen(false)}>
                        <ShoppingCart className="w-4 h-4" /> My Orders
                      </Link>
                    )}
                    <button onClick={logout} className="flex w-full items-center gap-2 px-4 py-2 text-left text-gray-700 hover:bg-green-50 hover:text-green-600 border-t border-gray-100">
                      <LogOut className="w-4 h-4" /> Logout
                    </button>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Mobile Toggle */}
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-gray-600">
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-3">
          <Link to="/" className="block text-gray-700 font-medium">Home</Link>
          {isAdmin && <Link to="/admindashboard" className="block text-gray-700 font-medium">Admin Dashboard</Link>}
          {isFarmer && (
            <>
              <Link to="/farmerdashboard" className="block text-gray-700 font-medium">Dashboard</Link>
              <Link to="/add-product" className="block text-gray-700 font-medium">Add Product</Link>
            </>
          )}
          {!isAdmin && !isFarmer && (
            <>
              <Link to="/all-products" className="block text-gray-700 font-medium">Products</Link>
              <Link to="/farmers" className="block text-gray-700 font-medium">Farmers</Link>
            </>
          )}
          <Link to="/about" className="block text-gray-700 font-medium">About</Link>
          <a href="#contact" className="block text-gray-700 font-medium">Contact</a>
        </div>
      )}
    </header>
  );
};

export default Navbar;
