"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { confirmPasswordReset } from "firebase/auth";
import { auth } from "@/firebaseConfig";

import { IoEyeOff, IoEye } from "react-icons/io5";
import { ResetPassword } from "@/types";
import GradientButton from "@/components/Buttons/gradientBtn";
import { toast } from "react-toastify";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
});

const ResetPassword = () => {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPassword>({
    resolver: yupResolver(schema),
  });

  const [error, setError] = useState("");
  const [oobCode, setOobCode] = useState("");
  const searchParams = useSearchParams();

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  useEffect(() => {
    const code = searchParams.get("oobCode") ?? "";
    setOobCode(code);
  }, [searchParams]);

  const onSubmit = async (passwords: ResetPassword) => {
    if (passwords.password !== passwords.confirmPassword) {
      return setError("Passwords do not match");
    }

    try {
      await confirmPasswordReset(auth, oobCode, passwords.password);
      toast.success("Your password has been reset successfully!");

      router.push("/sign-in");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("There was an error resetting your password.");
      }
    }
  };

  return (
    <div className="relative flex items-center justify-center w-full min-h-screen bg-gradient-to-r from-[#D8E5EE] to-[#EED4E9]">
      <div className="bg-white rounded-lg shadow-md max-w-xl px-12 py-20 flex flex-col gap-12 w-full">
        <Link href="/" className="flex justify-center">
          <Image src="/image/logo.svg" alt="logo" width={50} height={50} />
        </Link>

        <h1 className="font-semibold text-4xl text-black text-nowrap px-16 capitalize">
          Reset Your Password
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="w-full flex flex-col relative">
            <div className="text-base leading-none">Password</div>
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <div className="relative mt-2">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    className="w-full rounded-lg border-gray100 bg-gray100 px-4 py-2.5 outline-none border focus:border-blue500 hover:border-gray400"
                    {...field}
                  />
                  <div
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <IoEye /> : <IoEyeOff />}
                  </div>
                </div>
              )}
            />
            {errors.password && (
              <span className="text-red-600 text-sm">
                {errors.password.message}
              </span>
            )}
          </div>
          <div className="w-full flex flex-col relative">
            <div className="text-base leading-none">Confirm Password</div>
            <Controller
              name="confirmPassword"
              control={control}
              render={({ field }) => (
                <div className="relative mt-2">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Confirm Password"
                    className="w-full rounded-lg border-gray100 bg-gray100 px-4 py-2.5 outline-none border focus:border-blue500 hover:border-gray400"
                    {...field}
                  />
                  <div
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <IoEye /> : <IoEyeOff />}
                  </div>
                </div>
              )}
            />
            {errors.confirmPassword && (
              <span className="text-red-600 text-sm">
                {errors.confirmPassword.message}
              </span>
            )}
          </div>

          {error && <span className="text-red500">{error}</span>}

          <GradientButton
            title="Reset Your Password"
            className="w-full hover:animate-pulseQuick"
            type="submit"
          />
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
