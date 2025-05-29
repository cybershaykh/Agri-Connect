import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Leaf, Users, Globe, Award } from "lucide-react";

const teamMembers = [
  {
    name: "Amina Yusuf",
    role: "Lead Farmer",
    location: "Kano, Nigeria",
    bio: "Amina has over 20 years of experience in sustainable farming and leads innovation at AgriConnect.",
    image: "https://via.placeholder.com/150?text=Amina",
  },
  {
    name: "Chinedu Okeke",
    role: "Agricultural Technician",
    location: "Enugu, Nigeria",
    bio: "Chinedu specializes in soil testing and crop rotation techniques to boost yield and quality.",
    image: "https://via.placeholder.com/150?text=Chinedu",
  },
  {
    name: "Grace Olorunfemi",
    role: "Farm Worker Coordinator",
    location: "Ibadan, Nigeria",
    bio: "Grace manages field workers, ensuring optimal productivity and fair labor practices.",
    image: "https://via.placeholder.com/150?text=Grace",
  },
  {
    name: "Bashir Lawal",
    role: "Logistics Manager",
    location: "Kaduna, Nigeria",
    bio: "Bashir ensures timely delivery of farm produce from remote farms to urban buyers.",
    image: "https://via.placeholder.com/150?text=Bashir",
  },
];

const About = () => {
  useEffect(() => {
    AOS.init({ duration: 800, easing: "ease-in-out", once: true });
  }, []);

  return (
    <div className="bg-white text-gray-800 py-16 px-6 lg:px-20">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16" data-aos="fade-up">
          <h1 className="text-4xl font-bold text-green-700 mb-4">About AgriConnect</h1>
          <p className="text-gray-600 text-lg">
            AgriConnect bridges the gap between farmers and buyers, empowering Nigerian agriculture
          through technology, transparency, and trust. Our mission is to support local food systems
          and improve livelihoods.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-12 mb-20">
          <div data-aos="fade-right">
            <h2 className="text-2xl font-semibold mb-3">Our Mission</h2>
            <p className="text-gray-700">
              At AgriConnect, our mission is to bridge the gap between hardworking Nigerian farmers and reliable buyers — including individuals, restaurants, and retailers. We provide a digital platform that offers seamless access to agricultural markets, weather forecasts, best farming practices, and real-time pricing.
            </p>
          </div>
          <div data-aos="fade-left">
            <h2 className="text-2xl font-semibold mb-3">Our Vision</h2>
            <p className="text-gray-700">
              To become Nigeria’s leading agri-tech platform, fostering transparency, profitability, and sustainability in agriculture — and empowering every farmer to reach their full potential.
            </p>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center text-green-700 mb-12" data-aos="fade-up">
            Why Choose AgriConnect?
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-10 text-center">
            <div data-aos="zoom-in" className="p-6 bg-green-50 rounded-lg shadow hover:shadow-lg transition">
              <Globe className="mx-auto mb-3 text-green-600" size={32} />
              <h3 className="font-semibold text-lg mb-2">Nationwide Access</h3>
              <p className="text-sm text-gray-600">Connect with farmers and buyers from across Nigeria.</p>
            </div>
            <div data-aos="zoom-in" data-aos-delay="100" className="p-6 bg-green-50 rounded-lg shadow hover:shadow-lg transition">
              <Users className="mx-auto mb-3 text-green-600" size={32} />
              <h3 className="font-semibold text-lg mb-2">Community Driven</h3>
              <p className="text-sm text-gray-600">Built for and by local farmers and agricultural experts.</p>
            </div>
            <div data-aos="zoom-in" data-aos-delay="200" className="p-6 bg-green-50 rounded-lg shadow hover:shadow-lg transition">
              <Leaf className="mx-auto mb-3 text-green-600" size={32} />
              <h3 className="font-semibold text-lg mb-2">Sustainable Practices</h3>
              <p className="text-sm text-gray-600">Encouraging eco-friendly farming methods for a better tomorrow.</p>
            </div>
            <div data-aos="zoom-in" data-aos-delay="300" className="p-6 bg-green-50 rounded-lg shadow hover:shadow-lg transition">
              <Award className="mx-auto mb-3 text-green-600" size={32} />
              <h3 className="font-semibold text-lg mb-2">Trusted Platform</h3>
              <p className="text-sm text-gray-600">Secure, transparent transactions and verified profiles.</p>
            </div>
          </div>
        </div>

        {/* Our Team (Optional) */}
        <div className="text-center" data-aos="fade-up">
          <h2 className="text-3xl font-bold mb-6">Meet Our Team</h2>
          <p className="text-gray-600 max-w-xl mx-auto mb-10">
            Our dedicated team includes agricultural professionals, software engineers, and field coordinators working together to make farming more profitable and accessible.
          </p>
          {/* Placeholder for team cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-xl p-6 shadow-md hover:shadow-lg transition"
              data-aos="zoom-in"
              data-aos-delay={index * 100}
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold text-gray-800">{member.name}</h3>
              <p className="text-sm text-green-600 font-medium">{member.role}</p>
              <p className="text-xs text-gray-500 mb-2">{member.location}</p>
              <p className="text-sm text-gray-600">{member.bio}</p>
            </div>
          ))}
        </div>
        </div>
      </div>
    </div>
  );
};

export default About;
