"use client";

import React, { FC, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { VscWorkspaceTrusted } from "react-icons/vsc";
import {
  useActivationMutation,
  useLoginMutation,
} from "../../../../../redux/features/auth/authApi";
import { useCheckProfileQuery } from "../../../../../redux/features/services/dprofile/profileApi";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setCurrentStep } from "../../../../../redux/features/onboarding/onboardingSlice";
import {store} from "../../../../../redux/store";



type Props = {
  setRoute: (route: string) => void;
  emailRef: React.MutableRefObject<string>;
  passwordRef: React.MutableRefObject<string>;
};

const Verification: FC<Props> = ({ setRoute, emailRef, passwordRef }) => {
  const router = useRouter();
  const { token } = useSelector((state: any) => state.auth);

  const [activation, { isSuccess:isActivationSucess,error: activationError }] = useActivationMutation();
  const [login, { isSuccess: isLoginSuccess, error: loginError }] =
    useLoginMutation();
 




  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  const [otp, setOtp] = useState(["", "", "", ""]);
  const [invalidError, setInvalidError] = useState(false);

//update a onboarding state
const dispatch = useDispatch();
const {user} = useSelector((state: store) => state.auth.user);
console.log(`user_name `,user);

const { data, isLoading, isError, refetch } = useCheckProfileQuery(
  { userId: user?._id, role: user?.role },
  { skip: !user?._id || !user?.role }
);



  useEffect(() => {
    inputRefs.current[0]?.focus(); // auto focus first box
  }, []);
  useEffect(() => {
    if (isActivationSucess) {
     console.log(`activation success`)

  
    }
    if (activationError) {
      const message =
        activationError?.data?.message || "Login failed, please try again";

      toast.error(message);
      console.log("Activation error:", activationError);
    }
  }, [isActivationSucess, activationError]);


  useEffect(() => {
    if(isLoginSuccess){
        emailRef.current = "";
        passwordRef.current = "";
        toast.success("Please Complete your profile");
        dispatch(setCurrentStep(2));
      
          router.push(`/services/selling/component/complete_profile`);
       
    }
    if (loginError) {
      toast.error("Login failed, please try again");
    }
  }, [loginError,isLoginSuccess]);

  const handleInputChange = (index: number, value: string) => {
    setInvalidError(false);

    // allow only numbers
    if (!/^\d*$/.test(value)) return;

    const updatedOtp = [...otp];
    updatedOtp[index] = value.slice(-1); // only take the last char
    setOtp(updatedOtp);

    // auto move
    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("Text").trim();

    if (/^\d{4}$/.test(pastedData)) {
      const updatedOtp = pastedData.split("");
      setOtp(updatedOtp);
      updatedOtp.forEach((_, i) => {
        inputRefs.current[i]?.focus();
      });
    }
  };

  const verificationHandler = async () => {
    const code = otp.join("");
    if (code.length !== 4) {
      setInvalidError(true);
      return;
    }

    try {
     const resp= await activation({
        activation_token: token,
        activation_code: code,
      }).unwrap();

      console.log(`activation response`,resp);

      // auto-login using refs
      const email = emailRef.current;
      const password = passwordRef.current;

      if (!email || !password) {
        toast.error("Missing credentials. Please sign in.");
        setRoute("Login");
        return;
      }

      const res = await login({ email, password }).unwrap();
      localStorage.setItem("token", res.accessToken);

    
      // cleanup
      emailRef.current = "";
      passwordRef.current = "";
      
    } catch (err: any) {
        if (err?.data?.message) {
            // toast.error(err.data.message);
            // setInvalidError(true);
        } else {
            console.error("An error occurred during verification:", err);
            // toast.error("Verification failed. Please try again.");
        }
    }
  };

  return (
    <div className="w-full max-w-md mx-auto mt-12 p-6 bg-white dark:bg-[#1e1e1e] shadow-xl rounded-xl">
      <h1 className="text-2xl font-bold text-center text-gray-800 dark:text-white">
        Verify Your Account
      </h1>

      <div className="mt-6 flex justify-center">
        <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center shadow-lg">
          <VscWorkspaceTrusted size={40} className="text-white" />
        </div>
      </div>

      <div className="mt-8 flex justify-between gap-3 px-4">
        {otp.map((digit, index) => (
          <input
            key={index}
            ref={(el) => (inputRefs.current[index] = el)}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleInputChange(index, e.target.value)}
            onPaste={handlePaste}
            className={`w-14 h-14 text-center text-2xl font-semibold rounded-lg border-2 ${
              invalidError
                ? "border-red-500 shake"
                : "border-gray-300 dark:border-white"
            } focus:border-blue-500 outline-none text-gray-900 dark:text-white bg-transparent`}
          />
        ))}
      </div>

      <div className="mt-6 flex justify-center">
        <button
          onClick={verificationHandler}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-lg transition mb-10"
        >
          Verify OTP
        </button>
      </div>

      {/* <p className="text-center text-sm mt-4 text-black dark:text-white">
        Already have an account?
        <span
          onClick={() => setRoute("Login")}
          className="text-blue-500 cursor-pointer ml-1 hover:underline"
        >
          Sign in
        </span>
      </p> */}
    </div>
  );
};

export default Verification;
