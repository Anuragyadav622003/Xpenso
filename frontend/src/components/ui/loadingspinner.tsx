// src/components/ui/loading-spinner.tsx
import { RotateCw } from "lucide-react";

export const LoadingSpinner = ({ className = "" }: { className?: string }) => (
  <div className={`flex justify-center items-center ${className}`}>
    <RotateCw className="animate-spin h-8 w-8 text-primary" />
  </div>
);