import {
  Avatar,
  Box,
  Button,
  MenuItem,
  Modal,
  Select,
  SelectChangeEvent,
  Switch,
} from "@mui/material";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { FiBell, FiSearch } from "react-icons/fi";
import Image from "next/image";
import { FaThumbsUp } from "react-icons/fa";
import {
  TmProjectType,
  TmRoleWithUserDataType,
  TmTaskWithFullDataType,
  apiUrl,
  priorities,
} from "@/utils/constant";
import axios from "axios";
import { toast } from "react-toastify";

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

const TaskDetailModal = ({
  task,
  setTask,
  tmProjects,
  tmProject,
  tasks,
  setTasks,
}: {
  task: TmTaskWithFullDataType | null;
  setTask: Dispatch<SetStateAction<TmTaskWithFullDataType | null>>;
  tmProjects: TmProjectType[];
  tmProject: TmProjectType | null | undefined;
  tasks: TmTaskWithFullDataType[] | [];
  setTasks: Dispatch<SetStateAction<TmTaskWithFullDataType[] | []>>;
}) => {
  const [selectedProject, setSelectedProject] = useState<TmProjectType | null>(
    tmProject || null
  );
  const [members, setMembers] = useState<TmRoleWithUserDataType[] | []>([]);
  const [selectedLead, setSelectedLead] = useState<TmRoleWithUserDataType>();
  const [isMobile, setIsMobile] = useState(false);
  const [showActivity, setShowActivity] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    borderRadius: "20px",
    boxShadow: 24,
    maxHeight: "90vh",
    maxWidth: "95vw",
    width: isMobile ? "95%" : "1100px",
    overflow: "hidden",
  };

  const toggleActivity = () => {
    setShowActivity(!showActivity);
  };

  const [selectedAssignee, setSelectedAssignee] =
    useState<TmRoleWithUserDataType>();
  const [taskDescription, setTaskDescription] = useState<string>(
    task && task.description ? task.description : ""
  );
  const [selectedPriority, setSelectedPriority] = useState<string>(
    task && task.priority ? task.priority : ""
  );
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(
    task && task.dueDate ? dayjs(task.dueDate) : null
  );
  const [attachedFiles, setAttachedFiles] = useState<File[]>([]);
  const [notificationActive, setNotificationActive] = useState(false);

  useEffect(() => {
    setSelectedProject(tmProject ?? null);
    task?.dueDate && setSelectedDate(dayjs(task?.dueDate));
    task?.description && setTaskDescription(task?.description);
    task?.priority && setSelectedPriority(task?.priority);
    if (task?.lead) {
      const leadId = task.lead._id;
      const selectedUser = members.find((member) => member.user._id === leadId);
      setSelectedLead(selectedUser);
    }
    if (task?.assignee) {
      const assigneeId = task.assignee._id;
      const selectedUser = members.find(
        (member) => member.user._id === assigneeId
      );
      setSelectedAssignee(selectedUser);
    }
  }, [tmProject, task]);

  useEffect(() => {
    if (selectedProject) {
      const token = localStorage.getItem("freelancingPlatformAuthToken");

      axios
        .get(`${apiUrl}/api/tmProjects/project/users`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            projectId: selectedProject._id,
          },
        })
        .then((res) => {
          setMembers(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [selectedProject]);

  const handleChangeProject = (event: SelectChangeEvent<string>) => {
    const selectedProjectId = event.target.value;
    const selectedProject1 = tmProjects.find(
      (project) => project._id === selectedProjectId
    );
    if (selectedProject1) setSelectedProject(selectedProject1);
  };

  const handleChangeLead = (event: SelectChangeEvent<string>) => {
    const selectedUserId = event.target.value;
    const selectedUser = members.find(
      (member) => member.user._id === selectedUserId
    );
    if (selectedUser) setSelectedLead(selectedUser);
  };

  const handleChangeAssignee = (event: SelectChangeEvent<string>) => {
    const selectedUserId = event.target.value;
    const selectedUser = members.find(
      (member) => member.user._id === selectedUserId
    );
    if (selectedUser) setSelectedAssignee(selectedUser);
  };

  const handleChangePriority = (event: SelectChangeEvent<string>) => {
    setSelectedPriority(event.target.value as string);
  };

  const handleChangeDescription = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setTaskDescription(event.target.value);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setAttachedFiles([...attachedFiles, ...Array.from(event.target.files)]);
    }
  };

  const handleRemoveFile = (index: number) => {
    setAttachedFiles(attachedFiles.filter((_, i) => i !== index));
  };

  const handleNotificationChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNotificationActive(event.target.checked);
  };

  const handleSaveTask = async () => {
    const token = localStorage.getItem("freelancingPlatformAuthToken");

    const payload = {
      project: selectedProject?._id || null,
      lead: selectedLead?.user._id || null,
      assignee: selectedAssignee?.user._id || null,
      priority: selectedPriority || null,
      dueDate: selectedDate ? selectedDate.toISOString() : null,
      description: taskDescription || "",
    };

    try {
      await axios
        .put(`${apiUrl}/api/tmProjects/task/${task?._id}`, payload, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          let updatedTasks: TmTaskWithFullDataType[] = [];

          tasks.map((item) => {
            if (item._id !== task?._id) {
              updatedTasks.push(item);
            } else {
              if (task?.project && res.data.project._id === task.project._id) {
                updatedTasks.push(res.data);
              }
            }
          });

          setTasks(updatedTasks);
          toast.success("Task updated success.");
          setTask(null);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <Modal
      open={!!task}
      onClose={() => setTask(null)}
      aria-labelledby="task-modal-title"
      aria-describedby="task-modal-description"
    >
      <Box sx={style} className="flex flex-col">
        {task && (
          <>
            <div className="flex justify-between items-center pl-4 sm:pl-8 pr-4 sm:pr-6 pt-4 sm:pt-5 pb-3 rounded-t-[20px] border-b border-gray400">
              {" "}
              <h1 className="text-black font-semibold text-xl sm:text-2xl">
                Task Details
              </h1>
              <Button
                onClick={() => setTask(null)}
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

            <div className="flex flex-col md:flex-row rounded-b-[20px] max-h-[calc(90vh-70px)] overflow-auto">
              {/* Main Content - Left Side */}
              <div
                className={`flex-1 p-4 sm:pl-8 sm:pr-4 sm:pt-6 sm:pb-8 ${
                  isMobile && showActivity ? "hidden" : "block"
                } ${!isMobile ? "border-r border-gray400" : ""}`}
              >
                <div className="flex flex-col gap-4">
                  <h2 className="text-xl sm:text-2xl font-medium leading-none">
                    {task.name}
                  </h2>

                  {/* Task Description */}
                  <div className="flex flex-col gap-2">
                    <div className="font-medium leading-none">
                      Task Description
                    </div>
                    <textarea
                      className="border rounded-lg p-4 w-full"
                      rows={isMobile ? 4 : 6}
                      value={taskDescription}
                      onChange={handleChangeDescription}
                    />
                  </div>

                  {/* Project and Lead Selection */}
                  <div className="flex flex-col sm:flex-row gap-4 sm:gap-2">
                    <div className="flex flex-col sm:basis-1/2 gap-2">
                      <div className="font-medium leading-none">
                        Choose project
                      </div>
                      <Select
                        labelId="project-select-label"
                        id="project-select"
                        value={selectedProject ? selectedProject._id : ""}
                        onChange={handleChangeProject}
                        sx={{
                          ".MuiSelect-select": {
                            padding: "8px 12px",
                          },
                        }}
                        fullWidth
                      >
                        {tmProjects.map((project) => (
                          <MenuItem key={project._id} value={project._id}>
                            <div className="flex items-center min-h-[30px]">
                              {project.title}
                            </div>
                          </MenuItem>
                        ))}
                      </Select>
                    </div>
                    <div className="flex flex-col sm:basis-1/2 gap-2">
                      <div className="font-medium leading-none">Lead</div>
                      <Select
                        labelId="lead-select-label"
                        id="lead-select"
                        value={selectedLead ? selectedLead.user._id : ""}
                        onChange={handleChangeLead}
                        sx={{
                          ".MuiSelect-select": {
                            padding: "8px 12px",
                          },
                        }}
                        fullWidth
                      >
                        {members.map((lead) => (
                          <MenuItem
                            key={lead.user.fullName}
                            value={lead.user._id}
                          >
                            <div className="flex items-center gap-2">
                              <Avatar
                                alt={lead.user.fullName}
                                src={lead.user.avatar}
                                sx={{ width: "30px", height: "30px" }}
                              />
                              <div>{lead.user.fullName ?? ""}</div>
                            </div>
                          </MenuItem>
                        ))}
                      </Select>
                    </div>
                  </div>

                  {/* Due Date */}
                  <div className="flex flex-col gap-2">
                    <div className="font-medium leading-none">
                      Due Date/Time
                    </div>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <div className="flex">
                        <DatePicker
                          value={selectedDate}
                          onChange={(newValue) => setSelectedDate(newValue)}
                          slotProps={{ textField: { fullWidth: true } }}
                          sx={{
                            ".MuiInputBase-input": {
                              padding: "8px 12px",
                            },
                            width: "100%",
                          }}
                        />
                      </div>
                    </LocalizationProvider>
                  </div>

                  {/* Priority and Assignee */}
                  <div className="flex flex-col sm:flex-row gap-4 sm:gap-2">
                    <div className="flex flex-col sm:basis-1/2 gap-2">
                      <div className="font-medium leading-none">
                        Task Priority
                      </div>
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
                        fullWidth
                      >
                        {priorities.map((priority) => (
                          <MenuItem key={priority} value={priority}>
                            <div className="flex items-center min-h-[30px]">
                              {priority}
                            </div>
                          </MenuItem>
                        ))}
                      </Select>
                    </div>
                    <div className="flex flex-col sm:basis-1/2 gap-2">
                      <div className="font-medium leading-none">
                        Task Assignee
                      </div>
                      <Select
                        labelId="assignee-select-label"
                        id="assignee-select"
                        value={
                          selectedAssignee ? selectedAssignee.user._id : ""
                        }
                        onChange={handleChangeAssignee}
                        sx={{
                          ".MuiSelect-select": {
                            padding: "8px 12px",
                          },
                        }}
                        fullWidth
                      >
                        {members.map((member) => (
                          <MenuItem
                            key={member.user.fullName}
                            value={member.user._id}
                          >
                            <div className="flex items-center gap-2">
                              <Avatar
                                alt={member.user.fullName}
                                src={member.user.avatar}
                                sx={{ width: "30px", height: "30px" }}
                              />
                              <div>{member.user.fullName ?? ""}</div>
                            </div>
                          </MenuItem>
                        ))}
                      </Select>
                    </div>
                  </div>

                  {/* File Upload */}
                  <div className="flex flex-col gap-2">
                    <div className="font-medium leading-none">
                      Attached Files
                    </div>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center w-full gap-4">
                      <input
                        type="file"
                        multiple
                        onChange={handleFileChange}
                        className="max-w-full"
                      />
                      <div className="flex flex-wrap gap-2 max-w-full overflow-x-auto">
                        {attachedFiles.map((file, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between border rounded-lg p-2"
                          >
                            <div className="whitespace-nowrap text-ellipsis overflow-hidden max-w-20">
                              <strong>{file.name}</strong> (
                              {(file.size / 1024).toFixed(2)} KB)
                            </div>
                            <button
                              className="border border-gray400 rounded-full hover:shadow-lg transition-all ml-2"
                              onClick={() => handleRemoveFile(index)}
                            >
                              <IoCloseOutline className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Notifications Toggle */}
                  <div className="flex items-center border border-gray400 rounded-lg p-2.5 gap-5">
                    <div className="flex-1 flex flex-col gap-2">
                      <div className="text-sm">Activate Notifications</div>
                      <div className="text-sm text-gray-500">
                        Task reminder will be sent to task assignee and task
                        creator
                      </div>
                      <button
                        onClick={handleSaveTask}
                        className="bg-gradient-to-r from-gradientStart to-gradientEnd text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all w-full sm:w-auto"
                      >
                        Save Task
                      </button>
                    </div>
                    <Switch
                      checked={notificationActive}
                      onChange={handleNotificationChange}
                      size="medium"
                    />
                    <div className="flex justify-end">
                      <div className="flex items-center border border-gray400 rounded-lg p-2.5 gap-5">
                        <div className="flex-1 flex flex-col gap-2">
                          <div className="text-sm">Activate Notifications</div>
                          <div className="text-sm text-gray-500">
                            Task reminder will be sent to task assignee and task
                            creator
                          </div>
                        </div>
                        <Switch
                          checked={notificationActive}
                          onChange={handleNotificationChange}
                          size="medium"
                        />
                        {/* Mobile Activity Toggle */}
                        {isMobile && (
                          <button
                            onClick={toggleActivity}
                            className="bg-blue-100 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-200 transition-all"
                          >
                            View Activity
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Save Button */}
                </div>
              </div>

              {/* Activity Panel - Right Side */}
              <div
                className={`${
                  isMobile && !showActivity ? "hidden" : "flex"
                } flex-col bg-gray100 w-full md:w-[450px] max-h-[calc(90vh-70px)] overflow-auto`}
              >
                <div className="flex justify-between items-center">
                  <div className="flex-1">
                    <div className="flex items-center justify-between px-4 py-3 border-b border-gray400 gap-2.5 bg-white">
                      <div className="leading-none">Activity</div>
                      <div className="flex gap-2">
                        <button className="hover:text-blue400 transition-all">
                          <FiSearch />
                        </button>
                        <button className="flex items-center gap-1 hover:text-blue400 transition-all">
                          <FiBell />
                          <div>2</div>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Mobile Back Button */}
                  {isMobile && showActivity && (
                    <button
                      onClick={toggleActivity}
                      className="absolute top-4 right-4 bg-gray-200 p-2 rounded-full"
                    >
                      <IoCloseOutline className="w-5 h-5" />
                    </button>
                  )}
                </div>

                <div className="flex flex-1">
                  <div className="flex-1 flex flex-col border-r border-gray400">
                    <div className="flex flex-col gap-2 p-4 flex-1">
                      <div className="flex-1 flex flex-col gap-2.5">
                        {/* Activity Items */}
                        {[1, 2, 3].map((index) => (
                          <div
                            key={index}
                            className="flex p-2.5 border border-white rounded-lg gap-2.5 hover:border-gray500 transition-all"
                          >
                            <div className="w-6">
                              <Image
                                src="/image/avatar/1.jpg"
                                alt="User Avatar"
                                width={24}
                                height={24}
                              />
                            </div>
                            <div className="flex-1 flex flex-col gap-1">
                              <div className="text-black font-semibold text-sm">
                                Brooklyn
                              </div>
                              <div className="text-gray-500 text-xs">
                                we are 1 week away from launch! Thank you for
                                every team member for their hard work.
                              </div>
                              <div className="flex justify-between gap-5">
                                <div className="text-gray400 text-xs">
                                  2 hours ago
                                </div>
                                <div className="flex-1 justify-start">
                                  <button className="flex items-center gap-1.5 text-xs text-blue400 hover:text-blue500 transition-all">
                                    <span>5</span>
                                    <FaThumbsUp />
                                  </button>
                                </div>
                                <button className="text-gray500 text-xs hover:text-blue400 transition-all">
                                  Reply
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Comment Box */}
                      <div className="flex flex-col px-2.5 py-1.5 border border-gray300 rounded gap-2.5 bg-white">
                        <textarea
                          className="outline-none resize-none text-sm w-full"
                          placeholder="Reply or post an update"
                          rows={2}
                        ></textarea>
                        <div className="flex justify-between">
                          <div className="flex gap-1">
                            <button className="w-6 h-6 rounded p-1 hover:bg-gray-200 transition-all">
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M5.75 8C6.16421 8 6.5 7.66421 6.5 7.25C6.5 6.83579 6.16421 6.5 5.75 6.5C5.33579 6.5 5 6.83579 5 7.25C5 7.66421 5.33579 8 5.75 8Z"
                                  fill="#828282"
                                />
                                <path
                                  d="M8.00154 12C6.58216 12 5.38841 11.0772 5.0106 9.81784C5.00003 9.78036 4.99837 9.74093 5.00574 9.7027C5.0131 9.66446 5.0293 9.62848 5.05304 9.59761C5.07677 9.56674 5.10739 9.54184 5.14245 9.5249C5.17751 9.50796 5.21604 9.49944 5.25498 9.50003H10.7453C10.7842 9.49944 10.8228 9.50796 10.8578 9.5249C10.8929 9.54184 10.9235 9.56674 10.9472 9.59761C10.971 9.62848 10.9872 9.66446 10.9945 9.7027C11.0019 9.74093 11.0002 9.78036 10.9897 9.81784C10.615 11.0772 9.42091 12 8.00154 12Z"
                                  fill="#828282"
                                />
                                <path
                                  d="M10.25 8C10.6642 8 11 7.66421 11 7.25C11 6.83579 10.6642 6.5 10.25 6.5C9.83579 6.5 9.5 6.83579 9.5 7.25C9.5 7.66421 9.83579 8 10.25 8Z"
                                  fill="#828282"
                                />
                                <path
                                  d="M8 14.5C11.5899 14.5 14.5 11.5899 14.5 8C14.5 4.41015 11.5899 1.5 8 1.5C4.41015 1.5 1.5 4.41015 1.5 8C1.5 11.5899 4.41015 14.5 8 14.5Z"
                                  stroke="#828282"
                                  strokeWidth="1.2"
                                  strokeMiterlimit="10"
                                />
                              </svg>
                            </button>

                            <button className="w-6 h-6 rounded p-1 hover:bg-gray-200 transition-all">
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M6.75251 5.99986V10.4952C6.75771 10.8239 6.89193 11.1374 7.12623 11.368C7.36052 11.5986 7.6761 11.7279 8.00486 11.7279C8.33361 11.7279 8.64919 11.5986 8.88349 11.368C9.11778 11.1374 9.25201 10.8239 9.2572 10.4952L9.26126 4.60298C9.26467 4.32202 9.21228 4.04318 9.10712 3.78262C9.00196 3.52206 8.84612 3.28497 8.64865 3.08508C8.45118 2.8852 8.21599 2.7265 7.95673 2.61819C7.69746 2.50987 7.41928 2.4541 7.1383 2.4541C6.85732 2.4541 6.57913 2.50987 6.31987 2.61819C6.0606 2.7265 5.82541 2.8852 5.62794 3.08508C5.43047 3.28497 5.27463 3.52206 5.16947 3.78262C5.06431 4.04318 5.01192 4.32202 5.01533 4.60298V10.5349C5.0096 10.9304 5.08257 11.3231 5.22998 11.6902C5.37739 12.0573 5.5963 12.3915 5.87399 12.6732C6.15169 12.955 6.48262 13.1787 6.84754 13.3314C7.21247 13.4841 7.60411 13.5627 7.9997 13.5627C8.39529 13.5627 8.78693 13.4841 9.15186 13.3314C9.51679 13.1787 9.84772 12.955 10.1254 12.6732C10.4031 12.3915 10.622 12.0573 10.7694 11.6902C10.9168 11.3231 10.9898 10.9304 10.9841 10.5349V4.99173"
                                  stroke="#828282"
                                  strokeWidth="1.2"
                                  strokeMiterlimit="10"
                                  strokeLinecap="round"
                                />
                              </svg>
                            </button>
                          </div>
                          <button className="flex justify-center items-center w-16 h-6 text-sm text-white bg-blue400 rounded hover:bg-blue500 hover:shadow-sm transition-all">
                            Send
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Icons */}
                  <div className="hidden sm:flex flex-col gap-4 w-14 p-2.5">
                    <button className="flex justify-center items-center bg-green200 w-9 h-9 rounded">
                      <svg
                        width="28"
                        height="28"
                        viewBox="0 0 28 28"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M23.3333 10.4997C22.4056 5.84998 18.0983 2.33301 12.9258 2.33301C7.0764 2.33301 2.33333 6.83075 2.33333 12.378C2.33333 15.0434 3.42788 17.4651 5.2133 19.2623C5.6064 19.658 5.86885 20.1986 5.76293 20.755C5.58812 21.6648 5.19196 22.5134 4.61189 23.2207C6.1381 23.5021 7.72504 23.2487 9.08601 22.5312C9.56712 22.2776 9.80766 22.1508 9.97741 22.125C10.0962 22.1071 10.251 22.1239 10.5 22.1666"
                          stroke="#34D399"
                          strokeWidth="2.25"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M12.8333 18.9717C12.8333 22.3616 15.7066 25.1103 19.25 25.1103C19.6666 25.1108 20.0821 25.0723 20.4913 24.9955C20.7859 24.9401 20.9333 24.9124 21.036 24.9282C21.1388 24.9438 21.2847 25.0214 21.5761 25.1763C22.4005 25.6148 23.3618 25.7696 24.2864 25.5976C23.935 25.1655 23.695 24.6469 23.5891 24.0909C23.5249 23.7509 23.6839 23.4205 23.922 23.1787C25.0036 22.0804 25.6667 20.6004 25.6667 18.9717C25.6667 15.5817 22.7934 12.833 19.25 12.833C15.7066 12.833 12.8333 15.5817 12.8333 18.9717Z"
                          stroke="#34D399"
                          strokeWidth="2.25"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                    <hr />
                    <button className="group flex justify-center items-center hover:bg-green200 w-9 h-9 rounded transition-all">
                      <svg
                        width="28"
                        height="28"
                        viewBox="0 0 28 28"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11.6667 15.4342C11.8319 15.7047 12.028 15.9608 12.2549 16.1969C13.6637 17.6631 15.8109 17.8923 17.4505 16.8846C17.7543 16.6978 18.0406 16.4686 18.3017 16.1969L22.081 12.2636C23.7508 10.5258 23.7508 7.70821 22.081 5.97037C20.4112 4.23253 17.7039 4.23254 16.0341 5.97037L15.2017 6.83674"
                          stroke="#6B7280"
                          strokeWidth="1.75"
                          strokeLinecap="round"
                        />
                        <path
                          d="M12.7987 21.1633L11.9659 22.0299C10.2961 23.7678 7.58884 23.7678 5.91903 22.0299C4.24922 20.2921 4.24922 17.4746 5.91903 15.7367L9.69836 11.8034C11.3682 10.0655 14.0755 10.0655 15.7452 11.8034C15.9721 12.0394 16.1681 12.2955 16.3333 12.5659"
                          stroke="#6B7280"
                          strokeWidth="1.75"
                          strokeLinecap="round"
                        />
                      </svg>
                    </button>
                    <button className="group flex justify-center items-center hover:bg-green200 w-9 h-9 rounded transition-all">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2"
                          stroke="#6B7280"
                          strokeWidth="1.5"
                        />
                        <path
                          d="M16.5 9C17.3284 9 18 8.32843 18 7.5C18 6.67157 17.3284 6 16.5 6C15.6716 6 15 6.67157 15 7.5C15 8.32843 15.6716 9 16.5 9Z"
                          stroke="#6B7280"
                          strokeWidth="1.5"
                        />
                        <path
                          d="M16 22C15.3805 19.7749 13.9345 17.7821 11.8765 16.3342C9.65761 14.7729 6.87163 13.9466 4.01569 14.0027C3.67658 14.0019 3.33776 14.0127 3 14.0351"
                          stroke="#6B7280"
                          strokeWidth="1.5"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M13 18C14.7015 16.6733 16.5345 15.9928 18.3862 16.0001C19.4362 15.999 20.4812 16.2216 21.5 16.6617"
                          stroke="#6B7280"
                          strokeWidth="1.5"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </Box>
    </Modal>
  );
};
export default TaskDetailModal;
