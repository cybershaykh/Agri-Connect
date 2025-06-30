import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { StoreContext } from "./context/StoreContext";

const Login = () => {
  const { url, setToken } = useContext(StoreContext);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [termsChecked, setTermsChecked] = useState(false);
  const [loginType, setLoginType] = useState("user"); // 'user', 'farmer', or 'admin'
  const navigate = useNavigate();

  const [data, setData] = useState({
    email: "",
    password: ""
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const onLogin = async (event) => {
    event.preventDefault();

    if (!termsChecked) {
      toast.error("⚠️ Please agree to the terms and conditions before logging in.");
      return;
    }

    setLoading(true);

    const endpoint =
      loginType === "farmer"
        ? `${url}/api/farmer/login`
        : loginType === "admin"
        ? `${url}/api/admin/admin/login`
        : `${url}/api/user/login`;

    try {
      const response = await axios.post(endpoint, data);

      if (response.data.success) {
        setToken(response.data.token, response.data.user || response.data.farmer || response.data.admin);
        toast.success(`${loginType.charAt(0).toUpperCase() + loginType.slice(1)} login successful!`);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user || response.data.farmer || response.data.admin));

        navigate(
          loginType === "farmer"
            ? "/farmerdashboard"
            : loginType === "admin"
            ? "/admindashboard"
            : "/"
        );
      } else {
        toast.error(response.data.message || "Login failed");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred during login");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  return (
    <>
      <Toaster />
      <div className="min-h-screen flex items-center justify-center bg-green-50 px-4">
        <div
          className="max-w-md w-full bg-white shadow-xl rounded-2xl p-8"
          data-aos="flip-left"
        >
          <h2 className="text-3xl font-bold text-center text-green-700 mb-6">
            {loginType === "farmer"
              ? "Farmer Login"
              : loginType === "admin"
              ? "Admin Login"
              : "Welcome Back"}
          </h2>

          {/* Login Type Switcher */}
          <div className="flex justify-center gap-4 mb-4">
            {["user", "farmer", "admin"].map((type) => (
              <button
                key={type}
                onClick={() => setLoginType(type)}
                className={`px-4 py-1 rounded-full font-semibold ${
                  loginType === type ? "bg-green-600 text-white" : "bg-gray-200"
                }`}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>

          <form onSubmit={onLogin} className="space-y-6">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Email address</label>
              <div className="mt-1 relative">
                <Mail className="absolute left-3 top-2.5 text-gray-400" />
                <input
                  name="email"
                  onChange={onChangeHandler}
                  value={data.email}
                  type="email"
                  required
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <div className="mt-1 relative">
                <Lock className="absolute left-3 top-2.5 text-gray-400" />
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={data.password}
                  onChange={onChangeHandler}
                  required
                  className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="********"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-center space-x-2 text-sm" data-aos="fade-up">
              <input
                type="checkbox"
                id="terms"
                checked={termsChecked}
                onChange={() => setTermsChecked(!termsChecked)}
                className="h-4 w-4 text-orange-500"
              />
              <label htmlFor="terms">
                I agree to the{" "}
                <a href="#" className="text-indigo-500 hover:underline">
                  terms and conditions
                </a>
                .
              </label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center gap-2 bg-green-600 text-white font-semibold py-2 rounded-xl hover:bg-green-700 transition disabled:opacity-70"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                `${loginType === "farmer" ? "Farmer Login" : loginType === "admin" ? "Admin Login" : "Log In"}`
              )}
            </button>

            {/* Register Link (for users only) */}
            {loginType === "user" && (
              <p className="text-sm text-center text-gray-600">
                Don&apos;t have an account?{" "}
                <a href="/register" className="text-green-600 font-semibold hover:underline">
                  Register here
                </a>
              </p>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
