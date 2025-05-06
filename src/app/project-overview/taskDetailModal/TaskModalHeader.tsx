// src/components/TaskDetailModal/TaskModalHeader.tsx
import React from "react";
import { Button } from "@mui/material";
import { IoCloseOutline } from "react-icons/io5";

interface TaskModalHeaderProps {
  title: string;
  onClose: () => void;
}

const TaskModalHeader: React.FC<TaskModalHeaderProps> = ({ title, onClose }) => {
  return (
    <div className="flex justify-between items-center pl-8 pr-6 pt-5 pb-3 rounded-t-[20px] border-b border-gray400">
      <h1 className="text-black font-semibold text-2xl">{title}</h1>
      <Button
        onClick={onClose}
        variant="contained"
        color="primary"
        sx={{
          padding: 0,
          backgroundColor: "transparent",
          border: "1px solid var(--gray-400)",
          minWidth: "auto",
          borderRadius: "50%",
          color: "var(--gray-400)",
        }}
      >
        <IoCloseOutline className="w-5 h-5" />
      </Button>
    </div>
  );
};

export default TaskModalHeader;
