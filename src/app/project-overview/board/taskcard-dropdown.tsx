import React, { useEffect, useRef, useState, Dispatch, SetStateAction } from "react";
import { Icons } from "@/icons";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";

interface DropdownProps {
  onClose: () => void;
  onRename: () => void;
  onCopyId: () => void;
  onCopyUrl: () => void;
  onViewDetails: () => void;
  onArchive: () => void;
  onDelete: () => void;
  onRemindMe: () => void;
  onDuplicate: () => void;
  setConfirmModalOpen: Dispatch<SetStateAction<boolean>>;
  selectedDate: Dayjs | null;
  setSelectedDate: Dispatch<SetStateAction<Dayjs | null>>;
  side?: "left" | "right";
}

const Dropdown: React.FC<DropdownProps> = ({
  onClose,
  onRename,
  onCopyId,
  onCopyUrl,
  onViewDetails,
  onArchive,
  onDelete,
  onRemindMe,
  onDuplicate,
  setConfirmModalOpen,
  selectedDate,
  setSelectedDate,
  side = "left",
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [showCalendar, setShowCalendar] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  const handleRemindMeClick = () => {
    setShowCalendar(!showCalendar);
  };

  const handleDateSelect = (newDate: Dayjs | null) => {
    setSelectedDate(newDate);
    setShowCalendar(false);
    setConfirmModalOpen(true);
  };

  return (
    <div
      ref={dropdownRef}
      className={`absolute ${side === "left" ? "left-0" : "right-0"
        } mt-2 w-52 bg-white border border-gray200 rounded-md shadow-lg z-10`}
    >
      <div className="flex flex-col">
        <div className="px-2.5 py-1.5 rounded-lg">
          <div className="flex items-center border border-gray200 rounded-lg">
            <div
              className="flex-1 flex items-center justify-center h-5 text-[10px] text-context text-center hover:bg-gray100 rounded-l-md cursor-pointer"
              onClick={onCopyUrl}
            >
              Copy link
            </div>
            <hr className="w-px h-5 bg-gray200" />
            <div
              className="flex-1 flex items-center justify-center h-5 text-[10px] text-context text-center hover:bg-gray100 cursor-pointer"
              onClick={onCopyId}
            >
              Copy ID
            </div>
            <hr className="w-px h-5 bg-gray200" />
            <div
              className="flex-1 flex items-center justify-center h-5 text-[10px] text-context text-center hover:bg-gray100 rounded-r-md cursor-pointer"
              onClick={onViewDetails}
            >
              View details
            </div>
          </div>
        </div>
        <hr />
        <ul className="py-1">
          <li
            className="flex items-center text-sm px-3 py-1.5 hover:bg-gray100 cursor-pointer gap-2.5"
            onClick={onRename}
          >
            <Icons.editpencil />
            <div>Rename</div>
          </li>
          <li
            className="flex items-center text-sm px-3 py-1.5 hover:bg-gray100 cursor-pointer gap-2.5"
            onClick={onDuplicate}
          >
            <Icons.copy2 />
            <div>Duplicate</div>
          </li>
          <li
            className="flex relative items-center text-sm px-3 py-1.5 hover:bg-gray100 cursor-pointer gap-2.5"
            onClick={() => {
              handleRemindMeClick();
              if (!showCalendar) onRemindMe();
            }}
          >
            <Icons.alarm />
            <div>Remind me</div>

            {showCalendar && (
              <div
                className="absolute top-full shadow-lg rounded-lg overflow-hidden"
                onClick={(e) => {
                  e.preventDefault();
                }}
              >
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <StaticDatePicker
                    displayStaticWrapperAs="desktop"
                    value={selectedDate}
                    onChange={handleDateSelect}
                  />
                </LocalizationProvider>
              </div>
            )}
          </li>
          <li className="flex items-center text-sm px-3 py-1.5 hover:bg-gray100 cursor-pointer gap-2.5">
            <Icons.logout2 />
            <div>Move</div>
          </li>
        </ul>

        <hr />
        <ul className="py-1">
          <li
            className="flex items-center text-sm px-3 py-1.5 hover:bg-gray100 cursor-pointer gap-2.5"
            onClick={onArchive}
          >
            <Icons.archive />
            <div>Archive</div>
          </li>
          <li
            className="flex items-center text-sm px-3 py-1.5 hover:bg-gray100 cursor-pointer gap-2.5"
            onClick={onDelete}
          >
            <Icons.delete2 />
            <div className="text-red500">Delete</div>
          </li>
        </ul>
        <hr />
        <div className="px-2.5 py-1.5">
          <button className="w-full bg-gradient-to-r from-gradientStart to-gradientEnd text-white text-sm px-4 py-2 rounded-lg hover:shadow-lg transition-all whitespace-nowrap">
            Sharing & Permissions
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
