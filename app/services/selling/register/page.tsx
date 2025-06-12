"use client";
import React from "react";
import { useRouter } from "next/navigation";

// Define roles you want to show
const roles = [
  "pharmacy",
  "doctor",
  "practitioner",
  "clinic",
  "pathology",
  "radiology",
  "resort",
];

const Page = () => {
  const router = useRouter();

  // Handle selection of a role
  const handleSelectRole = (role: string) => {
    // Optional: Cache the selected role for later use
    localStorage.setItem("selectedRole", role);

    // Redirect with query param (e.g., /register?role=Doctor)
    router.push(`/services/selling/register/${encodeURIComponent(role)}`);
  };

  return (
    <div className="min-h-screen  py-10 px-4 ">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Register as a</h1>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {roles.map((role) => (
            <div
              key={role}
              className="bg-white p-6 rounded-xl shadow hover:shadow-lg cursor-pointer transition duration-300 text-center"
              onClick={() => handleSelectRole(role)}
            >
              <h2 className="text-xl font-semibold">
                {role.charAt(0).toUpperCase() + role.slice(1)}
              </h2>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
