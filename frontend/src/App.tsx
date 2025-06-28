// // src/App.tsx
// import { Provider } from "react-redux";
// import { store } from "./redux/store";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { Toaster } from "@/components/ui/sonner";
// import { TooltipProvider } from "@/components/ui/tooltip";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// import Index from "./pages/Index";
// import NotFound from "./pages/NotFound";
// import { SignInForm } from "./auth/signIn";
// import { SignUpForm } from "./auth/signup";
// import ProtectedRoute from "./routes/ProtectedRoute";

// const queryClient = new QueryClient();

// const App = () => (
//   <Provider store={store}>
//     <QueryClientProvider client={queryClient}>
//       <TooltipProvider>
//         <Toaster />
//         <BrowserRouter>
//           <Routes>
//             {/* Protected homepage */}
//             <Route
//               path="/"
//               element={
//                 <ProtectedRoute>
//                   <Index />
//                 </ProtectedRoute>
//               }
//             />

//             {/* Public auth pages */}
//             <Route path="/sign-in" element={<SignInForm />} />
//             <Route path="/sign-up" element={<SignUpForm />} />

//             {/* Catch-all */}
//             <Route path="*" element={<NotFound />} />
//           </Routes>
//         </BrowserRouter>
//       </TooltipProvider>
//     </QueryClientProvider>
//   </Provider>
// );

// export default App;




// src/App.tsx
import { useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { SignInForm } from "./auth/signIn";
import { SignUpForm } from "./auth/signup";
import ProtectedRoute from "./routes/ProtectedRoute";
import { initializeAuth } from "./redux/slices/authSlice";

import { useAppDispatch } from "./redux/hooks";

const queryClient = new QueryClient();

const AuthInitializer = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();
 
  useEffect(() => {
    dispatch(initializeAuth());
    
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "accessToken") {
        dispatch(initializeAuth());
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [dispatch]);

  return <>{children}</>;
};

const App = () => {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster position="top-center" richColors />
          <BrowserRouter>
            <AuthInitializer>
              <Routes>
                {/* Protected homepage */}
                <Route
                  path="/"
                  element={
                    <ProtectedRoute>
                      <Index />
                    </ProtectedRoute>
                  }
                />

                {/* Public auth pages */}
                <Route path="/sign-in" element={<SignInForm />} />
                <Route path="/sign-up" element={<SignUpForm />} />

                {/* Catch-all */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </AuthInitializer>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </Provider>
  );
};

export default App;