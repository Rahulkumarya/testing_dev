"use client"
//handles all addServices router like radiology,doctor,ambulance,patient

import { useSelector } from "react-redux";
import { RootState} from "@/redux/store";
// import DoctorNotifications from "./DoctorNotifications";
// import RadiologyNotifications from "./RadiologyNotifications";
import DoctorAddServiceForm from "../../roleSpecificPages/doctor/AddService";
import DiagnosisAddServiceForm from "../../roleSpecificPages/diagnosis/AddServices";
// import AllService from "../../roleSpecificPages/doctor/AllService"
import ServicesPage from "../../roleSpecificPages/doctor/AllServicesPage";
import RadiologyAddServiceForm from "../../roleSpecificPages/radiology/AddService";

const AddService = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  switch (user.role) {
    case "doctor":
      return <ServicesPage />;
    case "hospital":
      return <DiagnosisAddServiceForm />;
    case "radiology":
      return <RadiologyAddServiceForm />;
    default:
      return <p>No notifications available for your role.</p>;
  }
};

export default AddService;
