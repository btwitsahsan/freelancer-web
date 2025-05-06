// src/components/TaskDetailModal/ActivityItem.tsx
import React from "react";
import Image from "next/image";
import { FaThumbsUp } from "react-icons/fa";

interface ActivityItemProps {
  avatarUrl: string;
  name: string;
  message: string;
  time: string;
  likes: number;
}

const ActivityItem: React.FC<ActivityItemProps> = ({
  avatarUrl,
  name,
  message,
  time,
  likes,
}) => {
  return (
    <div className="flex p-2.5 border border-white rounded-lg gap-2.5 hover:border-gray500 transition-all">
      <div className="w-6">
        <Image src={avatarUrl} alt="User Avatar" width={24} height={24} />
      </div>
      <div className="flex-1 flex flex-col gap-1">
        <div className="text-black font-semibold text-sm">{name}</div>
        <div className="text-context text-xs">{message}</div>
        <div className="flex justify-between gap-5">
          <div className="text-gray400 text-xs">{time}</div>
          <div className="flex-1 justify-start">
            <button className="flex items-center gap-1.5 text-xs text-blue400 hover:text-blue500 transition-all">
              <span>{likes}</span>
              <FaThumbsUp />
            </button>
          </div>
          <button className="text-gray500 text-xs hover:text-blue400 transition-all">
            Reply
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActivityItem;
