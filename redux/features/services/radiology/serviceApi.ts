import { apiSlice } from "../../api/apiSlice";



export const profileApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
  
    createRadiologyService: builder.mutation({
      query: (formData) => ({
        url: "radiology/create-service",
        method: "POST",
        body: formData,
        credentials: "include" as const,
        formData:true,
      }),
    }),

    getAllRadiologyServices: builder.query<any[], void>({
      query: () => ({
        url: "radiology/all-services",
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

export const { useCreateRadiologyServiceMutation, useGetAllRadiologyServicesQuery } = profileApi