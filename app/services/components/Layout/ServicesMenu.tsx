"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

const services = [
  { name: "Ambulance", path: "/dashboard/ambulance" },
  { name: "Pharmacy", path: "/dashboard/pharmacy" },
  { name: "Radiology", path: "/dashboard/radiology" },
  { name: "Doctor", path: "/dashboard/doctor" },
  { name: "Gym", path: "/dashboard/gym" },
];

export default function ServicesMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center font-medium text-gray-700 hover:text-blue-600"
      >
        Services <ChevronDown className="ml-1 w-4 h-4" />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 bg-white border rounded-md shadow-lg w-48 z-50">
          {services.map((s) => (
            <Link
              key={s.name}
              href={s.path}
              className="block px-4 py-2 text-sm hover:bg-blue-50 text-gray-700"
            >
              {s.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
