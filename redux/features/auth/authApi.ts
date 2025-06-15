// import { apiSlice } from "../api/apiSlice";
// import { userLoggedIn, userLoggedOut, userRegistration } from "./authSlice";

// type RegistrationResponse = {
//   message: string;
//   activationToken: string;
// };

// type RegistrationData = {};

// export const authApi = apiSlice.injectEndpoints({
//   endpoints: (builder) => ({
//     //endpoints here
//     register: builder.mutation<RegistrationResponse, RegistrationData>({
//       query: (data) => ({
//         url: "registration",
//         method: "POST",
//         body: data,
//         credentials: "include" as const,
//       }),
//       async onQueryStarted(arg, { queryFulfilled, dispatch }) {
//         try {
//           const result = await queryFulfilled;
//           dispatch(
//             userRegistration({
//               token: result.data.activationToken,
//             })
//           );
//         } catch (error: any) {
//           console.log(error);
//         }
//       },
//     }),
//     activation: builder.mutation({
//       query: ({ activation_token, activation_code }) => ({
//         url: "activate-user",
//         method: "POST",
//         body: {
//           activation_token,
//           activation_code,
//         },
//       }),
//     }),

//     login: builder.mutation({
//       query: ({ email, password }) => ({
//         url: "login",
//         method: "POST",
//         body: {
//           email,
//           password,
//         },
//         credentials: "include" as const,
//       }),

//       async onQueryStarted(arg, { queryFulfilled, dispatch }) {
//         try {
//           const result = await queryFulfilled;
//           dispatch(
//             userLoggedIn({
//               access_Token: result.data.access_Token,
//               user: result.data.user,
//             })
//           );
//         } catch (error: any) {
//           console.log(error);
//         }
//       },
//     }),

//     socialAuth: builder.mutation({
//       query: ({ email, name, avatar }) => ({
//         url: "socialauth",
//         method: "POST",
//         body: {
//           email,
//           name,
//           avatar,
//         },
//         credentials: "include" as const,
//       }),

//       async onQueryStarted(arg, { queryFulfilled, dispatch }) {
//         try {
//           const result = await queryFulfilled;
//           dispatch(
//             userLoggedIn({
//               access_Token: result.data.access_Token,
//               user: result.data.user,
//             })
//           );
//         } catch (error: any) {
//           console.log(error);
//         }
//       },
//     }),

//     logout: builder.mutation<void, void>({
//       query: () => ({
//         url: "logout", // your logout API endpoint
//         method: "GET",
//         credentials: "include" as const,
//       }),
//       async onQueryStarted(arg, { queryFulfilled, dispatch }) {
//         try {
//           await queryFulfilled;
//           dispatch(userLoggedOut());
//         } catch (error: any) {
//           console.log("Logout failed:", error);
//         }
//       },
//     }),
//   }),
// });

// export const {
//   useRegisterMutation,
//   useActivationMutation,
//   useLoginMutation,
//   useSocialAuthMutation,
//   useLogoutMutation,
// } = authApi;

















// features/auth/authApi.ts

import { apiSlice } from "../api/apiSlice";
import { userLoggedIn, userRegistration, userLoggedOut } from "./authSlice";
import type { RootState } from "../../store";
type RegistrationResponse = {
  message: string;
  activationToken: string;
};

type RegistrationData = {
  email: string;
  password: string;
  name: string;
  role:string;
};

// Define the shape of the OTP‐send/verify responses
type SendOtpResponse = { message: string };
type SendOtpData = { name: string; phone: string };

type VerifyOtpResponse = {
  message: string;
  user: { _id: string; name: string; phone: string; role: string };
  access_Token: string;
};
type VerifyOtpData = { otp: string };


export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // ─────────────── Existing endpoints ───────────────
    register: builder.mutation<RegistrationResponse, RegistrationData>({
      query: (data) => ({
        url: "registration",
        method: "POST",
        body: data,
        credentials: "include" as const,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(
            userRegistration({
              token: result.data.activationToken,
            })
          );
        } catch (error: any) {
          console.log(error);
        }
      },
    }),

    activation: builder.mutation({
      query: ({ activation_token, activation_code }) => ({
        url: "activate-user",
        method: "POST",
        body: {
          activation_token,
          activation_code,
        },
      }),
    }),

    login: builder.mutation({
      query: ({ email, password }: { email: string; password: string }) => ({
        url: "login",
        method: "POST",
        body: {
          email,
          password,
        },
        credentials: "include" as const,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(
            userLoggedIn({
              access_Token: result.data.access_Token,
              user: result.data.user,
            })
          );
        } catch (error: any) {
          console.log(error);
        }
      },
    }),

    socialAuth: builder.mutation({
      query: ({ email, name, avatar }: { email: string; name: string; avatar: string }) => ({
        url: "socialauth",
        method: "POST",
        body: {
          email,
          name,
          avatar,
        },
        credentials: "include" as const,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(
            userLoggedIn({
              access_Token: result.data.access_Token,
              user: result.data.user,
            })
          );
        } catch (error: any) {
          console.log(error);
        }
      },
    }),

    logout: builder.mutation<void, void>({
      query: () => ({
        url: "logout",
        method: "GET",
        // credentials: "include" as const,
      }),
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          dispatch(userLoggedOut());
        } catch (error: any) {
          console.log("Logout failed:", error);
        }
      },
    }),









    // ─────────────── New OTP endpoints ───────────────











    /**
     * 1) sendOtp:
     *    - Takes { name, phone }
     *    - Calls POST /auth/send-otp
     *    - Returns a simple message
     *    - On success, we set `auth.phone` in Redux state so that
     *      verifyOtp can use it.
     */
    sendOtp: builder.mutation<SendOtpResponse, SendOtpData>({
      query: (data) => ({
        url: "auth/send-otp", // your backend route
        method: "POST",
        body: data,            // { name, phone }
        credentials: "include" as const,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          // Store phone in Redux so verifyOtp can read it
          dispatch(
            userRegistration({ token: "", user: "", phone: arg.phone })
          );
          // Note: we’re reusing userRegistration action to stash `phone`.
          // You could create a dedicated action like setOtpPhone({ phone })
          // in your authSlice if you prefer, but this works.
        } catch (error: any) {
          console.log("sendOtp failed:", error);
        }
      },
    }),

    /**
     * 2) verifyOtp:
     *    - Takes { otp }
     *    - Reads `phone` from Redux (auth state)
     *    - Calls POST /auth/verify-otp
     *    - On success, dispatches userLoggedIn({ user, access_Token })
     */
    verifyOtp: builder.mutation<VerifyOtpResponse, VerifyOtpData>({
      query: (data) => {
        // We can’t read Redux state directly here; use `getState` inside onQueryStarted
        return {
          url: "auth/verify-otp",
          method: "POST",
          body: { otp: data.otp },
          // We’ll set headers dynamically in `onQueryStarted`
          headers: {},
          credentials: "include" as const,
        };
      },
      async onQueryStarted(arg, { dispatch, queryFulfilled, getState }) {
        try {
          // Grab `phone` from Redux state
          const state = getState() as RootState;
          const phone = state.auth.phone;
          if (!phone) throw new Error("Phone is missing");

          // Re‐invoke the baseQuery with the same OTP but now including the header
          const result = await dispatch(
            authApi.util.updateQueryData(
              "verifyOtp",
              arg, // same OTP object
              () => {
                /* no-op */
              }
            ) as any
          );

          // Actually call the underlying fetch with header:
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_URI}/auth/verify-otp`,
            {
              method: "POST",
              credentials: "include",
              headers: {
                "Content-Type": "application/json",
                "x-phone": phone, // <-- Send phone here
              },
              body: JSON.stringify({ otp: arg.otp }),
            }
          );
          const data: VerifyOtpResponse = await response.json();
          if (!response.ok) throw data;

          // On success, dispatch userLoggedIn
          dispatch(
            userLoggedIn({
              access_Token: data.access_Token,
              user: data.user,
            })
          );
        } catch (err: any) {
          console.error("verifyOtp failed:", err);
        }
      },
    }),
 
  }),
});

export const {
  useRegisterMutation,
  useActivationMutation,
  useLoginMutation,
  useSocialAuthMutation,
  useLogoutMutation,
  // New hooks for OTP flows:
  useSendOtpMutation,
  useVerifyOtpMutation,
} = authApi;
