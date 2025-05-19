"use client";

import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation"; // ✅ import router for redirect

// ✅ Validation schema using Yup
const validationSchema = Yup.object({
  name: Yup.string().required("Doctor's name is required"),
  specialization: Yup.string().required("Specialization is required"),
  registrationNumber: Yup.string()
    .matches(/^[A-Z0-9]{6,20}$/, "Invalid registration number")
    .required("Registration number is required"),
  experience: Yup.number()
    .min(0, "Experience cannot be negative")
    .required("Experience is required"),
  contactNumber: Yup.string()
    .matches(/^\d{10}$/, "Invalid contact number")
    .required("Contact number is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
});

const DoctorProfile = () => {
  const router = useRouter(); // ✅ Hook to redirect user

  // ✅ Formik hook for form state & validation
  const formik = useFormik({
    initialValues: {
      name: "",
      specialization: "",
      registrationNumber: "",
      experience: "",
      contactNumber: "",
      email: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("Doctor Profile Submitted:", values);
      alert("Doctor profile completed successfully!");

      // ✅ Redirect to the next page after submission
      router.push("/services/dashboard"); // Change this path as needed
    },
  });

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-xl mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-800">
        Doctor Profile Completion
      </h2>

      {/* ✅ Doctor Profile Form */}
      <form onSubmit={formik.handleSubmit} className="space-y-5">
        {/* Name */}
        <div>
          <label className="block mb-1 font-medium">Doctor Name</label>
          <input
            type="text"
            name="name"
            placeholder="Dr. John Doe"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            className="w-full p-2 border border-gray-300 rounded"
          />
          {formik.touched.name && formik.errors.name && (
            <p className="text-sm text-red-500 mt-1">{formik.errors.name}</p>
          )}
        </div>

        {/* Specialization */}
        <div>
          <label className="block mb-1 font-medium">Specialization</label>
          <input
            type="text"
            name="specialization"
            placeholder="Cardiologist, Dermatologist, etc."
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.specialization}
            className="w-full p-2 border border-gray-300 rounded"
          />
          {formik.touched.specialization && formik.errors.specialization && (
            <p className="text-sm text-red-500 mt-1">
              {formik.errors.specialization}
            </p>
          )}
        </div>

        {/* Registration Number */}
        <div>
          <label className="block mb-1 font-medium">Registration Number</label>
          <input
            type="text"
            name="registrationNumber"
            placeholder="e.g., MED1234567"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.registrationNumber}
            className="w-full p-2 border border-gray-300 rounded"
          />
          {formik.touched.registrationNumber &&
            formik.errors.registrationNumber && (
              <p className="text-sm text-red-500 mt-1">
                {formik.errors.registrationNumber}
              </p>
            )}
        </div>

        {/* Experience */}
        <div>
          <label className="block mb-1 font-medium">Years of Experience</label>
          <input
            type="number"
            name="experience"
            min="0"
            placeholder="e.g., 5"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.experience}
            className="w-full p-2 border border-gray-300 rounded"
          />
          {formik.touched.experience && formik.errors.experience && (
            <p className="text-sm text-red-500 mt-1">
              {formik.errors.experience}
            </p>
          )}
        </div>

        {/* Contact Number */}
        <div>
          <label className="block mb-1 font-medium">Contact Number</label>
          <input
            type="text"
            name="contactNumber"
            placeholder="10-digit number"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.contactNumber}
            className="w-full p-2 border border-gray-300 rounded"
          />
          {formik.touched.contactNumber && formik.errors.contactNumber && (
            <p className="text-sm text-red-500 mt-1">
              {formik.errors.contactNumber}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block mb-1 font-medium">Email Address</label>
          <input
            type="email"
            name="email"
            placeholder="doctor@example.com"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            className="w-full p-2 border border-gray-300 rounded"
          />
          {formik.touched.email && formik.errors.email && (
            <p className="text-sm text-red-500 mt-1">{formik.errors.email}</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded transition"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default DoctorProfile;
