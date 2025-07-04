// src/components/ui/Loader.tsx
import { Loader2 } from "lucide-react"; // Make sure lucide-react is installed

export const Loader = () => (
  <div className="min-h-screen flex items-center justify-center bg-white dark:bg-black">
    <Loader2 className="h-10 w-10 animate-spin text-blue-600 dark:text-blue-300" />
  </div>
);
