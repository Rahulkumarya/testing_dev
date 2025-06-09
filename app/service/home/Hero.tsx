// // "use client";

// // import Image from "next/image";

// // const categories = [
// //   { title: "Doctors", icon: "/icons/doctor.svg" },
// //   { title: "Diagnostics", icon: "/icons/diagnostic.svg" },
// //   { title: "Resorts", icon: "/icons/resort.svg" },
// //   { title: "Ambulance", icon: "/icons/ambulance.svg" },
// //   { title: "Pharmacy", icon: "/icons/pharmacy.svg" },
// // ];

// // const featured = [
// //   {
// //     title: "Dr. Aisha Khan",
// //     type: "Cardiologist",
// //     image: "/images/doctor1.jpg",
// //   },
// //   {
// //     title: "Sunrise Resort",
// //     type: "Beach Resort",
// //     image: "/images/resort1.jpg",
// //   },
// //   {
// //     title: "City Diagnostics",
// //     type: "MRI, CT Scan",
// //     image: "/images/diagnostic1.jpg",
// //   },
// // ];

// // export default function HomePage() {
// //   return (
// //     <main className="text-gray-800">
// //       {/* Hero Section */}
// //       <section className="relative bg-blue-50 py-20 px-6 text-center">
// //         <h1 className="text-4xl font-bold max-w-3xl mx-auto">
// //           Find Trusted Services Near You
// //         </h1>
// //         <p className="text-gray-600 mt-4">
// //           Doctors, Resorts, Diagnostics & more
// //         </p>
// //         <div className="mt-6 max-w-lg mx-auto">
// //           <input
// //             type="text"
// //             placeholder="Search for a service..."
// //             className="w-full px-4 py-3 rounded-full border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
// //           />
// //         </div>
// //       </section>

// //       {/* Categories */}
// //       <section className="py-12 px-6 bg-white">
// //         <h2 className="text-2xl font-semibold text-center mb-8">
// //           Explore Categories
// //         </h2>
// //         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 max-w-6xl mx-auto">
// //           {categories.map((cat) => (
// //             <div
// //               key={cat.title}
// //               className="flex flex-col items-center bg-gray-50 p-4 rounded-lg shadow hover:shadow-md transition"
// //             >
// //               <Image src={cat.icon} alt={cat.title} width={40} height={40} />
// //               <p className="mt-2 font-medium">{cat.title}</p>
// //             </div>
// //           ))}
// //         </div>
// //       </section>

// //       {/* How It Works */}
// //       <section className="py-12 bg-gray-50 px-6">
// //         <h2 className="text-2xl font-semibold text-center mb-8">
// //           How It Works
// //         </h2>
// //         <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
// //           {["Search", "Compare", "Book"].map((step, i) => (
// //             <div
// //               key={i}
// //               className="bg-white p-6 rounded-lg text-center shadow-md"
// //             >
// //               <div className="text-blue-500 text-3xl font-bold mb-2">
// //                 {i + 1}
// //               </div>
// //               <p className="font-semibold">{step}</p>
// //               <p className="text-sm text-gray-500 mt-2">
// //                 {step} trusted providers easily.
// //               </p>
// //             </div>
// //           ))}
// //         </div>
// //       </section>

// //       {/* Featured Services */}
// //       <section className="py-12 px-6 bg-white">
// //         <h2 className="text-2xl font-semibold text-center mb-8">
// //           Featured Providers
// //         </h2>
// //         <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
// //           {featured.map((item) => (
// //             <div
// //               key={item.title}
// //               className="bg-gray-100 rounded-lg shadow hover:shadow-md overflow-hidden"
// //             >
// //               <Image
// //                 src={item.image}
// //                 alt={item.title}
// //                 width={400}
// //                 height={300}
// //                 className="w-full h-48 object-cover"
// //               />
// //               <div className="p-4">
// //                 <h3 className="text-lg font-bold">{item.title}</h3>
// //                 <p className="text-sm text-gray-600">{item.type}</p>
// //               </div>
// //             </div>
// //           ))}
// //         </div>
// //       </section>

// //       {/* Testimonials */}
// //       <section className="py-12 px-6 bg-blue-50">
// //         <h2 className="text-2xl font-semibold text-center mb-8">
// //           What People Say
// //         </h2>
// //         <div className="max-w-4xl mx-auto space-y-6">
// //           {[
// //             {
// //               name: "John D.",
// //               feedback: "Booking an MRI was never this easy. Great platform!",
// //             },
// //             {
// //               name: "Dr. Nivedita",
// //               feedback: "Connected to more patients seamlessly. Impressive!",
// //             },
// //           ].map((review) => (
// //             <div
// //               key={review.name}
// //               className="bg-white p-6 rounded-lg shadow text-center"
// //             >
// //               <p className="text-gray-700 italic">“{review.feedback}”</p>
// //               <p className="mt-2 font-medium">{review.name}</p>
// //             </div>
// //           ))}
// //         </div>
// //       </section>
// //     </main>
// //   );
// // }




// "use client";

// import Image from "next/image";
// import FeaturedCarousel from "./component/FeaturedCarousel";

// const categories = [
//   { title: "Doctors", img: "/assests/doctor.jpg" },
//   { title: "Diagnostics", img: "/assests/diagnosis.jpg" },
//   { title: "Resorts", img: "/assests/resort.jpg" },
//   { title: "Ambulance", img: "/assests/radiology.jpg" },
//   { title: "Pharmacy", img: "/assests/pharmacy.jpg" },
//   { title: "Ambulance", img: "/assests/radiology.jpg" },
//   { title: "Pharmacy", img: "/assests/pharmacy.jpg" },
//   { title: "Ambulance", img: "/assests/radiology.jpg" },
//   { title: "Pharmacy", img: "/assests/pharmacy.jpg" },
// ];

// const services = [
//   {
//     name: "Dr. Aisha Khan",
//     type: "Cardiologist",
//     location: "Lakeside Hospital",
//     img: "/images/doctor.jpg",
//   },
//   {
//     name: "Sunrise Beach Resort",
//     type: "Luxury Stay",
//     location: "Goa, India",
//     img: "/images/resort.jpg",
//   },
//   {
//     name: "Metro Diagnostics",
//     type: "CT/MRI Services",
//     location: "Delhi",
//     img: "/assests/diagnostic.jpg",
//   },
//   {
//     name: "Dr. Aisha Khan",
//     type: "Cardiologist",
//     location: "Lakeside Hospital",
//     img: "/assests/doctor.jpg",
//   },
//   {
//     name: "Sunrise Beach Resort",
//     type: "Luxury Stay",
//     location: "Goa, India",
//     img: "/assests/resort.jpg",
//   },
//   {
//     name: "Metro Diagnostics",
//     type: "CT/MRI Services",
//     location: "Delhi",
//     img: "/images/diagnostic.jpg",
//   },
//   {
//     name: "Dr. Aisha Khan",
//     type: "Cardiologist",
//     location: "Lakeside Hospital",
//     img: "/images/doctor.jpg",
//   },
//   {
//     name: "Sunrise Beach Resort",
//     type: "Luxury Stay",
//     location: "Goa, India",
//     img: "/images/resort.jpg",
//   },
//   {
//     name: "Metro Diagnostics",
//     type: "CT/MRI Services",
//     location: "Delhi",
//     img: "/images/diagnostic.jpg",
//   },
// ];

// export default function HomePage() {
//   return (
//     <main className="font-sans text-gray-800 pt-20">
//       {/* Hero Section */}
//       <section className="relative bg-blue-50 py-20 px-4 text-center">
//         <h1 className="text-4xl md:text-5xl font-bold max-w-4xl mx-auto">
//           Discover & Book Trusted Services
//         </h1>
//         <p className="text-gray-600 mt-4 max-w-xl mx-auto">
//           Doctors, Resorts, Ambulances, Labs & More — All in One Platform
//         </p>
//         <div className="mt-6 max-w-md mx-auto">
//           <input
//             type="text"
//             placeholder="Search services near you..."
//             className="w-full px-5 py-3 rounded-full border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>
//       </section>

//       {/* Category Highlights */}
//       <section className="py-12 px-4 bg-white">
//         <h2 className="text-2xl font-semibold text-center mb-10">
//           Popular Categories
//         </h2>
//         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 max-w-6xl mx-auto">
//           {categories.map((cat) => (
//             <div
//               key={cat.title}
//               className="flex flex-col items-center bg-gray-100 p-4 rounded-lg hover:shadow transition"
//             >
//               <Image src={cat.img} alt={cat.title} width={60} height={60} />
//               <p className="mt-3 font-medium">{cat.title}</p>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Featured Services */}
//       <section className="py-12 px-4 bg-gray-50">
//         <h2 className="text-2xl font-semibold text-center mb-10">
//           Featured Services
//         </h2>
//         <FeaturedCarousel services={services} />
//         {/* <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
//           {services.map((service, idx) => (
//             <div
//               key={idx}
//               className="bg-white rounded-lg shadow hover:shadow-lg transition"
//             >
//               <Image
//                 src={service.img}
//                 alt={service.name}
//                 width={500}
//                 height={300}
//                 className="rounded-t-lg object-cover"
//               />
//               <div className="p-4">
//                 <h3 className="font-semibold text-lg">{service.name}</h3>
//                 <p className="text-gray-500">{service.type}</p>
//                 <p className="text-sm text-gray-400">{service.location}</p>
//               </div>
//             </div>
//           ))}
//         </div> */}

//         {/* inside the allservices section wise  like doctor ,ambulance,and and so on */}
//       </section>




//     </main>
//   );
// }












// //2nd 
// "use client";

// import { useState } from "react";
// import Image from "next/image";
// import FeaturedCarousel from "./component/FeaturedCarousel";

// // Sample categories
// const categories = [
//   { title: "Doctors", img: "/assests/doctor.jpg" },
//   { title: "Diagnostics", img: "/assests/diagnosis.jpg" },
//   { title: "Resorts", img: "/assests/resort.jpg" },
//   { title: "Ambulance", img: "/assests/radiology.jpg" },
//   { title: "Pharmacy", img: "/assests/pharmacy.jpg" },
// ];

// // Static services (should come from API in real use)
// const services = [
//   {
//     name: "Dr. Aisha Khan",
//     type: "Cardiologist",
//     location: "Lakeside Hospital",
//     img: "/images/doctor.jpg",
//   },
//   {
//     name: "Sunrise Beach Resort",
//     type: "Luxury Stay",
//     location: "Goa, India",
//     img: "/images/resort.jpg",
//   },
//   {
//     name: "Metro Diagnostics",
//     type: "CT/MRI Services",
//     location: "Delhi",
//     img: "/assests/diagnostic.jpg",
//   },
// ];

// export default function HomePage() {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [searchResults, setSearchResults] = useState([]);
//   const [isSearching, setIsSearching] = useState(false);

//   // Handle global search
//   const handleSearch = () => {
//     if (!searchTerm.trim()) return;

//     const filtered = services.filter((service) =>
//       `${service.name} ${service.type} ${service.location}`
//         .toLowerCase()
//         .includes(searchTerm.toLowerCase())
//     );
//     setSearchResults(filtered);
//     setIsSearching(true);
//   };

//   // Reset search when clearing input
//   const resetSearch = () => {
//     setSearchTerm("");
//     setSearchResults([]);
//     setIsSearching(false);
//   };


//   return (
//     <main className="font-sans text-gray-800 pt-20">
//       {/* Hero + Search */}
//       {!isSearching && (
//         <section className="relative bg-blue-50 py-20 px-4 text-center">
//           <h1 className="text-4xl md:text-5xl font-bold max-w-4xl mx-auto">
//             Discover & Book Trusted Services
//           </h1>
//           <p className="text-gray-600 mt-4 max-w-xl mx-auto">
//             Doctors, Resorts, Ambulances, Labs & More — All in One Platform
//           </p>
//           <div className="mt-6 max-w-md mx-auto flex gap-2">
//             <input
//               type="text"
//               placeholder="Search services near you..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="w-full px-5 py-3 rounded-full border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//             <button
//               onClick={handleSearch}
//               className="bg-blue-600 text-white px-5 rounded-full"
//             >
//               Search
//             </button>
//           </div>
//         </section>
//       )}

//       {/* Search Results */}
//       {isSearching && (
//         <section className="py-12 px-4 bg-white">
//           <div className="flex justify-between items-center max-w-6xl mx-auto mb-4">
//             <h2 className="text-2xl font-semibold">Search Results</h2>
//             <button
//               onClick={resetSearch}
//               className="text-sm text-blue-600 underline"
//             >
//               Clear Search
//             </button>
//           </div>

//           {searchResults.length === 0 ? (
//             <p className="text-center text-gray-500">No results found.</p>
//           ) : (
//             <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
//               {searchResults.map((service, idx) => (
//                 <div
//                   key={idx}
//                   className="bg-white rounded-lg shadow hover:shadow-lg transition"
//                 >
//                   <Image
//                     src={service.img}
//                     alt={service.name}
//                     width={500}
//                     height={300}
//                     className="rounded-t-lg object-cover"
//                   />
//                   <div className="p-4">
//                     <h3 className="font-semibold text-lg">{service.name}</h3>
//                     <p className="text-gray-500">{service.type}</p>
//                     <p className="text-sm text-gray-400">{service.location}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </section>
//       )}

//       {/* Category Section */}
//       {!isSearching && (
//         <section className="py-12 px-4 bg-white">
//           <h2 className="text-2xl font-semibold text-center mb-10">
//             Popular Categories
//           </h2>
//           <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 max-w-6xl mx-auto">
//             {categories.map((cat) => (
//               <div
//                 key={cat.title}
//                 className="flex flex-col items-center bg-gray-100 p-4 rounded-lg hover:shadow transition"
//               >
//                 <Image src={cat.img} alt={cat.title} width={60} height={60} />
//                 <p className="mt-3 font-medium">{cat.title}</p>
//               </div>
//             ))}
//           </div>
//         </section>
//       )}

//       {/* Featured Services */}
//       {!isSearching && (
//         <section className="py-12 px-4 bg-gray-50">
//           <h2 className="text-2xl font-semibold text-center mb-10">
//             Featured Services
//           </h2>
//           <FeaturedCarousel services={services} />
//         </section>
//       )}
//     </main>
//   );
// }



//3rd 
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import FeaturedCarousel from "./component/FeaturedCarousel";

const categories = [
  { title: "Doctors", img: "/assests/doctor.jpg" },
  { title: "Diagnostics", img: "/assests/diagnosis.jpg" },
  { title: "Resorts", img: "/assests/resort.jpg" },
  { title: "Ambulance", img: "/assests/radiology.jpg" },
  { title: "Pharmacy", img: "/assests/pharmacy.jpg" },
];

const services = [
  {
    name: "Dr. Aisha Khan",
    type: "Cardiologist",
    location: "Lakeside Hospital",
    img: "/images/doctor.jpg",
  },
  {
    name: "Sunrise Beach Resort",
    type: "Luxury Stay",
    location: "Goa, India",
    img: "/images/resort.jpg",
  },
  {
    name: "Metro Diagnostics",
    type: "CT/MRI Services",
    location: "Delhi",
    img: "/assests/diagnostic.jpg",
  },
  {
    name: "Dr. Aisha Khan",
    type: "Cardiologist",
    location: "Lakeside Hospital",
    img: "/images/doctor.jpg",
  },
  {
    name: "Sunrise Beach Resort",
    type: "Luxury Stay",
    location: "Goa, India",
    img: "/images/resort.jpg",
  },
  {
    name: "Metro Diagnostics",
    type: "CT/MRI Services",
    location: "Delhi",
    img: "/assests/diagnostic.jpg",
  },
  {
    name: "Dr. Aisha Khan",
    type: "Cardiologist",
    location: "Lakeside Hospital",
    img: "/images/doctor.jpg",
  },
  {
    name: "Sunrise Beach Resort",
    type: "Luxury Stay",
    location: "Goa, India",
    img: "/images/resort.jpg",
  },
  {
    name: "Metro Diagnostics",
    type: "CT/MRI Services",
    location: "Delhi",
    img: "/assests/diagnostic.jpg",
  },
  // ... add more services if needed
];

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredServices, setFilteredServices] = useState(services);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      const trimmed = searchTerm.trim().toLowerCase();
      if (trimmed) {
        const matched = services.filter(
          (s) =>
            s.name.toLowerCase().includes(trimmed) ||
            s.type.toLowerCase().includes(trimmed) ||
            s.location.toLowerCase().includes(trimmed)
        );
        setFilteredServices(matched);
        setSuggestions(matched.slice(0, 5));
        setIsSearching(true);
      } else {
        setFilteredServices(services);
        setSuggestions([]);
        setIsSearching(false);
      }
    }, 200);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm]);

  const handleSuggestionClick = (name: string) => {
    setSearchTerm(name);
  };

  return (
    <main className="font-sans text-gray-800 pt-20">
      {/* Hero Section with Search */}
      <section className="relative bg-blue-50 py-20 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold max-w-4xl mx-auto">
          Discover & Book Trusted Services
        </h1>
        <p className="text-gray-600 mt-4 max-w-xl mx-auto">
          Doctors, Resorts, Ambulances, Labs & More — All in One Platform
        </p>

        {/* Search Input */}
        <div className="mt-6 max-w-md mx-auto relative">
          <input
            type="text"
            placeholder="Search services near you..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-5 py-3 rounded-full border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Auto-suggestions */}
          {searchTerm && suggestions.length > 0 && (
            <div className="absolute left-0 right-0 bg-white border mt-2 rounded-lg shadow-lg max-h-48 overflow-auto z-10">
              {suggestions.map((item, index) => (
                <p
                  key={index}
                  onClick={() => handleSuggestionClick(item.name)}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-left"
                >
                  {item.name} —{" "}
                  <span className="text-sm text-gray-500">{item.type}</span>
                </p>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Conditional Content Based on Search */}
      {isSearching ? (
        <section className="py-12 px-4 bg-white">
          <h2 className="text-2xl font-semibold text-center mb-6">
            Search Results
          </h2>

          {filteredServices.length === 0 ? (
            <p className="text-center text-gray-500">No results found.</p>
          ) : (
            <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {filteredServices.map((service, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-lg shadow hover:shadow-lg transition"
                >
                  <Image
                    src={service.img}
                    alt={service.name}
                    width={500}
                    height={300}
                    className="rounded-t-lg object-cover w-full h-[200px]"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-lg">{service.name}</h3>
                    <p className="text-gray-500">{service.type}</p>
                    <p className="text-sm text-gray-400">{service.location}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      ) : (
        <>
          {/* Only visible when NOT searching */}
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

          <FeaturedCarousel services={filteredServices} />
        </>
      )}
    </main>
  );
}



