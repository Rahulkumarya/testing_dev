"use client"
import WelcomeAfterProfile from "../component/WelcomeAfterProfile";
import { useSelector } from "react-redux";
import { store, RootState } from "@/redux/store";

const ProfilePage = () => {
  const step = useSelector((state: RootState) => state.onboarding.currentStep);

  return <div>
    {step === 3 && <WelcomeAfterProfile />}
  </div>;
};

export default ProfilePage;
