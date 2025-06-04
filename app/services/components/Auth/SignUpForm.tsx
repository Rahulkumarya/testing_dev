"use client";
import React, { FC, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiFillGithub,
} from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { styles } from "../../../../app/styles/Style";
import { useRegisterMutation } from "../../../../redux/features/auth/authApi";
import toast from "react-hot-toast";

type Props = {
  setRoute: (route: string) => void;
};

const schema = Yup.object().shape({
  name: Yup.string().required("Please enter your name!"),
  email: Yup.string()
    .email("Invalid email!")
    .required("Please enter your email!"),
  password: Yup.string().required("Please enter your password!").min(6),
  role: Yup.string().required("Please select a role!"),
});

const SignUp: FC<Props> = ({ setRoute }) => {
  const [show, setShow] = useState(false);
  const [register, { data, error, isSuccess }] = useRegisterMutation();

  useEffect(() => {
    if (isSuccess) {
      const message = data?.message || "Registration successful";
      toast.success(message);
      setRoute("Verification");
    }
    if (error && "data" in error) {
      const errorData = error as any;
      toast.error(errorData.data.message);
    }
  }, [isSuccess, error, data?.message, setRoute]);

  const formik = useFormik({
    initialValues: { name: "", email: "", password: "", role: "" },
    validationSchema: schema,
    onSubmit: async ({ name, email, password, role }) => {
      await register({ name, email, password, role });
    },
  });

  const { errors, touched, values, handleChange, handleSubmit } = formik;

  return (
    <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto px-4 sm:px-6 md:px-8 lg:px-10">
      <h1 className={`${styles.title}`}>Join to UronHealth</h1>

      <form onSubmit={handleSubmit} className="w-full">
        {/* Name */}
        <div className="mb-3">
          <label className={`${styles.label}`} htmlFor="name">
            Enter your Name
          </label>
          <input
            type="text"
            name="name"
            value={values.name}
            onChange={handleChange}
            id="name"
            placeholder="Rohit Kumar"
            className={`${errors.name && touched.name && "border-red-500"} ${
              styles.input
            }`}
          />
          {errors.name && touched.name && (
            <span className="text-red-500 pt-2 block">{errors.name}</span>
          )}
        </div>

        {/* Email */}
        <div className="mb-3">
          <label className={`${styles.label}`} htmlFor="email">
            Enter your Email
          </label>
          <input
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            id="email"
            placeholder="Loginmail@gmail.com"
            className={`${errors.email && touched.email && "border-red-500"} ${
              styles.input
            }`}
          />
          {errors.email && touched.email && (
            <span className="text-red-500 pt-2 block">{errors.email}</span>
          )}
        </div>

        {/* Password */}
        <div className="w-full mt-5 relative mb-1">
          <label className={`${styles.label}`} htmlFor="password">
            Enter your Password
          </label>
          <input
            type={!show ? "password" : "text"}
            name="password"
            value={values.password}
            onChange={handleChange}
            id="password"
            placeholder="Password!@%"
            className={`${
              errors.password && touched.password && "border-red-500"
            } ${styles.input}`}
          />
          {!show ? (
            <AiOutlineEyeInvisible
              className="absolute bottom-3 right-2 z-10 cursor-pointer"
              size={20}
              onClick={() => setShow(true)}
            />
          ) : (
            <AiOutlineEye
              className="absolute bottom-3 right-2 z-10 cursor-pointer"
              size={20}
              onClick={() => setShow(false)}
            />
          )}
          {errors.password && touched.password && (
            <span className="text-red-500 pt-2 block">{errors.password}</span>
          )}
        </div>

        {/* Role Dropdown */}
        <div className="mb-3 mt-5 ">
          <label className={`${styles.label}`} htmlFor="role">
            Select your Role
          </label>
          <select
            name="role"
            id="role"
            value={values.role}
            onChange={handleChange}
            className={`${errors.role && touched.role && "border-red-500"} ${
              styles.input
            } cursor-pointer text-red-500`}
          >
            <option value="" disabled>
              -- Select Role --
            </option>
            <option value="doctor" className="text-black">
              Doctor
            </option>
            <option value="diagnosis" className="text-black">
              Diagnosis
            </option>
            <option value="hospital" className="text-black">
              Hospital
            </option>
            <option value="radiology" className="text-black">
              Radiology
            </option>
            <option value="resort" className="text-black">
              Resort
            </option>
            <option value="ambulance" className="text-black">
              Ambulance
            </option>
            <option value="medicine" className="text-black">
              Pharmacy
            </option>
            <option value="Gym" className="text-black">
              Gym
            </option>
          </select>
          {errors.role && touched.role && (
            <span className="text-red-500 pt-2 block">{errors.role}</span>
          )}
        </div>

        {/* Submit */}
        <div className="w-full mt-5">
          <input type="submit" value="Sign Up" className={`${styles.button}`} />
        </div>

        <h5 className="text-center pt-4 font-Poppins text-[14px] text-black dark:text-white">
          or join with
        </h5>

        <div className="flex items-center justify-center my-3">
          <FcGoogle size={30} className="cursor-pointer mr-2" />
          <AiFillGithub size={30} className="cursor-pointer mr-2" />
        </div>

        <h5 className="text-center pt-4 font-Poppins text-[14px]">
          Already have an account?{" "}
          <span
            className="text-[#2190ff] pl-1 cursor-pointer"
            onClick={() => setRoute("Login")}
          >
            Sign in
          </span>
        </h5>
      </form>
      <br />
    </div>
  );
};

export default SignUp;
