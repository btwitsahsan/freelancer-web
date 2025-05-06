import React, { useState, SetStateAction, Dispatch } from "react";
import Image from "next/image";
import { Icons } from "@/icons";
import { FiCalendar } from "react-icons/fi";
import Dropdown from "./taskcard-dropdown";
import { toast } from "react-toastify";
import {
  ProjectType,
  UserType,
  TmTaskWithFullDataType,
  formatDate,
  apiUrl,
} from "@/utils/constant";
import axios from "axios";
import { Dayjs } from "dayjs";

interface TaskCardProps {
  _id?: string;
  name?: string;
  priority?: string;
  dueDate?: Date;
  project?: ProjectType;
  assignee?: UserType;
  attachments?: any;
  tmTasks: TmTaskWithFullDataType[] | undefined;
  setTmTasks: Dispatch<SetStateAction<TmTaskWithFullDataType[]>>;
}

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "Urgent":
      return "bg-[#FF0000] text-white";
    case "High":
      return "bg-[#FF5733] text-white";
    case "Medium":
      return "bg-[#FFD700] text-white";
    case "Low":
      return "bg-[#90EE90] text-white";
    default:
      return "bg-[#90EE90] text-white";
  }
};

const TaskCard: React.FC<TaskCardProps> = ({
  _id,
  name,
  priority,
  dueDate,
  project,
  assignee,
  attachments = 0,
  tmTasks,
  setTmTasks,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [editedTitle, setEditedTitle] = useState(name);
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [actionType, setActionType] = useState<
    null | "archive" | "delete" | "remind" | "duplicate"
  >(null);
  const [isVisible, setIsVisible] = useState(true);
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleRenameClick = () => {
    setIsEditingTitle(true);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditedTitle(event.target.value);
  };

  const handleTitleBlur = () => {
    setIsEditingTitle(false);
    const token = localStorage.getItem("freelancingPlatformAuthToken");

    if (editedTitle !== name) {
      axios
        .put(
          `${apiUrl}/api/tmProjects/task/${_id}`,
          { name: editedTitle },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then(() => {
          console.log("updated task name.");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleCopy = (text: string, message: string) => {
    // navigator.clipboard.writeText(text).then(() => {
    //   toast.success(message);
    // });
  };

  const handleViewDetails = () => {
    setModalOpen(true);
  };

  const handleArchive = () => {
    setActionType("archive");
    setConfirmModalOpen(true);
  };

  const handleDelete = () => {
    setActionType("delete");
    setConfirmModalOpen(true);
  };

  const handleRemindMe = () => {
    setActionType("remind");
  };

  const handleDuplicate = () => {
    setActionType("duplicate");
    setConfirmModalOpen(true);
  };

  const confirmAction = () => {
    setConfirmModalOpen(false);

    if (actionType === "delete") {
      const token = localStorage.getItem("freelancingPlatformAuthToken");

      axios
        .delete(`${apiUrl}/api/tmProjects/task/${_id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          toast.success("Task deleted successfully!");
          const updatedTasks = (tmTasks ?? []).filter(
            (task) => task._id !== _id
          );
          setTmTasks(updatedTasks);
          setIsVisible(false);
        })
        .catch((err) => {
          console.log(err);
          toast.error("Failed to delete the task.");
        });
    }

    if (actionType === "archive") {
      const token = localStorage.getItem("freelancingPlatformAuthToken");

      axios
        .put(
          `${apiUrl}/api/tmProjects/task/${_id}`,
          { isActive: false },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then(() => {
          toast.success("Task archived successfully!");
          const updatedTasks = (tmTasks ?? []).filter(
            (task) => task._id !== _id
          );
          setTmTasks(updatedTasks);
          setIsVisible(false);
        })
        .catch((err) => {
          console.log(err);
          toast.error("Failed to archive the task.");
        });
    }

    if (actionType === "duplicate") {
      const token = localStorage.getItem("freelancingPlatformAuthToken");

      axios
        .post(
          `${apiUrl}/api/tmProjects/task/duplicate`,
          { id: _id },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          toast.success("Task duplicated successfully!");
          setTmTasks([...(tmTasks ?? []), res.data]);
        })
        .catch((err) => {
          console.log(err);
          toast.error("Failed to duplicate the task.");
        });
    }

    if (actionType === "remind") {
    }
  };

  if (!isVisible) return null;

  return (
    <div className="flex flex-col bg-white rounded-2xl p-4 gap-3 shadow-sm">
      <div className="flex justify-between items-center w-full gap-2.5">
        {isEditingTitle ? (
          <input
            type="text"
            value={editedTitle}
            onChange={handleTitleChange}
            onBlur={handleTitleBlur}
            className="flex-1 font-semibold text-black border-b-2 focus:outline-none"
            autoFocus
          />
        ) : (
          <span className="flex-1 font-semibold text-black">{editedTitle}</span>
        )}

        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="flex items-center justify-center w-6 h-6"
          >
            <Icons.edittask width="20" />
          </button>
          {dropdownOpen && (
            <Dropdown
              onClose={() => setDropdownOpen(false)}
              onRename={handleRenameClick}
              onCopyId={() => handleCopy("12345", "ID copied to clipboard!")}
              onCopyUrl={() =>
                handleCopy(window.location.href, "URL copied to clipboard!")
              }
              onViewDetails={handleViewDetails}
              onArchive={handleArchive}
              onDelete={handleDelete}
              onRemindMe={handleRemindMe}
              onDuplicate={handleDuplicate}
              setConfirmModalOpen={setConfirmModalOpen}
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
            />
          )}
        </div>
      </div>

      <div className="">
        <div
          className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${getPriorityColor(
            priority ?? ""
          )}`}
        >
          {priority}
        </div>
      </div>

      <div className="flex items-center gap-2 text-gray500">
        <div className="flex w-6 h-6 justify-center items-center">
          <FiCalendar className="w-4 h-4" />
        </div>
        <span>{formatDate(dueDate)}</span>
      </div>
      <div className="flex items-center gap-2 text-gray500">
        <div className="flex w-6 h-6 justify-center items-center">
          <Icons.project className="w-4 h-4" />
        </div>

        <span>{project ? project.title : ""}</span>
      </div>

      <hr className="border-gray200" />

      <div className="flex justify-between items-center">
        <Image
          className="w-8 h-8 rounded-full border border-black"
          src={assignee ? assignee.avatar : "/image/default.png"}
          alt={`task handler`}
          width={32}
          height={32}
        />

        <div className="flex items-center gap-2.5 text-gray500 text-sm">
          <Icons.attatchment className="h-4 w-4" />
          <span>{attachments}</span>
        </div>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-5 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Edit Task</h2>
            {/* Modal content goes here */}
            <button
              onClick={() => setModalOpen(false)}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {confirmModalOpen && (
        <div className="fixed inset-0 bg-[#17171819] flex justify-center items-center z-50">
          <div className="flex flex-col max-w-[400px] bg-white p-6 rounded-xl shadow-lg gap-4">
            {actionType === "archive" ? (
              <svg
                width="56"
                height="56"
                viewBox="0 0 56 56"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="4"
                  y="4"
                  width="48"
                  height="48"
                  rx="24"
                  fill="#FEF3C7"
                />
                <rect
                  x="4"
                  y="4"
                  width="48"
                  height="48"
                  rx="24"
                  stroke="#FFFBEB"
                  strokeWidth="8"
                />
                <path
                  d="M21.3217 25.6829C23.7354 21.412 24.9422 19.2765 26.5983 18.7268C27.5093 18.4244 28.4907 18.4244 29.4017 18.7268C31.0578 19.2765 32.2646 21.412 34.6783 25.6829C37.092 29.9538 38.2988 32.0893 37.9368 33.8293C37.7376 34.7866 37.2469 35.6548 36.535 36.3097C35.241 37.5 32.8274 37.5 28 37.5C23.1727 37.5 20.759 37.5 19.465 36.3097C18.7531 35.6548 18.2624 34.7866 18.0632 33.8293C17.7012 32.0893 18.908 29.9538 21.3217 25.6829Z"
                  stroke="#F59E0B"
                  strokeWidth="1.5"
                />
                <path
                  d="M28.2422 33V29C28.2422 28.5286 28.2422 28.2929 28.0957 28.1464C27.9493 28 27.7136 28 27.2422 28"
                  stroke="#F59E0B"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M27.9922 25H28.0012"
                  stroke="#F59E0B"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ) : (
              <svg
                width="56"
                height="56"
                viewBox="0 0 56 56"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="4"
                  y="4"
                  width="48"
                  height="48"
                  rx="24"
                  fill="#FEE2E2"
                />
                <rect
                  x="4"
                  y="4"
                  width="48"
                  height="48"
                  rx="24"
                  stroke="#FEF2F2"
                  strokeWidth="8"
                />
                <path
                  d="M28 38C33.5228 38 38 33.5228 38 28C38 22.4772 33.5228 18 28 18C22.4772 18 18 22.4772 18 28C18 33.5228 22.4772 38 28 38Z"
                  stroke="#EF4444"
                  strokeWidth="1.5"
                />
                <path
                  d="M27.9922 31H28.0012"
                  stroke="#EF4444"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M28 28V24"
                  stroke="#EF4444"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
            <h2 className="capitalize text-lg font-medium">
              {actionType} this task
            </h2>
            <p className="text-sm text-gray500">
              Are you sure you want to {actionType} this task? You can find this
              task in hidden tasks.
            </p>
            <div className="flex justify-between gap-3">
              <button
                onClick={() => setConfirmModalOpen(false)}
                className="basis-1/2 text-context px-4 py-2 rounded-lg border border-gray400 hover:bg-black hover:text-white transition-all"
              >
                Cancel
              </button>
              <button
                onClick={confirmAction}
                className={`basis-1/2 capitalize px-4 py-2 rounded-lg border text-white hover:shadow-lg transition-all ${
                  actionType === "archive"
                    ? "border-yellow500 bg-yellow500"
                    : actionType === "delete"
                    ? "border-red500 bg-red500"
                    : "border-blue500 bg-blue500"
                }`}
              >
                {actionType}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskCard;
