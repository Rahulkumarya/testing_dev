"use client";

import React, { useEffect, useState } from "react";
import {  useSelector } from "react-redux";
import { useSession } from "next-auth/react";
import {
  useSocialAuthMutation,

} from "@/redux/features/auth/authApi";
import toast from "react-hot-toast";


import CustomModel from "../../../utils/CustomModel";
import Login from "./../../components/Auth/LoginForm";
import SignUp from "./../../components/Auth/SignUpForm";
import Verification from "./../../components/Auth/VerificationForm";

const LoginPage = () => {
  const [open, setOpen] = useState(true); // Auto open on load
  const [route, setRoute] = useState<"Login" | "Sign-up" | "Verification">(
    "Login"
  );
  const [activeItem] = useState(0);

  // const dispatch = useDispatch();
  const { user } = useSelector((state: any) => state.auth);
  const { data } = useSession();
  const [socialAuth, { isSuccess }] = useSocialAuthMutation();
  // const [logout] = useLogoutMutation();
  // const router = useRouter();

  useEffect(() => {
    if (!user && data) {
      socialAuth({
        email: data.user?.email,
        name: data.user?.name,
        avatar: data.user?.image,
      });
    }

    if (isSuccess) {
      toast.success("Login Successful!");
    }
  }, [user, data, isSuccess, socialAuth]);

  return (
    <div className="w-full h-screen flex justify-center items-center bg-gray-100">

      {/* Auth Modals */}
      {route === "Login" && open && (
        <CustomModel
          open={open}
          setOpen={setOpen}
          setRoute={setRoute}
          activeItem={activeItem}
          component={Login}
        />
      )}
      {route === "Sign-up" && open && (
        <CustomModel
          open={open}
          setOpen={setOpen}
          setRoute={setRoute}
          activeItem={activeItem}
          component={SignUp}
        />
      )}
      {route === "Verification" && open && (
        <CustomModel
          open={open}
          setOpen={setOpen}
          setRoute={setRoute}
          activeItem={activeItem}
          component={Verification}
        />
      )}
    </div>
  );
};

export default LoginPage;
