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
// "use client";

// import React, { useEffect, useState } from "react";
// import DoctorServiceCard from "../component/DoctorServiceCard";
// import SearchAndFilterBar from "../component/SearchAndFilterBar";
// import { useDoctorsQuery } from "@/redux/features/patients/patientApi";
// import Loader from "../../../component/Loader/Loader";

// // Define the shape of search/filter criteria
// interface SearchCriteria {
//   query: string;
//   specialty: string;
//   location: string;
//   latitude?: number;
//   longitude?: number;
// }

// export default function HomePage() {
//   // State for current search criteria
//   const [criteria, setCriteria] = useState<SearchCriteria>({
//     query: "",
//     specialty: "",
//     location: "",
//   });

//   // Call the API with our search & filter params
//   const { data, error, isLoading, isError } = useDoctorsQuery();

//   console.log(`data is getDoctorServices`,data);
//   // Local state to hold the fetched and filtered results
//   const [services, setServices] = useState(data?.services || []);

//   // Whenever API data or criteria changes, update services
//   useEffect(() => {
//     if (data?.services) {
//       setServices(data.services);
//     }
//   }, [data]);

//   // Handler: called by SearchAndFilterBar
//   const handleSearch = (newCriteria: SearchCriteria) => {
//     // Update criteria state to re-trigger query
//     console.log("Search criteria updated:", newCriteria);

//     setCriteria(newCriteria);
//   };

//   if (isLoading) {
//     return <Loader />; // Show a loader while fetching
//   }

//   if (isError) {
//     return (
//       <div className="text-center text-red-600">
//         <p>Failed to load services.</p>
//         <p>{error?.data?.message || `Status: ${error?.status}`}</p>
//       </div>
//     );
//   }

//   return (
//     <main className="pt-20 bg-gray-100 min-h-screen">
//       {/* Search & Filter Bar: passes criteria back via onSearch */}
//       <SearchAndFilterBar
//         specialties={data?.specialties || []}     // dynamic if provided by API
//         locations={data?.locations || []}         // dynamic if provided by API
//         onSearch={handleSearch}
//       />

//       <section className="max-w-7xl mx-auto px-6 pb-12">
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
//           {services.map((service) => (
//             <DoctorServiceCard
//               key={service._id}
//               service={service}
//               onViewDetails={() => console.log("View", service.name)}
//               onBook={() => console.log("Book", service.name)}
//             />
//           ))}
//         </div>

//         {/* Show a message if no services found */}
//         {services.length === 0 && (
//           <p className="text-center text-gray-500 mt-8">
//             No services found.
//           </p>
//         )}
//       </section>
//     </main>
//   );
// }





//3rd 
// pages/index.tsx
// "use client";

// import React, { useEffect, useState } from "react";
// import dynamic from "next/dynamic";
// import SearchAndFilterBar from "../component/SearchAndFilterBar";
// import { useDoctorsQuery } from "@/redux/features/patients/patientApi";
// import Loader from "../../../component/Loader/Loader";

// // Dynamically import the card so any window/geolocation code never runs on the server
// const DoctorServiceCard = dynamic(
//   () => import("../component/DoctorServiceCard"),
//   { ssr: false }
// );

// interface SearchCriteria {
//   query: string;
//   location: string;
//   latitude?: number;
//   longitude?: number;
// }

// export default function HomePage() {
//   const [criteria, setCriteria] = useState<SearchCriteria>({
//     query: "",

//     location: "",
//   });

//   const { data, error, isLoading, isError } = useDoctorsQuery();
//   console.log(`data is getDoctorServices`, data);
//   const [services, setServices] = useState(data?.services || []);

//   useEffect(() => {
//     if (data?.services) {
//       setServices(data.services);
//     }
//   }, [data]);

//   const handleSearch = (newCriteria: SearchCriteria) => {
//     setCriteria(newCriteria);
//   };

//   if (isLoading) return <Loader />;

//   if (isError)
//     return (
//       <div className="text-center text-red-600">
//         <p>Failed to load services.</p>
//         <p>{error?.data?.message || `Status: ${error?.status}`}</p>
//       </div>
//     );

//   return (
//     <main className="pt-20 bg-gray-100 min-h-screen">
//       <SearchAndFilterBar
//         specialties={data?.specialties || []}
//         locations={data?.locations || []}
//         onSearch={handleSearch}
//       />

//       <section className="max-w-7xl mx-auto px-6 pb-12">
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
//           {services.map((service) => (
//             <DoctorServiceCard
//               key={service._id}
//               service={service}
//               onViewDetails={() => console.log("View", service.name)}
//               onBook={() => console.log("Book", service.name)}
//             />
//           ))}
//         </div>

//         {services.length === 0 && (
//           <p className="text-center text-gray-500 mt-8">
//             No services found.
//           </p>
//         )}
//       </section>
//     </main>
//   );
// }











//4th 
// pages/index.tsx
// "use client";

// import React, { useEffect, useState } from "react";
// import dynamic from "next/dynamic";
// import SearchAndFilterBar from "../component/SearchAndFilterBar";
// import { useDoctorsQuery } from "@/redux/features/patients/patientApi";
// import { useFetchDoctorsQuery } from "@/redux/features/patients/patientApi";
// import Loader from "../../../component/Loader/Loader";

// // Dynamically import so geolocation logic never runs on the server
// const DoctorServiceCard = dynamic(
//   () => import("../component/DoctorServiceCard"),
//   { ssr: false }
// );

// interface SearchCriteria {
//   query: string;
//   location: string;
//   latitude?: number;
//   longitude?: number;
// }

// export default function HomePage() {
//   const [criteria, setCriteria] = useState<SearchCriteria>({
//     query: "",
//     location: "",
//   });

//   const { data, error, isLoading, isError } = useFetchDoctorsQuery(criteria);
//   console.log(`data is getDoctorServices`, data);
 
//   const [services, setServices] = useState(data?.services || []);

//   useEffect(() => {
//     if (data?.services) {
//       setServices(data.services);
//     }
//   }, [data]);

//   const handleSearch = (newC: SearchCriteria) => {
//     setCriteria(newC);
//   };

//   if (isLoading) return <Loader />;

//   if (isError)
//     return (
//       <div className="text-center text-red-600">
//         <p>Failed to load services.</p>
//         <p>{error?.data?.message || `Status: ${error?.status}`}</p>
//       </div>
//     );

//   return (
//     <main className="pt-20 bg-gray-100 min-h-screen">
//       <SearchAndFilterBar
//         specialties={data?.specialties || []}
//         locations={data?.locations || []}
//         onSearch={handleSearch}
//       />

//       <section className="max-w-7xl mx-auto px-6 pb-12">
//         <h1 className="text-center font-[500] text-2xl text-gray-700 ">{services.title}</h1>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
//           {data.map((service) => (
//             <DoctorServiceCard
//               key={service._id}
//               service={service}
//               onViewDetails={() => console.log("View", service.name)}
//               onBook={() => console.log("Book", service.serviceName)}
//             />
//           ))}
//         </div>

//         {services.length === 0 && (
//           <p className="text-center text-gray-500 mt-8">
//             No services found.
//           </p>
//         )}
//       </section>
//     </main>
//   );
// }


//5th
// pages/index.tsx
// "use client";

// import React from "react";
// import { useFetchDoctorsQuery } from "@/redux/features/patients/patientApi";
// import Loader from "../../../component/Loader/Loader";
// import SearchAndFilterBar from "../component/SearchAndFilterBar";
// import DoctorServiceCard from "../component/DoctorServiceCard";

// interface SearchCriteria {
//   q?: string;
//   lat?: number;
//   lng?: number;
// }

// export default function HomePage() {
//   const [criteria, setCriteria] = React.useState<SearchCriteria>({});
//   const {
//     data: services = [],
//     error,
//     isLoading,
//     isError,
//   } = useFetchDoctorsQuery(criteria);

//   console.log(`data is getDoctorServices`, services);

//   const handleSearch = (newC: SearchCriteria) => {
//     setCriteria(newC);
//   };

//   if (isLoading) return <Loader />;
//   if (isError)
//     return (
//       <div className="text-center text-red-600">
//         <p>Failed to load services.</p>
//         <p>{(error as any)?.data?.message || `Status: ${(error as any)?.status}`}</p>
//       </div>
//     );

//   return (
//     <main className="pt-20 bg-gray-100 min-h-screen">
//       <SearchAndFilterBar onSearch={handleSearch} />

//       <section className="max-w-7xl mx-auto px-6 pb-12">
//         {/** Example heading, if you really have a title field */}
//         {/* <h1 className="text-center text-2xl mb-6">some title</h1> */}

//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
//           {data.map((service) => (
//             <DoctorServiceCard
//               key={service._id}
//               service={service}
//               onViewDetails={() => console.log("View", service.serviceName)}
//               onBook={() => console.log("Book", service.name)}
//             />
//           ))}
//         </div>

//         {services.length === 0 && (
//           <p className="text-center text-gray-500 mt-8">No services found.</p>
//         )}
//       </section>
//     </main>
//   );
// }












//6th
// app/services/pages/alldoctor/page.tsx
"use client";

import React, { useState } from "react";
import { useFetchDoctorsQuery } from "@/redux/features/patients/patientApi";
import SearchAndFilterBar from "../component/SearchAndFilterBar";
import DoctorServiceCard from "../component/DoctorServiceCard";
import Loader from "../../../component/Loader/Loader";

interface SearchCriteria {
  q?: string;
  lat?: number;
  lng?: number;
}

export default function AllDoctorPage() {
  // Local search criteria state
  const [criteria, setCriteria] = useState<SearchCriteria>({});

  // Fetch doctors; `data` is an array (defaulted to `[]` if not yet loaded)
  const {
    data: services = [],
    error,
    isLoading,
    isError,
  } = useFetchDoctorsQuery(criteria);

  // Handler passed to your SearchAndFilterBar
  const handleSearch = (newC: SearchCriteria) => {
    setCriteria(newC);
  };

  // Loading and error states
  if (isLoading) return <Loader />;
  if (isError)
    return (
      <div className="text-center text-red-600">
        <p>Failed to load services.</p>
        <p>{(error as any)?.data?.message || `Status: ${(error as any)?.status}`}</p>
      </div>
    );

  return (
    <main className="pt-20 bg-gray-100 min-h-screen">
      {/* --- Search & Filter --- */}
      <SearchAndFilterBar onSearch={handleSearch} />

      <section className="max-w-7xl mx-auto px-6 pb-12">
        {/* --- Doctor Cards Grid --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {services.map((service) => (
            <DoctorServiceCard
              key={service._id}
              // map your API's `serviceName` into the `name` prop your card expects
              service={{ ...service, name: service.serviceName }}
              onViewDetails={() => console.log("View", service.serviceName)}
              onBook={() => console.log("Book", service.serviceName)}
            />
          ))}
        </div>

        {/* --- No Results Message --- */}
        {services.length === 0 && (
          <p className="text-center text-gray-500 mt-8">
            No services found.
          </p>
        )}
      </section>
    </main>
  );
}
