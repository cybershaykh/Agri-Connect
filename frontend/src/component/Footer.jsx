import React from "react";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-green-900 text-white py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Logo & Description */}
        <div>
          <h2 className="text-2xl font-bold mb-3"> 🌾 AgriConnect</h2>
          <p className="text-sm text-gray-300">
            Bridging the gap between Nigerian farmers and buyers with access to weather updates, market prices, and modern agricultural tools.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li><a href="/about" className="hover:text-white">About Us</a></li>
            <li><a href="/contact" className="hover:text-white">Contact</a></li>
            <li><a href="/faqsection" className="hover:text-white">FAQs</a></li>
            <li><a href="/farmers" className="hover:text-white">Find Farmers</a></li>
            <li><a href="/all-products" className="hover:text-white">Browse Products</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Contact</h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li className="flex items-center gap-2"><Phone size={16} /> +234 800 123 4567</li>
            <li className="flex items-center gap-2"><Mail size={16} /> support@agricconnect.com</li>
            <li className="flex items-center gap-2"><MapPin size={16} /> Lagos, Nigeria</li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
          <div className="flex space-x-4 mt-2">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><Facebook className="hover:text-gray-100" /></a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><Twitter className="hover:text-gray-100" /></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><Instagram className="hover:text-gray-100" /></a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><Linkedin className="hover:text-gray-100" /></a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-12 border-t border-green-800 pt-6 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} AgriConnect. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
