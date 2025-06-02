

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
    createDiagnosis: builder.mutation({
      query: (formData) => ({
        url: "diagnosis/create-profile",
        method: "POST",
        body: formData,
        credentials: "include" as const,
        // formData:true,
      }),
    }),

    getGyms: builder.query<any[], void>({
      query: () => "/Allgyms",
    }),

    // Fetch a single doctor by ID
    getGymById: builder.query<any, string>({
      query: (id) => `/single/${id}`,
    }),

    deleteDoctor: builder.mutation({
      query: (id) => ({
        url: `delete/${id}`,
        method: "DELETE",
        body: { id },
      }),
    }),
  }),
});

export const {useCreateDiagnosisMutation,useDeleteDoctorMutation,useCheckProfileQuery} =profileApi