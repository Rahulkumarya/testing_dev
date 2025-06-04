// 1. PAGES DIRECTORY STRUCTURE (Next.js example)
// /app/services/page.tsx -> For listing all services
// /app/services/[id]/page.tsx -> For dynamic route to show single service details

// 2. GETALL SERVICES PAGE WITH PAGINATION, EDIT, DELETE & VIEW
// /app/services/page.tsx

"use client";

import React, { useEffect, useState } from "react";
import {
  useGetAllDoctorServicesQuery,
  useDeleteDoctorServiceMutation,
} from "../../../../../redux/features/services/dprofile/ServiceApi";
import Link from "next/link";
import { Button } from "@/components/ui/button";
// import { styles } from "@/app/styles/Style";
import { Pencil, Trash2, Eye } from "lucide-react";
import { useGetDoctorsQuery } from "@/redux/features/services/dprofile/profileApi";

const ServicesPage = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useGetAllDoctorServicesQuery(page);
  console.log("data page", data);
  console.log("servicesall page", data?.services);
  const [deleteService] = useDeleteDoctorServiceMutation();
 const {datas}=useGetDoctorsQuery();
 console.log(`data doctor is ${datas} `,datas)
  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this service?")) {
      await deleteService(id);
    }
  };
  useEffect(() => {
    console.log("Page number:", page);
  }, [page]);
  if (isLoading) return <p className="text-center">Loading services...</p>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">All Services</h1>
        <Link href="/services/create">
          <Button>Add New Service</Button>
        </Link>
      </div>

      <div className="grid gap-4">
        {data?.services?.map((service: any) => (
          <div
            key={service._id}
            className="border rounded-xl p-4 shadow-sm hover:shadow-md transition"
          >
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold">{service.name}</h2>
                <p className="text-gray-500">{service.description}</p>
              </div>
              <div className="flex gap-3">
                <Link href={`/services/${service._id}`}>
                  <Button variant="ghost" size="icon">
                    <Eye className="w-5 h-5" />
                  </Button>
                </Link>
                <Link href={`/services/edit/${service._id}`}>
                  <Button variant="ghost" size="icon">
                    <Pencil className="w-5 h-5" />
                  </Button>
                </Link>
                <Button
                  onClick={() => handleDelete(service._id)}
                  variant="ghost"
                  size="icon"
                >
                  <Trash2 className="w-5 h-5 text-red-500" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6 gap-4">
        <Button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
        >
          Previous
        </Button>
        <Button
          onClick={() => setPage((p) => p + 1)}
          disabled={page === data?.totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default ServicesPage;
