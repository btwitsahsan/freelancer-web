"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import GradientButton from "@/components/Buttons/gradientBtn";
import { toast } from "react-toastify";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/firebaseConfig";
import { useRouter } from "next/navigation";

export default function ForgotPassword() {
  const [email, setEmail] = useState<string>("");
  const router = useRouter();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value } = e.target;
    setEmail(value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const actionCodeSettings = {
      url: "http://localhost:3000/reset-password",
      handleCodeInApp: true,
    };

    try {
      await sendPasswordResetEmail(auth, email, actionCodeSettings);

      toast.success("Password reset email sent!");
      router.push("/reset-email-sent");
    } catch (error) {
      console.error("Error sending password reset email:", error);
      alert("Failed to send password reset email. Please try again.");
    }
  };

  return (
    <div className="relative flex items-center justify-center w-full min-h-screen bg-gradient-to-r from-[#D8E5EE] to-[#EED4E9]">
      <div className="bg-white rounded-lg shadow-md max-w-xl px-12 py-20 flex flex-col gap-12 w-full">
        <Link href="/" className="flex items-center justify-center">
          <Image src="/image/logo.svg" alt="logo" width={50} height={50} />
        </Link>
        <h1 className="font-semibold text-3xl h-9 text-center text-black capitalize">
          Recover Your Account
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="block text-base">Email Address</label>
            <input
              placeholder="Enter your email"
              type="email"
              required={true}
              onChange={handleInputChange}
              className="w-full rounded-lg border-gray100 bg-gray100 px-4 py-2.5 outline-none border focus:border-blue500 hover:border-gray400"
            />
          </div>
          <div className="flex flex-col gap-2">
            <GradientButton
              title="Send Reset Link"
              className="w-full hover:animate-pulseQuick"
              type="submit"
            />
            <div className="text-center">
              <div className="h-4">
                <Link
                  href="/sign-in"
                  className="forgot-password-link hover:underline"
                >
                  <div className="h-4 leading-none">Back to Sign In</div>
                </Link>
              </div>
            </div>
          </div>
        </form>
      </div>

      <style jsx>{`
        .forgot-password-link {
          background: linear-gradient(to right, #ff7e5f, #feb47b);
          -webkit-background-clip: text;
          color: transparent;
          transition: background 0.3s ease;
        }

        .forgot-password-link:hover {
          background: linear-gradient(to right, #6a11cb, #2575fc);
        }
      `}</style>
    </div>
  );
}
