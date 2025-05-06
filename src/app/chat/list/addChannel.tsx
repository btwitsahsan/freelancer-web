import { TextField } from "@mui/material";
import React, { useState } from "react";
import { FaXmark } from "react-icons/fa6";

interface AddToDoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddChannelModel: React.FC<AddToDoModalProps> = ({ isOpen, onClose }) => {
  const [title, setTitle] = useState<string>("");

  if (!isOpen) return null;

  return (
    <div className="z-50 fixed inset-0 flex justify-center items-center">
      <div className="absolute bg-black opacity-10 h-full" />
      <div className="z-10 flex flex-col gap-5 bg-white shadow-lg p-5 rounded-lg max-w-2xl">
        <div className="flex justify-between gap-4">
          <h2 className="font-semibold text-xl">Select Channel</h2>
          <button
            className="group flex justify-center items-center border-gray500 border hover:border-red400 rounded-full w-6 h-6 transition-all"
            onClick={onClose}
          >
            <FaXmark className="group-hover:text-red400 w-4 h-4 text-context transition-all" />
          </button>
        </div>
        <div className="flex flex-col gap-2.5">
          <TextField
            variant="outlined"
            size="small"
            fullWidth
            placeholder="Type the username"
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
          <button
            className="bg-green500 hover:bg-green600 hover:shadow-lg mx-4 px-4 py-2 rounded-lg min-w-24 text-white transition-all duration-200"
            onClick={onClose}
          >
            Channel 1
          </button>
        </div>
        <div className="flex flex-col gap-2.5">
          <button
            className="bg-green500 hover:bg-green600 hover:shadow-lg mx-4 px-4 py-2 rounded-lg max-w-25 text-white transition-all duration-200 b-green500"
            onClick={onClose}
          >
            Channel 2
          </button>
        </div>
        <div className="flex flex-col gap-2.5">
          <button
            className="bg-green500 hover:bg-green600 hover:shadow-lg mx-4 px-4 py-2 rounded-lg min-w-24 text-white transition-all duration-200"
            onClick={onClose}
          >
            Channel 3
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddChannelModel;
