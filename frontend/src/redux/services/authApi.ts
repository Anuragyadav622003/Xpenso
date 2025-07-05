// redux/services/authApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { TAuthForm, TSignUpForm } from "@/lib/validations/auth";
import Base_url from "@/BaseUrl";

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  countryCode: string;
  createdAt: string;
}

interface AuthResponse {
  user: User;
}

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: Base_url,
    credentials: "include", // send cookies
  }),
  tagTypes: ["User"], // ✅ Enable tag-based caching
  endpoints: (builder) => ({
    signIn: builder.mutation<AuthResponse, TAuthForm>({
      query: (credentials) => ({
        url: "/auth/signin",
        method: "POST",
        body: credentials,
      }),
    }),

    signUp: builder.mutation<AuthResponse, TSignUpForm>({
      query: (userData) => ({
        url: "/auth/signup",
        method: "POST",
        body: userData,
      }),
    }),

    getProfile: builder.query<User, void>({
      query: () => ({
        url: "/auth/me",
        method: "GET",
      }),
      providesTags: ["User"], // ✅ Makes this query tag-aware
    }),

    updateProfile: builder.mutation<User, Partial<User>>({
      query: (data) => ({
        url: "/auth/update-profile",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["User"], // ✅ Refetch getProfile after update
    }),

    logout: builder.mutation<{ message: string }, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
    }),
  }),
});

export const {
  useSignInMutation,
  useSignUpMutation,
  useGetProfileQuery,
  useUpdateProfileMutation, // ✅ Export new mutation
  useLogoutMutation,
} = authApi;
