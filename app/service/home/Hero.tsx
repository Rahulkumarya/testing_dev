// //1st 
// "use client";

// import { useState, useEffect } from "react";
// import Image from "next/image";
// import FeaturedCarousel from "./component/FeaturedCarousel";
// // import { useGetAllDoctorServicesQuery } from "@/redux/features/services/dprofile/ServiceApi";
// import { useDoctorsQuery } from "@/redux/features/patients/patientApi";
// import { useRef } from "react";
// const categories = [
//   { title: "Doctors", img: "/assests/doctor.jpg" },
//   { title: "Diagnostics", img: "/assests/diagnosis.jpg" },
//   { title: "Resorts", img: "/assests/resort.jpg" },
//   { title: "Ambulance", img: "/assests/radiology.jpg" },
//   { title: "Pharmacy", img: "/assests/pharmacy.jpg" },
// ];







// export default function HomePage() {
//   const suggestionBoxRef = useRef<HTMLDivElement>(null);

//   const [searchTerm, setSearchTerm] = useState("");
//   const [filteredServices, setFilteredServices] = useState<any[]>([]);
//   const [suggestions, setSuggestions] = useState<any[]>([]);
//   const [isSearching, setIsSearching] = useState(false);

//   // Assuming useDoctorsQuery fetches services data
//   const { data, isError } = useDoctorsQuery();
//   const services = data?.services || [];

//   // Initialize filteredServices once services load
//   useEffect(() => {
//     if (services.length > 0) {
//       setFilteredServices(services);
//     }
//   }, [services]);

//   // Outside click handler to close suggestions
//   useEffect(() => {
//     function handleClickOutside(event: MouseEvent) {
//       if (
//         suggestionBoxRef.current &&
//         !suggestionBoxRef.current.contains(event.target as Node)
//       ) {
//         setSuggestions([]); // Hide suggestions on outside click
//       }
//     }
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   // Filter services and generate suggestions with debounce
//   useEffect(() => {
//     const delayDebounce = setTimeout(() => {
//       const trimmed = searchTerm.trim().toLowerCase();
//       if (trimmed) {
//         const matched = services.filter(
//           (s) =>
//             s.serviceName?.toLowerCase().includes(trimmed) ||
//             // s.serviceType?.toLowerCase().includes(trimmed) ||
//             s.location?.city?.toLowerCase().includes(trimmed) ||
//             s.location?.state?.toLowerCase().includes(trimmed)
//         );
//         setFilteredServices(matched);
//         setSuggestions(matched.slice(0, 5));
//         setIsSearching(true);
//       } else {
//         setFilteredServices(services);
//         setSuggestions([]);
//         setIsSearching(false);
//       }
//     }, 200);

//     return () => clearTimeout(delayDebounce);
//   }, [searchTerm, services]);

//   // On suggestion click, set search term, filter services, and hide suggestions
//   const handleSuggestionClick = (name: string) => {
//     setSearchTerm(name);
//     const matched = services.filter((s) =>
//       s.serviceName?.toLowerCase().includes(name.toLowerCase())
//     );
//     setFilteredServices(matched);
//     setSuggestions([]); // Hide suggestions after selecting one
//   };

//   return (
//     <main className="font-sans text-gray-800 pt-20">
//       <section className="relative bg-blue-50 py-20 px-4 text-center">
//         <h1 className="text-4xl md:text-5xl font-bold max-w-4xl mx-auto">
//           Discover & Book Trusted Services
//         </h1>
//         <p className="text-gray-600 mt-4 max-w-xl mx-auto">
//           Doctors, Resorts, Ambulances, Labs & More — All in One Platform
//         </p>

//         {/* Search Bar */}
//         <div className="mt-6 max-w-md mx-auto relative" ref={suggestionBoxRef}>
//           <input
//             type="text"
//             placeholder="Search services near you..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="w-full px-5 py-3 rounded-full border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />

//           {/* Auto-suggestions */}
//           {searchTerm && suggestions.length > 0 && (
//             <div className="absolute left-0 right-0 bg-white border mt-2 rounded-lg shadow-lg max-h-48 overflow-auto z-10">
//               {suggestions.map((item, index) => (
//                 <p
//                   key={index}
//                   onClick={() => handleSuggestionClick(item.serviceName)}
//                   className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-left"
//                 >
//                   {item.name} —{" "}
//                   <span className="text-sm text-gray-500">
//                     {item.serviceName}
//                   </span>
//                 </p>
//               ))}
//             </div>
//           )}

//           {/* Clear Search */}
//           {searchTerm && (
//             <button
//               onClick={() => {
//                 setSearchTerm("");
//                 setFilteredServices(services);
//                 setSuggestions([]);
//                 setIsSearching(false);
//               }}
//               className="absolute top-full left-0 mt-2 text-sm text-blue-600 hover:underline"
//             >
//               Clear Search
//             </button>
//           )}
//         </div>
//       </section>

//       {/* Content Based on Search */}
//       {isSearching ? (
//         <section className="py-12 px-4 bg-white">
//           <h2 className="text-2xl font-semibold text-center mb-6">
//             Search Results
//           </h2>

//           {filteredServices.length === 0 ? (
//             <p className="text-center text-gray-500">No results found.</p>
//           ) : (
//             <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
//               {filteredServices.map((service, idx) => (
//                 <div
//                   key={idx}
//                   className="bg-white rounded-lg shadow hover:shadow-lg transition"
//                 >
//                   {service.img ? (
//                     <Image
//                       src="/assests/avatar.png"
//                       alt={service.serviceName}
//                       width={500}
//                       height={300}
//                       className="rounded-t-lg object-cover w-full h-[200px]"
//                     />
//                   ) : (
//                     <div className="w-full h-[200px] bg-gray-200 flex items-center justify-center text-gray-500 text-sm rounded-t-lg">
//                       No Image Available
//                     </div>
//                   )}
//                   <div className="p-4">
//                     <h3 className="font-semibold text-lg">
//                       {service.serviceName}
//                     </h3>
//                     <p className="text-gray-500">{service.serviceType}</p>
//                     <p className="text-sm text-gray-400">
//                       {service.location?.city && service.location?.state
//                         ? `${service.location.city}, ${service.location.state}`
//                         : "Location not available"}
//                     </p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </section>
//       ) : (
//         <>
//           <section className="py-12 px-4 bg-white">
//             <h2 className="text-2xl font-semibold text-center mb-10">
//               Popular Categories
//             </h2>
//             <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 max-w-6xl mx-auto">
//               {categories.map((cat) => (
//                 <div
//                   key={cat.title}
//                   className="flex flex-col items-center bg-gray-100 p-4 rounded-lg hover:shadow transition"
//                 >
//                   <Image src={cat.img} alt={cat.title} width={60} height={60} />
//                   <p className="mt-3 font-medium">{cat.title}</p>
//                 </div>
//               ))}
//             </div>
//           </section>

//           <FeaturedCarousel services={filteredServices} />
//         </>
//       )}
//     </main>
//   );
// }






//2nd 


"use client";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { useAllServicesQuery } from "@/redux/features/patients/patientApi";// ✅ Combined API for all roles
import FeaturedCarousel from "./component/FeaturedCarousel"; // ✅ Reusable Carousel for each serviceType

// Optional dummy categories to display in homepage (can be from backend too)
const categories = [
  { img: "/icons/doctor.png", title: "Doctor" },
  { img: "/icons/ambulance.png", title: "Ambulance" },
  { img: "/icons/lab.png", title: "Diagnostics" },
  { img: "/icons/resort.png", title: "Resorts" },
  { img: "/icons/pharmacy.png", title: "Pharmacy" },
];

export default function HomePage() {
  const suggestionBoxRef = useRef<HTMLDivElement>(null);

  // ✅ Fetch all services from a single backend API
  const { data, isError } = useAllServicesQuery();
  const allServices = data?.services || [];



  console.log("All Services:", allServices);
  // State for search functionality
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredServices, setFilteredServices] = useState<any[]>([]);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  // ✅ Close suggestion dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        suggestionBoxRef.current &&
        !suggestionBoxRef.current.contains(event.target as Node)
      ) {
        setSuggestions([]);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ✅ Initially show all services
  useEffect(() => {
    if (allServices.length > 0) {
      setFilteredServices(allServices);
    }
  }, [allServices]);

  // ✅ Debounced search with suggestions
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      const trimmed = searchTerm.trim().toLowerCase();
      if (trimmed) {
        const matched = allServices.filter(
          (s) =>
            s.serviceName?.toLowerCase().includes(trimmed) ||
            s.location?.city?.toLowerCase().includes(trimmed) ||
            s.location?.state?.toLowerCase().includes(trimmed)
        );
        setFilteredServices(matched);
        setSuggestions(matched.slice(0, 5));
        setIsSearching(true);
      } else {
        setFilteredServices(allServices);
        setSuggestions([]);
        setIsSearching(false);
      }
    }, 200);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm, allServices]);

  // ✅ Handle suggestion click and update list
  const handleSuggestionClick = (name: string) => {
    setSearchTerm(name);
    const matched = allServices.filter((s) =>
      s.serviceName?.toLowerCase().includes(name.toLowerCase())
    );
    setFilteredServices(matched);
    setSuggestions([]); // close dropdown
  };

  // ✅ Group filtered services by serviceType for <FeaturedCarousel />
  const groupByType = filteredServices.reduce((acc, service) => {
    const type = service.serviceType?.toLowerCase() || "other";
    if (!acc[type]) acc[type] = [];
    acc[type].push(service);
    return acc;
  }, {} as Record<string, any[]>);

  return (
    <main className="font-sans text-gray-800 pt-20">
      {/* 🔷 Hero Section */}
      <section className="relative bg-blue-50 py-20 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold max-w-4xl mx-auto">
          Discover & Book Trusted Services
        </h1>
        <p className="text-gray-600 mt-4 max-w-xl mx-auto">
          Doctors, Resorts, Ambulances, Labs & More — All in One Platform
        </p>

        {/* 🔍 Search Box with Auto Suggestions */}
        <div className="mt-6 max-w-md mx-auto relative" ref={suggestionBoxRef}>
          <input
            type="text"
            placeholder="Search services near you..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-5 py-3 rounded-full border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* 🔽 Auto-suggestions dropdown */}
          {searchTerm && suggestions.length > 0 && (
            <div className="absolute left-0 right-0 bg-white border mt-2 rounded-lg shadow-lg max-h-48 overflow-auto z-10">
              {suggestions.map((item, index) => (
                <p
                  key={index}
                  onClick={() => handleSuggestionClick(item.serviceName)}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-left"
                >
                  {item.name} —{" "}
                  <span className="text-sm text-gray-500">
                    {item.serviceName}
                  </span>
                </p>
              ))}
            </div>
          )}

          {/* ❌ Clear button */}
          {searchTerm && (
            <button
              onClick={() => {
                setSearchTerm("");
                setFilteredServices(allServices);
                setSuggestions([]);
                setIsSearching(false);
              }}
              className="absolute top-full left-0 mt-2 text-sm text-blue-600 hover:underline"
            >
              Clear Search
            </button>
          )}
        </div>
      </section>

      {/* 🔍 When Searching */}
      {isSearching ? (
        <section className="py-12 px-4 bg-white">
          <h2 className="text-2xl font-semibold text-center mb-6">
            Search Results
          </h2>
          {filteredServices.length === 0 ? (
            <p className="text-center text-gray-500">No results found.</p>
          ) : (
            Object.entries(groupByType).map(([type, services], idx) => (
              <div key={idx} className="my-12">
                <h3 className="text-xl font-semibold capitalize mb-4 text-center">
                  {type} Services
                </h3>
                <FeaturedCarousel services={services} />
              </div>
            ))
          )}
        </section>
      ) : (
        <>
          {/* 🎯 Popular Categories */}
          <section className="py-12 px-4 bg-white">
            <h2 className="text-2xl font-semibold text-center mb-10">
              Popular Categories
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 max-w-6xl mx-auto">
              {categories.map((cat) => (
                <div
                  key={cat.title}
                  className="flex flex-col items-center bg-gray-100 p-4 rounded-lg hover:shadow transition"
                >
                  <Image src={cat.img} alt={cat.title} width={60} height={60} />
                  <p className="mt-3 font-medium">{cat.title}</p>
                </div>
              ))}
            </div>
          </section>

          {/* 🚀 Grouped Carousels for Each ServiceType (Doctor, Ambulance, etc.) */}
          {Object.entries(groupByType).map(([type, services], idx) => (
            <div key={idx} className="my-12">
              <h3 className="text-xl font-semibold capitalize mb-4 text-center">
                {type} Services
              </h3>
              <FeaturedCarousel services={services} />
            </div>
          ))}
        </>
      )}
    </main>
  );
}
