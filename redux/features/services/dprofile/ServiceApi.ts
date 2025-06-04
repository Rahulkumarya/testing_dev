import { apiSlice } from "../../api/apiSlice";

export const profileApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // ✅ CREATE a doctor service
    createDoctorService: builder.mutation({
      query: (formData) => ({
        url: "create-service",
        method: "POST",
        body: formData,
        credentials: "include" as const,
      }),
    }),

    // ✅ GET all doctor services
    getAllDoctorServices: builder.query({
      query: (page = 1) => ({
        url: `/allDoctorService/page?page=${page}&limit=3`,
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


    // getAllDoctorServices: builder.query({
    //   query: () => ({
    //     url: `/allDoctorService/page`,
    //     method: "GET",
    //     credentials: "include" as const,
    //   }),
    // }),

    // ✅ GET single doctor service by ID
    getDoctorServiceById: builder.query({
      query: (id: string) => ({
        url: `/${id}`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),

    // ✅ UPDATE doctor service by ID
    updateDoctorService: builder.mutation({
      query: ({ id, formData }) => ({
        url: `update/${id}`,
        method: "PUT",
        body: formData,
        credentials: "include" as const,
      }),
    }),

    // ✅ DELETE doctor service by ID
    deleteDoctorService: builder.mutation({
      query: (id: string) => ({
        url: `delete/${id}`,
        method: "DELETE",
        credentials: "include" as const,
      }),
    }),

    // ✅ ADMIN stats
    getDoctorServiceStats: builder.query({
      query: () => ({
        url: "/admin/stats",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
  }),
});

export const {
  useCreateDoctorServiceMutation,
  useGetAllDoctorServicesQuery,
  useGetDoctorServiceByIdQuery,
  useUpdateDoctorServiceMutation,
  useDeleteDoctorServiceMutation,
  useGetDoctorServiceStatsQuery,
} = profileApi;
