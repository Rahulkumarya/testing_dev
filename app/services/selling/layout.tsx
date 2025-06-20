"use client";
// import type { Metadata } from "next";
// import { Inter } from "next/font/google";
// import "../../../app/globals.css";

import "../../../app/globals.css"

//import font family
import { Poppins } from "next/font/google";
import { Josefin_Sans } from "next/font/google";

import { Toaster } from "react-hot-toast";
import Providers from "../../Provider";
import { SessionProvider } from "next-auth/react";
import React, { FC, useState } from "react";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import Loader from "../../component/Loader/Loader";
import Header from ".././components/SeviceHeader"
import ServiceDashboard from ".././pages/ServiceDashboard";
import Footer from "../../service/home/Footer";
import { SocketProvider } from "@/app/context/SocketContext";
import OnboardingHeader from "./component/OnboardingHeader";
import {store} from "../../../redux/store"
import { useSelector } from "react-redux";
import { store, persistor } from "../../../redux/store";
import { PersistGate } from "redux-persist/integration/react";



const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-Poppins",
});

const josefin = Josefin_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-Josefin",
});

// const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {



  return (
    <html lang="en">
      {/* dark mode logic in here  */}
      <body
        className={`${poppins.variable} ${josefin.variable} !bg-white bg-no-repeat dark:bg-gradient-to-b  duration-300 `}
      >
        <Providers>
          <PersistGate loading={null} persistor={persistor}>
            <SessionProvider>
              <SocketProvider>
                <Custom>{children}</Custom>
                <Toaster position="top-center" reverseOrder={false} />
              </SocketProvider>
            </SessionProvider>
          </PersistGate>
        </Providers>
      </body>
    </html>
  );
}

const Custom: FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isLoading } = useLoadUserQuery({});
  const [open, setOpen] = useState(false);
  const [activeItem] = useState(0);
  const [route, setRoute] = useState("Login");
//   const [currentStep, setCurrentStep] = useState(2); // Track current step for onboarding



const currentSteps = useSelector(
  (state: store) => state.onboarding.currentStep
);

console.log("currentSteps", currentSteps);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Header
            open={open}
            setOpen={setOpen}
            activeItem={activeItem}
            setRoute={setRoute}
            route={route}
          />
          <OnboardingHeader currentStep={currentSteps} />

          {children}
        
        </>
      )}
    </>
  );
};





//seting current step in onboarding 
// import { useDispatch } from "react-redux";
// import { setCurrentStep } from "@/redux/features/onboarding/onboardingSlice";

// const dispatch = useDispatch();

// useEffect(() => {
//   dispatch(setCurrentStep(1)); // Set step 1 when this page mounts
// }, []);
