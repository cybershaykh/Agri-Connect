import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { Bell, ChevronDown, LogOut, Settings, User } from "lucide-react";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  // Logout logic
  const handleLogout = () => {
    localStorage.removeItem("token"); 
    setDropdownOpen(false);
    navigate("/"); // Redirect to landing page
  };

  return (
    <header className="border-b bg-white" data-aos="fade-down">
      <div className="flex h-16 items-center px-4 sm:px-6 justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-green-600 flex items-center justify-center">
            <span className="text-white font-bold text-sm">F</span>
          </div>
          <h1 className="text-lg sm:text-xl font-semibold">AdminConnect</h1>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3 relative">
          {/* Notification */}
          <button className="h-9 w-9 border rounded-md flex items-center justify-center hover:bg-gray-100">
            <Bell className="h-4 w-4" />
          </button>

          {/* User Avatar + Name */}
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 focus:outline-none"
          >
            <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
              <span className="text-green-700 font-medium text-sm">JD</span>
            </div>
            <span className="text-sm font-medium hidden sm:block">John Doe</span>
            <ChevronDown className="h-4 w-4 text-gray-500" />
          </button>

          {/* Dropdown */}
          {dropdownOpen && (
            <div className="absolute top-12 right-0 w-40 bg-white border rounded shadow-md z-50">
              <button className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2 text-sm">
                <User className="h-4 w-4" /> Profile
              </button>
              <button className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2 text-sm">
                <Settings className="h-4 w-4" /> Settings
              </button>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2 text-sm text-red-600"
              >
                <LogOut className="h-4 w-4" /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
export default Navbar;
