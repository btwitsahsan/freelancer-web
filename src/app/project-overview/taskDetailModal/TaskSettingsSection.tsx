// src/components/TaskDetailModal/TaskSettingsSection.tsx
import React from "react";
import { Select, MenuItem, Avatar } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";
import { SelectChangeEvent } from "@mui/material";

const projects = [
  "The Freelancer Website",
  "Omodor",
  "Rbretrage",
  "Marketing",
];
const priorities = ["Urgent", "Normal"];
const leads = [
  { name: "Artur Chornyi", avatarUrl: "/image/avatar/1.jpg" },
  { name: "Mayank Sharma", avatarUrl: "/image/avatar/2.jpg" },
  { name: "Junaid Ahamed", avatarUrl: "/image/avatar/3.jpg" },
  { name: "Sandip Singh", avatarUrl: "/image/avatar/4.jpg" },
];

interface TaskSettingsSectionProps {
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
}

const TaskSettingsSection: React.FC<TaskSettingsSectionProps> = ({
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
}) => {
  return (
    <>
      {/* Row: Choose Project & Lead */}
      <div className="flex gap-2">
        <div className="flex flex-col basis-1/2 gap-2">
          <div className="font-medium leading-none">Choose project</div>
          <Select
            labelId="project-select-label"
            id="project-select"
            value={selectedProject}
            onChange={handleChangeProject}
            sx={{
              ".MuiSelect-select": {
                padding: "8px 12px",
              },
            }}
          >
            {projects.map((project) => (
              <MenuItem key={project} value={project}>
                <div className="flex items-center min-h-[30px]">{project}</div>
              </MenuItem>
            ))}
          </Select>
        </div>
        <div className="flex flex-col basis-1/2 gap-2">
          <div className="font-medium leading-none">Lead</div>
          <Select
            labelId="lead-select-label"
            id="lead-select"
            value={selectedLead}
            onChange={handleChangeLead}
            sx={{
              ".MuiSelect-select": {
                padding: "8px 12px",
              },
            }}
          >
            {leads.map((lead) => (
              <MenuItem key={lead.name} value={lead.name}>
                <div className="flex items-center gap-2">
                  <Avatar
                    alt={lead.name}
                    src={lead.avatarUrl}
                    sx={{ width: "30px", height: "30px" }}
                  />
                  <div>{lead.name}</div>
                </div>
              </MenuItem>
            ))}
          </Select>
        </div>
      </div>

      {/* Row: Due Date/Time */}
      <div className="flex flex-col gap-2">
        <div className="font-medium leading-none">Due Date/Time</div>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <div className="flex gap-2">
            <DatePicker
              value={selectedDate}
              onChange={(newValue) => setSelectedDate(newValue)}
              slotProps={{ textField: { fullWidth: true } }}
              sx={{
                ".MuiInputBase-input": {
                  padding: "8px 12px",
                },
              }}
            />
          </div>
        </LocalizationProvider>
      </div>

      {/* Row: Priority & Assignee */}
      <div className="flex gap-2">
        <div className="flex flex-col basis-1/2 gap-2">
          <div className="font-medium leading-none">Task Priority</div>
          <Select
            labelId="priority-select-label"
            id="priority-select"
            value={selectedPriority}
            onChange={handleChangePriority}
            sx={{
              ".MuiSelect-select": {
                padding: "8px 12px",
              },
            }}
          >
            {priorities.map((priority) => (
              <MenuItem key={priority} value={priority}>
                <div className="flex items-center min-h-[30px]">{priority}</div>
              </MenuItem>
            ))}
          </Select>
        </div>
        <div className="flex flex-col basis-1/2 gap-2">
          <div className="font-medium leading-none">Task Assignee</div>
          <Select
            labelId="assignee-select-label"
            id="assignee-select"
            value={selectedAssignee}
            onChange={handleChangeAssignee}
            sx={{
              ".MuiSelect-select": {
                padding: "8px 12px",
              },
            }}
          >
            {leads.map((lead) => (
              <MenuItem key={lead.name} value={lead.name}>
                <div className="flex items-center gap-2">
                  <Avatar
                    alt={lead.name}
                    src={lead.avatarUrl}
                    sx={{ width: "30px", height: "30px" }}
                  />
                  <div>{lead.name}</div>
                </div>
              </MenuItem>
            ))}
          </Select>
        </div>
      </div>
    </>
  );
};

export default TaskSettingsSection;
