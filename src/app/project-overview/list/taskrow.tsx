import Image from "next/image";
import { Icons } from "@/icons";
import { taskStatuses, TaskStatusKey } from "./listboard";
import Dropdown from "../board/taskcard-dropdown";
import { useState } from "react";
import { toast } from "react-toastify";
import { formatDate, TmTaskWithFullDataType } from "@/utils/constant";
import { Dayjs } from "dayjs";

// Props for TaskRow
interface TaskRowProps {
  task: TmTaskWithFullDataType;
  status: TaskStatusKey;
}

// Task row component
const TaskRow: React.FC<TaskRowProps> = ({ task, status }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.name);
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [actionType, setActionType] = useState<
    null | "archive" | "delete" | "remind" | "duplicate"
  >(null);
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleRenameClick = () => {
    setIsEditingTitle(true);
  };

  const handleCopy = (text: string, message: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast.success(message);
    });
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
    setConfirmModalOpen(true);
  };

  const handleDuplicate = () => {
    setActionType("duplicate");
    setConfirmModalOpen(true);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditedTitle(event.target.value);
  };

  const handleTitleBlur = () => {
    setIsEditingTitle(false);
  };

  return (
    <div className="w-full py-2 border-b border-gray-200 justify-start items-start flex">
      <div className="basis-5/12 h-6 flex items-center gap-2.5">
        <div className="w-3.5 h-3.5">{taskStatuses[status].icon}</div>
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
          <div className="text-gray-500 text-xs font-medium">{task.name}</div>
        )}
      </div>
      <div className="basis-1/4 h-6 flex items-center gap-2.5">
        <Image
          alt="User Avatar"
          width={24}
          height={24}
          className="w-6 h-6 rounded-full border border-[#171718]"
          src={task.assignee?.avatar ?? 'default.png'}
        />
        <div className="text-gray-500 text-xs font-medium">{task.assignee?.fullName}</div>
      </div>
      <div className="basis-1/12 h-6 flex items-center gap-2.5">
        <Icons.calendaricon />
      </div>
      <div className="basis-1/12 h-6 flex items-center gap-2.5">
        <div
          className={
            task.priority === "High" || task.priority === "Urgent"
              ? "text-red-500"
              : task.priority === "Medium"
                ? "text-amber-500"
                : "text-gray-400"
          }
        >
          {formatDate(task.dueDate)}
        </div>
      </div>
      <div className="basis-1/12 h-6 flex items-center gap-2.5">
        <div className="w-[18px] h-[18px]">
          {task.priority === "Urgent" && <Icons.redflagicon />}
          {task.priority === "High" && <Icons.redflagicon />}
          {task.priority === "Medium" && <Icons.yellowflagicon />}
          {task.priority === "Low" && <Icons.grayflagicon />}
        </div>
        <div
          className={`${task.priority === "High" || task.priority === "Urgent"
            ? "text-red-500"
            : task.priority === "Medium"
              ? "text-amber-500"
              : "text-gray-400"
            } text-xs font-medium`}
        >
          {task.priority}
        </div>
      </div>
      <div className="relative basis-1/12 h-6 flex items-center gap-2.5">
        <button onClick={toggleDropdown} className="flex items-center w-5 h-5">
          <Icons.edittask />
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
  );
};

export default TaskRow;
