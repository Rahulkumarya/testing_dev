"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useCreateRadiologyServiceMutation } from "../../../../../redux/features/services/radiology/serviceApi";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { store } from "@/redux/store";
import Select from "react-select";

// Reusable Form Field Component
export const FormField = ({ label, name, type = "text" }: any) => (
  <div className="flex flex-col gap-1">
    <label className="text-sm font-semibold text-gray-700">{label}</label>
    <Field
      name={name}
      type={type}
      className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
    />
    <ErrorMessage
      name={name}
      component="div"
      className="text-red-500 text-sm"
    />
  </div>
);

const mode = [
  { value: "online", label: "Online" },
  { value: "inhome", label: "Inhome" },
];

const reports = [
  { value: "center", label: "To be Collected from Center" },
  { value: "Sendwhatsapp", label: "Will be Sent by WhatsApp" },
  { value: "courier", label: "Can be Delivered at Home by Courier" },
  { value: "person", label: "Can be Delivered at Home by Person" },
];

const categories = [
  { value: "X-Ray", label: "X-Ray" },
  { value: "MRI", label: "MRI" },
  { value: "CT-Scan", label: "CT-Scan" },
];

const RadiologyServiceForm = () => {
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [createRadiologyService, { isLoading, isSuccess }] =
    useCreateRadiologyServiceMutation();
  const user = useSelector((state: store) => state.auth.user);
  const router = useRouter();
  const [selectedReports, setSelectedReports] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const [geo, setGeo] = useState({
    lat: "",
    lon: "",
    city: "",
    state: "",
    pincode: "",
    address: "",
    landmark: "",
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const { latitude, longitude } = pos.coords;
      const response = await fetch(
        `https://geocode.maps.co/reverse?lat=${latitude}&lon=${longitude}`
      );
      const data = await response.json();
      setGeo({
        lat: latitude.toString(),
        lon: longitude.toString(),
        city: data.address.city || "",
        state: data.address.state || "",
        pincode: data.address.postcode || "",
        address: data.display_name || "",
        landmark: data.address.suburb || "",
      });
    });
  }, []);

  useEffect(() => {
    if (isSuccess) router.push("/services");
  }, [isSuccess, router]);

  const initialValues = {
    userId: user?._id,
    category: "",
    mode: [],
    serviceName: "",
    description: "",
    fee: "",
    estimatedPrice: "",
    reports: [],
    courierfee: "",
    persornfee: "",
    address: "",
    location: {
      coordinates: [geo.lon, geo.lat],
      city: geo.city,
      state: geo.state,
      pincode: geo.pincode,
      address: geo.address,
      landmark: geo.landmark,
    },
    avatar: null,
  };
  const validationSchema = Yup.object().shape({
    category: Yup.string().required("Required"),
    mode: Yup.array().of(Yup.string().required("Required")),
    serviceName: Yup.string().required("Required"),
    description: Yup.string().required("Required"),
    fee: Yup.number().required("Required"),
    estimatedPrice: Yup.string(),
    reports: Yup.array().of(Yup.string().required("Reports")),
    courierfee: Yup.string().when("reports", {
      is: (val: any) => Array.isArray(val) && val.includes("courier"),
      then: Yup.string().required("Courier fee required"),
    }),
    persornfee: Yup.string().when("reports", {
      is: (val: any) => Array.isArray(val) && val.includes("person"),
      then: Yup.string().required("Person fee required"),
    }),
    location: Yup.object().shape({
      coordinates: Yup.array().of(Yup.string()).length(2),
      city: Yup.string(),
      state: Yup.string(),
      pincode: Yup.string(),
      address: Yup.string(),
      landmark: Yup.string(),
    }),
  });
  
  

  const handleAvatarChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: any
  ) => {
    const file = e.currentTarget.files?.[0];
    if (file) {
      setFieldValue("avatar", file);
      const reader = new FileReader();
      reader.onloadend = () => setAvatarPreview(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setFieldValue("avatar", null);
    }
  };

  const handleSubmit = async (values: any) => {
    const formData = new FormData();
    if (values.avatar) formData.append("avatar", values.avatar);

    formData.append("category",values.category);
    formData.append("serviceName",values.serviceName);
    formData.append("description",values.description);
    formData.append("fee",values.fee);
    formData.append("estimatedPrice",values.estimatedPrice);
    


    values.mode.forEach((mod: string, i: number) =>
      formData.append(`mode[${i}]`, mod)
    );
    values.reports.forEach((rep: string, i: number) =>
      formData.append(`reports[${i}]`, rep)
    );

    if (values.courierfee) formData.append("courierfee", values.courierfee);
    if (values.persornfee) formData.append("persornfee", values.persornfee);

    formData.append("location", JSON.stringify(values.location));

    const exclude = [
      "avatar",
      "mode",
      "reports",
      "courierfee",
      "persornfee",
      "location",
    ];

    Object.keys(values).forEach((key) => {
      if (!exclude.includes(key)) formData.append(key, values[key]);
    });

    try {
      console.log(`formdata is `,formData);
      const res = await createRadiologyService(formData).unwrap();
      toast.success("Thanks for completing your profile!");
      console.log(`response is `,res);
    } catch (err: any) {
      console.error("Error:", err);
      toast.error(err?.data?.message || "Failed to submit profile.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Formik
        initialValues={initialValues}
        enableReinitialize
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, values }) => (
          <Form className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Category
              </label>
              <Select
                name="category"
                options={categories}
                className="basic-select"
                classNamePrefix="select"
                onChange={(selected: { value: string; label: string }) => {
                  setSelectedCategory(selected.value);
                  setFieldValue("category", selected.value);
                }}
                value={
                  categories.find((c) => c.value === values.category) || null
                }
              />
              <ErrorMessage
                name="category"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Mode (Multi Selection) */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Mode
              </label>
              <Select
                isMulti
                name="mode"
                options={mode}
                className="basic-multi-select"
                classNamePrefix="select"
                onChange={(selectedOptions) => {
                  const selected = selectedOptions.map((opt) => opt.value);
                  setFieldValue("mode", selected);
                }}
                value={mode.filter((opt) => values.mode.includes(opt.value))}
              />
              <ErrorMessage
                name="mode"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <FormField label="Service Name" name="serviceName" />
            <FormField label="Description" name="description" />
            <FormField label="Fee (in Rs)" name="fee" type="number" />
            <FormField label="Estimated Price" name="estimatedPrice" />

            {/* Reports (Multi Selection) */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Reports
              </label>
              <Select
                isMulti
                name="reports"
                options={reports}
                className="basic-multi-select"
                classNamePrefix="select"
                onChange={(selectedOptions) => {
                  const selected = selectedOptions.map((opt) => opt.value);
                  setSelectedReports(selected);
                  setFieldValue("reports", selected);
                }}
                value={reports.filter((opt) =>
                  values.reports.includes(opt.value)
                )}
              />
              <ErrorMessage
                name="reports"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {values.reports.includes("courier") && (
              <FormField label="Courier Fee (in Rs)" name="courierfee" />
            )}

            {values.reports.includes("person") && (
              <FormField
                label="Person Delivery Fee (in Rs)"
                name="persornfee"
              />
            )}

            <FormField label="Address (Optional)" name="address" />

            {/* Avatar Upload */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-700">
                Upload Image (Optional)
              </label>
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={(e) => handleAvatarChange(e, setFieldValue)}
              />
              {avatarPreview && (
                <img
                  src={avatarPreview}
                  alt="Preview"
                  className="w-32 h-32 object-cover mt-2 rounded-md border"
                />
              )}
            </div>

            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition duration-300"
            >
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RadiologyServiceForm;
