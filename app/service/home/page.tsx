"use client";

import React, { useRef, useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { useAllServicesQuery } from "@/redux/features/patients/patientApi";
import FeaturedCarousel from "./component/FeaturedCarousel";
import Hero from "./Hero";

interface Service {
  serviceName: string;
  serviceType: string;
  location?: {
    city?: string;
    state?: string;
  };
  name?: string;
}

interface ServiceResponse {
  services: Service[];
}

const categories = [
  {
    title: "Doctors",
    img: "/images/categories/doctor.png",
  },
  {
    title: "Hospitals",
    img: "/images/categories/hospital.png",
  },
  {
    title: "Clinics",
    img: "/images/categories/clinic.png",
  },
  {
    title: "Ambulance",
    img: "/images/categories/ambulance.png",
  },
  {
    title: "Labs",
    img: "/images/categories/lab.png",
  },
];

export default function HomePage() {
  const suggestionBoxRef = useRef<HTMLDivElement>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState<Service[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [filteredServices, setFilteredServices] = useState<Service[]>([]);

  const { data } = useAllServicesQuery();
  const allServices = useMemo(() => {
    if (!data) return [];
    return Array.isArray(data) ? data : (data as ServiceResponse).services || [];
  }, [data]);

  useEffect(() => {
    if (searchTerm.trim()) {
      const trimmed = searchTerm.toLowerCase().trim();
      const matched = allServices.filter(
        (s) =>
          s.serviceName?.toLowerCase().includes(trimmed) ||
          s.location?.city?.toLowerCase().includes(trimmed) ||
          s.location?.state?.toLowerCase().includes(trimmed)
      );
      setSuggestions(matched.slice(0, 5));
    } else {
      setSuggestions([]);
    }
  }, [searchTerm, allServices]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionBoxRef.current &&
        !suggestionBoxRef.current.contains(event.target as Node)
      ) {
        setSuggestions([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSuggestionClick = (name: string) => {
    setSearchTerm(name);
    const matched = allServices.filter((s) =>
      s.serviceName?.toLowerCase().includes(name.toLowerCase())
    );
    setFilteredServices(matched);
    setSuggestions([]);
    setIsSearching(true);
  };

  const groupByType = useMemo(() => {
    return filteredServices.reduce((acc, service) => {
      const type = service.serviceType?.toLowerCase() || "other";
      if (!acc[type]) acc[type] = [];
      acc[type].push(service);
      return acc;
    }, {} as Record<string, Service[]>);
  }, [filteredServices]);

  return (
    <main className="font-sans text-gray-800">
      <Hero />
      
      {/* 🔍 Search Box with Auto Suggestions */}
      <section className="relative bg-blue-50 py-20 px-4 text-center">
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
                  onClick={() => handleSuggestionClick(item.serviceName || '')}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-left"
                >
                  {item.serviceName} —{" "}
                  <span className="text-sm text-gray-500">
                    {item.location?.city}, {item.location?.state}
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
                  <div className="relative w-16 h-16 mb-2">
                    <Image
                      src={cat.img}
                      alt={cat.title}
                      fill
                      style={{ objectFit: "contain" }}
                    />
                  </div>
                  <span className="text-sm font-medium">{cat.title}</span>
                </div>
              ))}
            </div>
          </section>

          {/* 🚀 Grouped Carousels for Each ServiceType */}
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