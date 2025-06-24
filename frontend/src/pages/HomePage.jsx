import React, { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  ArrowRight,
  Play,
  Star,
  Zap,
  Shield,
  Award,
  Smile,
  Globe,
  Headphones,
  Tractor,
  Plus,
  Minus,
  ShoppingCart,
  MapPin,
} from "lucide-react";
import CountUp from "react-countup";
import About from "./About";
import FAQSection from "./FAQSection";
import { StoreContext } from "../component/context/StoreContext";
import Testimonial from "./Testimonial";

const articles = [
  {
    title: "How to Increase Crop Yields with Drone Technology",
    content:
      "Discover the latest techniques for maximizing agricultural productivity using advanced drone systems.",
    type: "Technology",
    url: "https://images.pexels.com/photos/2132171/pexels-photo-2132171.jpeg?auto=compress&cs=tinysrgb&w=600",
    date: "March 15, 2025",
    slug: "increase-crop-yields-drone-technology",
  },
  {
    title: "The Future Farming Landscape through AI Drone for 2025",
    content:
      "Exploring how artificial intelligence and drone technology are reshaping modern agriculture.",
    type: "Innovation",
    url: "https://images.pexels.com/photos/1595108/pexels-photo-1595108.jpeg?auto=compress&cs=tinysrgb&w=600g",
    date: "March 12, 2025",
    slug: "future-farming-ai-drone-2025",
  },
  {
    title: "Latest Drone DG6000 News 2025 Drone Review",
    content:
      "Comprehensive review of the latest DG6000 drone model and its agricultural applications.",
    type: "Review",
    url: "https://media.istockphoto.com/id/2158853595/photo/agricultural-drone.jpg?b=1&s=612x612&w=0&k=20&c=RUtwPswM3jedv3Xh5IqehuXnH-N94DXg_XB4Yko329s=",
    date: "March 10, 2025",
    slug: "drone-dg6000-review-2025",
  },
];

const HomePage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [startCount, setStartCount] = useState(false);
  const sectionRef = useRef(null);
  const { token, setToken } = useContext(StoreContext);

  useEffect(() => {
    AOS.init({ duration: 1000 });
    const token = localStorage.getItem("authToken");
    setIsLoggedIn(!!token);
  }, []);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setStartCount(entry.isIntersecting);
      },
      {
        threshold: 0.5,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <>
      <section className="relative bg-gradient-to-br from-green-50 to-green-100 overflow-hidden">
        {/* Background overlay */}
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=800&width=1200')] bg-cover bg-center opacity-10"></div>

        <div className="container mx-auto px-4 py-20 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8" data-aos="fade-up">
              <div className="space-y-4">
                <span className="inline-block px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full">
                  Future Technology
                </span>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Part of future
                  <span className="text-green-600"> Agriculture</span>
                </h1>

                <p className="text-lg md:text-xl text-gray-600 max-w-lg">
                  Revolutionary drone technology that transforms traditional
                  farming into smart, efficient agricultural operations.
                </p>
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                {token ? (
                  <>
                    <a href="/products">
                      <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg flex items-center justify-center gap-2">
                        Explore Products
                        <ArrowRight className="h-5 w-5" />
                      </button>
                    </a>
                    <button className="border border-green-600 text-green-600 hover:bg-green-100 px-6 py-3 rounded-lg flex items-center justify-center gap-2">
                      <Play className="h-5 w-5" />
                      Watch Demo
                    </button>
                  </>
                ) : (
                  <>
                    <a href="/login">
                      <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg flex items-center justify-center gap-2">
                        Login to Explore
                        <ArrowRight className="h-5 w-5" />
                      </button>
                    </a>
                    <button className="border border-green-600 text-green-600 hover:bg-green-100 px-6 py-3 rounded-lg flex items-center justify-center gap-2">
                      <Play className="h-5 w-5" />
                      Watch Demo
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Right Content */}
            <div className="relative" data-aos="zoom-in">
              <div className="bg-green-600 rounded-3xl p-8 text-white shadow-xl">
                {/* Rating Box */}
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <div className="text-3xl font-bold">4.9*</div>
                    <div className="text-green-200 text-sm">
                      Customer Rating
                    </div>
                  </div>
                  <div className="bg-green-500 rounded-full p-3">
                    <Star className="h-6 w-6 fill-current" />
                  </div>
                </div>

                {/* Product Cards */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white text-gray-900 rounded-xl overflow-hidden shadow-md">
                    <div className="p-4">
                      <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjxkpJecBTTwVZ6Cu3JwhVj5DsEhWq-io6Aw&s"
                        alt="DJI Agras T30"
                        className="w-full h-20 object-cover rounded-lg mb-2"
                      />
                      <h3 className="font-semibold text-sm">DJI Agras T30</h3>
                      <p className="text-xs text-gray-600">
                        Professional Drone
                      </p>
                    </div>
                  </div>
                  <div className="bg-white text-gray-900 rounded-xl overflow-hidden shadow-md">
                    <div className="p-4">
                      <img
                        src="data:image/jpeg;base64,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"
                        alt="DJI Agras T40"
                        className="w-full h-20 object-cover rounded-lg mb-2"
                      />
                      <h3 className="font-semibold text-sm">DJI Agras T40</h3>
                      <p className="text-xs text-gray-600">Advanced Model</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16" data-aos="fade-up">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-green-600 rounded-full p-2 mr-3">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-4xl font-bold text-gray-900">
                Elevates drone agricultural operations to new heights
              </h2>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our cutting-edge drone technology revolutionizes farming
              practices, providing precision agriculture solutions that increase
              efficiency and crop yields.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow"
              data-aos="fade-up"
            >
              <div className="p-6">
                <img
                  src="https://images.pexels.com/photos/12357627/pexels-photo-12357627.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Heavy Payload"
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h3 className="text-xl font-semibold mb-2">Heavy Payload</h3>
                <p className="text-gray-600">
                  Capable of carrying substantial loads for extensive field
                  coverage and efficient operations.
                </p>
              </div>
            </div>

            <div
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <div className="p-6">
                <img
                  src="https://images.pexels.com/photos/11996945/pexels-photo-11996945.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Smooth Spreading"
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h3 className="text-xl font-semibold mb-2">Smooth Spreading</h3>
                <p className="text-gray-600">
                  Precision spreading technology ensures even distribution of
                  seeds, fertilizers, and pesticides.
                </p>
              </div>
            </div>

            <div
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <div className="p-6">
                <img
                  src="https://images.pexels.com/photos/27624218/pexels-photo-27624218/free-photo-of-desert-irrigation.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Fast Sprinkler Kit"
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h3 className="text-xl font-semibold mb-2">
                  Fast Sprinkler Kit
                </h3>
                <p className="text-gray-600">
                  Advanced spraying system with adjustable flow rates for
                  optimal crop treatment.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-8" data-aos="fade-right">
              <div className="space-y-4">
                <div className="flex items-center">
                  <Star className="h-6 w-6 text-green-600 mr-2" />
                  <span className="text-green-600 font-semibold">
                    Elevates agricultural operations to
                  </span>
                </div>
                <h2 className="text-4xl font-bold text-gray-900">
                  new heights
                </h2>
              </div>

              <div className="space-y-6">
                <div className="border-l-4 border-green-600 pl-6">
                  <h3 className="text-xl font-semibold mb-2">
                    Precision Crop Protection Spray
                  </h3>
                  <p className="text-gray-600">
                    Advanced spraying technology with intelligent flow control
                    and precise targeting for optimal crop protection and
                    minimal waste.
                  </p>
                </div>
                <div className="border-l-4 border-gray-300 pl-6">
                  <h3 className="text-xl font-semibold mb-2">
                    Smart Field Mapping
                  </h3>
                  <p className="text-gray-600">
                    AI-powered field analysis and mapping capabilities for
                    data-driven agricultural decisions.
                  </p>
                </div>
                <div className="border-l-4 border-gray-300 pl-6">
                  <h3 className="text-xl font-semibold mb-2">
                    Brand New Advanced Sensors
                  </h3>
                  <p className="text-gray-600">
                    State-of-the-art sensor technology for real-time monitoring
                    and precision agriculture applications.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative" data-aos="fade-left">
              <img
                src="https://images.pexels.com/photos/6964964/pexels-photo-6964964.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Agricultural Drone"
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>
      <section className="py-20 bg-white" data-aos="fade-up">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Image */}
            <div className="relative" data-aos="zoom-in">
              <img
                src="https://images.pexels.com/photos/32215946/pexels-photo-32215946/free-photo-of-construction-site-with-excavator-in-londrina-brazil.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Drone in Field"
                className="w-full h-auto rounded-2xl shadow-lg"
              />
            </div>

            {/* Text Content */}
            <div className="space-y-8" data-aos="fade-left">
              <div className="space-y-4">
                <h2 className="text-4xl font-bold text-gray-900">
                  Tested for reliability and durability
                </h2>
                <p className="text-xl text-gray-600">
                  Our drones undergo rigorous testing to ensure they perform
                  flawlessly in all agricultural conditions, from harsh weather
                  to demanding field operations.
                </p>
              </div>

              {/* Features */}
              <div className="grid grid-cols-2 gap-6">
                <div
                  className="flex items-start space-x-3"
                  data-aos="fade-up"
                  data-aos-delay="100"
                >
                  <div className="bg-green-100 rounded-full p-2">
                    <Shield className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Weather Resistant</h3>
                    <p className="text-sm text-gray-600">
                      IP67 rating protection
                    </p>
                  </div>
                </div>

                <div
                  className="flex items-start space-x-3"
                  data-aos="fade-up"
                  data-aos-delay="200"
                >
                  <div className="bg-green-100 rounded-full p-2">
                    <Award className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Certified Quality</h3>
                    <p className="text-sm text-gray-600">
                      Industry standards met
                    </p>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <div data-aos="fade-up" data-aos-delay="300">
                <button className="mt-4 bg-green-600 text-white px-6 py-3 rounded-lg font-semibold shadow hover:bg-green-700 transition">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section
        id="why-agrone"
        ref={sectionRef}
        className="py-20 bg-gray-50"
        data-aos="fade-up"
      >
        <div className="container mx-auto px-4">
          {/* Heading */}
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why AgriConnect?
            </h2>
            <p className="text-gray-600 text-lg max-w-xl mx-auto">
              Delivering cutting-edge solutions and unmatched service to empower
              farmers across the globe.
            </p>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <div className="flex flex-col items-center text-center space-y-2">
              <Smile className="h-8 w-8 text-green-600 mb-2" />
              <div className="text-3xl font-bold text-green-600">
                {startCount ? (
                  <CountUp end={500} duration={2} suffix="+" />
                ) : (
                  "0+"
                )}
              </div>
              <p className="text-gray-600 text-sm">Customer Satisfaction</p>
            </div>

            <div className="flex flex-col items-center text-center space-y-2">
              <Globe className="h-8 w-8 text-green-600 mb-2" />
              <div className="text-3xl font-bold text-green-600">
                {startCount ? (
                  <CountUp end={1000} duration={2} suffix="+" />
                ) : (
                  "0+"
                )}
              </div>
              <p className="text-gray-600 text-sm">Countries Served</p>
            </div>

            <div className="flex flex-col items-center text-center space-y-2">
              <Headphones className="h-8 w-8 text-green-600 mb-2" />
              <div className="text-3xl font-bold text-green-600">
                {startCount ? (
                  <CountUp end={24} duration={2} suffix="/7" />
                ) : (
                  "0/7"
                )}
              </div>
              <p className="text-gray-600 text-sm">Support Available</p>
            </div>

            <div className="flex flex-col items-center text-center space-y-2">
              <Tractor className="h-8 w-8 text-green-600 mb-2" />
              <div className="text-3xl font-bold text-green-600">
                {startCount ? (
                  <CountUp end={20000} duration={2} separator="," suffix="+" />
                ) : (
                  "0+"
                )}
              </div>
              <p className="text-gray-600 text-sm">Happy Farmers</p>
            </div>
          </div>
          <Testimonial />

          {/* Call to Action */}
          <div
            className="relative bg-green-600 rounded-3xl overflow-hidden shadow-xl"
            data-aos="zoom-in"
          >
            <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/4870800/pexels-photo-4870800.jpeg?auto=compress&cs=tinysrgb&w=600')] bg-cover bg-center opacity-20"></div>
            <div className="relative p-12 text-white">
              <div className="max-w-md">
                <h3 className="text-2xl font-bold mb-4">
                  Sprinkler & spray equipment farming and agriculture
                </h3>
                <button className="bg-white text-green-600 px-6 py-3 rounded-lg font-semibold shadow hover:bg-gray-100 transition">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-20 bg-gray-50" data-aos="fade-up">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900">
              News & Articles
            </h2>
            <Link to="/articles">
              <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-100 transition">
                View All Articles
              </button>
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {articles.map((article, index) => (
              <Link
                to={`/articles/${article.slug}`}
                key={index}
                className="bg-white rounded-xl shadow hover:shadow-lg transition-shadow group block"
                data-aos="zoom-in"
                data-aos-delay={index * 100}
              >
                <img
                  src={article.url}
                  alt={article.title}
                  className="w-full h-48 object-cover rounded-t-xl"
                />
                <div className="p-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-500">
                      {article.date}
                    </span>
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                      {article.type}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-green-600 transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{article.content}</p>
                  <span className="text-green-600 hover:text-green-700 font-medium flex items-center gap-2">
                    Read More <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <About />
      <section
        className="bg-green-50 py-20 px-4"
        id="contact"
        data-aos="fade-up"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-green-700 mb-4">
              Get in Touch
            </h2>
            <p className="text-gray-600">
              Have questions or want to partner with us? We’re here to help you
              grow.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-6 text-gray-700" data-aos="fade-right">
              <div>
                <h4 className="font-semibold text-lg">📍 Address</h4>
                <p>123 AgroTech Road, Abuja, Nigeria</p>
              </div>
              <div>
                <h4 className="font-semibold text-lg">📞 Phone</h4>
                <p>+234 800 123 4567</p>
              </div>
              <div>
                <h4 className="font-semibold text-lg">📧 Email</h4>
                <p>support@agricconnect.com</p>
              </div>
              <div>
                <h4 className="font-semibold text-lg">🕒 Working Hours</h4>
                <p>Mon - Fri: 8:00 AM - 6:00 PM</p>
              </div>
            </div>

            {/* Contact Form */}
            <form
              className="bg-white p-8 rounded-lg shadow-md space-y-6"
              data-aos="fade-left"
              onSubmit={(e) => {
                e.preventDefault();
                alert("Message sent successfully!");
              }}
            >
              <input
                type="text"
                placeholder="Your Name"
                className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
                required
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
                required
              />
              <textarea
                placeholder="Your Message"
                rows="5"
                className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
                required
              ></textarea>
              <button
                type="submit"
                className="bg-green-700 text-white px-6 py-3 rounded-md hover:bg-green-800 transition"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>
      <FAQSection />
      <section className="" data-aos="fade-up">
        <div className="text-green-700 flex flex-col items-center justify-center text-center space-y-2 pt-8 pb-14">
          <h1 className="md:text-4xl text-2xl font-medium">
            Subscribe now & get 20% off
          </h1>
          <p className="md:text-base text-gray-700/80 pb-8">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </p>
          <div className="flex items-center justify-between max-w-2xl w-full md:h-14 h-12">
            <input
              className="border border-green-500/30 rounded-md h-full border-r-0 outline-none w-full rounded-r-none px-3 text-gray-500"
              type="text"
              placeholder="Enter your email id"
            />
            <button className="md:px-12 px-8 h-full text-white bg-green-700 rounded-md rounded-l-none">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
