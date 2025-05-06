"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { IoEyeOff, IoEye } from "react-icons/io5";
import { UserType } from "@/types";
import { toast } from "react-toastify";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  sendEmailVerification,
  User,
} from "firebase/auth";
import { auth, googleProvider, appleProvider } from "@/firebaseConfig";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Icons } from "@/icons";
import { FiCheck } from "react-icons/fi";
import { apiUrl } from "@/utils/constant";

const schema = yup.object().shape({
  fullName: yup.string().required("Full Name is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  userName: yup.string().required("Username is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const SignUp = () => {
  const [role, setRole] = useState<string | null>(null);
  const [step, setStep] = useState<number>(1);
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UserType>({
    resolver: yupResolver(schema),
  });

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const saveUserToDatabase = async (user: any) => {
    try {
      const userData = {
        uid: user.uid,
        fullName: user.displayName,
        email: user.email,
        userName: user.email.split("@")[0],
        profilePicture: user.photoURL,
        role: role,
        provider: user.providerId || "google", // Placeholder
      };

      const response = await axios.post(`${apiUrl}/api/auth/signup`, userData);
      console.log("Signup response:", response.data);
      return true; // user saved successfully
    } catch (error: any) {
      if (
        error.response?.status === 400 &&
        error.response?.data?.message === "User already exists"
      ) {
        toast.info("User already exists. Please sign in.");
        return false; // user already exists
      } else {
        console.error("Error saving user to database:", error);
        toast.error("Failed to save user to database.");
        return false;
      }
    }
  };

  const onSubmit = async (data: UserType) => {
    const actionCodeSettings = {
      url: process.env.NEXT_PUBLIC_FRONTEND_URL + "sign-in",
      handleCodeInApp: true,
    };

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      const firebaseUser = userCredential.user;

      await sendEmailVerification(firebaseUser, actionCodeSettings);

      await axios.post(`${apiUrl}/auth/signup`, {
        uid: firebaseUser.uid,
        fullName: data.fullName,
        userName: data.userName,
        email: data.email,
        password: data.password,
        role: role,
      });

      toast.success("Sign up successful! Please verify your email.");
    } catch (error: any) {
      if (error.code === "auth/email-already-in-use") {
        toast.error("Email already registered. Try logging in.");
      } else if (error.code === "auth/invalid-email") {
        toast.error("Invalid email format.");
      } else if (error.code === "auth/weak-password") {
        toast.error("Password should be at least 6 characters.");
      } else {
        toast.error(
          "Error during sign up: " + (error.message || "Unknown error")
        );
        console.error("Signup error:", error);
      }
    }
  };

  const handleAppleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, appleProvider);
      const user = result.user;
      await saveUserToDatabase(user);
      const firebaseIdToken = await user.getIdToken();

      localStorage.setItem("freelancingPlatformAuthToken", firebaseIdToken);
      toast.success("Apple sign-in successful!");
      router.push("/");
    } catch (error) {
      console.error("Error during Apple Sign-In:", error);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      const saved = await saveUserToDatabase(user);
      if (!saved) {
        // Stop if user already exists or saving failed
        return;
      }

      const firebaseIdToken = await user.getIdToken();
      localStorage.setItem("freelancingPlatformAuthToken", firebaseIdToken);

      toast.success("Google sign-in successful!");
      router.push("/");
    } catch (error) {
      console.error("Error during Google Sign-In:", error);
      toast.error("Google Sign-In failed.");
    }
  };

  const changeRole = (val: string) => {
    setRole(val);
    setTimeout(() => {
      setStep(2);
    }, 800);
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);

    const emailFromQuery = searchParams.get("email");

    if (emailFromQuery) {
      reset({
        email: emailFromQuery,
      });
    }
  }, [reset]);

  return (
    <div className="relative w-screen h-screen overflow-hidden flex items-center justify-center bg-gradient-to-r from-[#D8E5EE] to-[#EED4E9]">
      <div className="w-[1080px] bg-white rounded-lg flex">
        {role && step === 2 ? (
          <>
            <div className="p-10 pr-20 flex flex-col gap-8">
              <Link href="/" className="flex items-center gap-2">
                <Image
                  src="/image/logo.svg"
                  alt="logo"
                  width={50}
                  height={50}
                />
                <span className="text-base font-medium text-black">
                  TheFreelanceWebsite
                </span>
              </Link>
              <h1 className="font-semibold text-4xl leading-none">Sign Up</h1>
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
                    Or Sign up with
                  </div>
                  <div className="w-full h-[1px] bg-gray200"></div>
                </div>
                <form
                  className="w-full flex flex-col gap-4"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div className="flex flex-col gap-4">
                    <div className="w-full flex flex-col">
                      <div className="text-base leading-none">Full Name</div>
                      <Controller
                        name="fullName"
                        control={control}
                        render={({ field }) => (
                          <input
                            placeholder="Full Name"
                            className="w-full rounded-lg border-gray100 bg-gray100 px-4 py-2.5 mt-2 outline-none border focus:border-blue500 hover:border-gray400"
                            {...field}
                          />
                        )}
                      />
                      {errors.fullName && (
                        <span className="text-red-600 text-sm">
                          {errors.fullName.message}
                        </span>
                      )}
                    </div>
                    <div className="w-full flex flex-col">
                      <div className="text-base leading-none">
                        Email Address
                      </div>
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
                    <div className="w-full flex flex-col">
                      <div className="text-base leading-none">Username</div>
                      <Controller
                        name="userName"
                        control={control}
                        render={({ field }) => (
                          <input
                            placeholder="Username"
                            className="w-full rounded-lg border-gray100 bg-gray100 px-4 py-2.5 mt-2 outline-none border focus:border-blue500 hover:border-gray400"
                            {...field}
                          />
                        )}
                      />
                      {errors.userName && (
                        <span className="text-red-600 text-sm">
                          {errors.userName.message}
                        </span>
                      )}
                    </div>
                    <div className="w-full flex flex-col">
                      <div className="text-base leading-none">Password</div>
                      <Controller
                        name="password"
                        control={control}
                        render={({ field }) => (
                          <div className="relative mt-2">
                            <input
                              placeholder="Password"
                              type={showPassword ? "text" : "password"}
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
                  </div>
                  <div className="flex flex-col gap-2">
                    <button
                      type="submit"
                      className="w-full py-3 bg-gradient-to-r from-gradientStart to-gradientEnd rounded-lg font-medium text-base text-white hover:animate-pulseQuick focus:ring-2 focus:ring-offset-2 focus:ring-blue500 transition-all duration-300"
                    >
                      Sign up
                    </button>
                    <div className="flex justify-center gap-1">
                      <div className="leading-none">
                        Already have an account?
                      </div>
                      <div className="group relative leading-none">
                        <Link href="/sign-in">
                          <span className="bg-clip-text text-transparent bg-gradient-to-r from-gradientStart to-gradientEnd cursor-pointer group-hover:text-blue500 transition-all">
                            Sign in
                          </span>
                        </Link>
                        <span className="absolute left-0 bottom-0 h-[1px] w-full bg-gradient-to-r from-gradientStart to-gradientEnd group-hover:!bg-blue500 transition-all"></span>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="w-full flex items-center justify-center bg-gradient-to-r from-[#198BD81c] to-[#F03DCE1c] rounded-e-lg">
              <Image
                src="/image/auth-logo.svg"
                alt="auth logo"
                width={430}
                height={379}
              />
            </div>
          </>
        ) : (
          <div className="flex flex-col w-full gap-10 p-10">
            <Link href="/" className="flex items-center gap-2">
              <Image src="/image/logo.svg" alt="logo" width={50} height={50} />
              <span className="text-base font-medium text-black">
                TheFreelanceWebsite
              </span>
            </Link>
            <h2 className="text-5xl font-semibold text-center">
              What brings you to
              <br />
              TheFreelancerWebsite?
            </h2>
            <div className="flex justify-center gap-5">
              <div
                onClick={() => changeRole("freelancer")}
                className={`flex max-w-[430px] rounded-xl basis-1/2 p-px ${
                  role === "freelancer"
                    ? "bg-gradient-to-r from-gradientStart to-gradientEnd"
                    : "bg-gray100"
                } cursor-pointer hover:bg-gradient-to-r hover:from-gradientStart hover:to-gradientEnd`}
              >
                <div className="relative flex flex-col items-center w-full h-full px-5 py-10 rounded-xl bg-white gap-3">
                  <Icons.freelancer />
                  <div className="text-xl font-semibold w-full leading-none">
                    I&apos;m a Freelancer
                  </div>
                  <div className="text-context w-full leading-none">
                    Find work and manage your freelance business
                  </div>
                  <button
                    className={`absolute right-5 top-5 flex justify-center items-center w-8 h-8 ${
                      role === "freelancer"
                        ? "bg-gradient-to-r from-gradientStart to-gradientEnd"
                        : "bg-white"
                    } border border-gray400 rounded-full`}
                  >
                    <FiCheck className="text-white" />
                  </button>
                </div>
              </div>
              <div
                onClick={() => changeRole("client")}
                className={`flex max-w-[430px] rounded-xl basis-1/2 p-px ${
                  role === "client"
                    ? "bg-gradient-to-r from-gradientStart to-gradientEnd"
                    : "bg-gray100"
                } cursor-pointer hover:bg-gradient-to-r hover:from-gradientStart hover:to-gradientEnd`}
              >
                <div className="relative flex flex-col items-center w-full h-full px-5 py-10 rounded-xl bg-white gap-3">
                  <Icons.client />
                  <div className="text-xl font-semibold w-full leading-none">
                    I&apos;m a hiring
                  </div>
                  <div className="text-context w-full leading-none">
                    Find talents and grow your freelance business
                  </div>
                  <button
                    className={`absolute right-5 top-5 flex justify-center items-center w-8 h-8 ${
                      role === "client"
                        ? "bg-gradient-to-r from-gradientStart to-gradientEnd"
                        : "bg-white"
                    } border border-gray400 rounded-full`}
                  >
                    <FiCheck className="text-white" />
                  </button>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3 items-center">
              <div className="flex justify-center gap-1">
                <div className="leading-none">Already have an account?</div>
                <div className="group relative leading-none">
                  <Link href="/sign-in">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-gradientStart to-gradientEnd cursor-pointer group-hover:text-blue500 transition-all">
                      Sign in
                    </span>
                  </Link>
                  <span className="absolute left-0 bottom-0 h-[1px] w-full bg-gradient-to-r from-gradientStart to-gradientEnd group-hover:!bg-blue500 transition-all"></span>
                </div>
              </div>
              <div className="group relative text-xs text-context text-center">
                By continuing, you agree to TheFreelanceWebsite’s&nbsp;
                <Link href="/sign-in">
                  <span className="bg-clip-text cursor-pointer group-hover:text-blue500 underline transition-all">
                    Terms of Use
                  </span>
                </Link>
                &nbsp;and confirm that you have read
                <br />
                TheFreelanceWebsite’s&nbsp;
                <Link href="/sign-in">
                  <span className="bg-clip-text cursor-pointer group-hover:text-blue500 underline transition-all">
                    Privacy Policy
                  </span>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SignUp;
