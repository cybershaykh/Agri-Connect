import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

const FutureFarmingAIDrone = () => {
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
        The Future Farming Landscape through AI Drone for 2025
      </h1>
      <p className="text-sm text-gray-500 mb-6">
        Published on March 12, 2025 | Category: Innovation
      </p>

      <img
        src="https://images.pexels.com/photos/1595108/pexels-photo-1595108.jpeg?auto=compress&cs=tinysrgb&w=1200"
        alt="AI drone flying over crops"
        className="rounded-lg mb-8 w-full h-auto"
      />

      <div className="space-y-6 text-lg leading-relaxed">
        <p>
          As the global population rises and climate change challenges food
          production, artificial intelligence (AI) and drone technology are
          emerging as essential forces driving a smarter, more efficient
          agricultural future.
        </p>

        <h2 className="text-2xl font-semibold text-green-700">
          1. AI Meets Agriculture
        </h2>
        <p>
          AI-powered systems can process satellite data, weather patterns, and
          crop behavior in real-time. When paired with drones, this intelligence
          enables precise monitoring, timely decision-making, and reduced
          environmental impact.
        </p>

        <h2 className="text-2xl font-semibold text-green-700">
          2. Smart Drones in the Field
        </h2>
        <p>
          AI drones can identify weeds, assess crop health, and track growth
          stages autonomously. With machine learning, these drones evolve with
          every flight, becoming better at recognizing patterns and issues in
          the field.
        </p>

        <h2 className="text-2xl font-semibold text-green-700">
          3. Predictive Farming
        </h2>
        <p>
          Predictive models powered by AI help farmers plan irrigation,
          anticipate pest outbreaks, and optimize fertilizer usage—all based on
          drone-collected data and predictive algorithms.
        </p>

        <h2 className="text-2xl font-semibold text-green-700">
          4. Precision and Profit
        </h2>
        <p>
          Precision agriculture enabled by AI drones not only increases yields
          but reduces input costs by as much as 30%. This precision also
          minimizes the ecological footprint of farming.
        </p>

        <h2 className="text-2xl font-semibold text-green-700">
          5. Challenges & The Road Ahead
        </h2>
        <p>
          Though power supply, internet access, and AI training models remain
          barriers in rural areas, initiatives by AgriConnect and other
          platforms are closing the tech gap for African farmers.
        </p>

        <h2 className="text-2xl font-semibold text-green-700">Conclusion</h2>
        <p>
          The combination of AI and drone technology is ushering in a new era of
          agriculture—one that’s efficient, resilient, and deeply data-driven.
          As 2025 progresses, the future of farming has never looked so
          intelligent.
        </p>
      </div>
    </div>
  );
};

export default FutureFarmingAIDrone;
