// src/components/TaskDetailModal/ActivityHeader.tsx
import React from "react";
import { FiBell, FiSearch } from "react-icons/fi";

const ActivityHeader: React.FC = () => (
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
);

export default ActivityHeader;
