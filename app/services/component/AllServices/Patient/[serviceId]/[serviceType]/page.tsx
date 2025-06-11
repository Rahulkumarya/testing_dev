"use client";

import { useParams, useRouter } from "next/navigation";
import { useDoctorByIdQuery } from "@/redux/features/patients/patientApi";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function ServiceDetailPage() {
  const { serviceId } = useParams();
  const id = serviceId as string;
  const router = useRouter();

  const { data, isLoading } = useDoctorByIdQuery(id);
  const [userCoords, setUserCoords] = useState<[number, number] | null>(null);
  const [distance, setDistance] = useState<string | null>(null);

  const service = data?.service;

  useEffect(() => {
    if (typeof window !== "undefined" && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setUserCoords([longitude, latitude]); // [lng, lat]
        },
        (err) => console.error("Location fetch failed", err)
      );
    }
  }, []);

  useEffect(() => {
    if (userCoords && service?.location?.coordinates) {
      const dist = calculateDistance(
        userCoords[1],
        userCoords[0],
        service.location.coordinates[1],
        service.location.coordinates[0]
      );
      setDistance(`${dist.toFixed(2)} km`);
    }
  }, [userCoords, service]);

  if (isLoading || !service) return <p className="text-center">Loading...</p>;

  const { image, serviceName, fee, estimatedPrice, description } = service;

  const percentageOff =
    estimatedPrice && fee && estimatedPrice > fee
      ? Math.round(((estimatedPrice - fee) / estimatedPrice) * 100)
      : 0;

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6 container">
      <Image
        src={image}
        alt={serviceName}
        width={800}
        height={300}
        className="w-full h-64 object-cover rounded-md"
      />

      <h1 className="text-3xl font-bold">{serviceName}</h1>

      <div className="flex items-center gap-4 mt-2">
        <p className="text-2xl font-bold text-green-600">₹{fee?.toLocaleString()}</p>
        {estimatedPrice !== fee && (
          <p className="text-lg text-gray-500 line-through">
            ₹{estimatedPrice?.toLocaleString()}
          </p>
        )}
        {percentageOff > 0 && (
          <span className="text-sm bg-red-100 text-red-600 px-2 py-1 rounded-full">
            Save ₹{(estimatedPrice - fee).toLocaleString()} ({percentageOff}% OFF)
          </span>
        )}
      </div>

      {distance && (
        <p className="text-sm text-blue-600 mt-1">
          📍 Approx. distance from you: <strong>{distance}</strong>
        </p>
      )}

      <p className="text-gray-700 mt-4">{description}</p>

      <div className="flex gap-4 mt-6">
        <button
          onClick={() => router.push(`/AllServices/Patient/book/${id}`)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Book Service
        </button>
      </div>
    </div>
  );
}

// Haversine Distance Formula (Earth radius = 6371 km)
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const toRad = (value: number) => (value * Math.PI) / 180;

  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}
