"use client";

import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { useCreateClinicServiceMutation } from "../../../../../redux/features/services/clinic/serviceApi";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { store } from "@/redux/store";
// import styles from "../../../../styles/Service.styles/styles"; // CSS module exported as TS
import styles from "../../../../styles/Service.styles"
// Define static options
const CATEGORIES = [
  { value: "Consultancy", label: "Consultancy" },
  { value: "Procedure", label: "Procedure" },
  { value: "Ancillary", label: "Ancillary" },
];
const MODES = [
  { value: "Online", label: "Online" },
  { value: "Inhome", label: "Inhome" },
  { value: "Hybrid", label: "Hybrid" },
  { value: "e_clinic", label: "e-clinic" },
];


const ClinicServiceForm = () => {
  // Geolocation state
  const [geo, setGeo] = useState({
    lat: "",
    lon: "",
    city: "",
    state: "",
    pincode: "",
    address: "",
    landmark: "",
  });
  // Image upload state
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  const [createClinicService, { isLoading }] = useCreateClinicServiceMutation();
  const user = useSelector((state: store) => state.auth.user);
  const router = useRouter();
  const [action, setAction] = useState<"save" | "save_new">("save");

  // Fetch location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const { latitude, longitude } = pos.coords;
      const res = await fetch(
        `https://geocode.maps.co/reverse?lat=${latitude}&lon=${longitude}`
      );
      const data = await res.json();
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

  // Handle multiple image selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const selected = Array.from(e.target.files);
    const total = [...images, ...selected].slice(0, 5); // limit to max 5 images
    setImages(total);
    const totalPreviews = total.map((file) => URL.createObjectURL(file));
    setPreviews(totalPreviews);
  };

  const removeImage = (index: number) => {
    const imgs = [...images];
    imgs.splice(index, 1);
    setImages(imgs);
    const prev = imgs.map((file) => URL.createObjectURL(file));
    setPreviews(prev);
  };

  // Initial form values
  const initialValues = {
    userId: user?._id || "",
    category: "",
    modes: [] as string[],
    serviceName: "",
    description: "",
    offlinePrice: "",
    onlinePrice: "",
    estimatedPrice: "",
    homeServicePrice: "",
    hybridServicePrice: "",
    e_clinicServicePrice: "",
  
    address: geo.address,
    location: {
      coordinates: [geo.lon, geo.lat],
      city: geo.city,
      state: geo.state,
      pincode: geo.pincode,
      landmark: geo.landmark,
    },
  };

  // Validation schema
  const validationSchema = Yup.object({
    category: Yup.string().required("Select a category"),
    modes: Yup.array().min(1, "Select at least one mode"),
    serviceName: Yup.string().required("Service name required"),
    description: Yup.string().required("Description required"),
    estimatedPrice: Yup.string(),
    homeServicePrice: Yup.number().when("modes", {
      is: (m: string[]) => m.includes("Inhome"),
      then: (s) => s.required().min(1),
    }),
    hybridServicePrice: Yup.number().when("modes", {
      is: (m: string[]) => m.includes("Hybrid"),
      then: (s) => s.required().min(1),
    }),
    e_clinicServicePrice: Yup.number().when("modes", {
      is: (m: string[]) => m.includes("e-clinic"),
      then: (s) => s.required().min(1),
    }),
    onlinePrice: Yup.number().when("modes", {
      is: (m: string[]) => m.includes("Online"),
      then: (s) => s.required().min(0),
    }),
    offlinePrice: Yup.number().when("modes", {
      is: (m: string[]) => m.includes("Online"),
      then: (s) => s.required().min(0),
    }),
  });

  // Submit logic
  const handleSubmit = async (
    values: typeof initialValues,
    formikHelpers: FormikHelpers<typeof initialValues>
  ) => {
    const formData = new FormData();
    formData.append("userId", values.userId);
    formData.append("category", values.category);
    values.modes.forEach((m, i) => formData.append(`modes[${i}]`, m));
    formData.append("serviceName", values.serviceName);
    formData.append("description", values.description);
    formData.append("onlinePrice", values.onlinePrice);
    formData.append("estimatedPrice", values.estimatedPrice);
    formData.append("offlinePrice", values.offlinePrice);
    formData.append("onlinePrice", values.onlinePrice);
    formData.append("homeServicePrice", values.homeServicePrice);
    formData.append("hybridServicePrice", values.hybridServicePrice);
    formData.append("e_clinicServicePrice", values.e_clinicServicePrice);

    formData.append("location", JSON.stringify(values.location));
    images.forEach((img, idx) => formData.append(`serviceImages`, img));

    try {
     const res=  await createClinicService(formData).unwrap();
     console.log(`response of clinic`,res);
      toast.success("Service created successfully");
      action === "save_new"
        ? formikHelpers.resetForm()
        : router.push("/services/dashboard");
    } catch (err: any) {
      toast.error(err?.data?.message || "Submission failed");
    }
  };

  return (
    <div className={styles.container}>
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
        Add Clinic Service
      </h2>
      <Formik
        initialValues={initialValues}
        enableReinitialize
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values,  submitForm }) => (
          <Form className={styles.formGrid}>
            {/* Category */}
            <div className={styles.fullWidth}>
              <label className={styles.label}>Category</label>
              <div className={styles.optionGroup}>
                {CATEGORIES.map((opt) => (
                  <label key={opt.value} className={styles.optionLabel}>
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
                className={styles.error}
              />
            </div>

            {/* Service Name */}
            <div className={styles.fieldWrapper}>
              <label className={styles.label}>Service Name</label>
              <Field name="serviceName" className={styles.input} />
              <ErrorMessage
                name="serviceName"
                component="div"
                className={styles.error}
              />
            </div>

            {/* Description */}
            <div className={styles.fullWidth}>
              <label className={styles.label}>Description</label>
              <Field
                as="textarea"
                name="description"
                className={styles.textarea}
                rows={6}
              />
              <ErrorMessage
                name="description"
                component="div"
                className={styles.error}
              />
            </div>

            {/* Modes */}
            <div className={styles.fieldWrapper}>
              <label className={styles.label}>Can Be Served</label>
              <div className={styles.optionGroup}>
                {MODES.map((opt) => (
                  <label key={opt.value} className={styles.optionLabel}>
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
                className={styles.error}
              />
            </div>

            {/* online Service Price  */}

            {values.modes.includes("Online") && (
              <div>
                <label className="block text-sm font-semibold text-gray-700">
                  Online Service Price
                </label>
                <Field
                  name="onlinePrice"
                  type="number"
                  className="w-full border px-3 py-2 rounded focus:ring focus:ring-blue-300"
                />
                <ErrorMessage
                  name="onlinePrice"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
            )}

            {values.modes.includes("Inhome") && (
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

            {/* Hybrid Service Price if inhome selected */}
            {values.modes.includes("Hybrid") && (
              <div>
                <label className="block text-sm font-semibold text-gray-700">
                  Hybrid Service Price
                </label>
                <Field
                  name="hybridServicePrice"
                  type="number"
                  className="w-full border px-3 py-2 rounded focus:ring focus:ring-blue-300"
                />
                <ErrorMessage
                  name="hybridServicePrice"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
            )}

            {/* e-clinic Service Price if inhome selected */}
            {values.modes.includes("e_clinic") && (
              <div>
                <label className="block text-sm font-semibold text-gray-700">
                  e-clinic Service Price
                </label>
                <Field
                  name="e_clinicServicePrice"
                  type="number"
                  className="w-full border px-3 py-2 rounded focus:ring focus:ring-blue-300"
                />
                <ErrorMessage
                  name="e_clinicServicePrice"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
            )}
            {/* Conditional price fields... same pattern using styles.input and ErrorMessage */}

            {/* Image Upload Card */}
            <div className={styles.fullWidth}>
              <label className={styles.label}>Service Images (max 5)</label>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageChange}
                className="mt-1"
              />
              <div className="flex flex-wrap gap-4 mt-2">
                {previews.map((src, idx) => (
                  <div
                    key={idx}
                    className="relative w-24 h-24 border rounded overflow-hidden"
                  >
                    <img
                      src={src}
                      alt={`preview-${idx}`}
                      className="object-cover w-full h-full"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(idx)}
                      className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 text-xs"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Submit Buttons */}
            <div className={styles.buttonGroup}>
              <button
                type="button"
                onClick={() => {
                  setAction("save");
                  submitForm();
                }}
                disabled={isLoading}
                className={`${styles.button} ${styles.save}`}
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => {
                  setAction("save_new");
                  submitForm();
                }}
                disabled={isLoading}
                className={`${styles.button} ${styles.saveNew}`}
              >
                Save & New
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ClinicServiceForm;
