import { ChevronLeft } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const DroneTechnology = () => {
  const navigate = useNavigate();
  return (
    <div className="px-4 py-10 max-w-4xl mx-auto text-gray-800">
      <button
        onClick={() => navigate("/")}
        className="flex items-center text-green-700 hover:underline mb-6"
      >
        <ChevronLeft className="w-5 h-5 mr-1" />
        <span>Back to Home</span>
      </button>
      <h1 className="text-3xl font-bold text-green-700 mb-4">
        How to Increase Crop Yields with Drone Technology
      </h1>
      <p className="text-sm text-gray-500 mb-6">
        Published on March 15, 2025 | Category: Technology
      </p>

      <img
        src="https://images.pexels.com/photos/2132171/pexels-photo-2132171.jpeg?auto=compress&cs=tinysrgb&w=1200"
        alt="Drone flying over farmland"
        className="rounded-lg mb-8 w-full h-auto"
      />

      <div className="space-y-6 text-lg leading-relaxed">
        <p>
          In recent years, agricultural innovation has taken a giant leap
          forward with the integration of <strong>drone technology</strong>.
          These high-flying tools are no longer just for photography or
          surveillance—they're now essential in the modern farmer’s toolkit.
        </p>

        <p>
          As global food demand increases, farmers are under pressure to
          maximize crop yields while using fewer resources.{" "}
          <strong>Drones offer a powerful solution</strong>, blending precision
          with efficiency to revolutionize how farms are monitored and managed.
        </p>

        <h2 className="text-2xl font-semibold text-green-700">
          1. What Are Agricultural Drones?
        </h2>
        <p>
          Agricultural drones are{" "}
          <strong>unmanned aerial vehicles (UAVs)</strong> designed specifically
          for use in agriculture. Equipped with sensors, cameras, and sprayers,
          they help farmers monitor crop health, assess soil quality, apply
          fertilizers, and more.
        </p>

        <h2 className="text-2xl font-semibold text-green-700">
          2. Precision Agriculture: The Key to Higher Yields
        </h2>
        <p>
          Drones play a major role in <strong>precision farming</strong>,
          helping farmers target problem areas and optimize inputs like water
          and fertilizer. This reduces waste and improves yield per acre.
        </p>

        <h2 className="text-2xl font-semibold text-green-700">
          3. Early Detection of Pests and Diseases
        </h2>
        <p>
          Multispectral drones detect plant stress early—before it’s visible to
          the eye—allowing timely action that prevents crop loss and reduces
          pesticide usage.
        </p>

        <h2 className="text-2xl font-semibold text-green-700">
          4. Optimizing Irrigation
        </h2>
        <p>
          Drones show which field areas are under- or over-watered, helping
          conserve water and avoid plant stress. This leads to healthier plants
          and improved resource efficiency.
        </p>

        <h2 className="text-2xl font-semibold text-green-700">
          5. Enhanced Crop Spraying
        </h2>
        <p>
          Drone sprayers allow for accurate, safe application of pesticides and
          fertilizers with minimal soil disruption and better coverage.
        </p>

        <h2 className="text-2xl font-semibold text-green-700">
          6. Real-Time Monitoring & Predictive Analysis
        </h2>
        <p>
          With AI analytics, drones provide insights and forecast yields. This
          helps farmers make smarter decisions from anywhere, even on mobile.
        </p>

        <h2 className="text-2xl font-semibold text-green-700">
          7. Is It Worth the Cost?
        </h2>
        <p>
          The ROI on drones is high. Farmers report{" "}
          <strong>15–25% cost savings</strong> and{" "}
          <strong>20% yield increases</strong> after drone adoption. Costs
          continue to fall, making them more accessible.
        </p>

        <h2 className="text-2xl font-semibold text-green-700">
          8. Challenges and the Future
        </h2>
        <p>
          Despite battery limits and regulations, the future is promising.
          Upcoming drones will be fully autonomous, AI-driven, and possibly
          solar-powered.
        </p>

        <h2 className="text-2xl font-semibold text-green-700">Conclusion</h2>
        <p>
          Drone technology is shaping the future of agriculture—boosting yields,
          reducing costs, and increasing sustainability. Whether you're a
          smallholder or large-scale farmer, now is the time to embrace this
          high-flying innovation.
        </p>
      </div>
    </div>
  );
};

export default DroneTechnology;
