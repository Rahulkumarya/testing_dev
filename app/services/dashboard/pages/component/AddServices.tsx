"use client"
//handles all addServices router like radiology,doctor,ambulance,patient




import { useSelector } from "react-redux";
import { store } from "@/redux/store";
// import DoctorNotifications from "./DoctorNotifications";
// import RadiologyNotifications from "./RadiologyNotifications";
import DoctorAddServiceForm from "../../roleSpecificPages/doctor/AddService";
import DiagnosisAddServiceForm from "../../roleSpecificPages/diagnosis/AddServices";

const AddService = () => {
  const user = useSelector((state: store) => state.auth.user);

  switch (user.role) {
    case "doctor":
      return <DoctorAddServiceForm/>;
    case "hospital":
      return <DiagnosisAddServiceForm/>;
    default:
      return <p>No notifications available for your role.</p>;
  }
};

export default AddService;
