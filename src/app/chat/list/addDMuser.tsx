"use client";

import {
  Checkbox,
  FormControlLabel,
  RadioGroup,
  TextField,
} from "@mui/material";
import Image from "next/image";
import React, { useState } from "react";
import { FaXmark } from "react-icons/fa6";
import { Icons } from "@/icons";

interface AddToDoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddChannel: React.FC<AddToDoModalProps> = ({
  isOpen,
  onClose
}) => {
  const [title, setTitle] = useState<string>("");

  const handleSave = () => {
    resetForm();
    onClose();
  };

  const resetForm = () => {
    setTitle("");
  };

  if (!isOpen) return null;

  return (
    <div className="z-50 fixed inset-0 flex justify-center items-center">
      <div className="absolute bg-black opacity-10 h-full" />
      <div className="z-10 flex flex-col gap-5 bg-white shadow-lg p-5 rounded-lg w-full max-w-2xl">
        <div className="flex justify-between gap-4">
          <h2 className="font-semibold text-xl">Select Friends</h2>
          <button
            className="group flex justify-center items-center border border-gray500 hover:border-red400 rounded-full w-6 h-6 transition-all"
            onClick={onClose}
          >
            <FaXmark className="group-hover:text-red400 w-4 h-4 text-context transition-all" />
          </button>
        </div>
        <hr />
        <div className="flex items-center gap-2.5 bg-gray100 p-2.5 rounded-lg h-10">
          <Icons.lightbulbon />
          <div className="text-gray500 text-sm">
            Add new friend for sending direct messages
          </div>
        </div>
        <div className="flex flex-col gap-2.5">
          <TextField
            variant="outlined"
            size="small"
            fullWidth
            placeholder="Type the username of a friend"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            color="success"
            sx={{
              "& .MuiOutlinedInput-root": {
                fontSize: "14px",
                borderRadius: "10px",
                borderColor: "var(--gray-200) !important",
              },
              ".Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "var(--green-500)",
              },
            }}
          />
        </div>
        <div className="flex flex-col gap-2.5">
          <RadioGroup row={false} defaultValue="you">
            <FormControlLabel
              value="you"
              control={<Checkbox />}
              label={
                <div className="flex items-center gap-2.5">
                  <Image
                    src="/image/avatar/1.jpg"
                    alt="Avatar"
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                  <span>Ralph Edwards</span>
                </div>
              }
              sx={{
                ".Mui-checked": {
                  color: "var(--green-500) !important",
                },
              }}
            />
            <FormControlLabel
              value="you"
              control={<Checkbox />}
              label={
                <div className="flex items-center gap-2.5">
                  <Image
                    src="/image/avatar/1.jpg"
                    alt="Avatar"
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                  <span>Floyd Miles</span>
                </div>
              }
              sx={{
                ".Mui-checked": {
                  color: "var(--green-500) !important",
                },
              }}
            />
          </RadioGroup>
        </div>
        <div className="flex justify-end gap-2.5 h-10">
          <button
            className="bg-green500 hover:bg-green600 hover:shadow-lg px-4 py-2 rounded-lg min-w-24 text-white hover:scale-105 transition-all duration-200"
            onClick={handleSave}
          >
            Create DM
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddChannel;
