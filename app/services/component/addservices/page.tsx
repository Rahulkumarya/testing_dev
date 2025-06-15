"use client"
import DoctorAddServiceForm from "@/app/services/dashboard/roleSpecificPages/diagnosis/AddServices";
import DiagnosisAddServiceForm from "../../dashboard/roleSpecificPages/diagnosis/AddServices";
// import { useRouter } from "next/navigation";
// import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const AddService = () => {
  const user = useSelector((state: store) => state.auth.user);
  // const router = useRouter();
  switch (user.role) {
    case "doctor":
      return (
        <>
          <br />
          <br />
          <br />
          <br />
          <br />
          <DoctorAddServiceForm /> <br />
        </>
      );
    case "hospital":
      return <DiagnosisAddServiceForm />;
    default:
      return (
        <>
          <h1 className="text-red-500 text-center h-full mt-30">
           Please login to add services
          </h1>
          {/* <button
            onClick={() => {
              toast.error("You are not authorized to add services");
              router.push("/services");
            }}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Go Back
          </button> */}
        </>
      );
  }
};

export default AddService;
