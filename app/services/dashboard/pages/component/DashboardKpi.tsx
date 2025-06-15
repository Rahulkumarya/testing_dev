"use client";
//handles all addServices router like radiology,doctor,ambulance,patient

import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
// import DoctorNotifications from "./DoctorNotifications";
// import RadiologyNotifications from "./RadiologyNotifications";

import DiagnosisAddServiceForm from "../../roleSpecificPages/diagnosis/AddServices";
// import AllService from "../../roleSpecificPages/doctor/AllService"
import DoctorServiceStats from "../../roleSpecificPages/doctor/DashboardKpi";

const AllDashboardKpi = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  switch (user.role) {
    case "doctor":
      return (
        <>
          
        <DoctorServiceStats />
        </>
      );
    case "hospital":
      return <DoctorServiceStats />;
    default:
      return <p>No notifications available for your role.</p>;
  }
};


export default AllDashboardKpi;
