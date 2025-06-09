
// components/SearchAndFilterBar.tsx
"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  FaSearch,
  FaFilter,
  FaMapMarkerAlt,
  FaMicrophone,
} from "react-icons/fa";

/**
 * SearchCriteria defines the shape of search parameters passed to parent
 */
type SearchCriteria = {
  query: string;
  specialty: string;
  location: string;
  latitude?: number;
  longitude?: number;
};

/**
 * Props for SearchAndFilterBar:
 * - onSearch: callback with current criteria
 * - specialties & locations: filter options
 */
type Props = {
  onSearch: (criteria: SearchCriteria) => void;
  specialties: string[];
  locations: string[];
};

export default function SearchAndFilterBar({
  onSearch,
  specialties,
  locations,
}: Props) {
  // Controlled state for inputs
  const [query, setQuery] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [location, setLocation] = useState("");
  const [latitude, setLatitude] = useState<number>();
  const [longitude, setLongitude] = useState<number>();
  const [showMobileForm, setShowMobileForm] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  /**
   * Attempt geolocation capture; update state and notify user
   */
  const handleUseMyLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported by your browser.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setLatitude(coords.latitude);
        setLongitude(coords.longitude);
        alert(
          `Location: (${coords.latitude.toFixed(4)}, ${coords.longitude.toFixed(
            4
          )})`
        );
      },
      (err) => {
        console.error(err);
        alert("Unable to retrieve location.");
      }
    );
  };

  // Debounced values to avoid excessive API calls
  const [debouncedQuery, setDebouncedQuery] = useState(query);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500); // 500ms delay

    return () => clearTimeout(handler); // cancel if input changes again
  }, [query]);



  useEffect(() => {
    onSearch({
      query: debouncedQuery,
      specialty,
      location,
      latitude,
      longitude,
    });
  }, [debouncedQuery, specialty, location, latitude, longitude]);



  /**
   * Handle form submission and propagate search criteria
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({ query, specialty, location, latitude, longitude });
  };

  /**
   * Close mobile form when clicking outside of it
   */
  useEffect(() => {
    if (!showMobileForm) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (formRef.current && !formRef.current.contains(e.target as Node)) {
        setShowMobileForm(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showMobileForm]);

  return (
    <>
      {/* Mobile action buttons: search, filter, voice */}
      <div className="md:hidden fixed bottom-4 right-4 flex space-x-3 z-50">
        {/* Toggle form */}
        <button
          onClick={() => setShowMobileForm((p) => !p)}
          className="bg-indigo-600 text-white p-3 rounded-full shadow-lg hover:bg-indigo-700 transition"
          aria-label="Toggle Search"
        >
          <FaSearch />
        </button>

        {/* Toggle filters (same form shows both) */}
        <button
          onClick={() => setShowMobileForm((p) => !p)}
          className="bg-indigo-600 text-white p-3 rounded-full shadow-lg hover:bg-indigo-700 transition"
          aria-label="Toggle Filters"
        >
          <FaFilter />
        </button>

        {/* Voice search placeholder: integrate Web Speech API here */}
        <button
          onClick={() => console.log("Voice search not implemented")}
          className="bg-indigo-600 text-white p-3 rounded-full shadow-lg hover:bg-indigo-700 transition"
          aria-label="Voice Search"
        >
          <FaMicrophone />
        </button>
      </div>

      {/* Main form: always visible on md+; slide in on mobile */}
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className={`
          bg-white p-6 rounded-2xl shadow-md
          transition-transform duration-300
          max-w-4xl mx-auto mb-8
          flex flex-col md:flex-row items-center gap-4
          ${
            showMobileForm
              ? "translate-y-0 opacity-100 pointer-events-auto"
              : "-translate-y-full opacity-0 pointer-events-none"
          }
          md:translate-y-0 md:opacity-100 md:pointer-events-auto
        `}
        style={{
          position:
            showMobileForm && window.innerWidth < 768 ? "fixed" : "static",
          top: showMobileForm && window.innerWidth < 768 ? "1rem" : undefined,
          left: showMobileForm && window.innerWidth < 768 ? "50%" : undefined,
          transform:
            showMobileForm && window.innerWidth < 768
              ? "translateX(-50%)"
              : undefined,
          width: showMobileForm && window.innerWidth < 768 ? "90%" : undefined,
          zIndex: showMobileForm && window.innerWidth < 768 ? "50" : undefined,
        }}
      >
        {/* Text search input */}
        <div className="relative flex-1 w-full md:w-auto">
          <FaSearch className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search doctors, services..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full md:w-[250px] pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Specialty dropdown */}
        <select
          value={specialty}
          onChange={(e) => setSpecialty(e.target.value)}
          className="w-full md:w-[180px] px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">All Specialties</option>
          {/* {specialties.map((spec) => (
            <option key={spec} value={spec}> {spec} </option>
          ))} */}
        </select>

        {/* Location dropdown & button */}
        <div className="relative flex-1 w-full md:w-auto">
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full md:w-[180px] px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">All Locations</option>
            {/* {locations.map((loc) => (
              <option key={loc} value={loc}> {loc} </option>
            ))} */}
          </select>
          <button
            type="button"
            onClick={handleUseMyLocation}
            className="absolute top-2 right-2 text-gray-500 hover:text-indigo-600 transition"
            aria-label="Use My Location"
          >
            <FaMapMarkerAlt />
          </button>
        </div>

        {/* Submit button */}
        <button
          type="submit"
          className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition flex-shrink-0"
        >
          Search
        </button>
      </form>
    </>
  );
}