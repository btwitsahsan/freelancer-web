import React from "react";
import Image from "next/image";

type TypingIndicatorProps = {
  avatarUrl: string;
  name?: string;
};

const TypingIndicator: React.FC<TypingIndicatorProps> = ({ avatarUrl, name }) => {
  return (
    <div className="flex items-end gap-3 animate-fade-in">
      <Image width={30} height={24} src={avatarUrl} alt="Avatar" className="rounded-full shadow-md 
      mr-3" />

      <div className="relative max-w-xs px-4 py-2 bg-gray-100 rounded-2xl shadow-md transition-transform transform-gpu scale-100 hover:scale-[1.02]">
        {/* Tail of the speech bubble */}
        <div className="absolute -left-2 bottom-2 w-3 h-3 bg-gray-100 rotate-45 rounded-sm shadow-md"></div>

        {/* Typing dots */}
        <div className="flex items-center gap-1">
          <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:0ms]"></span>
          <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:150ms]"></span>
          <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:300ms]"></span>
        </div>

        {/* Optional user label */}
        {/* {name && (
          <p className="text-xs text-gray-500 mt-1 ml-1">{name} is typing...</p>
        )} */}
      </div>
    </div>
  );
};

export default TypingIndicator;
