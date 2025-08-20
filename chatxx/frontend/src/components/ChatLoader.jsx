// src/components/ChatLoader.jsx
import React from "react";
import { Loader2 } from "lucide-react"; // spinner icon from lucide-react

const ChatLoader = () => {
  return (
    <div className="flex items-center justify-center h-full bg-gray-50">
      <div className="flex flex-col items-center space-y-4">
        {/* lucide-react icon with spin animation */}
        <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />

        {/* Loading text */}
        <p className="text-gray-600 font-medium">Loading...✈</p>
      </div>
    </div>
  );
};

export default ChatLoader;
