"use client";

import React, { FC } from "react";
import HospitalProfile from "./component/HospitalProfile";
import AmbulanceProfile from "./component/AmbulanceProfile";
import GymProfile from "./component/GymProfile";
import RadiologyProfile from "./component/RadiologyProfile";
import MedicineShopProfile from "./component/MedicineProfile";
import ResortProfile from "./component/ResortProfile";
import DiagnosisProfile from "./component/DiagnosisProfile";
import { useSelector } from "react-redux";
import { store } from "../../../redux/store";
import DoctorProfile from "./component/DoctorProfile";

interface Props {}

// ✅ Centralized Profile Page for Different User Roles
const Page: FC<Props> = () => {
  // Fetching user from Redux store
  const user = useSelector((state: store) => state.auth.user);

  // ✅ Dynamically renders the profile completion component based on user role
  const renderProfileComponent = () => {
    switch (user?.role) {
      case "doctor":
          return <DoctorProfile/>
      case "hospital":
        return <HospitalProfile />;

      case "ambulance":
        return <AmbulanceProfile />;

      case "gym":
        return <GymProfile />;

      case "radiology":
        return <RadiologyProfile />;

      case "medicine-shop":
        return <MedicineShopProfile />;

      case "resort":
        return <ResortProfile />;

      case "diagnosis":
        return <DiagnosisProfile />;

      default:
        return (
          <div className="text-center text-red-500 mt-10">
            No profile completion form available for this role.
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen px-4 py-8 bg-gray-50">
      {/* 
        ✅ Future Enhancements:
        - Add loader/spinner while role is being fetched.
        - Show step indicator / progress bar for multi-step forms.
        - Handle edge cases when role is undefined/null.
        - Add role-based title (e.g., "Complete Your Hospital Profile").
      */}

      {renderProfileComponent()}
    </div>
  );
};

export default Page;
