import React from "react";
import { Loader } from "lucide-react";

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center h-64">
      <Loader
        size={32}
        className="animate-spin text-blue-600 dark:text-blue-400"
      />
    </div>
  );
};

export default LoadingSpinner;