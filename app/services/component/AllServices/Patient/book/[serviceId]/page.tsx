"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import RazorpayButton from "../../component/RazorpayButton"; // Adjust the import path as necessary
import axios from "axios";

export default function BookServicePage() {
  const params = useSearchParams();
  const router = useRouter();
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
      {/* Razorpay payment button */}
      <RazorpayButton
        serviceId={serviceId}
        amount={service.fee}
        name={service.name}
      />
    </div>
  );
}
