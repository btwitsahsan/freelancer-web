"use client";
import { useState, useRef, FC, useEffect } from "react";
import Input from "@/components/Input";
import BorderGradientButton from "@/components/Buttons/borderGradientBtn";
import { TextField } from "@mui/material";
import { FormikProps } from "formik";
import { UserType } from "./page";
import { locations } from "@/utils/constant";

interface FirstStepProps {
  user: UserType;
  formik: FormikProps<{
    avatarFile: File;
    avatar: string;
    fullName: string;
    location: string;
    bio: string;
  }>;
  handleInputChange: (field: keyof UserType) => (value: string | File) => void;
}

const FirstStep: FC<FirstStepProps> = ({ user, formik, handleInputChange }) => {
  const [image, setImage] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (user?.avatar) {
      setImage(user.avatar);
    }
  }, [user]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFile(file);
      const reader = new FileReader();
      handleInputChange("avatarFile")(file);
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  useEffect(() => {
    if (formik.isValid && Object.keys(formik.touched).length) {
      // sendDataToServer();
    }
  }, [formik.values]);

  const sendDataToServer = async () => {
    if (!file) {
      console.warn("Please upload an image.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("fullName", formik.values.fullName);
      formData.append("location", formik.values.location);
      formData.append("bio", formik.values.bio);
      formData.append("avatar", file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Upload successful:', result);
      } else {
        console.error('Upload failed:', response.statusText);
      }
    } catch (error) {
      console.error('An error occurred while uploading:', error);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="w-24 h-24 rounded-full bg-gray100 flex items-center justify-center overflow-hidden border-2 border-gray300 ">
          {image ? (
            <img
              src={image}
              alt="Profile Preview"
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-sm text-gray400">No image</span>
          )}
        </div>

        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          className="hidden"
          onChange={handleImageUpload}
        />

        <BorderGradientButton
          title="Upload your picture"
          className="bg-white px-7 cursor-pointer"
          onClick={triggerFileInput}
        />
      </div>

      <hr className="border border-[#030229] opacity-10 w-full" />

      <div className="flex flex-col gap-4">
        <div className="w-full">
          <span className="text-base text-black font-medium">Full Name</span>
          <Input
            name="fullName"
            value={user?.fullName}
            onChange={(e) => {
              formik.handleChange(e);
              handleInputChange("fullName")(e.target.value);
            }}
            onBlur={formik.handleBlur}
            placeholder="Full Name"
          />
          {formik.touched.fullName && formik.errors.fullName && (
            <p className="text-red500 text-sm">{formik.errors.fullName}</p>
          )}
        </div>
        <div className="w-full">
          <span className="text-base text-black font-medium">Location</span>
          <select
            name="location"
            className="w-full items-center border border-gray100 bg-gray100 rounded-lg px-3 py-2.5"
            value={user?.location}
            onChange={(e) => {
              formik.handleChange(e);
              handleInputChange("location")(e.target.value);
            }}
            onBlur={formik.handleBlur}
          >
            <option value="" disabled>
              Select Location
            </option>
            {locations.map((location) => (
              <option className="w-full font-jost text-sm text-black bg-gray100 focus:outline-none" key={location.slug} value={location.slug}>
                {location.label}
              </option>
            ))}
          </select>
          {formik.touched.location && formik.errors.location && (
            <p className="text-red500 text-sm">{formik.errors.location}</p>
          )}
        </div>
        <div className="w-full">
          <span className="text-base text-black font-medium">About you</span>
          <TextField
            name="bio"
            multiline
            maxRows={4}
            value={user?.description}
            onChange={(e) => {
              formik.handleChange(e);
              handleInputChange("description")(e.target.value);
            }}
            onBlur={formik.handleBlur}
            placeholder="Brief description for your profile"
            variant="filled"
            className="w-full font-jost"
            sx={{
              ".MuiFilledInput-underline": {
                padding: "12px",
                borderRadius: "8px",
                backgroundColor: "var(--gray-100)",
              },
              ".MuiFilledInput-underline::after": {
                border: "none !important",
              },
              ".MuiFilledInput-underline::before": {
                border: "none !important",
              },
            }}
          />
          {formik.touched.bio && formik.errors.bio && (
            <p className="text-red500 text-sm">{formik.errors.bio}</p>
          )}
        </div>
      </div>
    </>
  );
};

export default FirstStep;
