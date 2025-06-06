// pages/index.tsx (or any parent component)
"use client";
import React, {useState} from "react";
import DoctorServiceCard from "../component/DoctorServiceCard";
import SearchAndFilterBar from "../component/SearchAndFilterBar";

const allServices = [
  {
    name: "Dr. Aisha Khan",
    specialty: "Cardiologist",
    location: "Lakeside Hospital",
    fee: 1200,
    rating: 4.8,
    imgUrl: "/images/doctor1.jpg",
  },
  {
    name: "Dr. Ravi Patel",
    specialty: "Orthopedic Surgeon",
    location: "City General Clinic",
    fee: 1500,
    rating: 4.6,
    imgUrl: "/images/doctor2.jpg",
  },
  {
    name: "Dr. Maria Gomez",
    specialty: "Dermatologist",
    location: "SkinCare Center",
    fee: 1000,
    rating: 4.9,
    imgUrl: "/images/doctor3.jpg",
  },
  // …more
];

const specialties = ["Cardiologist", "Orthopedic Surgeon", "Dermatologist"];
const locations = [
  "Lakeside Hospital",
  "City General Clinic",
  "SkinCare Center",
];

export default function HomePage() {
  const [filtered, setFiltered] = useState(allServices);

  const handleSearch = (criteria: {
    query: string;
    specialty: string;
    location: string;
    latitude?: number;
    longitude?: number;
  }) => {
    let result = allServices;

    // Text search
    if (criteria.query.trim()) {
      const q = criteria.query.toLowerCase();
      result = result.filter(
        (svc) =>
          svc.name.toLowerCase().includes(q) ||
          svc.specialty.toLowerCase().includes(q)
      );
    }
    // Specialty filter
    if (criteria.specialty) {
      result = result.filter((svc) => svc.specialty === criteria.specialty);
    }
    // Location filter
    if (criteria.location) {
      result = result.filter((svc) => svc.location === criteria.location);
    }
    // (Optionally) Filter by geolocation radius if lat/lng provided
    if (criteria.latitude && criteria.longitude) {
      // Example: filter only services in same city; modify as needed
      result = result.filter((svc) => svc.location === criteria.location);
    }

    setFiltered(result);
  };

  return (
    <main className="pt-20 bg-gray-100 min-h-screen">
      <SearchAndFilterBar
        specialties={specialties}
        locations={locations}
        onSearch={handleSearch}
      />

      <section className="max-w-7xl mx-auto px-6 pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {filtered.map((service, idx) => (
            <DoctorServiceCard
              key={idx}
              service={service}
              onViewDetails={() => console.log("View", service.name)}
              onBook={() => console.log("Book", service.name)}
            />
          ))}
        </div>
        {filtered.length === 0 && (
          <p className="text-center text-gray-500 mt-8">No services found.</p>
        )}
      </section>
    </main>
  );
}
  