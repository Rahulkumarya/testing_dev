"use client";
import React, { FC, useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { styles } from "../../../../../app/styles/Style";
import { useRegisterMutation } from "../../../../../redux/features/auth/authApi";
import toast from "react-hot-toast";
// import { useSearchParams } from "next/navigation";
import { useParams } from "next/navigation";
import Verification from "../component/Verification";
import { useSelector } from "react-redux";
import { store } from "../../../../../redux/store";
import {useRouter} from "next/navigation"


type Props = {
  setRoute: (route: string) => void;
};

const schema = Yup.object().shape({
  phone: Yup.string()
  .required("Please enter your mobile number!")
  .matches(/^[6-9]\d{9}$/, "Please enter a valid 10-digit Indian phone number"),
  email: Yup.string()
    .email("Invalid email!")
    .required("Please enter your email!"),
  password: Yup.string().required("Please enter your password!").min(6),
});

const SignUp: FC<Props> = ({ setRoute }) => {
  const [show, setShow] = useState(false);
  const [routes,setRoutes]=useState("SignUp");
  const [register, { data, error, isSuccess }] = useRegisterMutation();
//   const searchParams = useSearchParams();
//   const role = searchParams.get("role") || ""; // fetch role from query param
const params = useParams();

const router=useRouter();

const role = params?.role as string;
  console.log(`Role from URL: ${role}`,role);
  const emailRef = useRef<string>("");
  const passwordRef = useRef<string>("");
const step=useSelector((state)=>state.onboarding.currentStep);
  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message || "Registration successful");
      setRoutes("Verification");
    }
    if (error && "data" in error) {
      const err = error as any;
      toast.error(err.data.message);
    }
  }, [isSuccess, error, data?.message, setRoute]);

  const formik = useFormik({
    initialValues: { phone: "", email: "", password: "" },
    validationSchema: schema,
    onSubmit: async ({phone, email, password }) => {
      if (!role) {
        toast.error("Role is missing from URL params");
        return;
      }

      

      await register({ phone, email, password, role });
      emailRef.current = email;
      passwordRef.current = password;
    },
  });

  const { errors, touched, values, handleChange, handleSubmit } = formik;

  return (
    <>
      {step === 1 && (
        <>
          {routes === "SignUp" && (
            <div className="w-full max-w-lg mx-auto px-4 start-left mb-10">
              <h1 className={`${styles.title} mb-2`}>
                Create your account to continue
              </h1>
              <p className="text-gray-500 text-sm mb-6"></p>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name */}
                <div>
                  <label className={styles.label} htmlFor="name">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    name="phone"
                    id="phone"
                    value={values.phone}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                    className={`${
                      errors.phone && touched.phone ? "border-red-500" : ""
                    } ${styles.input}`}
                  />
                  {errors.phone && touched.phone && (
                    <p className="text-red-500 text-sm">{errors.phone}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className={styles.label} htmlFor="email">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={values.email}
                    onChange={handleChange}
                    placeholder="example@gmail.com"
                    className={`${
                      errors.email && touched.email ? "border-red-500" : ""
                    } ${styles.input}`}
                  />
                  {errors.email && touched.email && (
                    <p className="text-red-500 text-sm">{errors.email}</p>
                  )}
                </div>

                {/* Password */}
                <div className="relative">
                  <label className={styles.label} htmlFor="password">
                    Password
                  </label>
                  <input
                    type={show ? "text" : "password"}
                    name="password"
                    id="password"
                    value={values.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className={`${
                      errors.password && touched.password
                        ? "border-red-500"
                        : ""
                    } ${styles.input}`}
                  />
                  {show ? (
                    <AiOutlineEye
                      className="absolute right-3 bottom-3 cursor-pointer text-gray-500"
                      onClick={() => setShow(false)}
                    />
                  ) : (
                    <AiOutlineEyeInvisible
                      className="absolute right-3 bottom-3 cursor-pointer text-gray-500"
                      onClick={() => setShow(true)}
                    />
                  )}
                  {errors.password && touched.password && (
                    <p className="text-red-500 text-sm">{errors.password}</p>
                  )}
                </div>

                <button type="submit" className={styles.button}>
                  Sign Up
                </button>
              </form>

              {/* Onboarding step */}
            </div>
          )}

          {routes === "Verification" && (
            <>
              <Verification
                setRoute={setRoute}
                emailRef={emailRef}
                passwordRef={passwordRef}
              />
            </>
          )}
        </>
      )}



      {
        step===2 &&(
          router.push("/services/selling/component/complete_profile")
        )
      }
      {
        step===3 &&(
          router.push("/services/selling/profile")
        )
      }
    </>
  );
};

export default SignUp;


