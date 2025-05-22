// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// export const apiSlice = createApi({
//   reducerPath: "api",
//   baseQuery: fetchBaseQuery({
//     baseUrl: process.env.NEXT_PUBLIC_SERVER_URI,
//     credentials: "include",
//   }),
//   tagTypes: ["DoctorProfile"], // for caching and invalidation
//   endpoints: (builder) => ({
//     // ✅ Create Doctor Profile
//     createDoctorProfile: builder.mutation({
//       query: (formData: FormData) => ({
//         url: "d-create-profile",
//         method: "POST",
//         body: formData,
//       }),
//       invalidatesTags: ["DoctorProfile"],
//     }),

//     // ✅ Update Doctor Profile
//     updateDoctorProfile: builder.mutation({
//       query: ({ id, formData }: { id: string; formData: FormData }) => ({
//         url: `/doctor/update/${id}`,
//         method: "PUT",
//         body: formData,
//       }),
//       invalidatesTags: ["DoctorProfile"],
//     }),

//     // ✅ Delete Doctor Profile
//     deleteDoctorProfile: builder.mutation({
//       query: (id: string) => ({
//         url: `/doctor/delete/${id}`,
//         method: "DELETE",
//       }),
//       invalidatesTags: ["DoctorProfile"],
//     }),

//     // ✅ Get Doctor Profile (Optional)
//     getDoctorProfile: builder.query({
//       query: (id: string) => `/doctor/profile/${id}`,
//       providesTags: ["DoctorProfile"],
//     }),
//   }),
// });


// export const {
//   useCreateDoctorProfileMutation,
//   useUpdateDoctorProfileMutation,
//   useDeleteDoctorProfileMutation,
//   useGetDoctorProfileQuery,
// } = apiSlice;