"use client";

import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";

// Validation schema
const validationSchema = Yup.object({
  resortName: Yup.string().required("Resort name is required"),
  contact: Yup.string()
    .matches(/^[6-9]\d{9}$/, "Enter a valid 10-digit phone number")
    .required("Contact is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  address: Yup.string().required("Address is required"),
  medicalFacilities: Yup.string().required("List the medical facilities"),
  certifications: Yup.string().required("Certifications are required"),
  specialistDepartments: Yup.string().required(
    "List departments (comma-separated)"
  ),
});

const ResortProfile = () => {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      resortName: "",
      contact: "",
      email: "",
      address: "",
      medicalFacilities: "",
      certifications: "",
      specialistDepartments: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("Resort Profile Submitted:", values);
      alert("Resort Profile submitted successfully!");
      router.push("/");
    },
  });

  return (
    <div className="max-w-2xl mx-auto p-6 mt-10 bg-white shadow-lg rounded-xl">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Medical Resort Profile Completion
      </h2>
      <form onSubmit={formik.handleSubmit} className="space-y-5">
        {/* Resort Name */}
        <div>
          <label className="block font-semibold mb-1">Resort Name</label>
          <input
            type="text"
            name="resortName"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.resortName}
            placeholder="e.g., Wellness Valley Retreat"
            className="w-full border p-2 rounded"
          />
          {formik.touched.resortName && formik.errors.resortName && (
            <p className="text-sm text-red-500">{formik.errors.resortName}</p>
          )}
        </div>

        {/* Contact Number */}
        <div>
          <label className="block font-semibold mb-1">Contact Number</label>
          <input
            type="text"
            name="contact"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.contact}
            placeholder="e.g., 9876543210"
            className="w-full border p-2 rounded"
          />
          {formik.touched.contact && formik.errors.contact && (
            <p className="text-sm text-red-500">{formik.errors.contact}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block font-semibold mb-1">Email</label>
          <input
            type="email"
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            placeholder="e.g., contact@wellnessvalley.com"
            className="w-full border p-2 rounded"
          />
          {formik.touched.email && formik.errors.email && (
            <p className="text-sm text-red-500">{formik.errors.email}</p>
          )}
        </div>

        {/* Address */}
        <div>
          <label className="block font-semibold mb-1">Full Address</label>
          <textarea
            name="address"
            rows={3}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.address}
            placeholder="Street, City, State, Pincode"
            className="w-full border p-2 rounded"
          />
          {formik.touched.address && formik.errors.address && (
            <p className="text-sm text-red-500">{formik.errors.address}</p>
          )}
        </div>

        {/* Medical Facilities */}
        <div>
          <label className="block font-semibold mb-1">
            Medical Facilities Offered
          </label>
          <textarea
            name="medicalFacilities"
            rows={3}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.medicalFacilities}
            placeholder="e.g., Ayurvedic therapy, Physiotherapy, Detox, Panchakarma"
            className="w-full border p-2 rounded"
          />
          {formik.touched.medicalFacilities &&
            formik.errors.medicalFacilities && (
              <p className="text-sm text-red-500">
                {formik.errors.medicalFacilities}
              </p>
            )}
        </div>

        {/* Certifications */}
        <div>
          <label className="block font-semibold mb-1">Certifications</label>
          <input
            type="text"
            name="certifications"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.certifications}
            placeholder="e.g., NABH, AYUSH Certified"
            className="w-full border p-2 rounded"
          />
          {formik.touched.certifications && formik.errors.certifications && (
            <p className="text-sm text-red-500">
              {formik.errors.certifications}
            </p>
          )}
        </div>

        {/* Specialist Departments */}
        <div>
          <label className="block font-semibold mb-1">
            Specialist Departments
          </label>
          <input
            type="text"
            name="specialistDepartments"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.specialistDepartments}
            placeholder="e.g., Ayurveda, Naturopathy, Yoga, Rehabilitation"
            className="w-full border p-2 rounded"
          />
          {formik.touched.specialistDepartments &&
            formik.errors.specialistDepartments && (
              <p className="text-sm text-red-500">
                {formik.errors.specialistDepartments}
              </p>
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

export default ResortProfile;
