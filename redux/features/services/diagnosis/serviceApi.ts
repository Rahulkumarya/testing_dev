import { apiSlice } from "../../api/apiSlice";



export const profileApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
  
    createDiagnosisService: builder.mutation({
      query: (formData) => ({
        url: "create-service",
        method: "POST",
        body: formData,
        credentials: "include" as const,
        // formData:true,
      }),
    }),

    getAllDiagnosisServices: builder.query<any[], void>({
      query: () => ({
        url: "diagnosis/all-services",
        method: "GET",
        credentials: "include" as const,
      }),
    }),

    // getDoctors: builder.query<any[], void>({
    //   query: () => "/Alldoctors",
    // }),

    // // Fetch a single doctor by ID
    // getDoctorById: builder.query<any, string>({
    //   query: (id) => `/single/${id}`,
    // }),

    // deleteDoctor: builder.mutation({
    //   query: (id) => ({
    //     url: `delete/${id}`,
    //     method: "DELETE",
    //     body: { id },
    //   }),
    // }),
  }),
});

export const { useCreateDiagnosisServiceMutation, useGetAllDiagnosisServicesQuery } = profileApi