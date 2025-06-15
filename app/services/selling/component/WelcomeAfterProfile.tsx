"use client";
import Link from "next/link";
import React from "react";
import { VscWorkspaceTrusted } from "react-icons/vsc";

const WelcomeAfterProfile = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg border border-gray-200">
      <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-green-100 text-green-600">
        <VscWorkspaceTrusted className="text-3xl" />
      </div>
      <h2 className="text-2xl font-semibold text-gray-800">
        Welcome! to UronHealth
      </h2>
      <p className="mt-2 text-gray-600 text-lg max-w-xl">
        Your profile information has been successfully submitted. 🎉
      </p>
      <p className="mt-1 text-gray-500 text-sm">
        Our team is currently verifying your details. Once verified, your data
        will appear in the dashboard.
      </p>
      <div className="mt-6">
        <button
          disabled
          className="bg-green-500 text-white px-6 py-2 rounded-full text-sm font-medium shadow hover:bg-green-600 transition disabled:opacity-70"
        >
          Awaiting Verification...
        </button>
        <Link href="/services/dashboard">
          <button className="bg-white text-blue-600 border border-blue-600 hover:bg-blue-50 font-semibold py-2 px-4 rounded-xl shadow-sm transition duration-300 mr-2">
            Dashboard
          </button>
        </Link>
      </div>
    </div>
  );
};

export default WelcomeAfterProfile;
