// import { createSlice } from "@reduxjs/toolkit";
// import { stat } from "fs";

// const initialState = {
//   token: "",
//   user: "",
// };

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     userRegistration: (state, action) => {
//       state.token = action.payload.token;
//     },
//     userLoggedIn: (state, action) => {
//       state.token = action.payload.accessToken;
//       state.user = action.payload.user;
//     },
//     userLoggedOut: (state) => {
//       state.token = "";
//       state.user = "";
//     },
//   },
// });

// export const { userRegistration, userLoggedIn, userLoggedOut } =
//   authSlice.actions;

// export default authSlice.reducer;




// features/auth/authSlice.ts

// import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// interface AuthState {
//   token: string;
//   user: any;
//   phone?: string; // add this so we can store phone for OTP
// }

// const initialState: AuthState = {
//   token: "",
//   user: "",
//   phone: undefined,
// };

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     // During registration or OTP‐send, we store "token" or "phone"
//     userRegistration: (
//       state,
//       action: PayloadAction<{ token?: string; user?: any; phone?: string }>
//     ) => {
//       if (action.payload.token) {
//         state.token = action.payload.token;
//       }
//       if (action.payload.user) {
//         state.user = action.payload.user;
//       }
//       if (action.payload.phone) {
//         state.phone = action.payload.phone;
//       }
//     },
//     userLoggedIn: (
//       state,
//       action: PayloadAction<{ access_Token: string; user: any }>
//     ) => {
//       state.token = action.payload.access_Token;
//       state.user = action.payload.user;
//       state.phone = undefined; // clear the phone since we’re fully logged in
//     },
//     userLoggedOut: (state) => {
//       state.token = "";
//       state.user = "";
//       state.phone = undefined;
//     },
//   },
// });

// export const { userRegistration, userLoggedIn, userLoggedOut } =
//   authSlice.actions;

// export default authSlice.reducer;
























// features/auth/authSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  token: string;
  user: any;
  phone?: string;
}

const initialState: AuthState = {
  token: "",
  user: "",
  phone: undefined,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userRegistration: (
      state,
      action: PayloadAction<{ token?: string; user?: any; phone?: string }>
    ) => {
      if (action.payload.token) {
        state.token = action.payload.token;
        // Also save token to localStorage
        localStorage.setItem("token", action.payload.token);
      }
      if (action.payload.user) {
        state.user = action.payload.user;
      }
      if (action.payload.phone) {
        state.phone = action.payload.phone;
      }
    },
    userLoggedIn: (
      state,
      action: PayloadAction<{ access_Token: string; user: any }>
    ) => {
      state.token = action.payload.access_Token;
      state.user = action.payload.user;
      state.phone = undefined;
      // Save token and user to localStorage
      localStorage.setItem("token", action.payload.access_Token);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
    },
    userLoggedOut: (state) => {
      state.token = "";
      state.user = "";
      state.phone = undefined;
      // Remove from localStorage on logout
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
    // New action to load token/user from localStorage
    loadFromStorage: (state) => {
      const savedToken = localStorage.getItem("token");
      const savedUser = localStorage.getItem("user");
      if (savedToken) {
        state.token = savedToken;
      }
      if (savedUser) {
        state.user = JSON.parse(savedUser);
      }
    },
  },
});

export const {
  userRegistration,
  userLoggedIn,
  userLoggedOut,
  loadFromStorage,
} = authSlice.actions;

export default authSlice.reducer;

