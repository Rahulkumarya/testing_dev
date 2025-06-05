"use client";
//handles all addServices router like radiology,doctor,ambulance,patient

import { useSelector } from "react-redux";
import { store } from "@/redux/store";
// import DoctorNotifications from "./DoctorNotifications";
// import RadiologyNotifications from "./RadiologyNotifications";

import DiagnosisAddServiceForm from "../../roleSpecificPages/diagnosis/AddServices";
// import AllService from "../../roleSpecificPages/doctor/AllService"
import DoctorServiceStats from "../../roleSpecificPages/doctor/DashboardKpi";

const AllDashboardKpi = () => {
  const user = useSelector((state: store) => state.auth.user);

  switch (user.role) {
    case "doctor":
      return (
        <>
          
          <h1 className="text-black text-center bg-red-400">AllServices</h1>
        </>
      );
    case "hospital":
      return <DoctorServiceStats />;
    default:
      return <p>No notifications available for your role.</p>;
  }
};


export default AllDashboardKpi;
