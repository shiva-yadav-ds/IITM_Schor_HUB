
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  className?: string;
  size?: number;
}

const LoadingSpinner = ({ className, size = 24 }: LoadingSpinnerProps) => {
  return (
    <Loader2 
      className={cn("animate-spin text-iitm-blue", className)} 
      size={size} 
    />
  );
};

export default LoadingSpinner;
