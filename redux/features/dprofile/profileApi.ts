// redux/features/doctor/doctorApi.ts
// require("dotenv").config()
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const doctorApi = createApi({
  reducerPath: "doctorApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_SERVER_URI }),
  tagTypes: ["Doctor"],
  endpoints: (builder) => ({
    // Fetch all doctors
    getDoctors: builder.query<any[], void>({
      query: () => "/Alldoctors",
      providesTags: ["Doctor"],
    }),

    // Fetch a single doctor by ID
    getDoctorById: builder.query<any, string>({
      query: (id) => `/single/${id}`,
      providesTags: (result, error, id) => [{ type: "Doctor", id }],
    }),

    createDoctor: builder.mutation({
      query: (formData) => ({
        url: "d-create-profile",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Doctor"],
    }),
    updateDoctor: builder.mutation({
      query: (doctor) => ({
        url: "",
        method: "PUT",
        body: doctor,
      }),
      invalidatesTags: ["Doctor"],
    }),
    deleteDoctor: builder.mutation({
      query: (id) => ({
        url: `delete/${id}`,
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: ["Doctor"],
    }),
  }),
});

export const {
  useGetDoctorsQuery,
  useGetDoctorByIdQuery,
  useCreateDoctorMutation,
  useUpdateDoctorMutation,
  useDeleteDoctorMutation,
} = doctorApi;

