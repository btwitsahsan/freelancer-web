// src/components/TaskDetailModal/index.tsx
import React, { Dispatch, SetStateAction, useState } from "react";
import { Box, Modal, SelectChangeEvent } from "@mui/material";
import { Dayjs } from "dayjs";

import TaskModalHeader from "./TaskModalHeader";
import TaskDetailForm from "./TaskDetailForm";
import ActivitySection from "./ActivitySection";
import { Task } from "../board/taskboard";

const style = {
  position: "absolute",
  display: "flex",
  flexDirection: "column",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "1164px",
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "20px",
};

interface TaskDetailModalProps {
  task: Task | null;
  setTask: Dispatch<SetStateAction<Task | null>>;
}

const TaskDetailModal: React.FC<TaskDetailModalProps> = ({ task, setTask }) => {
  // Local state for form controls
  const [selectedProject, setSelectedProject] = useState("The Freelancer Website");
  const [selectedLead, setSelectedLead] = useState<string>("Artur Chornyi");
  const [selectedAssignee, setSelectedAssignee] = useState<string>("Artur Chornyi");
  const [selectedPriority, setSelectedPriority] = useState<string>("Urgent");
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [attachedFiles, setAttachedFiles] = useState<File[]>([]);
  const [notificationActive, setNotificationActive] = useState(false);

  const handleChangeProject = (event: SelectChangeEvent<string>) => {
    setSelectedProject(event.target.value as string);
  };
  const handleChangeLead = (event: SelectChangeEvent<string>) => {
    setSelectedLead(event.target.value as string);
  };
  const handleChangeAssignee = (event: SelectChangeEvent<string>) => {
    setSelectedAssignee(event.target.value as string);
  };
  const handleChangePriority = (event: SelectChangeEvent<string>) => {
    setSelectedPriority(event.target.value as string);
  };
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setAttachedFiles([...attachedFiles, ...Array.from(event.target.files)]);
    }
  };
  const handleRemoveFile = (index: number) => {
    setAttachedFiles(attachedFiles.filter((_, i) => i !== index));
  };
  const handleNotificationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNotificationActive(event.target.checked);
  };

  const handleSave = () => {
    // Save logic goes here.
    setTask(null);
  };

  return (
    <Modal
      open={!!task}
      onClose={() => setTask(null)}
      aria-labelledby="task-modal-title"
      aria-describedby="task-modal-description"
    >
      <Box sx={style}>
        {task && (
          <>
            <TaskModalHeader title="Task Details" onClose={() => setTask(null)} />
            <div className="flex rounded-b-[20px]">
              <TaskDetailForm
                task={task}
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
                attachedFiles={attachedFiles}
                handleFileChange={handleFileChange}
                handleRemoveFile={handleRemoveFile}
                notificationActive={notificationActive}
                handleNotificationChange={handleNotificationChange}
                onSave={handleSave}
              />
              <ActivitySection />
            </div>
          </>
        )}
      </Box>
    </Modal>
  );
};

export default TaskDetailModal;
