




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
