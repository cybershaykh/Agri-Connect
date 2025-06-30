import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

const DroneDG6000Review = () => {
  const navigate = useNavigate();

  return (
    <div className="px-4 py-10 max-w-4xl mx-auto text-gray-800">
      {/* Back Button */}
      <button
        onClick={() => navigate("/")}
        className="flex items-center text-green-700 hover:underline mb-6"
      >
        <ChevronLeft className="w-5 h-5 mr-1" />
        <span>Back to Home</span>
      </button>

      <h1 className="text-3xl font-bold text-green-700 mb-4">
        Latest Drone DG6000 News 2025 Drone Review
      </h1>
      <p className="text-sm text-gray-500 mb-6">
        Published on March 10, 2025 | Category: Review
      </p>

      <img
        src="https://media.istockphoto.com/id/2158853595/photo/agricultural-drone.jpg?b=1&s=612x612&w=0&k=20&c=RUtwPswM3jedv3Xh5IqehuXnH-N94DXg_XB4Yko329s="
        alt="DG6000 Drone in action"
        className="rounded-lg mb-8 w-full h-auto"
      />

      <div className="space-y-6 text-lg leading-relaxed">
        <p>
          The DG6000 drone has taken the agriculture tech space by storm in
          2025, boasting upgraded stability, payload capacity, and real-time AI
          crop analysis. It’s a game-changer for farmers who want smart
          solutions in the field.
        </p>

        <h2 className="text-2xl font-semibold text-green-700">
          1. Design & Build
        </h2>
        <p>
          Built for rugged farm environments, the DG6000 features a reinforced
          carbon fiber frame, all-weather casing, and a sleek modular design.
          It’s not just durable—it’s smartly engineered for quick maintenance
          and modular upgrades.
        </p>

        <h2 className="text-2xl font-semibold text-green-700">
          2. Flight Performance
        </h2>
        <p>
          With a top flight time of 40 minutes and a 7 km range, the drone
          covers large hectares effortlessly. Advanced GPS + obstacle avoidance
          allows it to navigate tight rows of crops with precision.
        </p>

        <h2 className="text-2xl font-semibold text-green-700">
          3. Smart Features
        </h2>
        <p>
          AI-powered sensors detect nutrient deficiency, pest infestations, and
          irrigation gaps. The built-in NDVI camera scans crop health and
          delivers actionable insights to the connected AgriConnect app.
        </p>

        <h2 className="text-2xl font-semibold text-green-700">
          4. Spraying Capabilities
        </h2>
        <p>
          With a 20L tank, the DG6000 can spray targeted sections of a farm with
          fertilizers, herbicides, or water. The nozzles auto-adjust based on
          drone speed and wind, ensuring optimal application with minimal waste.
        </p>

        <h2 className="text-2xl font-semibold text-green-700">
          5. Ease of Use
        </h2>
        <p>
          Farmers can control the DG6000 via a simple app interface, with
          pre-planned flight paths, real-time telemetry, and auto return-to-home
          features. Even tech-shy users find the system intuitive.
        </p>

        <h2 className="text-2xl font-semibold text-green-700">
          6. Pricing & Availability
        </h2>
        <p>
          Starting at ₦3,200,000, the DG6000 is competitively priced compared to
          its Western counterparts. Government subsidies and leasing options are
          also available in Nigeria through AgriConnect partners.
        </p>

        <h2 className="text-2xl font-semibold text-green-700">
          7. Final Verdict
        </h2>
        <p>
          The DG6000 isn't just a drone—it’s a digital farm assistant. Whether
          you're growing maize, rice, or vegetables, it brings unmatched
          efficiency, sustainability, and yield optimization.
        </p>

        <p>
          AgriConnect strongly recommends the DG6000 for farmers ready to scale
          and modernize their operations. It’s not just future-ready—it’s ready
          for your farm today.
        </p>
      </div>
    </div>
  );
};

export default DroneDG6000Review;
