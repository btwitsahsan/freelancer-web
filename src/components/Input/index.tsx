"use client";

import React, { useState } from "react";
import { IoEyeOff, IoEye } from "react-icons/io5";

import type { ComponentProps } from "@/types";

interface InputProps extends ComponentProps {
  name?: string;
  placeholder?: string;
  value?: string;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onBlur?: (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  icon?: boolean;
  type?: string;
  bio?: boolean;
  required?: boolean;
}

const Input = ({
  name,
  placeholder,
  onBlur,
  icon,
  type = "text",
  bio,
  className,
  required = false,
  value,
  onChange,
  onKeyDown,
}: InputProps) => {
  const [show, setShow] = useState<boolean>(false);

  return (
    <div className="flex items-center border border-gray100 bg-gray100 rounded-lg px-3 py-2.5">
      {bio ? (
        <textarea
          name={name}
          rows={4}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className={`${className} w-full font-jost text-sm text-black bg-gray100 focus:outline-none`}
        />
      ) : (
        <input
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          onKeyDown={onKeyDown}
          type={icon ? (!show ? type : "text") : type}
          className={`${className} w-full font-jost text-sm text-black bg-gray100 focus:outline-none`}
          required={required}
        />
      )}

      {icon && (
        <div className="cursor-pointer" onClick={() => setShow(!show)}>
          {!show ? <IoEyeOff /> : <IoEye />}
        </div>
      )}
    </div>
  );
};

export default Input;
