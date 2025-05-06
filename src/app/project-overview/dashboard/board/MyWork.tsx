import React, { useState } from "react";
import Collapsible from "./Collapsible";
import Tabs, { Tab } from "./Tabs";
import TaskRow from "./TaskRow";

interface WorkTask {
  id: number;
  title: string;
  project: string;
  date: string;
}

const todayTasks: WorkTask[] = [
  {
    id: 1,
    title: "Website Responsive",
    project: "The Freelancer Project",
    date: "2025/02/12",
  },
  {
    id: 2,
    title: "Website Responsive",
    project: "The Freelancer Project",
    date: "2025/02/12",
  },
];

const MyWork: React.FC = () => {
  const [, setActiveTab] = useState<string>("todo");
  const tabs: Tab[] = [
    { id: "todo", label: "To Do" },
    { id: "done", label: "Done" },
    { id: "delegated", label: "Delegated" },
  ];

  return (
    <Collapsible title="My Work">
      <Tabs tabs={tabs} onTabChange={setActiveTab} />
      <div className="flex flex-col gap-2 w-full mt-2">
        <Collapsible title="Today">
          <div className="flex items-center gap-2 py-2">
            <div data-svg-wrapper className="relative">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M12 6C12 6 9.05407 10 8 10C6.94587 10 4 6 4 6"
                  stroke="#141B34"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="text-black text-xs font-medium">Today</div>
            <div className="text-gray-400 text-xs font-medium">
              {todayTasks.length}
            </div>
          </div>
          <div className="pl-6 flex flex-col gap-1">
            {todayTasks.map((task) => (
              <div
                key={task.id}
                className="px-2 pb-1 border-b border-gray-200 flex justify-between items-center"
              >
                <TaskRow
                  title={task.title}
                  project={task.project}
                  date={task.date}
                />
              </div>
            ))}
          </div>
        </Collapsible>
        <Collapsible title="Overdue">
          <div className="flex items-center gap-2 py-2">
            <div data-svg-wrapper className="relative">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M12 6C12 6 9.05407 10 8 10C6.94587 10 4 6 4 6"
                  stroke="#141B34"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="text-black text-xs font-medium">Overdue</div>
            <div className="text-gray-400 text-xs font-medium">
              {todayTasks.length}
            </div>
          </div>
          <div className="pl-6 flex flex-col gap-1">
            {todayTasks.map((task) => (
              <div
                key={task.id}
                className="px-2 pb-1 border-b border-gray-200 flex justify-between items-center"
              >
                <TaskRow
                  title={task.title}
                  project={task.project}
                  date={task.date}
                />
              </div>
            ))}
          </div>
        </Collapsible>
      </div>
    </Collapsible>
  );
};

export default MyWork;
