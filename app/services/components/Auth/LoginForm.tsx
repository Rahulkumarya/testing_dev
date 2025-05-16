"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

// components/Login.tsx
interface Props {
  onClose: () => void;
  setRoute: (route: "Login" | "SignUp") => void;
}

const LoginForm = ({ onClose, setRoute }: Props) => {
  const router = useRouter();
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white w-full max-w-md mx-4 p-6 rounded-lg shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-black text-xl"
        >
          &times;
        </button>

        <h2 className="text-2xl font-semibold text-center mb-6 text-black">
          Login
        </h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              required
              placeholder="Enter your email"
              className="w-full border px-4 py-2 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              required
              placeholder="Enter your password"
              className="w-full border px-4 py-2 rounded-md"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded"
          >
            Login
          </button>
        </form>

        <p className="mt-6 text-sm text-center text-gray-600">
          Don’t have an account?{" "}
          <span
            className="text-blue-600 hover:underline cursor-pointer"
            onClick={() => setRoute("SignUp")}
          >
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
