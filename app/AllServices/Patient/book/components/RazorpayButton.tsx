"use client";

import React from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

type Props = {
  serviceId: string;
  amount: number; // in rupees
  name: string; // description shown in checkout
};

// Razorpay interface
interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

interface RazorpayOptions {
  key: string | undefined;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  handler: (response: RazorpayResponse) => void;
  prefill: {
    name: string;
    email: string;
    contact: string;
  };
  theme: {
    color: string;
  };
}

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => {
      open: () => void;
    };
  }
}

const RazorpayButton: React.FC<Props> = ({ serviceId, amount, name }) => {
  const router = useRouter();

  const openRazorpay = async () => {
    try {
      const { data } = await axios.post("/api/razorpay/create-order", {
        amount,
      });

      const options: RazorpayOptions = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: "INR",
        name: "UronHealth Clinic",
        description: name,
        order_id: data.orderId,
        handler(response: RazorpayResponse) {
          console.log("Payment Success:", response);
          router.push(
            `/patient/book/${serviceId}/success?payment_id=${response.razorpay_payment_id}`
          );
        },
        prefill: {
          name: "",
          email: "",
          contact: "",
        },
        theme: {
          color: "#37a39a",
        },
      };

      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => {
        const rzp = new window.Razorpay(options);
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
