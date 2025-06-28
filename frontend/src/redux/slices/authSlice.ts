import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  token: string | null;
  isInitialized: boolean;
}

// Safely get token from localStorage (works in SSR environments)
const getInitialToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem("accessToken");
  }
  return null;
};

const initialState: AuthState = {
  token: getInitialToken(),
  isInitialized: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      state.isInitialized = true;
      if (typeof window !== 'undefined') {
        localStorage.setItem("accessToken", action.payload);
      }
    },
    logout: (state) => {
      state.token = null;
      state.isInitialized = true;
      if (typeof window !== 'undefined') {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user")
      }
    },
    initializeAuth: (state) => {
      state.token = getInitialToken();
      state.isInitialized = true;
    },
  },
});

export const { login, logout, initializeAuth } = authSlice.actions;
export default authSlice.reducer;