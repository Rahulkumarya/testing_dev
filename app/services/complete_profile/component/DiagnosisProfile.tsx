"use client";

import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";

// ✅ Validation schema using Yup
const validationSchema = Yup.object({
  centerName: Yup.string().required("Diagnosis center name is required"),
  contact: Yup.string()
    .matches(/^[6-9]\d{9}$/, "Enter a valid 10-digit phone number")
    .required("Contact number is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  address: Yup.string().required("Full address is required"),
  testTypes: Yup.string().required("Please list the types of tests offered"),
  equipment: Yup.string().required("Mention diagnostic equipment used"),
  certifications: Yup.string().required("Certifications are required"),
});

const DiagnosisProfile = () => {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      centerName: "",
      contact: "",
      email: "",
      address: "",
      testTypes: "",
      equipment: "",
      certifications: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("Diagnosis Profile Submitted:", values);
      alert("Diagnosis Profile submitted successfully!");
      router.push("/");
    },
  });

  return (
    <div className="max-w-2xl mx-auto p-6 mt-10 bg-white shadow-lg rounded-xl">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Diagnosis Center Profile Completion
      </h2>

      <form onSubmit={formik.handleSubmit} className="space-y-5">
        {/* ✅ Diagnosis Center Name */}
        <div>
          <label className="block font-semibold mb-1">Center Name</label>
          <input
            type="text"
            name="centerName"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.centerName}
            placeholder="e.g., Lifeline Diagnostics"
            className="w-full border p-2 rounded"
          />
          {formik.touched.centerName && formik.errors.centerName && (
            <p className="text-sm text-red-500">{formik.errors.centerName}</p>
          )}
        </div>

        {/* ✅ Contact */}
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

        {/* ✅ Email */}
        <div>
          <label className="block font-semibold mb-1">Email Address</label>
          <input
            type="email"
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            placeholder="e.g., lifeline@labs.com"
            className="w-full border p-2 rounded"
          />
          {formik.touched.email && formik.errors.email && (
            <p className="text-sm text-red-500">{formik.errors.email}</p>
          )}
        </div>

        {/* ✅ Address */}
        <div>
          <label className="block font-semibold mb-1">Address</label>
          <textarea
            name="address"
            rows={3}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.address}
            placeholder="Full address with pin code"
            className="w-full border p-2 rounded"
          />
          {formik.touched.address && formik.errors.address && (
            <p className="text-sm text-red-500">{formik.errors.address}</p>
          )}
        </div>

        {/* ✅ Types of Tests Offered */}
        <div>
          <label className="block font-semibold mb-1">Types of Tests</label>
          <textarea
            name="testTypes"
            rows={2}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.testTypes}
            placeholder="e.g., Blood test, X-Ray, MRI, CT Scan, Ultrasound"
            className="w-full border p-2 rounded"
          />
          {formik.touched.testTypes && formik.errors.testTypes && (
            <p className="text-sm text-red-500">{formik.errors.testTypes}</p>
          )}
        </div>

        {/* ✅ Equipment Used */}
        <div>
          <label className="block font-semibold mb-1">Equipment</label>
          <input
            type="text"
            name="equipment"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.equipment}
            placeholder="e.g., Siemens MRI Machine, Philips CT Scanner"
            className="w-full border p-2 rounded"
          />
          {formik.touched.equipment && formik.errors.equipment && (
            <p className="text-sm text-red-500">{formik.errors.equipment}</p>
          )}
        </div>

        {/* ✅ Certifications */}
        <div>
          <label className="block font-semibold mb-1">Certifications</label>
          <input
            type="text"
            name="certifications"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.certifications}
            placeholder="e.g., NABL, ISO 9001:2015"
            className="w-full border p-2 rounded"
          />
          {formik.touched.certifications && formik.errors.certifications && (
            <p className="text-sm text-red-500">
              {formik.errors.certifications}
            </p>
          )}
        </div>

        {/* ✅ Submit Button */}
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

export default DiagnosisProfile;
