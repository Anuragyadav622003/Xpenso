// redux/services/authApi.ts

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { TAuthForm, TSignUpForm } from "@/lib/validations/auth";
import Base_url from "@/BaseUrl";

// Define the User interface for consistent typing across endpoints
interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  countryCode: string;
  createdAt: string;
}

// Server response format for signIn/signUp
interface AuthResponse {
  user: User;
}

// Create the authApi service
export const authApi = createApi({
  reducerPath: "authApi", // Unique key for this API slice
  baseQuery: fetchBaseQuery({
    baseUrl: Base_url,         // Your base API URL
    credentials: "include",    // Ensure cookies (e.g. JWT) are sent with every request
  }),
  tagTypes: ["User"], // Enables cache tagging for automatic re-fetching

  endpoints: (builder) => ({
    // ------------------- SIGN IN -------------------
    signIn: builder.mutation<AuthResponse, TAuthForm>({
      query: (credentials) => ({
        url: "/auth/signin",
        method: "POST",
        body: credentials,
      }),
    }),

    // ------------------- SIGN UP -------------------
    signUp: builder.mutation<AuthResponse, TSignUpForm>({
      query: (userData) => ({
        url: "/auth/signup",
        method: "POST",
        body: userData,
      }),
    }),

    // ------------------- GET PROFILE -------------------
    getProfile: builder.query<User, void>({
      query: () => ({
        url: "/auth/me",
        method: "GET",
      }),
      providesTags: ["User"], // Allows this query to be refetched when "User" tag is invalidated
    }),

    // ------------------- UPDATE PROFILE -------------------
    updateProfile: builder.mutation<User, Partial<User>>({
      query: (data) => ({
        url: "/auth/update-profile",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["User"], // Triggers re-fetch of getProfile after successful update
    }),

    // ------------------- LOGOUT -------------------
    logout: builder.mutation<{ message: string }, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
    }),
  }),
});

// Export hooks for use in components
export const {
  useSignInMutation,
  useSignUpMutation,
  useGetProfileQuery,
  useUpdateProfileMutation,
  useLogoutMutation,
} = authApi;
