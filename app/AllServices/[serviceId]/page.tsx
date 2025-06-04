// app/services/[id]/page.tsx
"use client";

import { useParams, useRouter } from "next/navigation";
import {
  useGetDoctorServiceByIdQuery,
  useDeleteDoctorServiceMutation,
} from "./../../../redux/features/services/dprofile/ServiceApi";
import Image from "next/image";
import toast from "react-hot-toast";

export default function ServiceDetailPage() {
  const { serviceId } = useParams();
  const id = serviceId as string;
  const router = useRouter();

  const { data, isLoading, error, isFetching } = useGetDoctorServiceByIdQuery(
    id as string,
    {
      refetchOnMountOrArgChange: true, //for the updated service refetch
    }
  );
  console.log("Data:", data);
  console.log("Error:", error);
  console.log("Loading:", isLoading, "Fetching:", isFetching);

  const [deleteService] = useDeleteDoctorServiceMutation();

  const handleDelete = async () => {
   const res= await deleteService(id as string).unwrap();
    toast.success("Delete Successfully")
    router.push("/services/dashboard");
  };

  if (isLoading) return <p>Loading...</p>;

  const { image, serviceName, fee, description } = data?.service || {};

  return (
    <div className="max-w-3xl mx-auto p-6">
      <Image
        src={image}
        alt={name}
        width={15}
        height={64}
        className="w-full h-64 object-cover rounded-md"
      />
      <h1 className="text-3xl font-bold mt-4">{serviceName}</h1>
      <p className="text-xl text-green-600">₹{fee}</p>
      <p className="mt-4 text-gray-700">{description}</p>

      <div className="flex gap-4 mt-6">
        <button
          onClick={() => router.push(`/AllServices/edit/${id}`)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
