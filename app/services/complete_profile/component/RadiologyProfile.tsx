"use client";

import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";

// Yup validation schema
const validationSchema = Yup.object({
  centerName: Yup.string().required("Center name is required"),
  licenseId: Yup.string().required("License ID is required"),
  contact: Yup.string()
    .matches(/^[6-9]\d{9}$/, "Invalid phone number")
    .required("Contact is required"),
  services: Yup.string().required("Please list available services"),
  equipment: Yup.string().required("Please list major equipment"),
  address: Yup.string().required("Address is required"),
});

const RadiologyProfile = () => {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      centerName: "",
      licenseId: "",
      contact: "",
      services: "",
      equipment: "",
      address: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("Radiology Profile Submitted:", values);
      alert("Radiology profile completed successfully!");
      router.push("/"); // redirect after submission
    },
  });

  return (
    <div className="max-w-xl mx-auto p-6 mt-10 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Radiology Center Profile Completion
      </h2>
      <form onSubmit={formik.handleSubmit} className="space-y-5">
        {/* Center Name */}
        <div>
          <label className="block mb-1 font-medium">Center Name</label>
          <input
            type="text"
            name="centerName"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.centerName}
            placeholder="e.g., Radiant Imaging Center"
            className="w-full border border-gray-300 p-2 rounded"
          />
          {formik.touched.centerName && formik.errors.centerName && (
            <p className="text-sm text-red-500 mt-1">
              {formik.errors.centerName}
            </p>
          )}
        </div>

        {/* License ID */}
        <div>
          <label className="block mb-1 font-medium">License ID</label>
          <input
            type="text"
            name="licenseId"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.licenseId}
            placeholder="e.g., RAD2025XYZ"
            className="w-full border border-gray-300 p-2 rounded"
          />
          {formik.touched.licenseId && formik.errors.licenseId && (
            <p className="text-sm text-red-500 mt-1">
              {formik.errors.licenseId}
            </p>
          )}
        </div>

        {/* Contact */}
        <div>
          <label className="block mb-1 font-medium">Contact Number</label>
          <input
            type="text"
            name="contact"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.contact}
            placeholder="e.g., 9876543210"
            className="w-full border border-gray-300 p-2 rounded"
          />
          {formik.touched.contact && formik.errors.contact && (
            <p className="text-sm text-red-500 mt-1">{formik.errors.contact}</p>
          )}
        </div>

        {/* Services */}
        <div>
          <label className="block mb-1 font-medium">Available Services</label>
          <textarea
            name="services"
            rows={3}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.services}
            placeholder="e.g., MRI, CT Scan, X-ray"
            className="w-full border border-gray-300 p-2 rounded"
          />
          {formik.touched.services && formik.errors.services && (
            <p className="text-sm text-red-500 mt-1">
              {formik.errors.services}
            </p>
          )}
        </div>

        {/* Equipment */}
        <div>
          <label className="block mb-1 font-medium">Major Equipment</label>
          <textarea
            name="equipment"
            rows={2}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.equipment}
            placeholder="e.g., Siemens 3T MRI, GE CT750"
            className="w-full border border-gray-300 p-2 rounded"
          />
          {formik.touched.equipment && formik.errors.equipment && (
            <p className="text-sm text-red-500 mt-1">
              {formik.errors.equipment}
            </p>
          )}
        </div>

        {/* Address */}
        <div>
          <label className="block mb-1 font-medium">Center Address</label>
          <textarea
            name="address"
            rows={3}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.address}
            placeholder="Full address with city, state and zip"
            className="w-full border border-gray-300 p-2 rounded"
          />
          {formik.touched.address && formik.errors.address && (
            <p className="text-sm text-red-500 mt-1">{formik.errors.address}</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded transition"
          >
            Submit Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default RadiologyProfile;
