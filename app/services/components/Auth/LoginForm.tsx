import React, { FC, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiFillGithub,
} from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { styles } from "../../../../app/styles/Style";
import toast from "react-hot-toast";
import { useLoginMutation } from "../../../../redux/features/auth/authApi";
import { RootState } from "@/redux/store";
import { signIn } from "next-auth/react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useCheckProfileQuery } from "../../../../redux/features/services/dprofile/profileApi";

interface LoginError {
  data?: {
    message?: string;
  };
}

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
  const router = useRouter();
  const user = useSelector((state: RootState) => state.auth.user);
  const [show, setShow] = useState(false);
  const [login] = useLoginMutation();

  const { refetch } = useCheckProfileQuery(
    { userId: user?._id, role: user?.role },
    { skip: !user?._id || !user?.role }
  );

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: schema,
    onSubmit: async ({ email, password }) => {
      try {
        const res = await login({ email, password }).unwrap();
        localStorage.setItem("token", res.accessToken);
        toast.success("Login Successful");

        const profileRes = await refetch();

        if (profileRes?.data?.profileCompleted === false) {
          router.push("/services/complete_profile");
        } else {
          router.push("/services");
        }

        setOpen(false);
      } catch (err: unknown) {
        const error = err as LoginError;
        if (error?.data?.message) {
          toast.error(error.data.message);
        } else {
          toast.error("Login failed!");
        }
      }
    },
  });

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



