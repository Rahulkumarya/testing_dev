
//3rd
"use client";

import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";



import { useCreateResortServiceMutation } from "../../../../../redux/features/services/resort/serviceApi";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { store } from "@/redux/store";
import styles from "../../../../styles/Service.styles";

// Predefined image categories
const IMAGE_CATEGORIES = [
  "Room Entrance",
  "Bed",
  "Bathroom",
  "Toilet Seat",
  "Sitting Space",
  "Balcony",
];



const CATEGORIES = [
  { value: "Room", label: "Room" },
  { value: "Service", label: "Service" },
  { value: "Package", label: "Package" },
];
const ResortServiceForm = () => {
  const [geo, setGeo] = useState({
    lat: "",
    lon: "",
    city: "",
    state: "",
    pincode: "",
    address: "",
    landmark: "",
  });

  // Manage images per category + custom
  const [categoryImages, setCategoryImages] = useState<Record<string, File[]>>(
    IMAGE_CATEGORIES.reduce((acc, cat) => ({ ...acc, [cat]: [] }), {})
  );
  const [customImages, setCustomImages] = useState<File[]>([]);

  // Video uploads (1-3)
  const [videos, setVideos] = useState<File[]>([]);

  const [createResortService, { isLoading }] = useCreateResortServiceMutation();
  const user = useSelector((state: store) => state.auth.user);
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

  // Handle category image upload
  const handleCategoryImageChange = (
    category: string,
    files: FileList | null
  ) => {
    if (!files) return;
    const selected = Array.from(files).slice(0, 5);
    setCategoryImages((prev) => ({ ...prev, [category]: selected }));
  };

  // Handle custom images
  const handleCustomImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const selected = Array.from(e.target.files).slice(
      0,
      5 - customImages.length
    );
    setCustomImages((prev) => [...prev, ...selected]);
  };

  const removeCustomImage = (idx: number) => {
    setCustomImages((prev) => prev.filter((_, i) => i !== idx));
  };

  // Handle video uploads
  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const selected = Array.from(e.target.files).slice(0, 3);
    setVideos(selected);
  };

  const removeVideo = (idx: number) => {
    setVideos((prev) => prev.filter((_, i) => i !== idx));
  };

  // Form values
  const initialValues = {
    userId: user?._id || "",
    category: "",
    serviceName: "",
    description: "",
    price: "",
    priceDays: "",
    address: geo.address,
    location: {
      coordinates: [geo.lon, geo.lat],
      city: geo.city,
      state: geo.state,
      pincode: geo.pincode,
      landmark: geo.landmark,
    },
  };

  // Validation
  const validationSchema = Yup.object({
    category: Yup.string().required("Select a category"),
    serviceName: Yup.string().required("Required"),
    description: Yup.string().required("Required"),
    price: Yup.number().required("Required").min(0),
    priceDays: Yup.number().required("Enter days").min(1),
  });

  const handleSubmit = async (
    values: typeof initialValues,
    helpers: FormikHelpers<typeof initialValues>
  ) => {
    const formData = new FormData();
    formData.append("category", values.category);
    formData.append("userId", values.userId);
    formData.append("serviceName", values.serviceName);
    formData.append("description", values.description);
    formData.append("price", values.price);
    formData.append("priceDays", values.priceDays);
    formData.append("location", JSON.stringify(values.location));

    // append category images
    Object.entries(categoryImages).forEach(([cat, files]) => {
      files.forEach((file) => formData.append(`images[${cat}]`, file));
    });
    // append custom images
    customImages.forEach((file) => formData.append("customImages", file));
    // append videos
    videos.forEach((file) => formData.append("videos", file));

    try {
      await createResortService(formData).unwrap();
      toast.success("Service Created");
      action === "save_new"
        ? helpers.resetForm()
        : router.push("/services/dashboard");
    } catch (e: any) {
      toast.error(e?.data?.message || "Error");
    }
  };

  return (
    <div className={styles.container}>
      <h2 className="text-2xl font-bold mb-6 text-center">
        Add Resort Service
      </h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, submitForm, setFieldValue }) => (
          <Form className={styles.formGrid}>
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
            {/* Service Name & Description */}
            <div className={styles.fieldWrapper}>
              <label className={styles.label}>Service Name</label>
              <Field name="serviceName" className={styles.input} />
              <ErrorMessage
                name="serviceName"
                component="div"
                className={styles.error}
              />
            </div>
            <div className={styles.fullWidth}>
              <label className={styles.label}>Description</label>
              <Field
                as="textarea"
                name="description"
                className={styles.textarea}
                rows={4}
              />
              <ErrorMessage
                name="description"
                component="div"
                className={styles.error}
              />
            </div>

            {/* Price & Days */}
            <div>
              <label className={styles.label}>Price (₹)</label>
              <Field name="price" type="number" className={styles.input} />
              <ErrorMessage
                name="price"
                component="div"
                className={styles.error}
              />
            </div>
            <div>
              <label className={styles.label}>Valid For (Days)</label>
              <Field name="priceDays" type="number" className={styles.input} />
              <ErrorMessage
                name="priceDays"
                component="div"
                className={styles.error}
              />
            </div>

            {/* Image categories */}
            <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {IMAGE_CATEGORIES.map((cat) => (
                <div
                  key={cat}
                  className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-4 hover:border-blue-500 transition cursor-pointer"
                  onClick={() =>
                    document.getElementById(`cat-upload-${cat}`)?.click()
                  }
                >
                  <input
                    type="file"
                    id={`cat-upload-${cat}`}
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={(e) =>
                      handleCategoryImageChange(cat, e.target.files)
                    }
                  />
                  {categoryImages[cat]?.length ? (
                    <img
                      src={URL.createObjectURL(categoryImages[cat][0])}
                      alt={cat}
                      className="w-24 h-24 object-cover rounded mb-2"
                    />
                  ) : (
                    <div className="w-24 h-24 flex items-center justify-center bg-gray-100 rounded mb-2">
                      <span className="text-gray-500 text-sm text-center">
                        {cat}
                      </span>
                    </div>
                  )}
                  <span className="text-sm font-medium text-gray-700">
                    {cat}
                  </span>
                </div>
              ))}
            </div>

            {/* Custom images */}
            <div className={styles.fullWidth}>
              <label className={styles.label}>Custom Images</label>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleCustomImageChange}
                className="mt-1"
              />
              <div className="flex flex-wrap gap-3 mt-2">
                {customImages.map((file, idx) => (
                  <div
                    key={idx}
                    className="relative w-24 h-24 border rounded overflow-hidden"
                  >
                    <img
                      src={URL.createObjectURL(file)}
                      className="object-cover w-full h-full"
                    />
                    <button
                      type="button"
                      onClick={() => removeCustomImage(idx)}
                      className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 text-xs"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Video Uploads */}
            <div className={styles.fullWidth}>
              <label className={styles.label}>Videos (max 3)</label>
              <input
                type="file"
                multiple
                accept="video/*"
                onChange={handleVideoChange}
                className="mt-1"
              />
              <div className="flex flex-wrap gap-3 mt-2">
                {videos.map((file, idx) => (
                  <div
                    key={idx}
                    className="relative w-32 h-20 border rounded overflow-hidden flex items-center justify-center bg-black text-white text-xs"
                  >
                    <video
                      src={URL.createObjectURL(file)}
                      className="object-cover w-full h-full"
                    />
                    <button
                      type="button"
                      onClick={() => removeVideo(idx)}
                      className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 text-xs"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>

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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4"></div>
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
                Save & Next
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

export default ResortServiceForm;
