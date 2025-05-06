"use client";

import React from "react";
import type { ComponentProps } from "@/types";

interface ButtonProps extends ComponentProps {
  title: string;
  onClick?: () => void;
}

const BorderGradientButton = ({
  title,
  className,
  onClick,
}: ButtonProps) => {
  return (
    <div className="group relative inline-block p-[1px]">
      <button
        className={`${className} relative z-10 bg-gray100 font-jost px-4 py-2.5 text-base rounded-lg uppercase group-hover:bg-opacity-0 group-hover:text-white transition-all`}
        onClick={onClick}
      >
        {title}
      </button>
      <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-gradientStart to-gradientEnd"></div>
    </div>
  );
};

export default BorderGradientButton;
