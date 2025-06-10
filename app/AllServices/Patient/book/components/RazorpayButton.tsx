"use client";

import React from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

type Props = {
  serviceId: string;
  amount: number; // in rupees
  name: string; // description shown in checkout
};

const RazorpayButton: React.FC<Props> = ({ serviceId, amount, name }) => {
  const router = useRouter();

  const openRazorpay = async () => {
    try {
      // 1. Create order on backend
      const { data } = await axios.post("/api/razorpay/create-order", {
        amount,
      });

      const options: any = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // from env
        amount: data.amount,
        currency: "INR",
        name: "UronHealth Clinic",
        description: name,
        order_id: data.orderId,
        handler(response: any) {
          // 4. Payment successful
          console.log("Payment Success:", response);
          router.push(
            `/patient/book/${serviceId}/success?payment_id=${response.razorpay_payment_id}`
          );
        },
        prefill: {
          name: "", // you can pull from user context
          email: "",
          contact: "",
        },
        theme: {
          color: "#37a39a",
        },
      };

      // 2. Load Razorpay script
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => {
        // 3. Open the checkout
        const rzp = new (window as any).Razorpay(options);
        rzp.open();
      };
      document.body.appendChild(script);
    } catch (error) {
      console.error("Razorpay error:", error);
      alert("Unable to initiate payment. Please try again.");
    }
  };

  return (
    <button
      onClick={openRazorpay}
      className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
    >
      Pay ₹{amount}
    </button>
  );
};

export default RazorpayButton;
