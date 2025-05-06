"use client";

import React from "react";

import type { ComponentProps } from "@/types";

interface ButtonProps extends ComponentProps {
  title: string;
  type?: "button" | "submit" | "reset";
  handleBtn?: () => void;
}

const GradientButton = ({
  title,
  className,
  type = "button",
  handleBtn,
}: ButtonProps) => {
  return (
    <button
      className={`${className} z-10 py-3 px-7 bg-gradient-to-r from-gradientStart to-gradientEnd rounded-lg font-jost text-base text-white capitalize hover:drop-shadow-lg transition-all`}
      type={type}
      onClick={handleBtn}
    >
      {title}
    </button>
  );
};

export default GradientButton;
