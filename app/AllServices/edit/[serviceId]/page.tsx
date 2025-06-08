// app/[userType]/services/edit/[serviceId]/page.tsx
// "use client";

// import { useParams, useRouter } from "next/navigation";
// import {
//   useGetDoctorServiceByIdQuery,
//   useUpdateDoctorServiceMutation,
// } from "../../../../redux/features/services/dprofile/ServiceApi";
// import { useEffect, useState } from "react";
// import toast from "react-hot-toast";

// export default function EditServicePage() {
//   const { serviceId, userType } = useParams();
//   const id=serviceId as string;
//   const router = useRouter();

//   const { data } = useGetDoctorServiceByIdQuery(id as string);
//   const [updateService] = useUpdateDoctorServiceMutation();

//   const [formData, setFormData] = useState({
//     name: "",
//     price: "",
//     description: "",
//   });

//   useEffect(() => {
//     if (data?.service) {
//       setFormData({
//         name: data.service.serviceName,
//         price: data.service.fee,
//         description: data.service.description,
//       });
//     }
//   }, [data]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//    const res= await updateService({ id, formData }).unwrap();
//    toast.success("Updated Successfully")
//     router.push(`/`);
//   };

//   return (
//     <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-6">
//       <h2 className="text-2xl font-bold mb-4">Edit Service</h2>

//       <input
//         type="text"
//         value={formData.name}
//         placeholder="Service Name"
//         onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//         className="w-full p-2 mb-3 border rounded"
//       />
//       <input
//         type="number"
//         value={formData.price}
//         placeholder="Price"
//         onChange={(e) => setFormData({ ...formData, price: e.target.value })}
//         className="w-full p-2 mb-3 border rounded"
//       />
//       <textarea
//         value={formData.description}
//         placeholder="Description"
//         onChange={(e) =>
//           setFormData({ ...formData, description: e.target.value })
//         }
//         className="w-full p-2 mb-3 border rounded"
//       />

//       <button
//         type="submit"
//         className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
//       >
//         Update
//       </button>
//     </form>
//   );
// }






"use client";

import { useParams, useRouter } from "next/navigation";
import {
  useGetDoctorServiceByIdQuery,
  useUpdateDoctorServiceMutation,
} from "@/redux/features/services/dprofile/ServiceApi";
import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";

const EditServicePage = () => {
  const { serviceId } = useParams();
  const id = serviceId as string;
  const router = useRouter();

  const { data, isLoading } = useGetDoctorServiceByIdQuery(id, {
    refetchOnMountOrArgChange: true,
  });
  const [updateService] = useUpdateDoctorServiceMutation();

  const [initialValues, setInitialValues] = useState({
    serviceName: "",
    fee: "",
    description: "",
  });

  useEffect(() => {
    if (data?.service) {
      setInitialValues({
        serviceName: data.service.serviceName || "",
        fee: data.service.fee || "",
        description: data.service.description || "",
      });
    }
  }, [data]);

  const validationSchema = Yup.object({
    serviceName: Yup.string().required("Service name is required"),
    fee: Yup.number().required("Price is required").positive(),
    description: Yup.string().required("Description is required"),
  });

  const handleSubmit = async (values: typeof initialValues) => {
    try {
      await updateService({ id, formData: values }).unwrap();
      toast.success("Service updated successfully!");
      router.push(`/services/dashboard`);
    } catch (error) {
      toast.error("Failed to update service");
      console.error(error);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Edit Service</h2>

      {!isLoading && (
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form className="space-y-4">
            <div>
              <Field
                name="serviceName"
                placeholder="Service Name"
                className="w-full p-2 border rounded"
              />
              <ErrorMessage
                name="serviceName"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div>
              <Field
                type="number"
                name="fee"
                placeholder="Price"
                className="w-full p-2 border rounded"
              />
              <ErrorMessage
                name="fee"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div>
              <Field
                as="textarea"
                name="description"
                placeholder="Description"
                className="w-full p-2 border rounded"
              />
              <ErrorMessage
                name="description"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Update
            </button>
          </Form>
        </Formik>
      )}
    </div>
  );
};

export default EditServicePage;
