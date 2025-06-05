"use client"
import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 px-6 md:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Logo & Description */}
        <div>
          <h3 className="text-2xl font-bold text-white mb-4">UronHealth</h3>
          <p className="text-gray-400 leading-relaxed">
            We provide expert healthcare with doctor consultations, diagnostics,
            ambulance support, and radiology. Our gym aids recovery and promotes
            wellness—all under one roof.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h4 className="text-xl font-semibold text-white mb-6">Quick Links</h4>
          <ul className="space-y-3">
            <li>
              <a href="#" className="hover:text-blue-500 transition">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-500 transition">
                Services
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-500 transition">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-500 transition">
                Contact
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-500 transition">
                Careers
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-xl font-semibold text-white mb-6">Contact Us</h4>
          <ul className="space-y-4">
            <li className="flex items-center space-x-3">
              <FaMapMarkerAlt className="text-blue-500" />
              <span>123 Business Street, City, Country</span>
            </li>
            <li className="flex items-center space-x-3">
              <FaPhone className="text-blue-500" />
              <a
                href="tel:+1234567890"
                className="hover:text-blue-500 transition"
              >
                +1 (234) 567-890
              </a>
            </li>
            <li className="flex items-center space-x-3">
              <FaEnvelope className="text-blue-500" />
              <a
                href="mailto:info@yourcompany.com"
                className="hover:text-blue-500 transition"
              >
                info@yourcompany.com
              </a>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h4 className="text-xl font-semibold text-white mb-6">Follow Us</h4>
          <div className="flex space-x-6">
            <a
              href="#"
              aria-label="Facebook"
              className="text-gray-400 hover:text-blue-600 transition transform hover:scale-110"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebookF size={20} />
            </a>
            <a
              href="#"
              aria-label="Twitter"
              className="text-gray-400 hover:text-blue-400 transition transform hover:scale-110"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter size={20} />
            </a>
            <a
              href="#"
              aria-label="LinkedIn"
              className="text-gray-400 hover:text-blue-700 transition transform hover:scale-110"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedinIn size={20} />
            </a>
            <a
              href="#"
              aria-label="Instagram"
              className="text-gray-400 hover:text-pink-500 transition transform hover:scale-110"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram size={20} />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800 mt-10 pt-6 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} UronHealth. All rights reserved.
      </div>
    </footer>
  );
}
