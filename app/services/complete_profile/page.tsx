"use client";

import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { store } from "../../../redux/store";
import { useCheckProfileQuery } from "../../../redux/features/services/dprofile/profileApi";
import { useRouter } from "next/navigation";
import DoctorProfile from "./component/DoctorProfile";
import GymProfile from "./component/GymProfile";
import DiagnosisProfile from "./component/DiagnosisProfile";
import HospitalProfile from "./component/HospitalProfile";
import RadiologyProfile from "./component/RadiologyProfile";
import ResortProfile from "./component/ResortProfile";
import PatientProfile from "./component/PatientProfile";
import AmbulanceProfile from "./component/AmbulanceProfile";
import MedicineShopProfile from "./component/MedicineProfile";
// ... other imports

const Page = () => {
  const user = useSelector((state: store) => state.auth.user);
  const router = useRouter();


  //checking profile completed or not 
  const { data, isLoading, isError, refetch } = useCheckProfileQuery(
    { userId: user?._id, role: user?.role },
    { skip: !user?._id || !user?.role } // ✅ wait until user ID and role are present
  );
console.log(`data is `,data)
  useEffect(() => {
    if (data?.profileCompleted) {
      router.push("/");
    }
  }, [data]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Something went wrong...</div>;

  console.log(`user is  error`, isError);
  console.log(user?.role,`user role check`);
  

  const renderProfileComponent = () => {
    switch (user?.role) {
      case "doctor":
        return <DoctorProfile />;
      // ... add other role-based forms
      case "gym":
        return <GymProfile />;
      
      case "ambulance":
        return <AmbulanceProfile />;

      case "pharmacy":
        return <MedicineShopProfile />;

      case "diagnosis":
        return <DiagnosisProfile />;

      case "hospital":
        return <HospitalProfile />;
      case "radiology":
        return <RadiologyProfile />;
      case "resort":
        return <ResortProfile />;
      case "patient":
        return (
          <>
            <h1>patient profile</h1>
            <br /> <PatientProfile />
          </>
        );
      default:
        if(user?.role==="patient"){
          router.push("/");
        }
        else{
          router.push("/services");
        }
      
    }
  };

  return (
    <div className="min-h-screen px-4 py-8 bg-gray-50">
      {renderProfileComponent()}
    </div>
  );
};

export default Page;
