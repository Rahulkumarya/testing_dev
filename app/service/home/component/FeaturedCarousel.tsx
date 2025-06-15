"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

interface Service {
  serviceName: string;
  serviceType: string;
  location?: {
    city?: string;
    state?: string;
  };
  name?: string;
  avatar?: string;
}

interface FeaturedCarouselProps {
  services: Service[];
}

const FeaturedCarousel: React.FC<FeaturedCarouselProps> = ({ services }) => {
  return (
    <div className="relative">
      <div className="flex overflow-x-auto gap-4 pb-4 px-4 snap-x snap-mandatory">
        {services.map((service, index) => (
          <Link
            href={`/services/${service.serviceType.toLowerCase()}/${service.serviceName}`}
            key={index}
            className="flex-none w-64 snap-start"
          >
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-48">
                <Image
                  src={service.avatar || "/images/placeholder.jpg"}
                  alt={service.serviceName}
                  fill
                  style={{ objectFit: "cover" }}
                  className="w-full h-full"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-1">{service.serviceName}</h3>
                <p className="text-gray-600 text-sm">
                  {service.location?.city}, {service.location?.state}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FeaturedCarousel;
  
