import { useState } from "react";
import ToDosList from "./toDosList";
import { Task } from "@/types";
import FilesList from "./filesList";
import TaskInfo from "./taskInfo";

const tasksList: Task[] = [
  {
    id: 1,
    type: "Backend API Development",
    task: "Develop RESTful APIs for the mobile app by end of the month.",
    assignee: {
      name: "Jane Smith",
      avatar: "/image/avatar/2.jpg",
    },
    dueDate: "Dec 20, 2021",
    status: "DONE",
    description: "The APIs should be able to handle large amounts of data.",
  },
  {
    id: 2,
    type: "UI/UX Research",
    task: "Conduct user interviews and prepare a report by next week.",
    assignee: {
      name: "Alice Johnson",
      avatar: "/image/avatar/3.jpg",
    },
    dueDate: "Jan 5, 2022",
    status: "CANCELLED",
    description:
      "The report should include user personas and user journey maps.",
  },
  {
    id: 3,
    type: "Database Optimization",
    task: "Optimize database queries to improve performance.",
    assignee: {
      name: "John Doe",
      avatar: "/image/avatar/1.jpg",
    },
    dueDate: "Jan 10, 2022",
    status: "NOT_STARTED",
    description: "The database is currently slow due to unoptimized queries.",
  },
];

const Overview = () => {
  const [tasks, setTasks] = useState(tasksList);
  return (
    <div className="flex-1 flex flex-col items-center gap-8 bg-gray100 py-5">
      <div className="w-full max-w-[1480px] px-5">
        <TaskInfo />
      </div>
      <div className="w-full max-w-[1480px] px-5">
        <div className="flex justify-between gap-5">
          <ToDosList tasks={tasks} setTasks={setTasks} />
          <FilesList />
        </div>
      </div>
    </div>
  );
};

export default Overview;
