import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Leaf, ArrowLeftCircle } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

const NotFound = () => {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-800 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center" data-aos="fade-up">
        {/* Brand */}
        <div className="flex justify-center items-center gap-2 mb-6">
          <Leaf className="w-6 h-6 text-green-600" />
          <span className="text-lg font-bold text-green-600">AgriConnect</span>
        </div>

        {/* 404 Heading */}
        <h1 className="text-7xl font-extrabold text-gray-900">404</h1>
        <p className="mt-4 text-xl font-semibold">Page not found</p>
        <p className="text-gray-500 mt-2">
          Sorry, the page you’re looking for doesn’t exist or has been moved.
        </p>

        {/* Back to Home Button */}
        <button
          onClick={() => navigate("/")}
          className="mt-6 inline-flex items-center justify-center px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white font-medium rounded-full transition"
        >
          <ArrowLeftCircle className="w-5 h-5 mr-2" />
          Go Back Home
        </button>
      </div>
    </div>
  );
};

export default NotFound;
