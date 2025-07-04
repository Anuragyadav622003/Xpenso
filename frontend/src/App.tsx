// App.tsx
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { useGetProfileQuery } from "./redux/services/authApi";
import { initializeAuth } from "./redux/slices/authSlice";
import { useAppDispatch } from "./redux/hooks";
import React from "react";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { SignInForm } from "./auth/signIn";
import { SignUpForm } from "./auth/signup";
import ProtectedRoute from "./routes/ProtectedRoute";

const queryClient = new QueryClient();

const AuthInitializer = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();
  const { data, error, isLoading } = useGetProfileQuery();

  // Auto initialize Redux state from cookie-based session
  React.useEffect(() => {
    if (!isLoading) {
      dispatch(initializeAuth(data ?? null));
    }
  }, [data, error, isLoading, dispatch]);

  return <>{children}</>;
};

const App = () => (
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
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
