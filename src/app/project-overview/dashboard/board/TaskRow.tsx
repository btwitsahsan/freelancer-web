import React from 'react';

interface TaskRowProps {
  title: string;
  project: string;
  date?: string;
}

const TaskRow: React.FC<TaskRowProps> = ({ title, project, date }) => {
  return (
    <div className="w-full flex items-center gap-2 p-2 hover:bg-gray-100 transition-colors">
      <div data-svg-wrapper className="relative">
        {/* Example SVG icon */}
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path
            d="M7.5 2H10.5 M7.5 7.5H10.5 M7.5 4.5H10.5 M7.5 10H10.5 
               M3.25 5C4.2165 5 5 4.2165 5 3.25C5 2.2835 4.2165 1.5 3.25 1.5C2.2835 1.5 1.5 2.2835 1.5 3.25C1.5 4.2165 2.2835 5 3.25 5Z 
               M3.25 10.5C4.2165 10.5 5 9.7165 5 8.75C5 7.7835 4.2165 7 3.25 7C2.2835 7 1.5 7.7835 1.5 8.75C1.5 9.7165 2.2835 10.5 3.25 10.5Z"
            stroke="#374151"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div className="grow text-black text-xs font-medium">{title}</div>
      {project && (
        <div className="text-gray-500 text-[10px] font-medium">in {project}</div>
      )}
      {date && <div className="text-gray-500 text-[10px] font-medium">{date}</div>}
    </div>
  );
};

export default TaskRow;
