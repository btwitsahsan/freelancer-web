"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useFormik } from "formik";
import * as Yup from "yup";
import GradientButton from "@/components/Buttons/gradientBtn";

import FirstStep from "./frist-step";
import SecondStep from "./second-step";
import ThirdStep from "./thrid-step";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { apiUrl } from "@/utils/constant";

export type WorkHistory = {
  position: string;
  company: string;
};

export type Education = {
  school: string;
  degree: string;
  year: string;
};

export interface UserType {
  avatar?: string;
  avatarFile?: File;
  fullName?: string;
  location?: string;
  description?: string;
  workHistory?: WorkHistory[];
  education?: Education[];
  skills?: string[];
  hourlyRate?: number;
  portfolio?: string[];
  externalPortfolio?: string[];
}

const SetProfile = () => {
  const [step, setStep] = useState(0);
  const [user, setUser] = useState<UserType>({});
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("freelancingPlatformAuthToken");
        console.log("Token:", token ? "exists" : "missing");

        if (!token) {
          throw new Error("No token found");
        }

        // You could also log the decoded token payload here if you have a utility function

        const response = await axios.get(`${apiUrl}/api/users/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const userData = response.data;
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const formikFirstStep = useFormik({
    enableReinitialize: true,
    initialValues: {
      avatar: user?.avatar || "",
      avatarFile: new File([], "empty-file.png", { type: "image/png" }),
      fullName: user?.fullName || "",
      location: user?.location || "",
      bio: user?.description || "",
    },
    validationSchema: Yup.object({
      fullName: Yup.string().required("Full Name is required"),
      location: Yup.string().required("Location is required"),
      bio: Yup.string()
        .min(10, "Bio must be at least 10 characters")
        .required("Bio is required"),
    }),
    onSubmit: () => {
      setStep(1);
    },
  });

  const formikSecondStep = useFormik({
    enableReinitialize: true,
    initialValues: {
      workHistory: user?.workHistory || [{ position: "", company: "" }],
      education: user?.education || [{ school: "", degree: "", year: "" }],
      skills: user?.skills || [],
    },
    validationSchema: Yup.object({
      workHistory: Yup.array().of(
        Yup.object().shape({
          position: Yup.string().required("Position is required"),
          company: Yup.string().required("Company is required"),
        })
      ),
      education: Yup.array().of(
        Yup.object().shape({
          school: Yup.string().required("School is required"),
          degree: Yup.string().required("Degree is required"),
          year: Yup.string().required("Year is required"),
        })
      ),
      skills: Yup.array()
        .min(1, "At least one skill is required")
        .of(Yup.string().required("Skill is required")),
    }),
    onSubmit: () => {
      setStep(2);
    },
  });

  const formikThirdStep = useFormik({
    enableReinitialize: true,
    initialValues: {
      hourlyRate: user?.hourlyRate || "",
    },
    validationSchema: Yup.object({
      hourlyRate: Yup.string().required("Hourly rate is required"),
    }),
    onSubmit: () => {
      setStep(0);
      const token = localStorage.getItem("freelancingPlatformAuthToken");
      const formData = new FormData();

      Object.keys(user).forEach((key) => {
        const value = user[key as keyof UserType];
        if (key !== "avatar") {
          if (key !== "avatarFile") {
            if (key === "workHistory" || key === "education") {
              formData.append(key, JSON.stringify(value));
            } else {
              formData.append(key, String(value));
            }
          } else if (value instanceof File || value instanceof Blob) {
            formData.append("avatar", value);
          }
        }
      });

      axios
        .put(`${apiUrl}/api/users/profile`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          toast.success("Set up profile success.");
          router.push("/");
        })
        .catch((error) => {
          console.log(error);
          toast.error("Failed to update profile.");
        });
    },
  });

  const handleStep = () => {
    if (step === 0) {
      formikFirstStep.handleSubmit();
    } else if (step === 1) {
      formikSecondStep.handleSubmit();
    } else if (step === 2) {
      formikThirdStep.handleSubmit();
    }
  };

  const handleInputChange =
    (field: keyof UserType) => (value: string | File) => {
      setUser((prevUser) => ({
        ...prevUser,
        [field]: value,
      }));
    };

  return (
    <div className="relative flex items-center justify-center w-full min-h-screen bg-gradient-to-r from-[#D8E5EE] to-[#EED4E9]">
      <div className="w-[1200px] bg-white rounded-lg flex m-8">
        <div className="w-full p-10 flex flex-col items-start">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/image/logo.svg" alt="logo" width={50} height={50} />
            <span className="text-base font-medium text-black">
              TheFreelanceWebsite
            </span>
          </Link>
          <div className="w-full flex flex-col items-center justify-center">
            <div className="max-w-[514px] w-full flex flex-col gap-5 pb-[50px]">
              <h1 className="font-semibold text-4xl text-black text-center leading-none">
                Setup your profile
              </h1>
              {step === 0 && (
                <FirstStep
                  user={user}
                  handleInputChange={handleInputChange}
                  formik={formikFirstStep}
                />
              )}
              {step === 1 && (
                <SecondStep
                  user={user}
                  setUser={setUser}
                  formik={formikSecondStep}
                />
              )}
              {step === 2 && (
                <ThirdStep
                  user={user}
                  setUser={setUser}
                  formik={formikThirdStep}
                />
              )}
              <GradientButton
                title={step === 2 ? "Complete" : "Continue"}
                className="w-full mt-5"
                handleBtn={handleStep}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SetProfile;
