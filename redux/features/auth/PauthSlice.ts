// // features/authSlice.ts

// import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
// import axios from "axios";

// interface User {
//   _id: string;
//   name: string;
//   phone: string;
//   role: string;
// }

// interface AuthState {
//   loading: boolean;
//   error: string | null;
//   otpSent: boolean; // true once sendOtp succeeds
//   phone: string | null; // store the phone used for OTP verification
//   user: User | null; // filled after verifyOtp
//   token: string | null; // JWT from verifyOtp
// }

// const initialState: AuthState = {
//   loading: false,
//   error: null,
//   otpSent: false,
//   phone: null,
//   user: null,
//   token: null,
// };

// // 1️⃣ Thunk to send OTP (Name + Phone)
// export const sendOtp = createAsyncThunk<
//   // Return type of payload (we just need to know success)
//   void,
//   // Thunk arg: { name, phone }
//   { name: string; phone: string },
//   { rejectValue: string }
// >("auth/sendOtp", async (payload, thunkAPI) => {
//   try {
//     const { name, phone } = payload;
//     await axios.post("/api/auth/send-otp", { name, phone });
//     return; // no specific data needed
//   } catch (err: any) {
//     return thunkAPI.rejectWithValue(
//       err.response?.data?.message || "Failed to send OTP"
//     );
//   }
// });

// // 2️⃣ Thunk to verify OTP (Phone + OTP)
// export const verifyOtp = createAsyncThunk<
//   // Return type: { user, token }
//   { user: User; token: string },
//   // Arg: { otp }
//   { otp: string },
//   // We need access to getState so we can read phone from state
//   { rejectValue: string; state: { auth: AuthState } }
// >("auth/verifyOtp", async (payload, thunkAPI) => {
//   try {
//     const { otp } = payload;
//     const state = thunkAPI.getState().auth;
//     const phone = state.phone;
//     if (!phone) {
//       return thunkAPI.rejectWithValue("Phone number missing");
//     }

//     const response = await axios.post("/auth/verify-otp", {
//       phone,
//       otp,
//     });
//     // Expecting response.data = { message, token, user }
//     const { token, user } = response.data;
//     return { user, token };
//   } catch (err: any) {
//     return thunkAPI.rejectWithValue(
//       err.response?.data?.message || "Failed to verify OTP"
//     );
//   }
// });

// const PauthSlice = createSlice({
//   name: "Pauth",
//   initialState,
//   reducers: {
//     // Optional: reset auth state (e.g., on logout or form switch)
//     resetAuthState(state) {
//       state.loading = false;
//       state.error = null;
//       state.otpSent = false;
//       state.phone = null;
//       state.user = null;
//       state.token = null;
//     },
//   },
//   extraReducers: (builder) => {
//     // ---- sendOtp ----
//     builder.addCase(sendOtp.pending, (state) => {
//       state.loading = true;
//       state.error = null;
//     });
//     builder.addCase(sendOtp.fulfilled, (state, action) => {
//       state.loading = false;
//       state.otpSent = true;
//       state.phone = action.meta.arg.phone; // store phone for next step
//     });
//     builder.addCase(sendOtp.rejected, (state, action) => {
//       state.loading = false;
//       state.error = action.payload || "Failed to send OTP";
//     });

//     // ---- verifyOtp ----
//     builder.addCase(verifyOtp.pending, (state) => {
//       state.loading = true;
//       state.error = null;
//     });
//     builder.addCase(
//       verifyOtp.fulfilled,
//       (state, action: PayloadAction<{ user: User; token: string }>) => {
//         state.loading = false;
//         state.user = action.payload.user;
//         state.token = action.payload.token;
//       }
//     );
//     builder.addCase(verifyOtp.rejected, (state, action) => {
//       state.loading = false;
//       state.error = action.payload || "Failed to verify OTP";
//     });
//   },
// });

// export const { resetAuthState } = PauthSlice.actions;
// export default PauthSlice.reducer;
