// // components/DoctorServiceCard.tsx
// "use client";
// import React from "react";
// import Image from "next/image";
// import { FaStar } from "react-icons/fa";

// interface DoctorService {
//   name: string;
//   specialty: string;
//   location: string;
//   fee: number;
//   rating: number; // out of 5
//   imgUrl: string;
// }

// type Props = {
//   service: DoctorService;
//   onViewDetails?: () => void;
//   onBook?: () => void;
// };

// export default function DoctorServiceCard({
//   service,
//   onViewDetails,
//   onBook,
// }: Props) {
//   const { name, specialty, location, fee, rating, imgUrl } = service;

//   // Helper to render star icons
//   const renderStars = (count: number) => {
//     return Array.from({ length: 5 }).map((_, i) => (
//       <FaStar
//         key={i}
//         className={`h-4 w-4 ${i < count ? "text-yellow-400" : "text-gray-300"}`}
//       />
//     ));
//   };

//   return (
//     <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
//       {/* Image */}
//       <div className="relative w-full h-48">
//         <Image src={imgUrl} alt={name} fill className="object-cover" />
//       </div>

//       {/* Content */}
//       <div className="p-4 flex flex-col justify-between h-[200px]">
//         {/* Doctor Info */}
//         <div>
//           <h3 className="text-xl font-semibold text-gray-800">{name}</h3>
//           <p className="text-sm text-indigo-600 mt-1">{specialty}</p>
//           <p className="text-sm text-gray-500 mt-1 flex items-center">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-4 w-4 mr-1 text-gray-400"
//               viewBox="0 0 20 20"
//               fill="currentColor"
//             >
//               <path
//                 fillRule="evenodd"
//                 d="M5.05 4.05a7 7 0 119.9 9.9L10 19.9l-4.95-5.95a7 7 0 010-9.9zM10 10a2 2 0 100-4 2 2 0 000 4z"
//                 clipRule="evenodd"
//               />
//             </svg>
//             {location}
//           </p>
//         </div>

//         {/* Rating & Fee */}
//         <div className="mt-4 flex items-center justify-between">
//           <div className="flex items-center space-x-1">
//             {renderStars(rating)}
//             <span className="text-sm text-gray-600 ml-1">
//               ({rating})
//             </span>
//           </div>
//           <span className="text-lg font-semibold text-green-600">₹{fee}</span>
//         </div>

//         {/* Actions */}
//         <div className="mt-4 flex gap-2">
//           <button
//             onClick={onViewDetails}
//             className="flex-1 bg-indigo-600 text-white py-2 rounded-xl text-sm font-medium hover:bg-indigo-700 transition"
//           >
//             View Details
//           </button>
//           <button
//             onClick={onBook}
//             className="flex-1 border border-indigo-600 text-indigo-600 py-2 rounded-xl text-sm font-medium hover:bg-indigo-50 transition"
//           >
//             Book Now
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }





















// // component/DoctorServiceCard.tsx
// "use client";

// import React, { useEffect, useState } from "react";
// import { calculateDistance } from "../../../../lib/utils"; // your haversine helper

// export interface Service {
//   _id: string;
//   name: string;
//   specialty: string;
//   // location is an object, not a string:
//   location: {
//     coordinates: [number, number];
//     city: string;
//     state: string;
//     pincode: string;
//     address: string;
//     landmark?: string;
//     type: string;
//   };
//   latitude: number;
//   longitude: number;
//   fee: number;
//   distance?: number;
// }

// interface Props {
//   service: Service;
//   onViewDetails: () => void;
//   onBook: () => void;
// }

// export default function DoctorServiceCard({
//   service,
//   onViewDetails,
//   onBook,
// }: Props) {
//   const [distance, setDistance] = useState<number | null>(
//     service.distance ?? null
//   );

//   // Client-only geolocation/distance calculation
//   useEffect(() => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (pos) => {
//           const d = calculateDistance(
//             pos.coords.latitude,
//             pos.coords.longitude,
//             service.latitude,
//             service.longitude
//           );
//           setDistance(d);
//         },
//         () => {
//           // fallback to server‐computed distance if available
//           setDistance(service.distance ?? null);
//         }
//       );
//     }
//   }, [service.latitude, service.longitude, service.distance]);

//   // Build a human‐readable address string
//   const { address, landmark, city, state, pincode } = service.location;
//   const fullAddress = [
//     address,
//     landmark,
//     city,
//     state + " – " + pincode,
//   ]
//     .filter(Boolean)
//     .join(", ");

//   return (
//     <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col">
//       <div className="relative w-full h-48 mb-4">
//       {/* <h3 className="text-xl font-semibold mb-2">{service.title}</h3> */}
//         <img
//           src="/images/doctor-placeholder.jpg" // Placeholder image
//           alt={service.name}
//           className="object-cover w-full h-full rounded-t-2xl"
//         />
//       </div>
//       <h3 className="text-xl font-semibold mb-2">{service.serviceName}</h3>
//       <p className="text-sm text-gray-600 mb-1">{service.specialty}</p>
//       <p className="text-sm text-gray-500 mb-4">{fullAddress}</p>

//       <div className="text-sm text-gray-500 mb-4">
//         {distance != null
//           ? `${distance.toFixed(2)} km away`
//           : "Distance unavailable"}
//       </div>

//       <p className="text-lg font-medium mb-6">₹{service.fee}</p>

//       <div className="mt-auto flex space-x-2">
//         <button
//           onClick={onViewDetails}
//           className="px-4 py-2 rounded-xl border text-sm"
//         >
//           View Details
//         </button>
//         <button
//           onClick={onBook}
//           className="px-4 py-2 rounded-xl bg-blue-600 text-white text-sm"
//         >
//           Book
//         </button>
//       </div>
//     </div>
//   );
// }












//3rd
// component/DoctorServiceCard.tsx
"use client";

import React, { useEffect, useState, useMemo } from "react";
// If you're in Next.js, import Image for optimized loading
import Image from "next/image";
import { calculateDistance } from "../../../../lib/utils"; // your Haversine helper

export interface Service {
  _id: string;
  name: string;            // renamed from serviceName
  specialty: string;
  location: {
    coordinates: [number, number];
    city: string;
    state: string;
    pincode: string;
    address: string;
    landmark?: string;
    type: string;
  };
  latitude: number;
  longitude: number;
  fee: number;
  distance?: number;       // optional server-computed distance
}

interface Props {
  service: Service;
  onViewDetails: () => void;
  onBook: () => void;
}

export default function DoctorServiceCard({
  service,
  onViewDetails,
  onBook,
}: Props) {
  // 1) Pull fields straight out of `service` for readability:
  const {
    name,
    specialty,
    latitude,
    longitude,
    fee,
    distance: serverDistance = null,
    location,
  } = service;

  // 2) Track our own distance (either from server or client calc):
  const [distance, setDistance] = useState<number | null>(serverDistance);

  // 3) Only run geolocation ONCE on mount:
  useEffect(() => {
    if (!navigator.geolocation) return;  // bail if unsupported

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const clientDist = calculateDistance(
          coords.latitude,
          coords.longitude,
          latitude,
          longitude
        );
        setDistance(clientDist);
      },
      () => {
        // on error/denial, keep serverDistance (or null)
        setDistance(serverDistance);
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);  // empty deps = mount only

  // 4) Build a memoized, human-readable address string:
  const fullAddress = useMemo(() => {
    const { address, landmark, city, state, pincode } = location;
    return [address, landmark, city, `${state} – ${pincode}`]
      .filter(Boolean)
      .join(", ");
  }, [location]);

  return (
    <div className="bg-white rounded-2xl shadow p-6 flex flex-col hover:shadow-lg transition-shadow">
      {/* 5) Image header */}
      <div className="relative w-full h-48 mb-4 rounded-t-2xl overflow-hidden">
        <Image
          src="/images/doctor-placeholder.jpg"
          alt={name}
          layout="fill"
          objectFit="cover"
        />
      </div>

      {/* 6) Core info */}
      <h3 className="text-xl font-semibold mb-1">{name}</h3>
      <p className="text-sm text-gray-600 mb-2">{specialty}</p>
      <p className="text-sm text-gray-500 mb-4">{fullAddress}</p>

      {/* 7) Distance (defensive) */}
      <p className="text-sm text-gray-500 mb-4">
        {distance != null
          ? `${distance.toFixed(2)} km away`
          : "Distance unavailable"}
      </p>

      {/* 8) Fee */}
      <p className="text-lg font-medium mb-6">₹{fee.toLocaleString()}</p>

      {/* 9) Actions */}
      <div className="mt-auto flex space-x-2">
        <button
          onClick={onViewDetails}
          className="flex-1 px-4 py-2 rounded-xl border border-gray-300 text-sm hover:bg-gray-50"
        >
          View Details
        </button>
        <button
          onClick={onBook}
          className="flex-1 px-4 py-2 rounded-xl bg-blue-600 text-white text-sm hover:bg-blue-700"
        >
          Book
        </button>
      </div>
    </div>
  );
}
