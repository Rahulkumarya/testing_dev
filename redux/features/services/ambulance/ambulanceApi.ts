import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface Ambulance {
  id: string;
  registrationNumber: string;
  experience: string;
  gstNumber: string;
  licenceNumber: string;
  location: {
    coordinates: [string, string];
    city: string;
    state: string;
    pincode: string;
    address: string;
    landmark: string;
  };
  accountDetails: {
    HolderName: string;
    Ifsc: string;
    accountNumber: string;
    bankName: string;
  };
  avatar?: string;
}

export const ambulanceApi = createApi({
  reducerPath: "ambulanceApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_URL }),
  tagTypes: ["Ambulance"],
  endpoints: (builder) => ({
    getAllAmbulance: builder.query<Ambulance[], void>({
      query: () => "ambulance",
      providesTags: ["Ambulance"],
    }),
    createAmbulance: builder.mutation<Ambulance, FormData>({
      query: (data) => ({
        url: "ambulance",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Ambulance"],
    }),
  }),
});

export const { useGetAllAmbulanceQuery, useCreateAmbulanceMutation } = ambulanceApi; 