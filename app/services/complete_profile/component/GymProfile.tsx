"use client";

import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";

// Validation schema using Yup
const validationSchema = Yup.object({
  gymName: Yup.string().required("Gym Name is required"),
  licenseNumber: Yup.string().required("License Number is required"),
  trainerCount: Yup.number()
    .typeError("Must be a number")
    .min(1, "At least 1 trainer required")
    .required("Trainer Count is required"),
  contactNumber: Yup.string()
    .matches(/^[6-9]\d{9}$/, "Invalid phone number")
    .required("Contact Number is required"),
  address: Yup.string().required("Address is required"),
});

const GymProfile = () => {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      gymName: "",
      licenseNumber: "",
      trainerCount: "",
      contactNumber: "",
      address: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("Gym Profile Submitted:", values);
      alert("Gym Profile completed successfully!");
      // Redirect after submission
      router.push("/");
    },
  });

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Gym Profile Completion
      </h2>
      <form onSubmit={formik.handleSubmit} className="space-y-5">
        {/* Gym Name */}
        <div>
          <label className="block font-medium mb-1">Gym Name</label>
          <input
            type="text"
            name="gymName"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.gymName}
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="e.g., FitLife Fitness Center"
          />
          {formik.touched.gymName && formik.errors.gymName && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.gymName}</p>
          )}
        </div>

        {/* License Number */}
        <div>
          <label className="block font-medium mb-1">License Number</label>
          <input
            type="text"
            name="licenseNumber"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.licenseNumber}
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="Enter valid license number"
          />
          {formik.touched.licenseNumber && formik.errors.licenseNumber && (
            <p className="text-red-500 text-sm mt-1">
              {formik.errors.licenseNumber}
            </p>
          )}
        </div>

        {/* Trainer Count */}
        <div>
          <label className="block font-medium mb-1">Number of Trainers</label>
          <input
            type="number"
            name="trainerCount"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.trainerCount}
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="e.g., 5"
          />
          {formik.touched.trainerCount && formik.errors.trainerCount && (
            <p className="text-red-500 text-sm mt-1">
              {formik.errors.trainerCount}
            </p>
          )}
        </div>

        {/* Contact Number */}
        <div>
          <label className="block font-medium mb-1">Contact Number</label>
          <input
            type="text"
            name="contactNumber"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.contactNumber}
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="e.g., 9876543210"
          />
          {formik.touched.contactNumber && formik.errors.contactNumber && (
            <p className="text-red-500 text-sm mt-1">
              {formik.errors.contactNumber}
            </p>
          )}
        </div>

        {/* Address */}
        <div>
          <label className="block font-medium mb-1">Address</label>
          <textarea
            name="address"
            rows={3}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.address}
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="Enter complete address of the gym"
          />
          {formik.touched.address && formik.errors.address && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.address}</p>
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

export default GymProfile;
