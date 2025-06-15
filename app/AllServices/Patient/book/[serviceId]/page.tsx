"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import axios from "axios";

export default function BookServicePage() {
  const params = useSearchParams();

  const serviceId = params.get("serviceId")!;
  const [service, setService] = useState<{ name: string; fee: number } | null>(
    null
  );

  useEffect(() => {
    // Fetch service details
    axios.get(`/api/services/${serviceId}`).then((res) => {
      setService(res.data);
    });
  }, [serviceId]);

  if (!service) return <p>Loading service...</p>;

  return (
    <div className="max-w-lg mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{service.name}</h1>
      <p className="mb-6">Fee: ₹{service.fee}</p>

    </div>
  );
}
