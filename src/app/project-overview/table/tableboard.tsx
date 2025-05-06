import React, { useState, Dispatch, SetStateAction } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import Image from "next/image";
import Dropdown from "../board/taskcard-dropdown";
import { EventStatus } from "@/types";
import { Dayjs } from "dayjs";
import { apiUrl, formatDate, TmProjectType, TmTaskWithFullDataType } from "@/utils/constant";
import TaskDetailModal from "../task-detail-modal";

interface Assignee {
  name: string;
  avatar: string;
}

interface Task {
  id: string;
  name: string;
  assignee: Assignee;
  status: EventStatus;
  dueDate: string;
  priority: string;
}

enum Priroty {
  urgent = "Urgent",
  high = "High",
  medium = "Medium",
  low = "Low",
}

const mockTasks: Task[] = [
  {
    id: "1",
    name: "Task 1",
    assignee: { name: "Alice", avatar: "/image/avatar/1.jpg" },
    status: EventStatus.backlog,
    dueDate: "2023-12-01",
    priority: "High",
  },
  {
    id: "2",
    name: "Task 2",
    assignee: { name: "Bob", avatar: "/image/avatar/2.jpg" },
    status: EventStatus.upcoming,
    dueDate: "2023-12-05",
    priority: "Medium",
  },
  {
    id: "3",
    name: "Task 3",
    assignee: { name: "Charlie", avatar: "/image/avatar/3.jpg" },
    status: EventStatus.on_going,
    dueDate: "2023-11-15",
    priority: "Low",
  },
  {
    id: "4",
    name: "Task 4",
    assignee: { name: "David", avatar: "/image/avatar/4.jpg" },
    status: EventStatus.completed,
    dueDate: "2023-10-30",
    priority: "High",
  },
  {
    id: "5",
    name: "Task 5",
    assignee: { name: "Eve", avatar: "/image/avatar/1.jpg" },
    status: EventStatus.backlog,
    dueDate: "2023-12-10",
    priority: "Medium",
  },
  {
    id: "6",
    name: "Task 6",
    assignee: { name: "Frank", avatar: "/image/avatar/2.jpg" },
    status: EventStatus.upcoming,
    dueDate: "2023-12-15",
    priority: "Low",
  },
  {
    id: "7",
    name: "Task 7",
    assignee: { name: "Grace", avatar: "/image/avatar/3.jpg" },
    status: EventStatus.on_going,
    dueDate: "2023-11-20",
    priority: "High",
  },
  {
    id: "8",
    name: "Task 8",
    assignee: { name: "Hank", avatar: "/image/avatar/4.jpg" },
    status: EventStatus.completed,
    dueDate: "2023-10-25",
    priority: "Medium",
  },
  {
    id: "9",
    name: "Task 9",
    assignee: { name: "Ivy", avatar: "/image/avatar/1.jpg" },
    status: EventStatus.backlog,
    dueDate: "2023-12-20",
    priority: "Low",
  },
  {
    id: "10",
    name: "Task 10",
    assignee: { name: "Jack", avatar: "/image/avatar/2.jpg" },
    status: EventStatus.upcoming,
    dueDate: "2023-12-25",
    priority: "High",
  },
  {
    id: "11",
    name: "Task 11",
    assignee: { name: "Kara", avatar: "/image/avatar/3.jpg" },
    status: EventStatus.on_going,
    dueDate: "2023-11-25",
    priority: "Medium",
  },
  {
    id: "12",
    name: "Task 12",
    assignee: { name: "Leo", avatar: "/image/avatar/4.jpg" },
    status: EventStatus.completed,
    dueDate: "2023-11-01",
    priority: "Low",
  },
  {
    id: "13",
    name: "Task 13",
    assignee: { name: "Mia", avatar: "/image/avatar/1.jpg" },
    status: EventStatus.backlog,
    dueDate: "2023-12-30",
    priority: "High",
  },
  {
    id: "14",
    name: "Task 14",
    assignee: { name: "Nina", avatar: "/image/avatar/2.jpg" },
    status: EventStatus.upcoming,
    dueDate: "2023-12-31",
    priority: "Medium",
  },
  {
    id: "15",
    name: "Task 15",
    assignee: { name: "Oscar", avatar: "/image/avatar/3.jpg" },
    status: EventStatus.on_going,
    dueDate: "2023-11-10",
    priority: "Low",
  },
  {
    id: "16",
    name: "Task 16",
    assignee: { name: "Paul", avatar: "/image/avatar/4.jpg" },
    status: EventStatus.completed,
    dueDate: "2023-10-20",
    priority: "High",
  },
  {
    id: "17",
    name: "Task 17",
    assignee: { name: "Quinn", avatar: "/image/avatar/1.jpg" },
    status: EventStatus.backlog,
    dueDate: "2023-12-03",
    priority: "Medium",
  },
  {
    id: "18",
    name: "Task 18",
    assignee: { name: "Rose", avatar: "/image/avatar/2.jpg" },
    status: EventStatus.upcoming,
    dueDate: "2023-12-07",
    priority: "Low",
  },
  {
    id: "19",
    name: "Task 19",
    assignee: { name: "Sam", avatar: "/image/avatar/3.jpg" },
    status: EventStatus.on_going,
    dueDate: "2023-11-05",
    priority: "High",
  },
  {
    id: "20",
    name: "Task 20",
    assignee: { name: "Tina", avatar: "/image/avatar/4.jpg" },
    status: EventStatus.completed,
    dueDate: "2023-10-15",
    priority: "Medium",
  },
];

export interface TableBoardProps {
  tmTasks?: TmTaskWithFullDataType[];
  setTmTasks: Dispatch<SetStateAction<TmTaskWithFullDataType[]>>;
  tmProjects: TmProjectType[];
  tmProject?: TmProjectType;
}

const TableBoard: React.FC<TableBoardProps> = ({ tmTasks, setTmTasks, tmProjects, tmProject }) => {
  const [tasks, setTasks] = useState<TmTaskWithFullDataType[]>(tmTasks || []);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [selectedTask, setSelectedTask] = useState<TmTaskWithFullDataType | null>(null);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const reorderedTasks = Array.from(tasks);
    const [movedTask] = reorderedTasks.splice(result.source.index, 1);
    reorderedTasks.splice(result.destination.index, 0, movedTask);

    setTasks(reorderedTasks);
  };

  const toggleDropdown = (taskId: string) => {
    setActiveDropdown(activeDropdown === taskId ? null : taskId);
  };

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="taskTable">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="min-w-full bg-white border"
            >
              <div>
                <div className="flex bg-gray200 h-11">
                  <div className="py-2 px-4 border-b text-start basis-1/12">
                    #
                  </div>
                  <div className="py-2 px-4 border-b text-start basis-4/12">
                    Name
                  </div>
                  <div className="py-2 px-4 border-b text-start basis-3/12">
                    Assignee
                  </div>
                  <div className="py-2 px-4 border-b text-start basis-1/12">
                    Status
                  </div>
                  <div className="py-2 px-4 border-b text-start basis-1/12">
                    Due Date
                  </div>
                  <div className="py-2 px-4 border-b text-start basis-1/12">
                    Priority
                  </div>
                  <div className="py-2 px-4 border-b text-start basis-1/12"></div>
                </div>
              </div>
              <div>
                {tasks.map((task, index) => (
                  <Draggable key={task._id} draggableId={task._id ?? '1'} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="flex items-center border-b bg-white h-[72px]"
                        onDoubleClick={() => setSelectedTask(task)}
                      >
                        <div className="py-2 px-4 text-sm text-gray500 basis-1/12">
                          {index + 1}
                        </div>
                        <div className="py-2 px-4 font-medium text-sm basis-4/12">
                          {task.name}
                        </div>
                        <div className="py-2 px-4 basis-3/12">
                          <div className="flex items-center gap-2.5">
                            <Image
                              src={task?.assignee ? task?.assignee?.avatar : '/default.png'}
                              alt={task?.assignee?.fullName ?? 'Assignee'}
                              className="w-10 h-10 rounded-full"
                              width={40}
                              height={40}
                            />
                            <div className="font-medium text-sm">
                              {task?.assignee?.fullName}
                            </div>
                          </div>
                        </div>
                        <div className="flex h-[72px] items-center py-2 px-4 text-xs basis-1/12">
                          {task.status === EventStatus.backlog && (
                            <div className="flex h-5 px-2 py-1 items-center bg-gray100 rounded-xl gap-2">
                              <div className="w-2 h-2 rounded-full bg-gray500" />
                              <div className="leading-none text-gray500">
                                {task.status}
                              </div>
                            </div>
                          )}
                          {task.status === EventStatus.upcoming && (
                            <div className="flex h-5 px-2 py-1 items-center bg-yellow100 rounded-xl gap-2">
                              <div className="w-2 h-2 rounded-full bg-yellow500" />
                              <div className="leading-none text-yellow500">
                                {task.status}
                              </div>
                            </div>
                          )}
                          {task.status === EventStatus.on_going && (
                            <div className="flex h-5 px-2 py-1 items-center bg-blue100 rounded-xl gap-2">
                              <div className="w-2 h-2 rounded-full bg-blue500" />
                              <div className="leading-none text-blue500">
                                {task.status}
                              </div>
                            </div>
                          )}
                          {task.status === EventStatus.completed && (
                            <div className="flex h-5 px-2 py-1 items-center bg-green100 rounded-xl gap-2">
                              <div className="w-2 h-2 rounded-full bg-green500" />
                              <div className="leading-none text-green500">
                                {task.status}
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="py-2 px-4 text-gray500 text-sm basis-1/12">
                          {formatDate(task.dueDate)}
                        </div>
                        <div className="py-2 px-4 basis-1/12">
                          {task.priority === Priroty.urgent && (
                            <div className="flex items-center gap-1">
                              <div className="">
                                <svg
                                  width="18"
                                  height="18"
                                  viewBox="0 0 18 18"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M11.9089 2.25H7.71202C5.49074 2.25 4.38011 2.25 3.69005 2.90901C3 3.56802 3 4.62868 3 6.75L3.07964 11.25H11.9089C13.5762 11.25 14.4098 11.25 14.7635 10.8191C14.8614 10.6999 14.9331 10.5631 14.9742 10.4167C15.1229 9.888 14.6227 9.2511 13.6223 7.9773C13.2062 7.44739 12.9982 7.18244 12.961 6.88133C12.9503 6.79408 12.9503 6.70592 12.961 6.61867C12.9982 6.31756 13.2062 6.05261 13.6223 5.52273C14.6227 4.24891 15.1229 3.612 14.9742 3.08324C14.9331 2.93693 14.8614 2.80007 14.7635 2.68085C14.4098 2.25 13.5762 2.25 11.9089 2.25Z"
                                    stroke="#FF0000"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <path
                                    d="M3 15.75V6"
                                    stroke="#FF0000"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                  />
                                </svg>
                              </div>
                              <div className="text-red500 text-xs font-medium">
                                {task.priority}
                              </div>
                            </div>
                          )}
                          {task.priority === Priroty.high && (
                            <div className="flex items-center gap-1">
                              <div className="">
                                <svg
                                  width="18"
                                  height="18"
                                  viewBox="0 0 18 18"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M11.9089 2.25H7.71202C5.49074 2.25 4.38011 2.25 3.69005 2.90901C3 3.56802 3 4.62868 3 6.75L3.07964 11.25H11.9089C13.5762 11.25 14.4098 11.25 14.7635 10.8191C14.8614 10.6999 14.9331 10.5631 14.9742 10.4167C15.1229 9.888 14.6227 9.2511 13.6223 7.9773C13.2062 7.44739 12.9982 7.18244 12.961 6.88133C12.9503 6.79408 12.9503 6.70592 12.961 6.61867C12.9982 6.31756 13.2062 6.05261 13.6223 5.52273C14.6227 4.24891 15.1229 3.612 14.9742 3.08324C14.9331 2.93693 14.8614 2.80007 14.7635 2.68085C14.4098 2.25 13.5762 2.25 11.9089 2.25Z"
                                    stroke="#FF5733"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <path
                                    d="M3 15.75V6"
                                    stroke="#FF5733"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                  />
                                </svg>
                              </div>
                              <div className="text-red500 text-xs font-medium">
                                {task.priority}
                              </div>
                            </div>
                          )}
                          {task.priority === Priroty.medium && (
                            <div className="flex items-center gap-1">
                              <div className="">
                                <svg
                                  width="18"
                                  height="18"
                                  viewBox="0 0 18 18"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M11.9089 2.25H7.71202C5.49074 2.25 4.38011 2.25 3.69005 2.90901C3 3.56802 3 4.62868 3 6.75L3.07964 11.25H11.9089C13.5762 11.25 14.4098 11.25 14.7635 10.8191C14.8614 10.6999 14.9331 10.5631 14.9742 10.4167C15.1229 9.888 14.6227 9.2511 13.6223 7.9773C13.2062 7.44739 12.9982 7.18244 12.961 6.88133C12.9503 6.79408 12.9503 6.70592 12.961 6.61867C12.9982 6.31756 13.2062 6.05261 13.6223 5.52273C14.6227 4.24891 15.1229 3.612 14.9742 3.08324C14.9331 2.93693 14.8614 2.80007 14.7635 2.68085C14.4098 2.25 13.5762 2.25 11.9089 2.25Z"
                                    stroke="#F59E0B"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <path
                                    d="M3 15.75V6"
                                    stroke="#F59E0B"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                  />
                                </svg>
                              </div>
                              <div className="text-yellow500 text-xs font-medium">
                                {task.priority}
                              </div>
                            </div>
                          )}
                          {task.priority === Priroty.low && (
                            <div className="flex items-center gap-1">
                              <div className="">
                                <svg
                                  width="18"
                                  height="18"
                                  viewBox="0 0 18 18"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M11.9089 2.25H7.71202C5.49074 2.25 4.38011 2.25 3.69005 2.90901C3 3.56802 3 4.62868 3 6.75L3.07964 11.25H11.9089C13.5762 11.25 14.4098 11.25 14.7635 10.8191C14.8614 10.6999 14.9331 10.5631 14.9742 10.4167C15.1229 9.888 14.6227 9.2511 13.6223 7.9773C13.2062 7.44739 12.9982 7.18244 12.961 6.88133C12.9503 6.79408 12.9503 6.70592 12.961 6.61867C12.9982 6.31756 13.2062 6.05261 13.6223 5.52273C14.6227 4.24891 15.1229 3.612 14.9742 3.08324C14.9331 2.93693 14.8614 2.80007 14.7635 2.68085C14.4098 2.25 13.5762 2.25 11.9089 2.25Z"
                                    stroke="#9CA3AF"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <path
                                    d="M3 15.75V6"
                                    stroke="#9CA3AF"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                  />
                                </svg>
                              </div>
                              <div className="text-gray500 text-xs font-medium">
                                {task.priority}
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="relative py-2 px-4 basis-1/12">
                          <button
                            className="flex justify-center items-center w-8 h-8 text-blue-500 hover:text-blue-700 hover:bg-gray100 rounded-lg transition-all"
                            onClick={() => toggleDropdown(task._id ?? '')}
                          >
                            <svg
                              width="44"
                              height="44"
                              viewBox="0 0 44 44"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M22 23C22.5523 23 23 22.5523 23 22C23 21.4477 22.5523 21 22 21C21.4477 21 21 21.4477 21 22C21 22.5523 21.4477 23 22 23Z"
                                stroke="#6B7280"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M29 23C29.5523 23 30 22.5523 30 22C30 21.4477 29.5523 21 29 21C28.4477 21 28 21.4477 28 22C28 22.5523 28.4477 23 29 23Z"
                                stroke="#6B7280"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M15 23C15.5523 23 16 22.5523 16 22C16 21.4477 15.5523 21 15 21C14.4477 21 14 21.4477 14 22C14 22.5523 14.4477 23 15 23Z"
                                stroke="#6B7280"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </button>
                          {activeDropdown === task._id && (
                            <Dropdown
                              onClose={() => setActiveDropdown(null)}
                              onRename={() => console.log("Rename")}
                              onCopyId={() => console.log("Copy ID")}
                              onCopyUrl={() => console.log("Copy URL")}
                              onViewDetails={() => console.log("View Details")}
                              onArchive={() => console.log("Archive")}
                              onDelete={() => console.log("Delete")}
                              onRemindMe={() => console.log("Remind Me")}
                              onDuplicate={() => console.log("Duplicate")}
                              setConfirmModalOpen={setConfirmModalOpen}
                              selectedDate={selectedDate}
                              setSelectedDate={setSelectedDate}
                              side="right"
                            />
                          )}
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <TaskDetailModal
        task={selectedTask}
        setTask={setSelectedTask}
        tasks={tasks}
        setTasks={setTasks}
        tmProjects={tmProjects}
        tmProject={tmProject}
      />
    </>
  );
};

export default TableBoard;
