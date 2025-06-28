import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { Transaction, TransactionFormData } from "@/types/transaction";
import Base_url from "@/BaseUrl";
export interface TransactionData {
  amount: number;
  type: 'credit' | 'debit';
  description: string;
  date: string;
  time: string;
  category?: string;
}

export const transectionApi = createApi({
  reducerPath: "transectionApi",
  baseQuery: fetchBaseQuery({
    baseUrl: Base_url,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`); // ✅ Bearer token added
      }
      return headers;
    },
  }),
  tagTypes: ["Transaction"],
  endpoints: (builder) => ({
    // Fetch all transactions
    getTransactions: builder.query<Transaction[], void>({
      query: () => "/transactions",
      providesTags: ["Transaction"],
    }),
 

    
    // Add a new transaction
    addTransaction: builder.mutation<Transaction, TransactionData>({
      query: (formData) => {
        const { date, time, ...rest } = formData;
        const datetime = new Date(`${date}T${time}`);
        return {
          url: "/transactions",
          method: "POST",
          body: {
            ...rest,
            date: datetime.toISOString(),
          },
        };
      },
      invalidatesTags: ["Transaction"],
    }),

    // Delete a transaction
    deleteTransaction: builder.mutation<{ success: boolean }, string>({
      query: (id) => ({
        url: `/transactions/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Transaction"],
    }),
  }),
});

export const {
  useGetTransactionsQuery,
  useAddTransactionMutation,
  useDeleteTransactionMutation,
} = transectionApi;
