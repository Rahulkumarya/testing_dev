"use client";

import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useCreateRadiologyServiceMutation } from "../../../../../redux/features/services/radiology/serviceApi";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { RootState } from "@/redux/store";

// Define static options
const CATEGORIES = [
  { value: "X-Ray", label: "X-Ray" },
  { value: "MRI", label: "MRI" },
  { value: "CT-Scan", label: "CT-Scan" },
];
const MODES = [
  { value: "online", label: "Online" },
  { value: "inhome", label: "Inhome" },
];
const REPORTS = [
  { value: "center", label: "Collected from Center" },
  { value: "whatsapp", label: "Sent by WhatsApp" },
  { value: "courier", label: "Delivered by Courier" },
  { value: "person", label: "Delivered by Person" },
];

const RadiologyServiceForm = () => {
  // Local state for geolocation and preview
  const [geo, setGeo] = useState({
    lat: "",
    lon: "",
    city: "",
    state: "",
    pincode: "",
    address: "",
    landmark: "",
  });
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  // Redux mutation hook + loading state
  const [createRadiologyService, { isLoading }] =
    useCreateRadiologyServiceMutation();
    const user = useSelector((state: RootState) => state.auth.user);
  const router = useRouter();
  const [action, setAction] = useState<"save" | "save_new">("save");

  // Fetch user address via geolocation
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const { latitude, longitude } = pos.coords;
      const res = await fetch(
        `https://geocode.maps.co/reverse?lat=${latitude}&lon=${longitude}`
      );
      const data = await res.json();
      setGeo({
        lat: String(latitude),
        lon: String(longitude),
        city: data.address.city || "",
        state: data.address.state || "",
        pincode: data.address.postcode || "",
        address: data.display_name || "",
        landmark: data.address.suburb || "",
      });
    });
  }, []);

  // Initial form values
  const initialValues = {
    userId: user?._id || "",
    category: "",
    modes: [] as string[],
    reports: [] as string[],
    serviceName: "",
    description: "",
    fee: "",
    estimatedPrice: "",
    homeServicePrice: "",
    courierFee: "",
    personFee: "",
    address: geo.address,
    location: {
      coordinates: [geo.lon, geo.lat],
      city: geo.city,
      state: geo.state,
      pincode: geo.pincode,
      landmark: geo.landmark,
    },
    avatar: null as File | null,
  };

  // Validation schema
  const validationSchema = Yup.object({
    category: Yup.string().required("Select a category"),
    modes: Yup.array().min(1, "Select at least one mode"),
    homeServicePrice: Yup.number().when("modes", {
      is: (m: string[]) => m.includes("inhome"),
      then: (s) => s.required("Required").min(1),
      otherwise: (s) => s.notRequired(),
    }),
    reports: Yup.array().min(1, "Select at least one report type"),
    serviceName: Yup.string().required("Service name required"),
    description: Yup.string().required("Description required"),
    fee: Yup.number().required("Fee required").min(0),
    estimatedPrice: Yup.string(),
    courierFee: Yup.number().when("reports", {
      is: (r: string[]) => r.includes("courier"),
      then: (s) => s.required("Required").min(0),
      otherwise: (s) => s.notRequired(),
    }),
    personFee: Yup.number().when("reports", {
      is: (r: string[]) => r.includes("person"),
      then: (s) => s.required("Required").min(0),
      otherwise: (s) => s.notRequired(),
    }),
  });

  // Handle image upload preview
  const handleAvatarChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: any
  ) => {
    const file = e.target.files?.[0] || null;
    setFieldValue("avatar", file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setAvatarPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  // Form submit logic
  const handleSubmit = async (
    values: typeof initialValues,
    formikHelpers: FormikHelpers<typeof initialValues>
  ) => {
    const formData = new FormData();
    if (values.avatar) formData.append("avatar", values.avatar);
    values.modes.forEach((m, i) => formData.append(`modes[${i}]`, m));

    // Construct reports array of objects as per backend schema
    const reportsPayload = values.reports.map((r) => ({
      reportsname: r,
      courierFee: values.courierFee || 0,
      personFee: values.personFee || 0,
    }));
    formData.append("reports", JSON.stringify(reportsPayload));
    if (values.modes.includes("inhome"))
      formData.append("homeServicePrice", values.homeServicePrice);
    [
      "category",
      "serviceName",
      "description",
      "fee",
      "estimatedPrice",
      "address",
      "userId",
    ].forEach((key) => {
      formData.append(key, (values as any)[key]);
    });
    formData.append("location", JSON.stringify(values.location));
    formData.append("courierFee", values.courierFee || "0");
    formData.append("personFee", values.personFee || "0");

    try {
      await createRadiologyService(formData).unwrap();
      toast.success("Service added!");
      if (action === "save_new") {
        formikHelpers.resetForm();
      } else {
        router.push("/services/dashboard");
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
        Add Radiology Service
      </h2>
      <Formik
        initialValues={initialValues}
        enableReinitialize
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue, submitForm }) => (
          <Form className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Category: Radio Buttons */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Category
              </label>
              <div className="flex gap-4">
                {CATEGORIES.map((opt) => (
                  <label key={opt.value} className="flex items-center gap-2">
                    <Field
                      type="radio"
                      name="category"
                      value={opt.value}
                      className="form-radio text-blue-600"
                    />
                    <span>{opt.label}</span>
                  </label>
                ))}
              </div>
              <ErrorMessage
                name="category"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Service Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700">
                Service Name
              </label>
              <Field
                name="serviceName"
                className="w-full border px-3 py-2 rounded focus:ring focus:ring-blue-300"
              />
              <ErrorMessage
                name="serviceName"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Description: Increased height textarea */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700">
                Description
              </label>
              <Field
                as="textarea"
                name="description"
                rows={6}
                className="w-full border px-3 py-2 rounded focus:ring focus:ring-blue-300"
              />
              <ErrorMessage
                name="description"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Modes: Checkboxes */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Can Be Served
              </label>
              <div className="flex gap-4">
                {MODES.map((opt) => (
                  <label key={opt.value} className="flex items-center gap-2">
                    <Field
                      type="checkbox"
                      name="modes"
                      value={opt.value}
                      className="form-checkbox text-blue-600"
                    />
                    <span>{opt.label}</span>
                  </label>
                ))}
              </div>
              <ErrorMessage
                name="modes"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
            {/* Home Service Price if inhome selected */}
            {values.modes.includes("inhome") && (
              <div>
                <label className="block text-sm font-semibold text-gray-700">
                  In-Home Service Price
                </label>
                <Field
                  name="homeServicePrice"
                  type="number"
                  className="w-full border px-3 py-2 rounded focus:ring focus:ring-blue-300"
                />
                <ErrorMessage
                  name="homeServicePrice"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
            )}

            {/* Fee */}
            <div>
              <label className="block text-sm font-semibold text-gray-700">
                Fee (Rs)
              </label>
              <Field
                name="fee"
                type="number"
                className="w-full border px-3 py-2 rounded focus:ring focus:ring-blue-300"
              />
              <ErrorMessage
                name="fee"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Estimated Price */}
            <div>
              <label className="block text-sm font-semibold text-gray-700">
                Estimated Price
              </label>
              <Field
                name="estimatedPrice"
                className="w-full border px-3 py-2 rounded focus:ring focus:ring-blue-300"
              />
              <ErrorMessage
                name="estimatedPrice"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Reports: Checkboxes */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Reports
              </label>
              <div className="flex flex-wrap gap-4">
                {REPORTS.map((opt) => (
                  <label key={opt.value} className="flex items-center gap-2">
                    <Field
                      type="checkbox"
                      name="reports"
                      value={opt.value}
                      className="form-checkbox text-blue-600"
                    />
                    <span>{opt.label}</span>
                  </label>
                ))}
              </div>
              <ErrorMessage
                name="reports"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Conditional Fees for Reports */}
            {values.reports.includes("courier") && (
              <div>
                <label className="block text-sm font-semibold text-gray-700">
                  Courier Fee (Rs)
                </label>
                <Field
                  name="courierFee"
                  type="number"
                  className="w-full border px-3 py-2 rounded focus:ring focus:ring-blue-300"
                />
                <ErrorMessage
                  name="courierFee"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
            )}
            {values.reports.includes("person") && (
              <div>
                <label className="block text-sm font-semibold text-gray-700">
                  Person Fee (Rs)
                </label>
                <Field
                  name="personFee"
                  type="number"
                  className="w-full border px-3 py-2 rounded focus:ring focus:ring-blue-300"
                />
                <ErrorMessage
                  name="personFee"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
            )}

            {/* Address (Optional) */}
            <div className="md:col-span-2">
              <div className="flex items-center justify-between mb-2">
                {/* <h2 className="text-sm font-semibold text-gray-700">
                  Professional Location
                </h2> */}
                <button
                  type="button"
                  className="text-blue-600 underline text-sm cursor-pointer"
                  onClick={async () => {
                    if (navigator.geolocation) {
                      navigator.geolocation.getCurrentPosition(async (pos) => {
                        const { latitude, longitude } = pos.coords;
                        const res = await fetch(
                          `https://geocode.maps.co/reverse?lat=${latitude}&lon=${longitude}`
                        );
                        const data = await res.json();
                        const locData = {
                          coordinates: [
                            longitude.toString(),
                            latitude.toString(),
                          ],
                          city: data.address.city || "",
                          state: data.address.state || "",
                          pincode: data.address.postcode || "",
                          address: data.display_name || "",
                          landmark:
                            data.address.suburb ||
                            data.address.neighbourhood ||
                            "",
                        };
                        // Update Formik fields
                        setFieldValue("location", locData);
                        toast.success("Location fetched successfully!");
                      });
                    } else {
                      toast.error(
                        "Geolocation is not supported by this browser."
                      );
                    }
                  }}
                >
                  📍Share Location
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
           
              </div>
            </div>

            {/* <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700">
                Address (Optional)
              </label>
              <Field
                name="address"
                className="w-full border px-3 py-2 rounded focus:ring focus:ring-blue-300"
              />
              <ErrorMessage
                name="address"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div> */}

            {/* Image Upload (Preview) */}

            {/* Submit Buttons */}
            <div className="md:col-span-2 flex gap-4">
              <button
                type="button"
                onClick={() => {
                  setAction("save");
                  submitForm();
                }}
                disabled={isLoading}
                className="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
              >
                {isLoading && action === "save" ? "Saving..." : "Save"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setAction("save_new");
                  submitForm();
                }}
                disabled={isLoading}
                className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
              >
                {isLoading && action === "save_new"
                  ? "Saving..."
                  : "Save & New"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RadiologyServiceForm;
