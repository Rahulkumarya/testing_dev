// pages/login.tsx
"use client";

import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import SendOtpForm from "../login/page";
import VerifyOtpForm from "../login/auth/Verify";

const LoginPage: React.FC = () => {
  const otpSent = Boolean(useSelector((state: RootState) => state.auth.phone));

  return <div>{otpSent ? <VerifyOtpForm /> : <SendOtpForm />}</div>;
};

export default LoginPage;
