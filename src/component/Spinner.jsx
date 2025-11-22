import React from "react";

const Spinner = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="relative w-20 h-20">
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-purple-500 border-b-pink-500 animate-spin"></div>
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-indigo-400 border-b-green-400 animate-spin animation-delay-200"></div>
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-yellow-400 border-b-red-400 animate-spin animation-delay-400"></div>
      </div>

      <p className="mt-4 text-gray-500 text-lg font-semibold flex items-center gap-2">
        در حال بارگذاری <span className="animate-pulse">⏳👍</span>
      </p>
    </div>
  );
};

export default Spinner;
