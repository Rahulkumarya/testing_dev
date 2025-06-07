

import { apiSlice } from "../api/apiSlice";



export const profileApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    checkProfile: builder.query({
      query: ({ userId, role }) => ({
        url: `check-profile?userIds=${userId}&role=${role}`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    createPatient: builder.mutation({
      query: (formData) => ({
        url: "patient-create-profile",
        method: "POST",
        body: formData,
        credentials: "include" as const,
        // formData:true,
      }),
    }),

    // getPatients: builder.query<any[], void>({
    //   query: () => "/Allpatients",
    // }),

    // Fetch a single doctor by ID
    // getPatientsById: builder.query<any, string>({
    //   query: (id) => `/single/${id}`,
    // }),

    deleteDoctor: builder.mutation({
      query: (id) => ({
        url: `delete/${id}`,
        method: "DELETE",
        body: { id },
      }),
    }),
  }),
});

export const {useCreatePatientMutation,useCheckProfileQuery} =profileApi