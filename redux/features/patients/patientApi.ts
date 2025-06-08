

import { apiSlice } from "../api/apiSlice";



export const profileApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createPatient: builder.mutation({
      query: (formData) => ({
        url: "patient-create-profile",
        method: "POST",
        body: formData,
        credentials: "include" as const,
        // formData:true,
      }),
    }),

    sosPatient: builder.mutation({
      query: (formData) => ({
        url: "trigger",
        method: "POST",
        body: formData,
        credentials: "include" as const,
      }),
    }),

    //all services fetching and show

    // Doctors: builder.query({
    //   query: ({ page = 1, search = "",}) => {
    //     const params = new URLSearchParams({
    //       page: page.toString(),
    //       search,
    //       sortBy,
    //       order,
    //     });

    //     return {
    //       url: `/doctorServices/page?${params.toString()}`,
    //       method: "GET",
    //       // credentials: "include" as const,
    //     };
    //   },

    // }),


    Doctors:builder.query<any[], void>({
      query:()=>"/doctorServices/page"
    }),

    DoctorById: builder.query<any, string>({
      query: (id) => `/doctorService/${id}`,
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

export const {useCreatePatientMutation,useSosPatientMutation,useDoctorByIdQuery,useDoctorsQuery} =profileApi