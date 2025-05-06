import React from "react";
import Collapsible from "./Collapsible";
import TaskRow from "./TaskRow";

const AssignedToMe: React.FC = () => {
  return (
    <Collapsible title="Assigned to me">
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-2">
          <button className="px-2 py-1 rounded-lg border border-gray-500 hover:bg-gray-200 transition-colors flex items-center gap-1">
            <div data-svg-wrapper className="relative">
              <svg
                width="10"
                height="10"
                viewBox="0 0 10 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.60124 1.31034L2.8909 1.63868C1.79697 2.14434 1.25 2.39716 1.25 2.81217C1.25 3.22719 1.79697 3.48001 2.8909 3.98567L3.60124 4.31401C4.28967 4.63222 4.63392 4.79134 5 4.79134C5.36608 4.79134 5.71033 4.63222 6.39875 4.31401L7.10908 3.98567C8.20304 3.48001 8.75 3.22719 8.75 2.81217C8.75 2.39716 8.20304 2.14434 7.10908 1.63868L6.39875 1.31034C5.71033 0.992116 5.36608 0.833008 5 0.833008C4.63392 0.833008 4.28967 0.992116 3.60124 1.31034Z"
                  stroke="#6B7280"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M8.66167 4.62402C8.72054 4.70682 8.75 4.79315 8.75 4.88806C8.75 5.29715 8.20304 5.5464 7.10908 6.04486L6.39875 6.36852C5.71033 6.68219 5.36608 6.83906 5 6.83906C4.63392 6.83906 4.28967 6.68219 3.60124 6.36852L2.8909 6.04486C1.79697 5.5464 1.25 5.29715 1.25 4.88806C1.25 4.79315 1.27945 4.70682 1.33833 4.62402"
                  stroke="#6B7280"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M8.49029 6.77734C8.66342 6.91526 8.75 7.05272 8.75 7.21547C8.75 7.62459 8.20304 7.8738 7.10908 8.37226L6.39875 8.69593C5.71033 9.00964 5.36608 9.16647 5 9.16647C4.63392 9.16647 4.28967 9.00964 3.60124 8.69593L2.8909 8.37226C1.79697 7.8738 1.25 7.62459 1.25 7.21547C1.25 7.05272 1.33657 6.91526 1.50972 6.77734"
                  stroke="#6B7280"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
            <div className="text-gray-500 text-[10px]">Status</div>
          </button>
          <button className="px-2 py-1 rounded-lg border border-gray-500 hover:bg-gray-200 transition-colors flex items-center gap-1">
            <div data-svg-wrapper className="relative">
              <svg
                width="10"
                height="10"
                viewBox="0 0 10 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.25 2.5H7.08333"
                  stroke="#6B7280"
                  stroke-width="0.625"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M1.25 5H5.41667"
                  stroke="#6B7280"
                  stroke-width="0.625"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M1.25 7.5H7.08333"
                  stroke="#6B7280"
                  stroke-width="0.625"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M8.75001 3.33301L8.26926 3.69822C7.47864 4.29884 7.08334 4.59917 7.08334 4.99967C7.08334 5.40017 7.47864 5.70051 8.26926 6.30113L8.75001 6.66634"
                  stroke="#6B7280"
                  stroke-width="0.625"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
            <div className="text-gray-500 text-[10px]">Collapse all</div>
          </button>
          <button className="px-2 py-1 rounded-lg border border-gray-500 hover:bg-gray-200 transition-colors flex items-center gap-1">
            <div data-svg-wrapper className="relative">
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path
                  d="M8.37866 1.62168C8.95832 2.20136 8.95832 3.13435 8.95832 5C8.95832 6.866 8.95832 7.799 8.37866 8.379C7.79895 8.95866 6.86595 8.95866 5 8.95866C3.13401 8.95866 2.20103 8.95866 1.62134 8.379C1.04166 7.799 1.04166 6.866 1.04166 5C1.04166 3.13435 1.04166 2.20136 1.62134 1.62168C2.20103 1.042 3.13401 1.042 5 1.042C6.86595 1.042 7.79895 1.042 8.37866 1.62168Z"
                  stroke="#6B7280"
                  strokeWidth="0.625"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M3.54166 1.042V8.95866"
                  stroke="#6B7280"
                  strokeWidth="0.625"
                />
                <path
                  d="M6.45834 1.042V8.95866"
                  stroke="#6B7280"
                  strokeWidth="0.625"
                />
              </svg>
            </div>
            <div className="text-gray-500 text-[10px]">Columns</div>
          </button>
          <button className="px-2 py-1 rounded border border-gray-500 hover:bg-gray-200 transition-colors">
            <div className="text-gray-500 text-[10px] min-w-20">Search...</div>
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-4 w-full mt-4">
        <Collapsible title="In Progress">
          <div className="flex items-center gap-2">
            <div data-svg-wrapper className="relative">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M6 4C6 4 10 6.94593 10 8C10 9.05413 6 12 6 12"
                  stroke="#141B34"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="px-2 py-1 bg-blue-500 rounded flex items-center">
              <div className="text-white text-xs font-semibold">
                IN PROGRESS
              </div>
            </div>
            <div className="text-gray-400 text-xs font-semibold">2</div>
            <div className="text-gray-400 text-xs font-semibold">
              + Add Task
            </div>
          </div>
          <div className="pl-6 flex flex-col gap-1">
            <div className="px-2 pb-1 border-b border-gray-200 flex justify-between items-center">
              <TaskRow
                title="Website Responsive"
                project="The Freelancer Project"
                date="2025/02/12"
              />
            </div>
            <div className="px-2 pt-2 pb-1 border-b border-gray-200 flex justify-between items-center">
              <TaskRow
                title="Website Responsive"
                project="The Freelancer Project"
                date="2025/02/12"
              />
            </div>
          </div>
        </Collapsible>
        <Collapsible title="Overdue">
          <div className="flex items-center gap-2">
            <div data-svg-wrapper className="relative">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M6 4C6 4 10 6.94593 10 8C10 9.05413 6 12 6 12"
                  stroke="#141B34"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="px-2 py-1 bg-red-500 rounded flex items-center">
              <div className="text-white text-xs font-semibold">OVERDUE</div>
            </div>
            <div className="text-gray-400 text-xs font-semibold">2</div>
            <div className="text-gray-400 text-xs font-semibold">
              + Add Task
            </div>
          </div>
          <div className="pl-6 flex flex-col gap-1">
            <div className="px-2 pb-1 border-b border-gray-200 flex justify-between items-center">
              <TaskRow
                title="Website Responsive"
                project="The Freelancer Project"
                date="2025/02/12"
              />
            </div>
            <div className="px-2 pt-2 pb-1 border-b border-gray-200 flex justify-between items-center">
              <TaskRow
                title="Website Responsive"
                project="The Freelancer Project"
                date="2025/02/12"
              />
            </div>
          </div>
        </Collapsible>
      </div>
    </Collapsible>
  );
};

export default AssignedToMe;
