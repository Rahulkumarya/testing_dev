// components/VerifyOtpForm.tsx
"use client";

import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useVerifyOtpMutation } from "../../../../../redux/features/auth/authApi";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../redux/store";

interface FormValues {
  otp: string;
}

const VerifyOtpForm: React.FC = () => {
  const [verifyOtp, { isLoading, isError, error, isSuccess }] =
    useVerifyOtpMutation();

  // If phone is missing, user must start from SendOtpForm again
  const phone = useSelector((state: RootState) => state.auth.phone);

  const formik = useFormik<FormValues>({
    initialValues: { otp: "" },
    validationSchema: Yup.object({
      otp: Yup.string()
        .matches(/^\d{6}$/, "OTP must be 6 digits")
        .required("OTP is required"),
    }),
    onSubmit: (values) => {
      verifyOtp(values);
    },
  });

  if (!phone) {
    return <div>Please enter phone first (go back to OTP form).</div>;
  }

  return (
    <div style={{ maxWidth: 400, margin: "0 auto", padding: 20 }}>
      <h2>Enter the 6-digit OTP sent to {phone}</h2>
      <form onSubmit={formik.handleSubmit}>
        <div style={{ marginBottom: 12 }}>
          <label htmlFor="otp">OTP</label>
          <input
            id="otp"
            name="otp"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.otp}
            style={{ display: "block", width: "100%", padding: 8 }}
          />
          {formik.touched.otp && formik.errors.otp ? (
            <div style={{ color: "red" }}>{formik.errors.otp}</div>
          ) : null}
        </div>

        <button
          type="submit"
          disabled={isLoading || !formik.isValid}
          style={{
            backgroundColor: "#0070f3",
            color: "#fff",
            padding: "8px 16px",
            border: "none",
            borderRadius: 4,
            cursor: isLoading ? "not-allowed" : "pointer",
          }}
        >
          {isLoading ? "Verifying..." : "Verify OTP"}
        </button>

        {isError && (
          <div style={{ color: "red", marginTop: 12 }}>
            {(error as any)?.data?.message || "Failed to verify OTP"}
          </div>
        )}
        {isSuccess && (
          <div style={{ color: "green", marginTop: 12 }}>
            OTP verified! You are now logged in.
          </div>
        )}
      </form>
    </div>
  );
};

export default VerifyOtpForm;
