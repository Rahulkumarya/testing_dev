// SignupForm.tsx or wherever your form is

"use client";
import React, { useState } from "react";
import Select from "react-select";

const rolesOptions = [
  { value: "doctor", label: "Doctor" },
  { value: "nurse", label: "Nurse" },
  { value: "receptionist", label: "Receptionist" },
];

interface Props {
  onClose: () => void;
  setRoute: (route: "Login" | "SignUp") => void;
}

const SignUpForm = ({ onClose, setRoute }: Props) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    roles: [] as string[],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const [selectedRole, setSelectedRole] = useState<any>(null);

  const handleRolesChange = (selectedOption: any) => {
    setSelectedRole(selectedOption);
    setFormData((prev) => ({
      ...prev,
      roles: selectedOption ? [selectedOption.value] : [],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    // handle form submission logic here
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md mt-[60px] "
    >
      <h2 className="text-2xl font-bold mb-2 text-center text-black ">
        Sign Up
      </h2>

      <div className="mb-4">
        <label className="block text-gray-700 mb-1">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-1">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-1">Mobile</label>
        <input
          type="tel"
          name="mobile"
          value={formData.mobile}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      {/* Multi-select for roles using react-select */}
      <div className="mb-6">
        <label className="block text-gray-700 mb-1">
          Select Roles (multiple)
        </label>
        <Select
          options={rolesOptions}
          className="text-black"
          classNamePrefix="select"
          onChange={handleRolesChange}
          placeholder="Choose roles..."
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
      >
        Submit
      </button>
      <p className="mt-6 text-sm text-center text-gray-600">
        If have an account?{" "}
        <span
          className="text-blue-600 hover:underline cursor-pointer"
          onClick={() => setRoute("Login")}
        >
          Login
        </span>
      </p>
    </form>
  );
};

export default SignUpForm;
