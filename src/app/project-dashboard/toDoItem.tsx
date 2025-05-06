"use client";

import React from "react";
import Image from "next/image";
import { FaGripVertical } from "react-icons/fa";
import { IoCheckmarkCircle, IoCloseCircle } from "react-icons/io5";
import { Task } from "@/types";
import { Icons } from "@/icons";
import { Draggable } from "@hello-pangea/dnd";

interface ToDoItemProps {
  task: Task;
  index: number;
  moveTaskUp: (index: number) => void;
  moveTaskDown: (index: number) => void;
}

const ToDoItem: React.FC<ToDoItemProps> = ({
  task,
  index,
  moveTaskUp,
  moveTaskDown,
}) => {
  return (
    <Draggable draggableId={`task-${task.id}`} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`group flex gap-5 justify-between p-3 transition-all ${
            snapshot.isDragging ? "bg-gray-100 shadow-lg" : ""
          }`}
        >
          <button className="flex justify-center items-center w-6 h-6 hover:bg-gray200 rounded transition-colors">
            <FaGripVertical className="w-4 h-4" />
          </button>
          {task.status === "DONE" && (
            <IoCheckmarkCircle className="w-7 h-7 text-green500" />
          )}
          {task.status === "CANCELLED" && (
            <IoCloseCircle className="w-7 h-7 text-red500" />
          )}
          {task.status === "NOT_STARTED" && (
            <div className="w-6 h-6 border border-green500 rounded-full" />
          )}
          <div className="flex-1 flex flex-col gap-2.5">
            <div className="text-xs leading-none">{task.type}</div>
            <div className="text-sm leading-none">{task.task}</div>
            <div className="flex items-center gap-2.5">
              <Image
                src={task.assignee.avatar}
                alt="Avatar"
                width={24}
                height={24}
                className="rounded-full"
              />
              <div className="text-xs text-gray500">
                {task.assignee.name} - Due {task.dueDate}
              </div>
            </div>
          </div>
          <div className="flex gap-2.5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
            <button
              className="flex justify-center items-center w-8 h-8 hover:bg-gray200 rounded transition-colors"
              onClick={() => moveTaskUp(index)}
            >
              <Icons.angleup />
            </button>
            <button
              className="flex justify-center items-center w-8 h-8 hover:bg-gray200 rounded transition-colors"
              onClick={() => moveTaskDown(index)}
            >
              <Icons.angledown />
            </button>
            <button className="flex justify-center items-center w-8 h-8 hover:bg-gray200 rounded transition-colors">
              <Icons.pencil />
            </button>
            <button className="flex justify-center items-center w-8 h-8 hover:bg-gray200 rounded transition-colors">
              <Icons.delete />
            </button>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default ToDoItem;
