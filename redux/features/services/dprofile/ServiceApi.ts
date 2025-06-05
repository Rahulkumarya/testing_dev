// import { apiSlice } from "../../api/apiSlice";

// export const profileApi = apiSlice.injectEndpoints({
//   endpoints: (builder) => ({
//     // ✅ CREATE a doctor service
//     createDoctorService: builder.mutation({
//       query: (formData) => ({
//         url: "create-service",
//         method: "POST",
//         body: formData,
//         credentials: "include" as const, //if problem then remove credentials
//       }),
//     }),

//     // ✅ GET all doctor services
//     getAllDoctorServices: builder.query({
//       // Accept a single object argument with named params
//       query: ({ page = 1, search = "", sortBy = "", order = "asc" }) => {
//         const params = new URLSearchParams({
//           page: page.toString(),
//           search,
//           sortBy,
//           order,
          
        
//         });

//         return {
//           url: `/allDoctorService/page?${params.toString()}`,
//           method: "GET",
//         };
//       },
//     }),


//     toggleDoctorServiceField: builder.mutation<
//     { success: boolean; message: string; service: any }, // response type
//     { id: string; field: 'isAvailable' | 'lead'; value: boolean } // argument type
//   >({
//     query: ({ id, field, value }) => ({
//       url: `/services/${id}/toggle`,
//       method: 'PATCH',
//       body: { field, value },
//     }),
//     // // Optionally update cache after mutation success
//     // async onQueryStarted({ id }, { dispatch, queryFulfilled }) {
//     //   try {
//     //     const { data } = await queryFulfilled;
//     //     // Invalidate or refetch queries to update UI
//     //     dispatch(serviceApi.util.invalidateTags([{ type: 'DoctorService', id }]));
//     //   } catch {
//     //     // Handle error
//     //   }
//     // },
  
// }),

//     // ✅ GET single doctor service by ID
//     getDoctorServiceById: builder.query({
//       query: (id: string) => ({
//         url: `/service/${id}`,
//         method: "GET",
//         credentials: "include" as const,
//       }),
//     }),

//     // ✅ UPDATE doctor service by ID
//     updateDoctorService: builder.mutation({
//       query: ({ id, formData }) => ({
//         url: `update/${id}`,
//         method: "PUT",
//         body: formData,
//         credentials: "include" as const,
//       }),
//     }),

//     // ✅ DELETE doctor service by ID
//     deleteDoctorService: builder.mutation({
//       query: (id: string) => ({
//         url: `delete/${id}`,
//         method: "DELETE",
//         credentials: "include" as const,
//       }),
//     }),

//     // ✅ ADMIN stats
//     getDoctorServiceStats: builder.query({
//       query: () => ({
//         url: "/admin/stats",
//         method: "GET",
//         credentials: "include" as const,
//       }),
//     }),
//   }),
// });

// export const {
//   useCreateDoctorServiceMutation,
//   useGetAllDoctorServicesQuery,
//   useGetDoctorServiceByIdQuery,
//   useUpdateDoctorServiceMutation,
//   useDeleteDoctorServiceMutation,
//   useGetDoctorServiceStatsQuery,
//   useToggleDoctorServiceFieldMutation
// } = profileApi;














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
      invalidatesTags: ["DoctorServices"],
    }),

    // ✅ GET all doctor services
    getAllDoctorServices: builder.query({
      query: ({ page = 1, search = "", sortBy = "", order = "asc" }) => {
        const params = new URLSearchParams({
          page: page.toString(),
          search,
          sortBy,
          order,
        });

        return {
          url: `/allDoctorService/page?${params.toString()}`,
          method: "GET",
          credentials: "include" as const,
        };
      },
      providesTags: ["DoctorServices"],
    }),

    // ✅ GET single doctor service by ID — Must be above `toggleDoctorServiceField`!
    getDoctorServiceById: builder.query({
      query: (id: string) => ({
        url: `/service/${id}`,
        method: "GET",
        credentials: "include" as const,
      }),
      providesTags: (result, error, id) => [{ type: "DoctorService", id }],
    }),

    // ✅ TOGGLE service field mutation with optimistic update
    toggleDoctorServiceField: builder.mutation({
      query: ({ id, field, value }) => ({
        url: `/services/${id}/toggle`,
        method: "PATCH",
        body: { field, value },
        credentials: "include" as const,
      }),

      // Optimistic update to service field
      async onQueryStarted({ id, field, value }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          profileApi.util.updateQueryData(
            "getDoctorServiceById",
            id,
            (draft) => {
              if (draft?.service) {
                draft.service[field] = value;
              }
            }
          )
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo(); // Revert if API call fails
        }
      },

      // Optional: Refresh list if needed
      invalidatesTags: ["DoctorServices"],
    }),

    // ✅ UPDATE doctor service
    updateDoctorService: builder.mutation({
      query: ({ id, formData }) => ({
        url: `update/${id}`,
        method: "PUT",
        body: formData,
        credentials: "include" as const,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "DoctorService", id },
        "DoctorServices",
      ],
    }),

    // ✅ DELETE doctor service
    deleteDoctorService: builder.mutation({
      query: (id: string) => ({
        url: `delete/${id}`,
        method: "DELETE",
        credentials: "include" as const,
      }),
      invalidatesTags: (result, error, id) => [
        { type: "DoctorService", id },
        "DoctorServices",
      ],
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
  useToggleDoctorServiceFieldMutation,
} = profileApi;
