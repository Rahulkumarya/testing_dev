// components/SendOtpForm.tsx
"use client";

import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSendOtpMutation } from "../../../../redux/features/auth/authApi";
import toast from "react-hot-toast";

interface FormValues {
  name: string;
  phone: string;
}

const SendOtpForm: React.FC = () => {
  // RTK Query mutation for sending OTP
  const [sendOtp, { isLoading, isError, error, isSuccess }] =
    useSendOtpMutation();

  // Formik setup with Yup validation
  const formik = useFormik<FormValues>({
    initialValues: { name: "", phone: "" },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      phone: Yup.string()
        .matches(/^\+\d{10,14}$/, "Use E.164 format (e.g. +1234567890)")
        .required("Phone is required"),
    }),
    onSubmit: (values) => {
      // Trigger sendOtp mutation with name and phone
      sendOtp(values);
    },
  });

  // Display toast on success or error
  useEffect(() => {
    if (isSuccess) {
      toast.success("OTP sent successfully! Check your phone.");
    }
    if (isError) {
      // @ts-ignore
      toast.error(error?.data?.message || "Failed to send OTP");
    }
  }, [isSuccess, isError, error]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      {/* Card Container */}
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        {/* Heading */}
        <h2 className="text-2xl font-semibold text-center mb-4">
          Enter Name & Phone to Receive OTP
        </h2>

        {/* Form */}
        <form onSubmit={formik.handleSubmit} noValidate>
          {/* Name Field */}
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 mb-1">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.name}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Your full name"
            />
            {formik.touched.name && formik.errors.name && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.name}</p>
            )}
          </div>

          {/* Phone Field */}
          <div className="mb-4">
            <label htmlFor="phone" className="block text-gray-700 mb-1">
              Phone (E.164)
            </label>
            <input
              id="phone"
              name="phone"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.phone}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="+1234567890"
            />
            {formik.touched.phone && formik.errors.phone && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.phone}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading || !formik.isValid}
            className={`w-full py-2 mt-2 rounded-md font-semibold text-white ${
              isLoading || !formik.isValid
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {isLoading ? "Sending OTP..." : "Send OTP"}
          </button>

          {/* Status Messages */}
          {isError && (
            // Display error below button if mutation fails
            <p className="text-red-500 text-center text-sm mt-4">
              {/* @ts-ignore */}
              {error?.data?.message || "Failed to send OTP"}
            </p>
          )}
          {isSuccess && (
            // Confirmation message (toast also appears)
            <p className="text-green-500 text-center text-sm mt-4">
              OTP was sent. Please check your phone.
            </p>
          )}
        </form>

        {/* Optional: Link to change phone number */}
        <div className="text-center mt-6">
          <button
            type="button"
            onClick={() => window.history.back()}
            className="text-blue-600 hover:underline text-sm"
          >
            Change phone number
          </button>
        </div>
      </div>
    </div>
  );
};

export default SendOtpForm;
