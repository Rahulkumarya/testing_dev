// // components/LoginForm.tsx

// import React from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { sendOtp } from "../../../../redux/features/auth/PauthSlice";
// import { RootState, AppDispatch } from "../../../../redux/store";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import VerifyForm from "./auth/Verify"
// import { resetAuthState } from "../../../../redux/features/auth/PauthSlice";

// // Validation schema for name + phone
// const LoginSchema = Yup.object().shape({
//   name: Yup.string().required("Name is required"),
//   phone: Yup.string()
//     .matches(
//       /^\+\d{10,14}$/,
//       "Phone must be in E.164 format (e.g. +1234567890)"
//     )
//     .required("Phone is required"),
// });

// const LoginForm: React.FC = () => {
//   const dispatch = useDispatch<AppDispatch>();
//   const { loading, error, otpSent } = useSelector(
//     (state: RootState) => state.auth
//   );

//   if (otpSent) {
//     // If OTP was sent successfully, render the VerifyForm instead
//     return <VerifyForm />;
//   }

//   return (
//     <div style={{ maxWidth: 400, margin: "0 auto", padding: "1rem" }}>
//       <h2>Login with Phone</h2>
//       <Formik
//         initialValues={{ name: "", phone: "" }}
//         validationSchema={LoginSchema}
//         onSubmit={async (values) => {
//           // Dispatch sendOtp thunk
//           dispatch(sendOtp(values));
//         }}
//       >
//         {({ isValid, dirty }) => (
//           <Form>
//             <div style={{ marginBottom: "1rem" }}>
//               <label htmlFor="name">Name</label>
//               <Field name="name" type="text" className="input-field" />
//               <ErrorMessage
//                 name="name"
//                 component="div"
//                 style={{ color: "red" }}
//               />
//             </div>

//             <div style={{ marginBottom: "1rem" }}>
//               <label htmlFor="phone">Phone (E.164)</label>
//               <Field name="phone" type="text" className="input-field" />
//               <ErrorMessage
//                 name="phone"
//                 component="div"
//                 style={{ color: "red" }}
//               />
//             </div>

//             {error && (
//               <div style={{ color: "red", marginBottom: "1rem" }}>{error}</div>
//             )}

//             <button
//               type="submit"
//               disabled={loading || !(isValid && dirty)}
//               className="btn"
//             >
//               {loading ? "Sending OTP..." : "Send OTP"}
//             </button>
//           </Form>
//         )}
//       </Formik>
//     </div>
//   );
// };

// export default LoginForm;



// components/SendOtpForm.tsx
"use client";

import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSendOtpMutation } from "../../../../redux/features/auth/authApi";

interface FormValues {
  name: string;
  phone: string;
}

const SendOtpForm: React.FC = () => {
  const [sendOtp, { isLoading, isError, error, isSuccess }] =
    useSendOtpMutation();

  const formik = useFormik<FormValues>({
    initialValues: { name: "", phone: "" },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      phone: Yup.string()
        .matches(/^\+\d{10,14}$/, "Use E.164 format (e.g. +1234567890)")
        .required("Phone is required"),
    }),
    onSubmit: (values) => {
      const res= sendOtp(values).unwrap();
      console.log(`data is res `,res)
    },
  });

  return (
    <div style={{ maxWidth: 400, margin: "200px auto", padding: 20 }}>
      <h2>Enter Name & Phone to receive OTP</h2>
      <form onSubmit={formik.handleSubmit}>
        <div style={{ marginBottom: 12 }}>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.name}
            style={{ display: "block", width: "100%", padding: 8 }}
          />
          {formik.touched.name && formik.errors.name ? (
            <div style={{ color: "red" }}>{formik.errors.name}</div>
          ) : null}
        </div>
        <div style={{ marginBottom: 12 }}>
          <label htmlFor="phone">Phone (E.164)</label>
          <input
            id="phone"
            name="phone"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.phone}
            style={{ display: "block", width: "100%", padding: 8 }}
          />
          {formik.touched.phone && formik.errors.phone ? (
            <div style={{ color: "red" }}>{formik.errors.phone}</div>
          ) : null}
        </div>

        <button
          type="submit"
          disabled={isLoading || !formik.isValid}
          style={{
            backgroundColor: "#0070f3",
            color: "#fff",
            padding: "8px 16px",
            border: "none",
            borderRadius: 4,
            cursor: isLoading ? "not-allowed" : "pointer",
          }}
        >
          {isLoading ? "Sending OTP..." : "Send OTP"}
        </button>

        {isError && (
          <div style={{ color: "red", marginTop: 12 }}>
            {(error as any)?.data?.message || "Failed to send OTP"}
          </div>
        )}
        {isSuccess && (
          <div style={{ color: "green", marginTop: 12 }}>
            OTP sent successfully! Please check your phone.
          </div>
        )}
      </form>
    </div>
  );
};

export default SendOtpForm;
