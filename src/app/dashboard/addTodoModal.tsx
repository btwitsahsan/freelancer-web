import {
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import Image from "next/image";
import React, { useState } from "react";
import { FaXmark } from "react-icons/fa6";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Task } from "@/types";
import { Icons } from "@/icons";
import { Dayjs } from "dayjs";

interface AddToDoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddTask: (task: Task) => void;
  onAddAnother: (task: Task) => void;
  index: number;
}

const AddToDoModal: React.FC<AddToDoModalProps> = ({
  isOpen,
  onClose,
  onAddTask,
  onAddAnother,
  index,
}) => {
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [description, setDescription] = useState<string>("");
  const [title, setTitle] = useState<string>("");

  const handleSave = () => {
    const newTask: Task = {
      id: index,
      status: "NOT_STARTED",
      type: "General",
      task: title,
      assignee: {
        avatar: "/image/avatar/1.jpg",
        name: "You",
      },
      dueDate: selectedDate
        ? selectedDate.format("MMM D, YYYY")
        : "No due date",
      description: description,
    };
    onAddTask(newTask);
  };

  const handleSaveAndAddAnother = () => {
    const newTask: Task = {
      id: index,
      status: "NOT_STARTED",
      type: "General",
      task: title,
      assignee: {
        avatar: "/image/avatar/1.jpg",
        name: "You",
      },
      dueDate: selectedDate
        ? selectedDate.format("MMM D, YYYY")
        : "No due date",
      description: description,
    };
    onAddAnother(newTask);
    resetForm();
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setSelectedDate(null);
  };

  if (!isOpen) return null;

  return (
    <div className="z-50 fixed inset-0 flex justify-center items-center">
      <div className="absolute bg-black opacity-10 w-full h-full" />
      <div className="z-10 flex flex-col gap-5 bg-white shadow-lg p-5 rounded-lg w-full max-w-2xl">
        <div className="flex justify-between gap-4">
          <h2 className="font-semibold text-xl">Add a to-do</h2>
          <button
            className="group flex justify-center items-center border-gray500 border hover:border-red400 rounded-full w-6 h-6 transition-all"
            onClick={onClose}
          >
            <FaXmark className="group-hover:text-red400 w-4 h-4 text-context transition-all" />
          </button>
        </div>
        <hr />
        <div className="flex items-center gap-2.5 bg-gray100 p-2.5 rounded-lg h-10">
          <Icons.lightbulbon />
          <div className="text-gray500 text-sm">
            Make sure to discuss project expectations before you create or edit
            to-dos
          </div>
        </div>
        <div className="flex flex-col gap-2.5">
          <FormLabel
            sx={{
              fontSize: "18px",
              fontWeight: "500",
              lineHeight: 1,
              color: "var(--black-color)",
            }}
          > 
            Title
          </FormLabel>
          <TextField
            variant="outlined"
            size="small"
            fullWidth
            placeholder="Title"
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
          <FormLabel
            sx={{
              fontSize: "14px",
              fontWeight: "500",
              lineHeight: 1.2,
              color: "var(--black-color)",
            }}
          >
            To be completed by
          </FormLabel>
          <RadioGroup row={false} defaultValue="you">
            <FormControlLabel
              value="you"
              control={<Radio />}
              label={
                <div className="flex items-center gap-2.5">
                  <Image
                    src="/image/avatar/1.jpg"
                    alt="Avatar"
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                  <span>You</span>
                </div>
              }
              sx={{
                ".Mui-checked": {
                  color: "var(--green-500) !important",
                },
              }}
            />
            <FormControlLabel
              value="john"
              control={<Radio />}
              label="John Donald Doe"
              sx={{
                ".Mui-checked": {
                  color: "var(--green-500) !important",
                },
              }}
            />
          </RadioGroup>
        </div>
        <div className="flex flex-col gap-2.5">
          <FormLabel
            sx={{
              fontSize: "14px",
              fontWeight: "500",
              lineHeight: 1.2,
              color: "var(--black-color)",
            }}
          >
            Due date (optional)
          </FormLabel>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              value={selectedDate}
              onChange={(newValue) => setSelectedDate(newValue)}
              format="MMM D, YYYY"
              sx={{
                ".MuiInputBase-root": {
                  borderRadius: "8px",
                  fontSize: "14px",
                },
                ".MuiInputBase-input": {
                  paddingTop: "10px",
                  paddingBottom: "10px",
                },
                ".Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "var(--green-500) !important",
                },
              }}
            />
          </LocalizationProvider>
        </div>
        <div className="flex flex-col gap-2.5">
          <FormLabel
            sx={{
              fontSize: "14px",
              fontWeight: "500",
              lineHeight: 1.2,
              color: "var(--black-color)",
            }}
          >
            Description (optional)
          </FormLabel>
          <TextField
            variant="outlined"
            size="small"
            fullWidth
            multiline
            rows={6}
            placeholder="Enter a description..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
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
        <div className="flex justify-end gap-2.5 h-10">
          <button
            className="hover:bg-red100 px-4 py-2 border border-transparent hover:border-red500 rounded-lg text-green500 hover:text-red500 transition-all duration-200"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="border-green500 hover:bg-green500 px-4 py-2 border rounded-lg text-green500 hover:text-white transition-all duration-200"
            onClick={handleSaveAndAddAnother}
          >
            Save & add another
          </button>
          <button
            className="bg-green500 hover:bg-green600 hover:shadow-lg px-4 py-2 rounded-lg min-w-24 text-white transition-all duration-200 hover:scale-105"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddToDoModal;
