"use client";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";

// Placeholder emergency contacts
const emergencyContacts = [
  { name: "Mom", phone: "+91XXXXXXXXXX" },
  { name: "Clinic", phone: "+91YYYYYYYYYY" },
];

export default function SoSButton() {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [isSending, setIsSending] = useState(false);
  const countdownRef = useRef<NodeJS.Timeout | null>(null);

  // Keep audio element in a ref
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // 1) Play sound & vibrate on open
  const handleOpenConfirm = () => {
    // If no audioRef yet, create one
    if (!audioRef.current) {
      audioRef.current = new Audio("/sounds/alarm.mp3");
      audioRef.current.loop = true; // keep beeping
    }
    audioRef.current.play().catch(() => {
      console.warn("Audio playback failed");
    });
    if ("vibrate" in navigator) {
      navigator.vibrate([200, 100, 200, 100]); // repeated pattern
    }
    setConfirmOpen(true);
  };

  // 2) Countdown logic
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

  // 3) Actually send SOS
  const sendSOS = () => {
    setIsSending(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;

        try {
          const resp = await fetch("/api/emergency", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              latitude,
              longitude,
              contacts: emergencyContacts,
            }),
          });
          if (!resp.ok) throw new Error("Failed");
          alert("🚑 Emergency alert sent!");
        } catch {
          alert("❌ Error sending alert.");
        } finally {
          resetAll();
        }
      },
      () => {
        alert("❌ Could not get your location.");
        resetAll();
      }
    );
  };

  // 4) Reset everything: close modal, stop countdown, stop audio+vibration
  const resetAll = () => {
    setConfirmOpen(false);
    setCountdown(5);
    setIsSending(false);

    // Stop countdown timer
    if (countdownRef.current) clearTimeout(countdownRef.current);

    // Stop and reset audio
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    // Cancel vibration
    if ("vibrate" in navigator) navigator.vibrate(0);
  };

  return (
    <>
      <Button
        className="bg-red-600 text-white hover:bg-red-700 px-4 py-2 rounded-full"
        onClick={handleOpenConfirm}
      >
        🆘 SoS
      </Button>

      {confirmOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-[90%] max-w-md">
            <h2 className="text-xl font-bold text-red-600 mb-2">
              Emergency Alert
            </h2>
            <p className="text-gray-700 mb-4">
              Sending an emergency alert in <strong>{countdown}</strong>{" "}
              seconds...
            </p>
            <ul className="text-sm text-gray-500 mb-4 list-disc list-inside">
              <li>📍 Your location will be shared</li>
              <li>📞 Your contacts will be notified</li>
            </ul>
            <div className="flex justify-end gap-3">
              <Button
                onClick={resetAll}
                className="bg-gray-100 text-gray-700 hover:bg-gray-200"
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
