

import { apiSlice } from "../../api/apiSlice";



export const profileApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    createResort: builder.mutation({
      query: (formData) => ({
        url: "resort/create-profile",
        method: "POST",
        body: formData,
        credentials: "include" as const,
        // formData:true,
      }),
    }),

    // getGyms: builder.query<any[], void>({
    //   query: () => "/Allgyms",
    // }),

    // // Fetch a single doctor by ID
    // getGymById: builder.query<any, string>({
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

export const {useCreateResortMutation} =profileApi