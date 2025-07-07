// redux/slices/authSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  countryCode: string;
  createdAt: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isInitialized: boolean;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isInitialized: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
   
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.isInitialized = true;

      localStorage.removeItem("user");
    },
    initializeAuth: (state, action: PayloadAction<User | null>) => {
     const user = action.payload;
      state.user = user;
      state.isAuthenticated = !!user;
      state.isInitialized = true;

      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
      } else {
        localStorage.removeItem("user");
      }
     
    },
  },
});

export const {  logout, initializeAuth } = authSlice.actions;
export default authSlice.reducer;
