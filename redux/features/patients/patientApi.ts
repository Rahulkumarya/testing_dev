

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

    Doctors: builder.query<any[], void>({
      query: () => "/doctorServices/page",
    }),

    // 1. Define a query that takes an object with optional q, lat, lng
    fetchDoctors: builder.query<
      any[],
      { q?: string; lat?: number; lng?: number }
    >({
      // 2. Build the URL with query-string params
      query: ({ q, lat, lng }) => {
        const params = new URLSearchParams();
        if (q) params.append("q", q);
        if (lat != null && lng != null) {
          params.append("lat", lat.toString());
          params.append("lng", lng.toString());
        }
        return `/doctorService/p?${params.toString()}`;
      },
      // you can transformResponse here if you want to pluck out `data`
      transformResponse: (raw: { data: any[] }) => raw.data,
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

export const {useCreatePatientMutation,useSosPatientMutation,useDoctorByIdQuery,useDoctorsQuery,useFetchDoctorsQuery} =profileApi