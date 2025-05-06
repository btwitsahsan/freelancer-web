// src/components/TaskDetailModal/TaskDetailForm.tsx
import React from "react";
import { SelectChangeEvent } from "@mui/material";
import { Dayjs } from "dayjs";
import { Task } from "../../board/taskboard"; // adjust the path if needed

import TaskDescriptionSection from "./TaskDescriptionSection";
import TaskSettingsSection from "./TaskSettingsSection";
import AttachedFilesSection from "./AttachedFilesSection";
import NotificationSection from "./NotificationSection";

interface TaskDetailFormProps {
  task: Task;
  selectedProject: string;
  handleChangeProject: (event: SelectChangeEvent<string>) => void;
  selectedLead: string;
  handleChangeLead: (event: SelectChangeEvent<string>) => void;
  selectedDate: Dayjs | null;
  setSelectedDate: (date: Dayjs | null) => void;
  selectedPriority: string;
  handleChangePriority: (event: SelectChangeEvent<string>) => void;
  selectedAssignee: string;
  handleChangeAssignee: (event: SelectChangeEvent<string>) => void;
  attachedFiles: File[];
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleRemoveFile: (index: number) => void;
  notificationActive: boolean;
  handleNotificationChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSave: () => void;
}

const TaskDetailForm: React.FC<TaskDetailFormProps> = (props) => {
  const {
    task,
    selectedProject,
    handleChangeProject,
    selectedLead,
    handleChangeLead,
    selectedDate,
    setSelectedDate,
    selectedPriority,
    handleChangePriority,
    selectedAssignee,
    handleChangeAssignee,
    attachedFiles,
    handleFileChange,
    handleRemoveFile,
    notificationActive,
    handleNotificationChange,
    onSave,
  } = props;

  return (
    <div className="flex-1 pl-8 pr-4 pt-6 pb-8 border-r border-gray400">
      <div className="flex flex-col gap-4">
        <TaskDescriptionSection title={task.title} />
        <TaskSettingsSection
          selectedProject={selectedProject}
          handleChangeProject={handleChangeProject}
          selectedLead={selectedLead}
          handleChangeLead={handleChangeLead}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          selectedPriority={selectedPriority}
          handleChangePriority={handleChangePriority}
          selectedAssignee={selectedAssignee}
          handleChangeAssignee={handleChangeAssignee}
        />
        <AttachedFilesSection
          attachedFiles={attachedFiles}
          handleFileChange={handleFileChange}
          handleRemoveFile={handleRemoveFile}
        />
        <NotificationSection
          notificationActive={notificationActive}
          handleNotificationChange={handleNotificationChange}
        />
        <button
          onClick={onSave}
          className="bg-gradient-to-r from-gradientStart to-gradientEnd text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all"
        >
          Save Task
        </button>
      </div>
    </div>
  );
};

export default TaskDetailForm;
