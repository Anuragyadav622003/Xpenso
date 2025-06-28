// src/redux/store.ts
import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./services/authApi";
import { transectionApi } from "./services/transectionApi";
import authReducer from "./slices/authSlice";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [transectionApi.reducerPath]: transectionApi.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(transectionApi.middleware), // ✅ Add this line
});

// Infer the RootState and AppDispatch types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
