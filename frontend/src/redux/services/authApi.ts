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
    credentials: "include", // to send cookies
  }),
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
  useLogoutMutation,
} = authApi;
