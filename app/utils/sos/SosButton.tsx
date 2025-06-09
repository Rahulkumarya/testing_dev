"use client";

import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { useSosPatientMutation } from "@/redux/features/patients/patientApi";
import { useSelector } from "react-redux";
import { store } from "@/redux/store";

export default function SoSButton() {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [isSending, setIsSending] = useState(false);
  const countdownRef = useRef<NodeJS.Timeout | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Redux hook for SOS mutation
  const [sosPatient] = useSosPatientMutation();
  const user = useSelector((state: typeof store) => state.auth.user);
  const userId = user?._id;

  // ▶ Step 1: When user clicks SOS, play alarm + vibrate + open confirm dialog
  const handleOpenConfirm = () => {
    // Initialize & loop audio
    if (!audioRef.current) {
      audioRef.current = new Audio("/sounds/alarm.mp3");
      audioRef.current.loop = true;
    }
    audioRef.current.play().catch(() => {
      console.warn("Audio playback failed (maybe blocked by browser)");
    });

    // Vibrate pattern if supported
    if ("vibrate" in navigator) {
      navigator.vibrate([300, 200, 300]);
    }

    setConfirmOpen(true);
  };

  // ▶ Step 2: Countdown effect
  useEffect(() => {
    if (!confirmOpen || isSending) return;

    if (countdown <= 0) {
      sendSOS();
      return;
    }

    countdownRef.current = setTimeout(() => setCountdown((c) => c - 1), 1000);

    return () => {
      if (countdownRef.current) clearTimeout(countdownRef.current);
    };
  }, [countdown, confirmOpen, isSending]);

  // ▶ Step 3: Actually send the SOS
  const sendSOS = () => {
    setIsSending(true);

    if (!navigator.geolocation) {
      alert("Geolocation not supported by this browser.");
      resetAll();
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        try {
          // Call your RTK Query mutation
          await sosPatient({ userId, latitude, longitude }).unwrap();
          alert("🚑 Emergency alert sent!");
        } catch (err) {
          console.error("SOS send error:", err);
          alert("❌ Error sending alert.");
        } finally {
          resetAll();
        }
      },
      (error) => {
        // ▶ Handle permission denied / position unavailable
        if (error.code === error.PERMISSION_DENIED) {
          if (
            confirm(
              "Location access is required to send SOS. Please enable location in your browser settings."
            )
          ) {
            // Attempt again
            sendSOS();
          }
        } else {
          alert("❌ Could not get your location. Try again.");
        }
        resetAll();
      },
      { timeout: 10000 }
    );
  };

  // ▶ Step 4: Cleanup everything
  const resetAll = () => {
    setConfirmOpen(false);
    setCountdown(5);
    setIsSending(false);

    if (countdownRef.current) clearTimeout(countdownRef.current);

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    if ("vibrate" in navigator) navigator.vibrate(0);
  };

  return (
    <>
      <Button
        className="bg-red-600 text-white hover:bg-red-700 px-4 py-2 rounded-full"
        onClick={handleOpenConfirm}
      >
        🆘 SOS
      </Button>

      {confirmOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-[90%] max-w-sm">
            <h2 className="text-2xl font-bold text-red-600 mb-4">
              Emergency Alert
            </h2>
            <p className="text-gray-700 mb-4">
              Sending SOS in{" "}
              <span className="font-mono text-lg">{countdown}</span> seconds...
            </p>
            <div className="flex justify-end space-x-3">
              <Button
                onClick={resetAll}
                className="bg-gray-200 text-gray-800 hover:bg-gray-300"
              >
                Cancel
              </Button>
              <Button
                onClick={sendSOS}
                className="bg-red-600 text-white hover:bg-red-700"
                disabled={isSending}
              >
                {isSending ? "Sending..." : "Send Now"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}








export function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Earth's radius in km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function toRad(value: number): number {
  return (value * Math.PI) / 180;
}












