import { apiSlice } from "../../api/apiSlice";

export const profileApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // ✅ CREATE a doctor service
    createDoctorService: builder.mutation({
      query: (formData) => ({
        url: "create-service",
        method: "POST",
        body: formData,
        credentials: "include" as const, //if problem then remove credentials
      }),
    }),

    // ✅ GET all doctor services
    getAllDoctorServices: builder.query({
      query: (page = 1) => ({
        url: `/allDoctorService/page?page=${page}`,
        method: "GET",
      }),
    }),

    // ✅ GET single doctor service by ID
    getDoctorServiceById: builder.query({
      query: (id: string) => ({
        url: `/service/${id}`,
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
