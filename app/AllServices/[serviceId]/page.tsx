"use client";

import { useParams, useRouter } from "next/navigation";
import {
  useGetDoctorServiceByIdQuery,
  useDeleteDoctorServiceMutation,
  useToggleDoctorServiceFieldMutation,
} from "./../../../redux/features/services/dprofile/ServiceApi";
import Image from "next/image";
import toast from "react-hot-toast";
import ToggleSwitch from "@/components/ui/ToggleSwitch"; // your custom switch

export default function ServiceDetailPage() {
  const { serviceId } = useParams();
  const id = serviceId as string;
  const router = useRouter();

  const { data, isLoading } = useGetDoctorServiceByIdQuery(id, {
    refetchOnMountOrArgChange: true,
  });

  console.log("Service data:", data);
  console.log("Service ID get :", id);

  const [deleteService] = useDeleteDoctorServiceMutation();
  const [toggleDoctorServiceField] = useToggleDoctorServiceFieldMutation();

  const handleDelete = async () => {
    try {
      await deleteService(id).unwrap();
      toast.success("Deleted successfully");
      router.push("/services/dashboard");
    } catch {
      toast.error("Failed to delete");
    }
  };

  const handleToggle = async (
    field: "isAvailable" | "lead",
    value: boolean
  ) => {
    try {
      const respon=await toggleDoctorServiceField({ id, field, value }).unwrap();
      console.log(`respon data is ${respon}`, respon);
      toast.success(
        `${field === "isAvailable" ? "Availability" : "Lead"} updated`
      );
    } catch {
      toast.error("Failed to update");
    }
  };

  if (isLoading) return <p className="text-center">Loading...</p>;

  const { image, serviceName, fee, description, isAvailable, lead } =
    data?.service || {};

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6 container">
      <Image
        src={image}
        alt={serviceName}
        width={800}
        height={300}
        className="w-full h-64 object-cover rounded-md"
      />
      <h1 className="text-3xl font-bold">{serviceName}</h1>
      <p className="text-xl text-green-600">₹{fee}</p>
      <p className="text-gray-700">{description}</p>

      {/* Toggle Controls */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border rounded-md p-4 shadow-sm">
          <div>
            <p className="font-medium">Availability</p>
            <p className="text-sm text-gray-500">
              Toggle to make the service available or unavailable.
            </p>
          </div>
          <ToggleSwitch
            id="isAvailable"
            checked={!!isAvailable}
            onChange={(value) => handleToggle("isAvailable", value)}
          />
        </div>

        <div className="flex items-center justify-between border rounded-md p-4 shadow-sm">
          <div>
            <p className="font-medium">Lead Generation</p>
            <p className="text-sm text-gray-500">
              Toggle to enable or disable lead generation.
            </p>
          </div>
          <ToggleSwitch
            id="lead"
            checked={!!lead}
            onChange={(value) => handleToggle("lead", value)}
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 mt-6">
        <button
          onClick={() => router.push(`/AllServices/edit/${id}`)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
