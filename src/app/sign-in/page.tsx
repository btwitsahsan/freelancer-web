"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { IoEyeOff, IoEye } from "react-icons/io5";
import { SignInUserType } from "@/types";
import { toast } from "react-toastify";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider, appleProvider } from "@/firebaseConfig";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { signIn } from "@/utils/axios";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
});

const SignIn = () => {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInUserType>({
    resolver: yupResolver(schema),
  });

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const onSubmit = async (data: SignInUserType) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      const firebaseUser = userCredential.user;

      if (!firebaseUser.emailVerified) {
        toast.error("Please verify your email before signing in.");
        return;
      }

      const token = await firebaseUser.getIdToken();

      localStorage.setItem("freelancingPlatformAuthToken", token);
      toast.success("Sign in successful!");
      router.push("/");
    } catch (error) {
      console.error(error);
      toast.error("Error during sign-in.");
    }
    // try {
    //   const response = await signIn(data);
    //   if (response) {
    //     console.log(response.data);
    //   }
    //   const userData = {
    //     apiKey: "AIzaSyCU09UdMZ6DZvGxnCHXt1gKW1QIzvVZniE",
    //     appName: "[DEFAULT]",
    //     createdAt: "1738062609192",
    //     displayName: response?.data.user.userName,
    //     email: response?.data.user.email,
    //     emailVerified: true,
    //     isAnonymous: false,
    //     lastLoginAt: "1742913998504",
    //     photoURL:
    //       "https://lh3.googleusercontent.com/a/ACg8ocJ64wyNYsvrpWaXRzYvS7hJaHy5aMIlJ5rsGG6QYdpzgDhT4g=s96-c",
    //   };

    //   localStorage.setItem("user", JSON.stringify(userData));

    //   router.push("/");

    //   toast.success("Sign in successful!");
    // } catch (error) {
    //   console.error(error);
    //   toast.error("Error during sign-in.");
    // }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      const firebaseIdToken = await user.getIdToken();

      localStorage.setItem("freelancingPlatformAuthToken", firebaseIdToken);
      toast.success("Google sign-in successful!");
      router.push("/");
    } catch (error) {
      console.error("Error during Google Sign-In:", error);
    }
  };

  const handleAppleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, appleProvider);
      const user = result.user;
      const firebaseIdToken = await user.getIdToken();

      localStorage.setItem("freelancingPlatformAuthToken", firebaseIdToken);
      toast.success("Apple sign-in successful!");
      router.push("/");
    } catch (error) {
      console.error("Error during Apple Sign-In:", error);
    }
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden flex items-center justify-center bg-gradient-to-r from-[#D8E5EE] to-[#EED4E9]">
      <div className="w-[1080px] bg-white rounded-lg flex">
        <div className="p-10 pr-20 flex flex-col gap-8">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/image/logo.svg" alt="logo" width={50} height={50} />
            <span className="text-base font-medium text-black">
              TheFreelanceWebsite
            </span>
          </Link>
          <h1 className="font-semibold text-4xl leading-none">Sign In</h1>
          <div className="flex flex-col gap-4">
            <div className="w-full flex flex-col gap-2">
              <button
                className="text-base border border-gray200 rounded-lg text-nowrap py-3 min-w-[370px] flex items-center justify-center gap-2 hover:bg-gray100 focus:ring-2 focus:ring-offset-2 focus:ring-blue500 transition-all"
                onClick={handleGoogleSignIn}
              >
                <FcGoogle size={18} />
                Continue with Google
              </button>
              <button
                className="w-full text-base border border-gray200 rounded-lg text-nowrap py-3 flex items-center justify-center gap-2 hover:bg-gray100 focus:ring-2 focus:ring-offset-2 focus:ring-blue500 transition-all"
                onClick={handleAppleSignIn}
              >
                <FaApple size={20} color="#000000" />
                Continue with Apple
              </button>
            </div>
            <div className="w-full gap-2.5 flex items-center">
              <div className="w-full h-[1px] bg-gray200"></div>
              <div className="text-base text-nowrap leading-none">
                Or Sign in with
              </div>
              <div className="w-full h-[1px] bg-gray200"></div>
            </div>
            <form
              className="w-full flex flex-col gap-4"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="flex flex-col gap-4">
                <div className="w-full flex flex-col">
                  <div className="text-base leading-none">Email Address</div>
                  <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                      <input
                        placeholder="Email Address"
                        className="w-full rounded-lg border-gray100 bg-gray100 px-4 py-2.5 mt-2 outline-none border focus:border-blue500 hover:border-gray400"
                        {...field}
                      />
                    )}
                  />
                  {errors.email && (
                    <span className="text-red-600 text-sm">
                      {errors.email.message}
                    </span>
                  )}
                </div>
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
                <Link
                  href="/forgot-password"
                  className="text-base text-end hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="flex flex-col gap-2">
                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-gradientStart to-gradientEnd rounded-lg font-medium text-base text-white hover:animate-pulseQuick focus:ring-2 focus:ring-offset-2 focus:ring-blue500 transition-all duration-300"
                >
                  Sign In
                </button>
                <div className="flex justify-center gap-1">
                  <div className="leading-none">
                    Don&apos;t have an account?
                  </div>
                  <div className="group relative leading-none">
                    <Link href="/sign-up">
                      <span className="bg-clip-text text-transparent bg-gradient-to-r from-gradientStart to-gradientEnd cursor-pointer group-hover:text-blue500 transition-all">
                        Sign up
                      </span>
                    </Link>
                    <span className="absolute left-0 bottom-0 h-[1px] w-full bg-gradient-to-r from-gradientStart to-gradientEnd group-hover:!bg-blue500 transition-all"></span>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="w-full flex items-center justify-center bg-gradient-to-r from-[#198cd81c] to-[#f03dcf1c] rounded-e-lg">
          <Image
            src="/image/auth-logo.svg"
            alt="auth logo"
            width={495}
            height={461}
          />
        </div>
      </div>
    </div>
  );
};

export default SignIn;
