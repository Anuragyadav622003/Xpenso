// src/redux/store.ts
import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./services/authApi"; // import your RTK Query API

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
