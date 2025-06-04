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
import { userLoggedIn } from "../../../../redux/features/auth/authSlice";
import toast from "react-hot-toast";
import { useLoginMutation } from "../../../../redux/features/auth/authApi";
import { store } from "@/redux/store";
import { signIn } from "next-auth/react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useCheckProfileQuery } from "../../../../redux/features/services/dprofile/profileApi";
type Props = {
  setRoute: (route: string) => void;
  setOpen: (open: boolean) => void;
 
};

const schema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email!")
    .required("Please enter your email!"),
  password: Yup.string().required("Please enter your password!").min(6),
});

const Login: FC<Props> = ({ setRoute, setOpen }) => {

  const router=useRouter();
  const user = useSelector((state: store) => state.auth.user);
  console.log(`user_name ${user.name}`,user)
  const [show, setShow] = useState(false);
  const [login, { isSuccess, error }] = useLoginMutation();

  const { data, isLoading, isError, refetch } = useCheckProfileQuery(
    { userId: user?._id, role: user?.role },
    { skip: !user?._id || !user?.role } // ✅ wait until user ID and role are present
  );
console.log(`data is `,data)
  // useEffect(() => {
  //   if(isLoading){
  //     <h1 className="text-black text-center">Loading...</h1>
  //   }
  //   else if (data?.profileCompleted) {
  //     router.push("/services/complete_profile");
  //   }
  // }, [data]);

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: schema,
    // onSubmit: async ({ email, password }) => {
    //  const res= await login({ email, password }).unwrap();
    //   console.log(`response login `,res);
    // const token=  localStorage.setItem("token", res.accessToken);
    // console.log(`token is `,token)

    // },

    onSubmit: async ({ email, password }) => {
      try {
        const res = await login({ email, password }).unwrap();
        localStorage.setItem("token", res.accessToken);
        toast.success("Login Successful");

        // Now check profile here manually (or dispatch to redux)
        const profileRes = await refetch(); // refetch from `useCheckProfileQuery`

        if (profileRes?.data?.profileCompleted === false) {
          router.push("/services/complete_profile");
        } else {
          router.push("/"); // or any other default home page
        }

        setOpen(false);
      } catch (err: any) {
        if (err?.data?.message) {
          toast.error(err.data.message);
        } else {
          toast.error("Login failed!",err);
        }
      }
    },
  });

  // useEffect(() => {        // useEffect occurs problem in this login and form completion 
  //   if (isSuccess) {
  //     toast.success("Login Successfully");
  //     router.push("/services/complete_profile");

  //     setOpen(false);
  //   }
  //   if (error) {
  //     if ("data" in error) {
  //       const errorData = error as any;
  //       toast.error(errorData.data.message);
  //     }
  //   }
  // }, [isSuccess, error, setOpen]);
  const { errors, touched, values, handleChange, handleSubmit } = formik;

  return (
    <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto px-4 sm:px-6 md:px-8 lg:px-10">
      <h1 className={`${styles.title}`}>Login With UronHealth</h1>

      <form onSubmit={handleSubmit} className="w-full">
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
        <div className="w-full mt-5">
          <input type="submit" value="Login" className={`${styles.button}`} />
        </div>
        <br />
        <h5 className="text-center pt-4 font-Poppins text-[14px] text-black dark:text-white">
          or join with
        </h5>
        <div className="flex items-center justify-center my-3">
          <FcGoogle
            size={30}
            className="cursor-pointer mr-2"
            onClick={() => signIn("google")}
          />
          <AiFillGithub
            size={30}
            className="cursor-pointer mr-2"
            onClick={() => signIn("github")}
          />
        </div>
        <h5 className="text-center pt-4 font-Poppins text-[14px]">
          Not have any account?{" "}
          <span
            className="text-[#2190ff] pl-1 cursor-pointer"
            onClick={() => setRoute("Sign-up")}
          >
            Sign up
          </span>
        </h5>
      </form>
      <br />
    </div>
  );
};

export default Login;



