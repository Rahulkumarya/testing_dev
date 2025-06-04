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
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
const ServicesPage = () => {

  const router=useRouter();
  const [page, setPage] = useState(1);
  const { data, error, isLoading, isFetching, refetch } = useGetAllDoctorServicesQuery(
    page,
    {
      refetchOnMountOrArgChange: true,
    }
  );

  console.log("Data:", data);
  console.log("Error:", error);
  console.log("Loading:", isLoading, "Fetching:", isFetching);
  console.log("data page", data);
  console.log("servicesall page", data?.services);
  const [deleteService] = useDeleteDoctorServiceMutation();


  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this service?")) {
      const res = await deleteService(id as string, {
        refetchOnMountOrArgChange: true, //for the updated service refetch
      }).unwrap();
      toast.success("Delete Successfully");
      refetch();
      router.push("/services/dashboard");
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
        <Link href="/test">
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
                <h2 className="text-xl font-semibold">{service.serviceName}</h2>
                <p className="text-gray-500">{service.description}</p>
              </div>
              <div className="flex gap-3">
                <Link href={`/AllServices/${service._id}`}>
                  <Button variant="ghost" size="icon">
                    <Eye className="w-5 h-5" />
                  </Button>
                </Link>
                <Link href={`/AllServices/edit/${service._id}`}>
                  <Button variant="ghost" size="icon">
                    <Pencil className="w-5 h-5 cursor-pointer" />
                  </Button>
                </Link>
                <Button
                  onClick={() => handleDelete(service._id)}
                  variant="ghost"
                  size="icon"
                >
                  <Trash2 className="w-5 h-5 text-red-500 cursor-pointer" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ✅ Mobile Pagination - shows only key pages & current page */}
      <div className="flex justify-center mt-6 sm:hidden">
        <div className="flex items-center gap-1">
          <Button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            &lt;
          </Button>

          {(() => {
            const total = data?.totalPages || 1;
            const buttons: (number | "...")[] = [];

            buttons.push(1);
            if (page > 2 && page < total - 1) {
              buttons.push("...", page, "...");
            } else if (page === 3) {
              buttons.push(2, 3, "...");
            } else if (page === total - 2) {
              buttons.push("...", total - 2, total - 1);
            } else {
              if (total > 1) buttons.push("...", total);
            }

            if (!buttons.includes(total) && total !== 1) {
              buttons.push(total);
            }

            return buttons.map((p, i) =>
              p === "..." ? (
                <span
                  key={`mobile-ellipsis-${i}`}
                  className="px-1 text-gray-400"
                >
                  ...
                </span>
              ) : (
                <Button
                  key={`mobile-page-${p}`}
                  onClick={() => setPage(p as number)}
                  className={`px-3 py-1 ${
                    p === page ? "bg-green-600 text-white" : ""
                  }`}
                  variant={p === page ? "default" : "outline"}
                >
                  {p}
                </Button>
              )
            );
          })()}

          <Button
            onClick={() =>
              setPage((p) => Math.min(data?.totalPages || 1, p + 1))
            }
            disabled={page === data?.totalPages}
          >
            &gt;
          </Button>
        </div>
      </div>

      {/* ✅ Desktop Pagination */}
      <div className="justify-center mt-6 hidden sm:flex">
        <div className="flex items-center gap-1">
          <Button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            &lt;
          </Button>

          {(() => {
            const total = data?.totalPages || 1;
            const buttons: (number | "...")[] = [];

            if (total <= 7) {
              for (let i = 1; i <= total; i++) buttons.push(i);
            } else {
              if (page <= 3) {
                buttons.push(1, 2, 3, 4, "...", total);
              } else if (page >= total - 2) {
                buttons.push(1, "...", total - 3, total - 2, total - 1, total);
              } else {
                buttons.push(1, "...", page - 1, page, page + 1, "...", total);
              }
            }

            return buttons.map((p, i) =>
              p === "..." ? (
                <span
                  key={`desktop-ellipsis-${i}`}
                  className="px-2 text-gray-400"
                >
                  ...
                </span>
              ) : (
                <Button
                  key={`desktop-page-${p}`}
                  onClick={() => setPage(p as number)}
                  className={`px-3 py-1 ${
                    p === page ? "bg-green-600 text-white" : ""
                  }`}
                  variant={p === page ? "default" : "outline"}
                >
                  {p}
                </Button>
              )
            );
          })()}

          <Button
            onClick={() =>
              setPage((p) => Math.min(data?.totalPages || 1, p + 1))
            }
            disabled={page === data?.totalPages}
          >
            &gt;
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
