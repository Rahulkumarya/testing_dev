// import React, { useState } from "react";
// import { Switch } from "@headlessui/react";
// import { TrashIcon, PencilIcon} from "@heroicons/react/24/solid";

// interface Service {
//   id: string;
//   name: string;
//   available: boolean;
// }

// const initialServices: Service[] = [
//   { id: "1", name: "ICU Ambulance", available: true },
//   { id: "2", name: "Basic Life Support", available: false },
//   { id: "3", name: "Patient Transport", available: true },
// ];

// const ServiceList = () => {
//   const [services, setServices] = useState<Service[]>(initialServices);
//   const [filter, setFilter] = useState<"all" | "available" | "unavailable">(
//     "all"
//   );

//   const toggleAvailability = (id: string) => {
//     setServices((prev) =>
//       prev.map((s) => (s.id === id ? { ...s, available: !s.available } : s))
//     );
//   };

//   const deleteService = (id: string) => {
//     setServices((prev) => prev.filter((s) => s.id !== id));
//   };

//   const filteredServices = services.filter((s) =>
//     filter === "all"
//       ? true
//       : filter === "available"
//       ? s.available
//       : !s.available
//   );

//   return (
//     <div className="max-w-4xl mx-auto mt-10 px-4">
//       <h2 className="text-2xl font-bold mb-4 text-center">Your Services</h2>

//       {/* Filter Links */}
//       <div className="flex justify-center gap-4 mb-6 text-sm font-medium">
//         {["all", "available", "unavailable"].map((f) => (
//           <button
//             key={f}
//             onClick={() => setFilter(f as any)}
//             className={`px-3 py-1 rounded-full ${
//               filter === f
//                 ? "bg-blue-600 text-white"
//                 : "bg-gray-200 text-gray-700"
//             }`}
//           >
//             {f.charAt(0).toUpperCase() + f.slice(1)}
//           </button>
//         ))}
//       </div>

//       {/* Services Grid */}
//       <div className="grid sm:grid-cols-2 gap-4">
//         {filteredServices.map((service) => (
//           <div
//             key={service.id}
//             className="flex justify-between items-center p-4 bg-white rounded shadow border"
//           >
//             <div>
//               <h4 className="font-semibold text-lg">{service.name}</h4>
//               <p className="text-sm text-gray-500">
//                 {service.available ? "Available" : "Unavailable"}
//               </p>
//             </div>

//             <div className="flex items-center gap-2">
//               {/* Toggle */}
//               <Switch
//                 checked={service.available}
//                 onChange={() => toggleAvailability(service.id)}
//                 className={`${
//                   service.available ? "bg-green-500" : "bg-gray-300"
//                 } relative inline-flex h-6 w-11 items-center rounded-full`}
//               >
//                 <span
//                   className={`${
//                     service.available ? "translate-x-6" : "translate-x-1"
//                   } inline-block h-4 w-4 transform bg-white rounded-full transition`}
//                 />
//               </Switch>

//               {/* Update */}
//               <button
//                 onClick={() => alert("Update service logic here")}
//                 className="text-blue-600 hover:text-blue-800"
//                 title="Edit"
//               >
//                 <PencilIcon className="h-5 w-5" />
//               </button>

//               {/* Delete */}
//               <button
//                 onClick={() => deleteService(service.id)}
//                 className="text-red-600 hover:text-red-800"
//                 title="Delete"
//               >
//                 <TrashIcon className="h-5 w-5" />
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Optional Add Service Button */}
//       <div className="mt-6 text-center">
//         <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
//           + Add New Service
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ServiceList;


