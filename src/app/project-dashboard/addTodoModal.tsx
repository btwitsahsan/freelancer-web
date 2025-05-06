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
    <div className="fixed inset-0 flex justify-center items-center z-50">
      <div className="w-full h-full bg-black opacity-10 absolute" />
      <div className="flex flex-col gap-5 bg-white rounded-lg shadow-lg p-5 w-full max-w-2xl z-10">
        <div className="flex justify-between gap-4">
          <h2 className="text-xl font-semibold">Add a to-do</h2>
          <button
            className="group flex justify-center items-center w-6 h-6 border border-gray500 rounded-full hover:border-red400 transition-all"
            onClick={onClose}
          >
            <FaXmark className="w-4 h-4 text-context group-hover:text-red400 transition-all" />
          </button>
        </div>
        <hr />
        <div className="flex items-center h-10 p-2.5 gap-2.5 bg-gray100 rounded-lg">
          <Icons.lightbulbon />
          <div className="text-sm text-gray500">
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
        <div className="flex justify-end h-10 gap-2.5">
          <button
            className="px-4 py-2 text-green500 transition-all duration-200 border border-transparent rounded-lg hover:text-red500 hover:bg-red100 hover:border-red500"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 text-green500 rounded-lg border border-green500 transition-all duration-200 hover:text-white hover:bg-green500"
            onClick={handleSaveAndAddAnother}
          >
            Save & add another
          </button>
          <button
            className="px-4 py-2 min-w-24 text-white bg-green500 rounded-lg transition-all duration-200 hover:bg-green600 hover:shadow-lg hover:scale-105"
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
