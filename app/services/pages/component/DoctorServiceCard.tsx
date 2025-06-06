// components/DoctorServiceCard.tsx
"use client";
import React from "react";
import Image from "next/image";
import { FaStar } from "react-icons/fa";

interface DoctorService {
  name: string;
  specialty: string;
  location: string;
  fee: number;
  rating: number; // out of 5
  imgUrl: string;
}

type Props = {
  service: DoctorService;
  onViewDetails?: () => void;
  onBook?: () => void;
};

export default function DoctorServiceCard({
  service,
  onViewDetails,
  onBook,
}: Props) {
  const { name, specialty, location, fee, rating, imgUrl } = service;

  // Helper to render star icons
  const renderStars = (count: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <FaStar
        key={i}
        className={`h-4 w-4 ${i < count ? "text-yellow-400" : "text-gray-300"}`}
      />
    ));
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
      {/* Image */}
      <div className="relative w-full h-48">
        <Image src={imgUrl} alt={name} fill className="object-cover" />
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col justify-between h-[200px]">
        {/* Doctor Info */}
        <div>
          <h3 className="text-xl font-semibold text-gray-800">{name}</h3>
          <p className="text-sm text-indigo-600 mt-1">{specialty}</p>
          <p className="text-sm text-gray-500 mt-1 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-1 text-gray-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.05 4.05a7 7 0 119.9 9.9L10 19.9l-4.95-5.95a7 7 0 010-9.9zM10 10a2 2 0 100-4 2 2 0 000 4z"
                clipRule="evenodd"
              />
            </svg>
            {location}
          </p>
        </div>

        {/* Rating & Fee */}
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center space-x-1">
            {renderStars(rating)}
            <span className="text-sm text-gray-600 ml-1">
              ({rating.toFixed(1)})
            </span>
          </div>
          <span className="text-lg font-semibold text-green-600">₹{fee}</span>
        </div>

        {/* Actions */}
        <div className="mt-4 flex gap-2">
          <button
            onClick={onViewDetails}
            className="flex-1 bg-indigo-600 text-white py-2 rounded-xl text-sm font-medium hover:bg-indigo-700 transition"
          >
            View Details
          </button>
          <button
            onClick={onBook}
            className="flex-1 border border-indigo-600 text-indigo-600 py-2 rounded-xl text-sm font-medium hover:bg-indigo-50 transition"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}
