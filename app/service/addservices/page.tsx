"use client";
//handles all addServices router like radiology,doctor,ambulance,patient

import { useSelector } from "react-redux";
import { store } from "@/redux/store";
import { RootState } from "@/redux/store";
// import DoctorNotifications from "./DoctorNotifications";
// import RadiologyNotifications from "./RadiologyNotifications";
// import DoctorAddServiceForm from "../../roleSpecificPages/doctor/AddService";
// import DiagnosisAddServiceForm from "../../roleSpecificPages/diagnosis/AddServices";
// // import AllService from "../../roleSpecificPages/doctor/AllService"
// import ServicesPage from "../../roleSpecificPages/doctor/AllServicesPage";
import DoctorAddServiceForm from "@/app/services/dashboard/roleSpecificPages/diagnosis/AddServices";
import DiagnosisAddServiceForm from "../../../app/services/dashboard/roleSpecificPages/diagnosis/AddServices";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

const AddService = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const router = useRouter();
  switch (user.role) {
    case "doctor":
      return (
        <>
          <DoctorAddServiceForm /> <br />
          <br />
          <br />
        
          <h1 className="text-black text-center bg-red-400">AllServices</h1>
        </>
      );
    case "hospital":
      return <DiagnosisAddServiceForm />;
    default:
      return (
        <>
          <h1 className="text-red-500 text-center">
            You are not authorized to add services
          </h1>
          <button
            onClick={() => {
              toast.error("You are not authorized to add services");
              router.push("/services");
            }}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Go Back
          </button>
        </>
      );
  }
};

export default AddService;
