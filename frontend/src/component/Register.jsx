import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, User, Eye, EyeOff, MapPin, Leaf } from "lucide-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AOS from "aos";
import "aos/dist/aos.css";
import axios from "axios";
import { StoreContext } from "./context/StoreContext";

const Register = () => {
  const { url, setToken } = useContext(StoreContext);
  const navigate = useNavigate();

  const [role, setRole] = useState("buyer");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Shared and Role-specific State
  const [buyer, setBuyer] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [farmer, setFarmer] = useState({
    name: "",
    email: "",
    password: "",
    location: "",
    farmName: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (role === "buyer") {
      setBuyer((prev) => ({ ...prev, [name]: value }));
    } else {
      setFarmer((prev) => ({ ...prev, [name]: value }));
    }
  };

  const onRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const endpoint =
        role === "buyer"
          ? `${url}/api/user/register`
          : `${url}/api/farmer/register`;

      const payload = role === "buyer" ? buyer : farmer;

      const response = await axios.post(endpoint, payload);

      if (response.data.success) {
        setToken(response.data.token);
        toast.success(`✅ Registered successfully as ${role}`, {
          position: "top-center",
        });
        setTimeout(() => navigate("/login"), 2000);
      } else {
        toast.error(response.data.message || "❌ Registration failed", {
          position: "top-center",
        });
      }
    } catch (err) {
      toast.error(
        err.response?.data?.message || "🚨 Registration error occurred",
        { position: "top-center" }
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50 px-4">
      <div
        className="max-w-md w-full bg-white rounded-3xl shadow-lg p-6 sm:p-8"
        data-aos="fade-up"
      >
        <div className="text-center mb-4">
          <p className="text-sm text-gray-500">Empowering Farmers & Buyers</p>
        </div>

        {/* Role Switch */}
        <div className="flex justify-center gap-4 my-4">
          {["buyer", "farmer"].map((r) => (
            <button
              key={r}
              onClick={() => setRole(r)}
              className={`px-4 py-2 text-sm font-semibold rounded-full transition ${
                role === r
                  ? "bg-green-600 text-white shadow-md"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              {r === "buyer" ? "Register as Buyer" : "Register as Farmer"}
            </button>
          ))}
        </div>

        <h2 className="text-xl font-bold text-center text-green-700 mb-6">
          {role === "buyer" ? "Buyer Registration" : "Farmer Registration"}
        </h2>

        <form onSubmit={onRegister} className="space-y-5">
          {/* Shared & Role-specific Fields */}
          {role === "buyer" ? (
            <>
              {/* Buyer Name */}
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <div className="relative mt-1">
                  <User className="absolute left-3 top-2.5 text-gray-400" />
                  <input
                    name="name"
                    value={buyer.name}
                    onChange={handleChange}
                    type="text"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500"
                    placeholder="John Doe"
                    required
                  />
                </div>
              </div>

              {/* Buyer Email */}
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Email
                </label>
                <div className="relative mt-1">
                  <Mail className="absolute left-3 top-2.5 text-gray-400" />
                  <input
                    name="email"
                    value={buyer.email}
                    onChange={handleChange}
                    type="email"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500"
                    placeholder="you@example.com"
                    required
                  />
                </div>
              </div>

              {/* Buyer Password */}
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="relative mt-1">
                  <Lock className="absolute left-3 top-2.5 text-gray-400" />
                  <input
                    name="password"
                    value={buyer.password}
                    onChange={handleChange}
                    type={showPassword ? "text" : "password"}
                    className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500"
                    placeholder="********"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-gray-500"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Farmer Name */}
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <div className="relative mt-1">
                  <User className="absolute left-3 top-2.5 text-gray-400" />
                  <input
                    name="name"
                    value={farmer.name}
                    onChange={handleChange}
                    type="text"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
              </div>

              {/* Farmer Email */}
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Email
                </label>
                <div className="relative mt-1">
                  <Mail className="absolute left-3 top-2.5 text-gray-400" />
                  <input
                    name="email"
                    value={farmer.email}
                    onChange={handleChange}
                    type="email"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500"
                    placeholder="farmer@example.com"
                    required
                  />
                </div>
              </div>

              {/* Farmer Password */}
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="relative mt-1">
                  <Lock className="absolute left-3 top-2.5 text-gray-400" />
                  <input
                    name="password"
                    value={farmer.password}
                    onChange={handleChange}
                    type={showPassword ? "text" : "password"}
                    className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500"
                    placeholder="********"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-gray-500"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Farm Name */}
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Farm Name
                </label>
                <div className="relative mt-1">
                  <Leaf className="absolute left-3 top-2.5 text-gray-400" />
                  <input
                    name="farmName"
                    value={farmer.farmName}
                    onChange={handleChange}
                    type="text"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500"
                    placeholder="GreenField Agro"
                    required
                  />
                </div>
              </div>

              {/* Location */}
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Location
                </label>
                <div className="relative mt-1">
                  <MapPin className="absolute left-3 top-2.5 text-gray-400" />
                  <input
                    name="location"
                    value={farmer.location}
                    onChange={handleChange}
                    type="text"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500"
                    placeholder="Kaduna, Nigeria"
                    required
                  />
                </div>
              </div>
            </>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center items-center gap-2 bg-green-600 text-white font-semibold py-2 rounded-xl hover:bg-green-700 transition disabled:opacity-60"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              "Register"
            )}
          </button>

          <p className="text-sm text-center text-gray-600">
            Already have an account?{" "}
            <a href="/login" className="text-green-600 font-semibold hover:underline">
              Log in here
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
