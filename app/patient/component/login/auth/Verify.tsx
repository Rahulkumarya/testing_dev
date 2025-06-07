// components/VerifyOtpForm.tsx
"use client";

import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useVerifyOtpMutation } from "../../../../../redux/features/auth/authApi";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../redux/store";
import toast from "react-hot-toast";
// import { Router } from "lucide-react";

import { useRouter } from "next/navigation";



interface FormValues {
  otp: string;
}

const VerifyOtpForm: React.FC = () => {

  const router =useRouter()
  // RTK Query mutation for verifying OTP
  const [verifyOtp, { isLoading, isError, error, isSuccess }] =
    useVerifyOtpMutation();

  // Retrieve the phone number from Redux state
  const phone = useSelector((state: RootState) => state.auth.phone);

  // Formik setup with Yup validation
  const formik = useFormik<FormValues>({
    initialValues: { otp: "" },
    validationSchema: Yup.object({
      otp: Yup.string()
        .matches(/^\d{6}$/, "OTP must be 6 digits")
        .required("OTP is required"),
    }),
    onSubmit: (values) => {
      // Trigger verifyOtp mutation with entered OTP
      verifyOtp(values);
      router.push("/services/complete_profile");
    },
  });

  // Show toast notifications on success or error
  useEffect(() => {
    if (isSuccess) {
      toast.success("Login successful");
    }
    if (isError) {
      // @ts-ignore
      toast.error(error?.data?.message || "Failed to verify OTP");
    }
  }, [isSuccess, isError, error]);

  // If no phone in state, prompt user to go back
  if (!phone) {
    return (
      <div className="flex items-center justify-center min-h-screen p-4 bg-gray-100">
        <div className="text-center text-red-600">
          Please enter your phone number first.
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gray-100">
      {/* Container */}
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        {/* Heading */}
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Enter the 6‑digit OTP sent to:
        </h2>
        <p className="text-center text-gray-600 mb-6">{phone}</p>

        {/* Form */}
        <form onSubmit={formik.handleSubmit} noValidate>
          {/* OTP Input Field */}
          <div className="mb-4">
            <label htmlFor="otp" className="block text-gray-700 mb-1">
              One-Time Password
            </label>
            <input
              id="otp"
              name="otp"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.otp}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="123456"
            />
            {formik.touched.otp && formik.errors.otp && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.otp}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading || !formik.isValid}
            className={`w-full py-2 mt-2 rounded-md font-semibold text-white
              ${
                isLoading || !formik.isValid
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }
            `}
          >
            {isLoading ? "Verifying..." : "Verify OTP"}
          </button>

          {/* Status Messages */}
          {isError && (
            // Display error text below button if mutation fails
            <p className="text-red-500 text-center text-sm mt-4">
              {/* @ts-ignore */}
              {error?.data?.message || "Failed to verify OTP"}
            </p>
          )}
          {isSuccess && (
            // Confirmation message (toast also appears)
            <p className="text-green-500 text-center text-sm mt-4">
              OTP verified! You are now logged in.
            </p>
          )}
        </form>

        {/* Optional: Back to phone input */}
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

export default VerifyOtpForm;
