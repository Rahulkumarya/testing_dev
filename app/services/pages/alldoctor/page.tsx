// // pages/index.tsx (or any parent component)
// "use client";
// import React, {useState} from "react";
// import DoctorServiceCard from "../component/DoctorServiceCard";
// import SearchAndFilterBar from "../component/SearchAndFilterBar";
// import { useDoctorsQuery } from "@/redux/features/patients/patientApi";

// const allServices = [
//   {
//     name: "Dr. Aisha Khan",
//     specialty: "Cardiologist",
//     location: "Lakeside Hospital",
//     fee: 1200,
//     rating: 4.8,
//     imgUrl: "/images/doctor1.jpg",
//   },
//   {
//     name: "Dr. Ravi Patel",
//     specialty: "Orthopedic Surgeon",
//     location: "City General Clinic",
//     fee: 1500,
//     rating: 4.6,
//     imgUrl: "/images/doctor2.jpg",
//   },
//   {
//     name: "Dr. Maria Gomez",
//     specialty: "Dermatologist",
//     location: "SkinCare Center",
//     fee: 1000,
//     rating: 4.9,
//     imgUrl: "/images/doctor3.jpg",
//   },
//   // …more
// ];

// const specialties = ["Cardiologist", "Orthopedic Surgeon", "Dermatologist"];
// const locations = [
//   "Lakeside Hospital",
//   "City General Clinic",
//   "SkinCare Center",
// ];

// export default function HomePage() {
//   const [filtered, setFiltered] = useState(allServices);
// const {data,isError,isLoading}=useDoctorsQuery(
// );

// console.log(`query return `,data);
//   const handleSearch = (criteria: {
//     query: string;
//     specialty: string;
//     location: string;
//     latitude?: number;
//     longitude?: number;
//   }) => {
//     let result = allServices;

//     // Text search
//     if (criteria.query.trim()) {
//       const q = criteria.query.toLowerCase();
//       result = result.filter(
//         (svc) =>
//           svc.name.toLowerCase().includes(q) ||
//           svc.specialty.toLowerCase().includes(q)
//       );
//     }
//     // Specialty filter
//     if (criteria.specialty) {
//       result = result.filter((svc) => svc.specialty === criteria.specialty);
//     }
//     // Location filter
//     if (criteria.location) {
//       result = result.filter((svc) => svc.location === criteria.location);
//     }
//     // (Optionally) Filter by geolocation radius if lat/lng provided
//     if (criteria.latitude && criteria.longitude) {
//       // Example: filter only services in same city; modify as needed
//       result = result.filter((svc) => svc.location === criteria.location);
//     }

//     setFiltered(result);
//   };

//   return (
//     <main className="pt-20 bg-gray-100 min-h-screen">
//       <SearchAndFilterBar
//         specialties={specialties}
//         locations={locations}
//         onSearch={handleSearch}
//       />

//       <section className="max-w-7xl mx-auto px-6 pb-12">
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
//           {filtered.map((service, idx) => (
//             <DoctorServiceCard
//               key={idx}
//               service={service}
//               onViewDetails={() => console.log("View", service.name)}
//               onBook={() => console.log("Book", service.name)}
//             />
//           ))}
//         </div>
//         {filtered.length === 0 && (
//           <p className="text-center text-gray-500 mt-8">No services found.</p>
//         )}
//       </section>
//     </main>
//   );
// }
  

// pages/index.tsx
"use client";

import React, { useEffect, useState } from "react";
import DoctorServiceCard from "../component/DoctorServiceCard";
import SearchAndFilterBar from "../component/SearchAndFilterBar";
import { useDoctorsQuery } from "@/redux/features/patients/patientApi";
import Loader from "../../../component/Loader/Loader";

// Define the shape of search/filter criteria
interface SearchCriteria {
  query: string;
  specialty: string;
  location: string;
  latitude?: number;
  longitude?: number;
}

export default function HomePage() {
  // State for current search criteria
  const [criteria, setCriteria] = useState<SearchCriteria>({
    query: "",
    specialty: "",
    location: "",
  });

  // Call the API with our search & filter params
  const { data, error, isLoading, isError } = useDoctorsQuery();

  console.log(`data is getDoctorServices`,data);
  // Local state to hold the fetched and filtered results
  const [services, setServices] = useState(data?.services || []);

  // Whenever API data or criteria changes, update services
  useEffect(() => {
    if (data?.services) {
      setServices(data.services);
    }
  }, [data]);

  // Handler: called by SearchAndFilterBar
  const handleSearch = (newCriteria: SearchCriteria) => {
    // Update criteria state to re-trigger query
    setCriteria(newCriteria);
  };

  if (isLoading) {
    return <Loader />; // Show a loader while fetching
  }

  if (isError) {
    return (
      <div className="text-center text-red-600">
        <p>Failed to load services.</p>
        <p>{error?.data?.message || `Status: ${error?.status}`}</p>
      </div>
    );
  }

  return (
    <main className="pt-20 bg-gray-100 min-h-screen">
      {/* Search & Filter Bar: passes criteria back via onSearch */}
      <SearchAndFilterBar
        specialties={data?.specialties || []}     // dynamic if provided by API
        locations={data?.locations || []}         // dynamic if provided by API
        onSearch={handleSearch}
      />

      <section className="max-w-7xl mx-auto px-6 pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {services.map((service) => (
            <DoctorServiceCard
              key={service._id}
              service={service}
              onViewDetails={() => console.log("View", service.name)}
              onBook={() => console.log("Book", service.name)}
            />
          ))}
        </div>

        {/* Show a message if no services found */}
        {services.length === 0 && (
          <p className="text-center text-gray-500 mt-8">
            No services found.
          </p>
        )}
      </section>
    </main>
  );
}
