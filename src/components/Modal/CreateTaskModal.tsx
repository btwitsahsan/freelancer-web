"use client";

import { TmTaskType, TmUserType } from "@/utils/constant";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { RiCloseCircleLine } from "react-icons/ri";
import axios from "axios";
import { apiUrl } from "@/utils/constant";

interface ModalProps {
  projectId?: string;
  tmUsers: TmUserType[];
  isOpen: boolean;
  onClose: () => void;
}

type ErrorType = {
  name?: string;
  description?: string;
};

const CreateTaskModal = ({
  projectId,
  tmUsers,
  isOpen,
  onClose,
}: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [tmTask, setTmTask] = useState<TmTaskType>({ project: projectId });
  const [query, setQuery] = useState<string>("");
  const [queryAssignee, setQueryAssignee] = useState<string>("");
  const [filteredLeads, setFilteredLeads] = useState<TmUserType[]>([]);
  const [filteredAssignee, setFilteredAssignee] = useState<TmUserType[]>([]);
  const [error, setError] = useState<ErrorType>();
  const [handleOpen, setHandleOpen] = useState(false);

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose?.();
      }
    },
    [onClose, modalRef]
  );

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const selectedFiles = Array.from(event.target.files);
      setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
    }
  };

  const handleFileRemove = (fileName: string) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file.name !== fileName));
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside, isOpen]);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    type: string
  ) => {
    const inputValue = event.target.value;
    if (type === "lead") {
      setQuery(inputValue);
    } else {
      setQueryAssignee(inputValue);
    }

    if (inputValue) {
      const matches = tmUsers.filter((user) =>
        user.user.fullName.toLowerCase().includes(inputValue.toLowerCase())
      );
      if (type === "lead") {
        setFilteredLeads(matches);
      } else {
        setFilteredAssignee(matches);
      }
    } else {
      setFilteredLeads([]);
      setFilteredAssignee([]);
    }
  };

  const handlePriorityChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedPriority = event.target.value;
    setTmTask({ ...tmTask, priority: selectedPriority });
  };

  const handleSaveTask = () => {
    let hasError = false;
    const newError = { ...error };

    if (!tmTask?.name) {
      newError.name = "Task name is required.";
      hasError = true;
    } else {
      newError.name = "";
    }

    if (!tmTask?.description) {
      newError.description = "Task description is required.";
      hasError = true;
    } else {
      newError.description = "";
    }

    setError(newError);

    if (!hasError) {
      console.log("Saving task:", tmTask);
      setError({});

      const token = localStorage.getItem("freelancingPlatformAuthToken");
      const formData = new FormData();
      if (tmTask.name) {
        formData.append("name", tmTask.name);
      }
      if (tmTask.description) {
        formData.append("description", tmTask.description);
      }
      if (projectId) {
        formData.append("project", projectId);
      }
      if (tmTask.lead) {
        formData.append("lead", tmTask.lead);
      }
      if (tmTask.dueDate) {
        formData.append("dueDate", tmTask.dueDate.toISOString());
      }
      if (tmTask.priority) {
        formData.append("priority", tmTask.priority);
      }
      if (tmTask.assignee) {
        formData.append("assignee", tmTask.assignee);
      }

      files.forEach((file) => formData.append("attachments", file));

      axios
        .post(`${apiUrl}/api/tmProjects/tasks/new`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          console.log(res.data);
          onClose?.();
        })
        .catch((error) => {
          console.log(error);
        });

      setError({});
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#17171819] flex justify-center items-center z-50 p-4">
      <div
        ref={modalRef}
        className="flex flex-col gap-4 bg-white max-h-[90vh] w-full max-w-2xl p-4 sm:p-6 rounded-lg shadow-xl overflow-auto"
      >
        <div className="border-b pb-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">
              Add Task
            </h2>
            <button
              className="text-gray500 hover:rotate-90 transition-all"
              onClick={onClose}
            >
              <RiCloseCircleLine className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2.5">
            <label className="block text-sm font-medium text-gray-700">
              Name the task
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green500"
              onChange={(e) => setTmTask({ ...tmTask, name: e.target.value })}
            />
            {error && error.name ? (
              <p className="text-red-600">{error.name}</p>
            ) : (
              ""
            )}
          </div>

          <div className="flex flex-col gap-2.5">
            <label className="block text-sm font-medium text-gray-700">
              Task Description
            </label>
            <textarea
              rows={4}
              className="w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green500"
              onChange={(e) =>
                setTmTask({ ...tmTask, description: e.target.value })
              }
            />
            {error && error.description ? (
              <p className="text-red-600">{error.description}</p>
            ) : (
              ""
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* <div className="flex flex-col gap-2.5">
            <label className="block text-sm font-medium text-gray-700">
              Choose Project
            </label>
            <select className="w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green500">
              <option>Project Name</option>
              <option>Project A</option>
              <option>Project B</option>
            </select>
          </div> */}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2.5 relative">
              <label className="block text-sm font-medium text-gray-700">
                Lead
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Name Surname"
                  className="w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green500"
                  value={query}
                  onChange={(e) => handleInputChange(e, "lead")}
                />
                {filteredLeads.length > 0 && (
                  <ul className="absolute z-10 w-full bg-white border border-gray-200 rounded-lg shadow-lg mt-1 max-h-60 overflow-auto">
                    {" "}
                    {filteredLeads.map((user, index) => (
                      <li
                        key={index}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => {
                          setQuery(user.user.fullName);
                          setFilteredLeads([]);
                          setTmTask({ ...tmTask, lead: user.user._id });
                        }}
                      >
                        {user.user.fullName}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="flex flex-col gap-2.5">
                <label className="block text-sm font-medium text-gray-700">
                  Due Date/Time
                </label>
                <div className="flex items-center gap-4 w-full justify-between">
                  <input
                    type="date"
                    className="w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green500"
                    onChange={(e) =>
                      setTmTask({
                        ...tmTask,
                        dueDate: new Date(e.target.value),
                      })
                    }
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-2">
              <div className="flex flex-col gap-2.5">
                <label className="block text-sm font-medium text-gray-700">
                  Task Priority
                </label>
                <select
                  className="w-full px-1 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green500"
                  value={tmTask?.priority ?? ""}
                  onChange={handlePriorityChange}
                >
                  <option value="" disabled>
                    Select priority
                  </option>
                  <option value="Urgent">Urgent</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>

              <div className="flex flex-col gap-2.5">
                <label className="block text-sm font-medium text-gray-700">
                  Task Assignee
                </label>
                <input
                  type="text"
                  placeholder="Name Surname"
                  className="w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green500"
                  value={queryAssignee}
                  onChange={(e) => handleInputChange(e, "assignee")}
                />
                {filteredAssignee.length > 0 && (
                  <ul className="absolute z-10 bg-white border border-gray-200 rounded-lg shadow-lg mt-[70px] max-h-60 overflow-auto">
                    {filteredAssignee.map((user, index) => (
                      <li
                        key={index}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => {
                          setQueryAssignee(user.user.fullName);
                          setFilteredAssignee([]);
                          setTmTask({ ...tmTask, assignee: user.user._id });
                        }}
                      >
                        {user.user.fullName}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-2.5">
              <label className="block text-sm font-medium text-gray-700">
                Attached File
              </label>
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex items-center gap-4">
                  <label
                    htmlFor="file-input"
                    className="flex items-center px-4 py-2 border rounded-md text-sm text-gray500 hover:bg-gray100 cursor-pointer whitespace-nowrap transition-all"
                  >
                    <FiPlus />
                    &nbsp;Attach File
                  </label>
                  <input
                    id="file-input"
                    type="file"
                    multiple
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </div>

                <div className="flex flex-wrap gap-2 items-center">
                  {files.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 border px-3 py-1 rounded-md max-w-full"
                    >
                      <span className="text-gray-700 text-sm truncate max-w-[120px] sm:max-w-[200px]">
                        {file.name}
                      </span>
                      <span className="text-gray400 text-xs">
                        {(file.size / 1024 / 1024).toFixed(2)}MB
                      </span>
                      <button
                        className="text-gray500 hover:text-red500"
                        onClick={() => handleFileRemove(file.name)}
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="w-80 flex flex-col sm:flex-row border p-2 rounded-md items-center justify-between gap-2">
              <div className="flex-1">
                <p className="text-sm text-gray-700">Activate Notifications</p>
                <p className="text-xs text-gray500">
                  Task reminder will be sent to task assignee and task creator
                </p>
              </div>
              <div className="relative">
                <input
                  type="checkbox"
                  className="appearance-none h-5 w-9 rounded-full bg-gray200 transition duration-300 peer cursor-pointer checked:bg-green500"
                />
                <span className="absolute h-4 w-4 bg-gray500 rounded-full top-0.5 left-0.5 transition-transform duration-300 peer-checked:translate-x-4 peer-checked:bg-white"></span>
              </div>
            </div>

            <div className="flex justify-center mt-2">
              <button
                className="w-full sm:w-48 bg-gradient-to-r from-gradientStart to-gradientEnd text-white font-medium px-8 py-2.5 rounded-lg hover:shadow-lg transition"
                onClick={handleSaveTask}
              >
                Save Task
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateTaskModal;
