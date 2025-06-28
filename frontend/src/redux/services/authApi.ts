// File: src/redux/services/authApi.ts
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
  access_token: string;
  user: User;
}

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: Base_url,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("accessToken");
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
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
  }),
});

export const { useSignInMutation, useSignUpMutation } = authApi;
