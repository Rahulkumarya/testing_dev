import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
const validationSchema = Yup.object({
  gstNumber: Yup.string()
    .matches(
      /^([0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1})$/,
      "Invalid GST Number"
    )
    .required("GST Number is required"),
  licenseNumber: Yup.string().required("License Number is mandatory"),
  bankName: Yup.string().required("Bank Name is required"),
  ifscCode: Yup.string()
    .matches(/^[A-Z]{4}0[A-Z0-9]{6}$/, "Invalid IFSC Code")
    .required("IFSC Code is required"),
  accountNumber: Yup.string()
    .matches(/^\d{9,18}$/, "Invalid Account Number")
    .required("Account Number is required"),
});

const HospitalProfile = () => {

    const router=useRouter()
  const formik = useFormik({
    initialValues: {
      gstNumber: "",
      licenseNumber: "",
      bankName: "",
      ifscCode: "",
      accountNumber: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("Submitted Data:", values);
      alert("Form submitted successfully!");
      router.push("/")
    },
  });



  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Business Compliance Form
      </h2>
      <form onSubmit={formik.handleSubmit} className="space-y-5">
        {/* GST Number */}
        <div>
          <label className="block font-medium mb-1">GST Number</label>
          <input
            type="text"
            name="gstNumber"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.gstNumber}
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="e.g., 22AAAAA0000A1Z5"
          />
          {formik.touched.gstNumber && formik.errors.gstNumber && (
            <p className="text-red-500 text-sm mt-1">
              {formik.errors.gstNumber}
            </p>
          )}
        </div>

        {/* License Number */}
        <div>
          <label className="block font-medium mb-1">License Number</label>
          <input
            type="text"
            name="licenseNumber"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.licenseNumber}
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="Enter License Number"
          />
          {formik.touched.licenseNumber && formik.errors.licenseNumber && (
            <p className="text-red-500 text-sm mt-1">
              {formik.errors.licenseNumber}
            </p>
          )}
        </div>

        {/* Bank Name */}
        <div>
          <label className="block font-medium mb-1">Bank Name</label>
          <input
            type="text"
            name="bankName"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.bankName}
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="e.g., State Bank of India"
          />
          {formik.touched.bankName && formik.errors.bankName && (
            <p className="text-red-500 text-sm mt-1">
              {formik.errors.bankName}
            </p>
          )}
        </div>

        {/* IFSC Code */}
        <div>
          <label className="block font-medium mb-1">IFSC Code</label>
          <input
            type="text"
            name="ifscCode"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.ifscCode}
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="e.g., SBIN0000123"
          />
          {formik.touched.ifscCode && formik.errors.ifscCode && (
            <p className="text-red-500 text-sm mt-1">
              {formik.errors.ifscCode}
            </p>
          )}
        </div>

        {/* Account Number */}
        <div>
          <label className="block font-medium mb-1">Account Number</label>
          <input
            type="text"
            name="accountNumber"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.accountNumber}
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="Enter Account Number"
          />
          {formik.touched.accountNumber && formik.errors.accountNumber && (
            <p className="text-red-500 text-sm mt-1">
              {formik.errors.accountNumber}
            </p>
          )}
        </div>

        {/* Submit */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded transition"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default HospitalProfile;
