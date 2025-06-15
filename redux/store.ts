// //redux is more 


// "use client";
// import { configureStore } from "@reduxjs/toolkit";
// import { apiSlice } from "./features/api/apiSlice";
// import authSlice from "./features/auth/authSlice";
// import { doctorApi } from "./features/dprofile/profileApi";
// import onboardingSlice from "./features/onboarding/onboardingSlice"
// import { on } from "events";


// // import { boolean } from "yup";

// export const store = configureStore({
//   reducer: {
//     [apiSlice.reducerPath]: apiSlice.reducer,
//     auth: authSlice,
//     onboarding: onboardingSlice,
   
//   },
//   devTools: false,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware().concat(apiSlice.middleware),
// });

// //call the refresh token function on every page load

// const initializeApp = async () => {
//   await store.dispatch(
//     apiSlice.endpoints.refreshToken.initiate({}, { forceRefetch: true })
//   );
//   await store.dispatch(
//     apiSlice.endpoints.loadUser.initiate({}, { forceRefetch: true })
//   );
// };

// initializeApp();



//2nd 
"use client";

import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { apiSlice } from "./features/api/apiSlice";
import authSlice from "./features/auth/authSlice";
import onboardingSlice from "./features/onboarding/onboardingSlice";
import { doctorApi } from "./features/dprofile/profileApi";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import storage from "redux-persist/lib/storage";

// 👇 Combine your reducers
const rootReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  auth: authSlice,
  onboarding: onboardingSlice,
});

// 👇 Persist config
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "onboarding"], // you can add "auth" too if needed
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// 👇 Configure the store with persisted reducer
export const store = configureStore({
  reducer: persistedReducer,
  devTools: false,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(apiSlice.middleware),
});

// 👇 Persistor
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
