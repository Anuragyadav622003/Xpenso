// src/redux/services/authApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { TAuthForm, TSignUpForm } from "@/lib/validations/auth";

interface AuthResponse {
  access_token: string;
  
}

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000" }),
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
