// "use client";

// import React, { FC } from "react";
// import HospitalProfile from "./component/HospitalProfile";
// import AmbulanceProfile from "./component/AmbulanceProfile";
// import GymProfile from "./component/GymProfile";
// import RadiologyProfile from "./component/RadiologyProfile";
// import MedicineShopProfile from "./component/MedicineProfile";
// import ResortProfile from "./component/ResortProfile";
// import DiagnosisProfile from "./component/DiagnosisProfile";
// import { useSelector } from "react-redux";
// import { store } from "../../../redux/store";
// import DoctorProfile from "./component/DoctorProfile";
// import { useRouter } from "next/navigation";

// interface Props {}

// // ✅ Centralized Profile Page for Different User Roles
// const Page: FC<Props> = () => {
//   // Fetching user from Redux store
//   const user = useSelector((state: store) => state.auth.user);

//   // ✅ Dynamically renders the profile completion component based on user role
//   const renderProfileComponent = () => {

//     const router=useRouter();
//     switch (user?.role) {
//       case "doctor":
//           return <DoctorProfile/>
//       case "hospital":
//         return <HospitalProfile />;

//       case "ambulance":
//         return <AmbulanceProfile />;

//       case "gym":
//         return <GymProfile />;

//       case "radiology":
//         return <RadiologyProfile />;

//       case "medicine-shop":
//         return <MedicineShopProfile />;

//       case "resort":
//         return <ResortProfile />;

//       case "diagnosis":
//         return <DiagnosisProfile />;

//       default:
//         router.push("/");
//     }
//   };

//   return (
//     <div className="min-h-screen px-4 py-8 bg-gray-50">
//       {/* 
//         ✅ Future Enhancements:
//         - Add loader/spinner while role is being fetched.
//         - Show step indicator / progress bar for multi-step forms.
//         - Handle edge cases when role is undefined/null.
//         - Add role-based title (e.g., "Complete Your Hospital Profile").
//       */}

//       {renderProfileComponent()}
//     </div>
//   );
// };

// export default Page;









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

  const renderProfileComponent = () => {
    switch (user?.role) {
      case "doctor":
        return <DoctorProfile />;
      // ... add other role-based forms
      case "gym":
        return <GymProfile />;

      case "diagnosis":
        return <DiagnosisProfile />;

      case "hospital":
        return <HospitalProfile />;
      case "radiology":
        return <RadiologyProfile />;
      case "resort":
        return <ResortProfile />;
      case "patient":
        return <PatientProfile/>
      default:
        router.push("/");
    }
  };

  return (
    <div className="min-h-screen px-4 py-8 bg-gray-50">
      {renderProfileComponent()}
    </div>
  );
};

export default Page;
