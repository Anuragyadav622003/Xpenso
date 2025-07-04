



// routes/ProtectedRoute.tsx
import { useAppSelector } from "@/redux/hooks";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { isAuthenticated, isInitialized } = useAppSelector((state) => state.auth);

  if (!isInitialized) return <div>Loading...</div>;
  return isAuthenticated ? children : <Navigate to="/sign-in" replace />;
}
