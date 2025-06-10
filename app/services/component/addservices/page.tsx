"use client"
import DoctorAddServiceForm from "@/app/services/dashboard/roleSpecificPages/diagnosis/AddServices";
import DiagnosisAddServiceForm from "../../dashboard/roleSpecificPages/diagnosis/AddServices";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const AddService = () => {
  const user = useSelector((state: store) => state.auth.user);
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
