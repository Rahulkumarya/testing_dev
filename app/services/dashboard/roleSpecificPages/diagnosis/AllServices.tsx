"use client";

import React, { useEffect, useState } from "react";
import {
  useGetAllDoctorServicesQuery,
  useDeleteDoctorServiceMutation,
} from "../../../../../redux/features/services/dprofile/ServiceApi";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, Eye } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import AddService from "./AddService";
import { ArrowLeft } from "lucide-react";
// Simple AddService component placeholder
const AddServices = ({ onCancel }: { onCancel: () => void }) => {
  // Here add your form logic for adding a new service
  return (
    <div>
      <Button
        onClick={onCancel}
        variant="outline"
        className="flex items-center gap-2"
      >
        <ArrowLeft className="w-4 h-4" />
      </Button>
      {/* Your add service form elements here */}
      <AddService
        onCancel={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
    </div>
  );
};

const ServicesPage = () => {
  const router = useRouter();

  // Pagination state
  const [page, setPage] = useState(1);

  // Show Add Service form or service list
  const [showAddService, setShowAddService] = useState(false);

  // Search and sort state
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  // Fetch services with page, search, and sort parameters
  // Adjust your API hook to accept these params if not already
  const { data, error, isLoading, isFetching, refetch } =
    useGetAllDoctorServicesQuery(
      {
        page,
        search: searchTerm,
        sortBy,
        order: sortOrder,
      }, // optional

      {
        refetchOnMountOrArgChange: true,
      }
    );

  const [deleteService] = useDeleteDoctorServiceMutation();

  // Handle delete with confirmation and refetch
  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this service?")) {
      try {
        await deleteService(id).unwrap();
        toast.success("Deleted Successfully");
        refetch(); // Refresh list
      } catch (error) {
        toast.error("Failed to delete");
      }
    }
  };

  // Handle "Add New Service" click to toggle UI
  const handleAddNewClick = () => {
    setShowAddService(true);
  };

  // Handle cancel from AddService component
  const handleCancelAddService = () => {
    setShowAddService(false);
    refetch();
  };

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setPage(1); // Reset page when searching
  };

  // Handle sort order change
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(e.target.value as "asc" | "desc");
    setPage(1); // Reset page when sorting
  };

  if (isLoading) return <p className="text-center">Loading services...</p>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Toggle showing AddService or service list */}
      {showAddService ? (
        <AddServices onCancel={handleCancelAddService} />
      ) : (
        <>
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">All Services</h1>
            <Button onClick={handleAddNewClick}>Add New Service</Button>
          </div>
          {/* serach and sort services */}
          <div className="flex gap-4 mb-6">
            <input
              type="text"
              placeholder="Search services..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="border rounded px-3 py-1"
            />

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border rounded px-3 py-1"
            >
              <option value="serviceName">Sort by Name</option>
              <option value="createdAt">Sort by Date Created</option>
              <option value="month">Sort by Month</option>{" "}
              {/* optional logic */}
              <option value="year">Sort by Year</option> {/* optional logic */}
            </select>

            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
              className="border rounded px-3 py-1"
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>

          {/* List of services */}
          <div className="grid gap-4">
            {data?.services?.length ? (
              data.services.map((service: any) => (
                <div
                  key={service._id}
                  className="border rounded-xl p-4 shadow-sm hover:shadow-md transition"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h2 className="text-xl font-semibold">
                        {service.serviceName}
                      </h2>
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
              ))
            ) : (
              <p>No services found.</p>
            )}
          </div>

          {/* Pagination Controls - simplified here */}
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
                    buttons.push(
                      1,
                      "...",
                      total - 3,
                      total - 2,
                      total - 1,
                      total
                    );
                  } else {
                    buttons.push(
                      1,
                      "...",
                      page - 1,
                      page,
                      page + 1,
                      "...",
                      total
                    );
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
        </>
      )}
    </div>
  );
};

export default ServicesPage;
