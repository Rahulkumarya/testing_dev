"use client"
import WelcomeAfterProfile from "../component/WelcomeAfterProfile";
import { useSelector } from "react-redux";
import { store } from "@/redux/store";



const page = () => {
  const step = useSelector((state) => state.onboarding.currentStep);

  return <div>

    
    {step === 3 && <WelcomeAfterProfile />}</div>;
};

export  default  page;
