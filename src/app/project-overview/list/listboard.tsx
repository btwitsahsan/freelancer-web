"use client";

import { Dispatch, SetStateAction } from "react";
import { Icons } from "@/icons";
import TaskSection from "./tasksection";
import { apiUrl, TmProjectType, TmTaskWithFullDataType } from "@/utils/constant";

// Define task status keys
export type TaskStatusKey = "completed" | "ongoing" | "upcoming" | "backlog";

// Define a type for task data (if needed elsewhere)
// export interface ITask { ... } // (Keep this if you use it in other parts of your app)

// Define task statuses with corresponding styles
export const taskStatuses: Record<
  TaskStatusKey,
  {
    label: string;
    icon: JSX.Element;
    textColor: string;
    badgeBg: string;
  }
> = {
  completed: {
    label: "Completed",
    icon: <Icons.completedicon />,
    textColor: "text-emerald-500",
    badgeBg: "bg-emerald-100",
  },
  ongoing: {
    label: "On Going",
    icon: <Icons.progressicon />,
    textColor: "text-blue-500",
    badgeBg: "bg-[#e0edff]",
  },
  upcoming: {
    label: "Upcoming",
    icon: <Icons.upcomingicon />,
    textColor: "text-amber-500",
    badgeBg: "bg-[#fff9eb]",
  },
  backlog: {
    label: "Backlog",
    icon: <Icons.backlogicon />,
    textColor: "text-gray-600",
    badgeBg: "bg-gray-100",
  },
};

export interface ListBoardProps {
  tmTasks?: TmTaskWithFullDataType[];
  setTmTasks: Dispatch<SetStateAction<TmTaskWithFullDataType[]>>;
  tmProjects: TmProjectType[];
  tmProject?: TmProjectType;
}

// Main ListBoard component
const ListBoard: React.FC<ListBoardProps> = ({ tmTasks = [], setTmTasks, tmProjects, tmProject }) => {
  // Group tasks by their status
  const tasksByStatus: Record<TaskStatusKey, TmTaskWithFullDataType[]> = {
    completed: tmTasks.filter(task => task.status === "completed"),
    ongoing: tmTasks.filter(task => task.status === "ongoing"),
    upcoming: tmTasks.filter(task => task.status === "upcoming"),
    backlog: tmTasks.filter(task => task.status === "backlog"),
  };

  return (
    <div className="w-full h-auto p-2.5 flex flex-col gap-2.5">
      {Object.entries(tasksByStatus).map(([status, tasks]) => (
        <TaskSection
          key={status}
          status={status as TaskStatusKey}
          tasks={tasks}
        />
      ))}
    </div>
  );
};

export default ListBoard;
