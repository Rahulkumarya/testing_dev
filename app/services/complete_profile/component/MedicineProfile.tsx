"use client";

import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";

// Validation schema using Yup
const validationSchema = Yup.object({
  shopName: Yup.string().required("Shop name is required"),
  licenseNumber: Yup.string().required("License number is required"),
  ownerName: Yup.string().required("Owner name is required"),
  contact: Yup.string()
    .matches(/^[6-9]\d{9}$/, "Invalid phone number")
    .required("Contact is required"),
  services: Yup.string().required("Please specify services"),
  address: Yup.string().required("Address is required"),
});

const MedicineShopProfile = () => {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      shopName: "",
      licenseNumber: "",
      ownerName: "",
      contact: "",
      services: "",
      address: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("Medicine Shop Profile:", values);
      alert("Profile submitted successfully!");
      router.push("/"); // Redirect after successful submission
    },
  });

  return (
    <div className="max-w-xl mx-auto p-6 mt-10 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Medicine Shop Profile Completion
      </h2>
      <form onSubmit={formik.handleSubmit} className="space-y-5">
        {/* Shop Name */}
        <div>
          <label className="block font-medium mb-1">Shop Name</label>
          <input
            type="text"
            name="shopName"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.shopName}
            placeholder="e.g., HealthCare Pharmacy"
            className="w-full p-2 border rounded border-gray-300"
          />
          {formik.touched.shopName && formik.errors.shopName && (
            <p className="text-sm text-red-500 mt-1">
              {formik.errors.shopName}
            </p>
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
            placeholder="e.g., PHM123456"
            className="w-full p-2 border rounded border-gray-300"
          />
          {formik.touched.licenseNumber && formik.errors.licenseNumber && (
            <p className="text-sm text-red-500 mt-1">
              {formik.errors.licenseNumber}
            </p>
          )}
        </div>

        {/* Owner Name */}
        <div>
          <label className="block font-medium mb-1">Owner Name</label>
          <input
            type="text"
            name="ownerName"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.ownerName}
            placeholder="e.g., Rahul Kumar"
            className="w-full p-2 border rounded border-gray-300"
          />
          {formik.touched.ownerName && formik.errors.ownerName && (
            <p className="text-sm text-red-500 mt-1">
              {formik.errors.ownerName}
            </p>
          )}
        </div>

        {/* Contact Number */}
        <div>
          <label className="block font-medium mb-1">Contact Number</label>
          <input
            type="text"
            name="contact"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.contact}
            placeholder="e.g., 9876543210"
            className="w-full p-2 border rounded border-gray-300"
          />
          {formik.touched.contact && formik.errors.contact && (
            <p className="text-sm text-red-500 mt-1">{formik.errors.contact}</p>
          )}
        </div>

        {/* Services */}
        <div>
          <label className="block font-medium mb-1">Available Services</label>
          <textarea
            name="services"
            rows={2}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.services}
            placeholder="e.g., OTC medicines, Prescription drugs, Home delivery"
            className="w-full p-2 border rounded border-gray-300"
          />
          {formik.touched.services && formik.errors.services && (
            <p className="text-sm text-red-500 mt-1">
              {formik.errors.services}
            </p>
          )}
        </div>

        {/* Address */}
        <div>
          <label className="block font-medium mb-1">Shop Address</label>
          <textarea
            name="address"
            rows={3}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.address}
            placeholder="Full address with landmark, city, and pincode"
            className="w-full p-2 border rounded border-gray-300"
          />
          {formik.touched.address && formik.errors.address && (
            <p className="text-sm text-red-500 mt-1">{formik.errors.address}</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded transition"
          >
            Submit Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default MedicineShopProfile;
