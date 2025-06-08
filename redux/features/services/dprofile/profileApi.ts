// // redux/features/doctor/doctorApi.ts
// // require("dotenv").config()
// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import type { RootState } from "../../store"; // Adjust the path as needed to where your RootState is defined

// export const doctorApi = createApi({
//   reducerPath: "doctorApi",
//   baseQuery: fetchBaseQuery({
//     baseUrl: process.env.NEXT_PUBLIC_SERVER_URI,
//     prepareHeaders: (headers, { getState }) => {
//       const token = (getState() as RootState).auth.token;
//       if (token) {
//         headers.set("Authorization", `Bearer ${token}`);
//       }
//       return headers;
//     },
//   }),
//   tagTypes: ["Doctor"],
//   endpoints: (builder) => ({
//     // Fetch all doctors
//     getDoctors: builder.query<any[], void>({
//       query: () => "/Alldoctors",
//       providesTags: ["Doctor"],
//     }),

//     // Fetch a single doctor by ID
//     getDoctorById: builder.query<any, string>({
//       query: (id) => `/single/${id}`,
//       providesTags: (result, error, id) => [{ type: "Doctor", id }],
//     }),

//     createDoctor: builder.mutation({
//       query: (formData) => ({
//         url: "d-create-profile",
//         method: "POST",
//         body: formData,
//       }),
//       invalidatesTags: ["Doctor"],
//     }),
//     updateDoctor: builder.mutation({
//       query: (doctor) => ({
//         url: "",
//         method: "PUT",
//         body: doctor,
//       }),
//       invalidatesTags: ["Doctor"],
//     }),
//     deleteDoctor: builder.mutation({
//       query: (id) => ({
//         url: `delete/${id}`,
//         method: "DELETE",
//         body: { id },
//       }),
//       invalidatesTags: ["Doctor"],
//     }),
//   }),
// });

// export const {
//   useGetDoctorsQuery,
//   useGetDoctorByIdQuery,
//   useCreateDoctorMutation,
//   useUpdateDoctorMutation,
//   useDeleteDoctorMutation,
// } = doctorApi;





import { apiSlice } from "../../api/apiSlice";



export const profileApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    checkProfile: builder.query({
      query: ({ userId, role }) => ({
        url: `check-profile?userIds=${userId}&role=${role}`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    createDoctor: builder.mutation({
      query: (formData) => ({
        url: "d-create-profile",
        method: "POST",
        body: formData,
        credentials: "include" as const,
        // formData:true,
      }),
    }),

    getDoctors: builder.query<any[], void>({
      query: () => "/Alldoctors",
    }),

    // Fetch a single doctor by ID
    getDoctorById: builder.query<any, string>({
      query: (id) => `/single/${id}`,
    }),

    // deleteDoctor: builder.mutation({
    //   query: (id) => ({
    //     url: `delete/${id}`,
    //     method: "DELETE",
    //     body: { id },
    //     overrideExisting:true,
    //   }),
    // }),
  }),
});

export const {useCreateDoctorMutation,useGetDoctorByIdQuery,useGetDoctorsQuery,useCheckProfileQuery} =profileApi