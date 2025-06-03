import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";
import toast, { Toaster } from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [termsChecked, setTermsChecked] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();

    if (!termsChecked) {
      toast.error("⚠️ Please agree to the terms and conditions before logging in.", {
        style: {
          borderRadius: "10px",
          background: "#fff3cd",
          color: "#856404",
          fontWeight: "600",
          fontSize: "16px",
          padding: "16px",
        },
        icon: "",
        position: "top-center",
      });
      return;
    }

    if (email && password) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        navigate("/dashboard");
      }, 2000); // simulate network delay
    }
  };

  return (
    <>
      <Toaster />
      <div className="min-h-screen flex items-center justify-center bg-green-50 px-4">
        <div
          className="max-w-md w-full bg-white shadow-xl rounded-2xl p-8"
          data-aos="flip-left"
        >
          <h2 className="text-3xl font-bold text-center text-green-700 mb-6">
            Welcome Back
          </h2>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1 relative">
                <Mail className="absolute left-3 top-2.5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1 relative">
                <Lock className="absolute left-3 top-2.5 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="********"
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

            {/* Terms and Conditions checkbox */}
            <div
              className="flex items-center space-x-2 text-sm"
              data-aos="fade-up"
            >
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

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center gap-2 bg-green-600 text-white font-semibold py-2 rounded-xl hover:bg-green-700 transition disabled:opacity-70"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                "Log In"
              )}
            </button>

            <p className="text-sm text-center text-gray-600">
              Don’t have an account?{" "}
              <a
                href="/register"
                className="text-green-600 font-semibold hover:underline"
              >
                Register here
              </a>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
