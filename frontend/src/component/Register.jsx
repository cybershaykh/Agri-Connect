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
  const [role, setRole] = useState("buyer");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [farmName, setFarmName] = useState("");
  const [location, setLocation] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({
      ...data,
      [name]: value,
    }));
  };
  const onRegister = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(`${url}/api/user/register`, data);

      if (response.data.success) {
        setToken(response.data.token);
        toast.success("✅ Successfully registered as ${role}`!", {
          position: "top-center",
          autoClose: 2000,
        });

        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        toast.error(response.data.message || "❌ Registration failed", {
          position: "top-center",
        });
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "🚨 An error occurred during registration",
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
        {/* Branding */}
        <div className="text-center mb-4">
          <h1 className="text-3xl font-bold text-green-700"></h1>
          <p className="text-sm text-gray-500">Empowering Farmers & Buyers</p>
        </div>

        {/* Role Toggle */}
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

        {/* Form */}
        <form onSubmit={onRegister} className="space-y-5">
          {/* Name */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Full Name
            </label>
            <div className="relative mt-1">
              <User className="absolute left-3 top-2.5 text-gray-400" />
              <input
                name="name"
                onChange={onChangeHandler}
                value={data.name}
                type="text"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500"
                placeholder="John Doe"
                required
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="text-sm font-medium text-gray-700">Email</label>
            <div className="relative mt-1">
              <Mail className="absolute left-3 top-2.5 text-gray-400" />
              <input
                name="email"
                onChange={onChangeHandler}
                value={data.email}
                type="email"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500"
                placeholder="you@example.com"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative mt-1">
              <Lock className="absolute left-3 top-2.5 text-gray-400" />
              <input
                name="password"
                onChange={onChangeHandler}
                value={data.password}
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

          {/* Farmer Fields */}
          {role === "farmer" && (
            <>
              {/* Farm Name */}
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Farm Name
                </label>
                <div className="relative mt-1">
                  <Leaf className="absolute left-3 top-2.5 text-gray-400" />
                  <input
                    type="text"
                    value={farmName}
                    onChange={(e) => setFarmName(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500"
                    placeholder="Green Harvest Farm"
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
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
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

          {/* Footer */}
          <p className="text-sm text-center text-gray-600">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-green-600 font-semibold hover:underline"
            >
              Log in here
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
