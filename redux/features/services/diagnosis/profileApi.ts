

import { apiSlice } from "../../api/apiSlice";



export const profileApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    
    createDiagnosis: builder.mutation({
      query: (formData) => ({
        url: "diagnosis/create-profile",
        method: "POST",
        body: formData,
        credentials: "include" as const,
        // formData:true,
      }),
    }),

    getDiagnosis: builder.query<any[], void>({
      query: () => "/Allgyms",
    }),

    // Fetch a single doctor by ID
    getDiagnosisById: builder.query<any, string>({
      query: (id) => `/single/${id}`,
    }),

    deleteDiagnosis: builder.mutation({
      query: (id) => ({
        url: `delete/${id}`,
        method: "DELETE",
        body: { id },
      }),
    }),
  }),
});

export const {useCreateDiagnosisMutation,useDeleteDiagnosisMutation} =profileApi