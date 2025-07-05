// src/App.tsx
import React from "react";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { useGetProfileQuery } from "./redux/services/authApi";
import { initializeAuth } from "./redux/slices/authSlice";
import { useAppDispatch } from "./redux/hooks";
import { Loader } from "@/components/ui/Loader";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { SignInForm } from "./auth/signIn";
import { SignUpForm } from "./auth/signup";
import ProtectedRoute from "./routes/ProtectedRoute";

const queryClient = new QueryClient();

const AuthInitializer = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { data, error, isLoading } = useGetProfileQuery();

  React.useEffect(() => {
    if (!isLoading) {
      dispatch(initializeAuth(data?.user ?? null));

      if (error) {
        console.warn("Session expired or invalid token.");
        // Optional redirect on error
        // navigate("/sign-in");
      }
    }
  }, [data, error, isLoading, dispatch]);

  if (isLoading) return <Loader />;

  return <>{children}</>;
};

const App = () => (
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster position="top-center" richColors />
        <BrowserRouter>
          <AuthInitializer>
            <Routes>
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Index />
                  </ProtectedRoute>
                }
              />
              <Route path="/sign-in" element={<SignInForm />} />
              <Route path="/sign-up" element={<SignUpForm />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthInitializer>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </Provider>
);

export default App;
