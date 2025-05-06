"use client";

import { Icons } from "@/icons";
import { FiPlus } from "react-icons/fi";
import AddToDoModal from "./addTodoModal";
import { useState } from "react";
import { Task } from "@/types";
import ToDoItem from "./toDoItem";
import {
  DragDropContext,
  Droppable,
  OnDragEndResponder,
} from "@hello-pangea/dnd";

interface ToDosListProps {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

const ToDosList: React.FC<ToDosListProps> = ({ tasks, setTasks }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOnDragEnd: OnDragEndResponder<string> = (result) => {
    if (!result.destination) return;

    const reorderedTasks = Array.from(tasks);
    const [movedTask] = reorderedTasks.splice(result.source.index, 1);
    reorderedTasks.splice(result.destination.index, 0, movedTask);

    setTasks(reorderedTasks);
  };

  const moveTaskUp = (index: number) => {
    if (index === 0) return;
    const newTasks = [...tasks];
    [newTasks[index - 1], newTasks[index]] = [
      newTasks[index],
      newTasks[index - 1],
    ];
    setTasks(newTasks);
  };

  const moveTaskDown = (index: number) => {
    if (index === tasks.length - 1) return;
    const newTasks = [...tasks];
    [newTasks[index], newTasks[index + 1]] = [
      newTasks[index + 1],
      newTasks[index],
    ];
    setTasks(newTasks);
  };

  return (
    <>
      <div className="flex flex-1 flex-col gap-5">
        <div className="flex justify-between gap-4">
          <div className="text-xl font-semibold">To-dos</div>
          <button
            className="flex items-center px-4 py-2 text-sm text-green500 rounded border border-green500 hover:bg-green500 hover:text-white transition-all"
            onClick={() => setIsModalOpen(true)}
          >
            <FiPlus className="w-6 h-6" />
            &nbsp;New
          </button>
        </div>
        {tasks.length > 0 ? (
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="tasks">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="flex flex-col rounded-xl border border-gray400 gap-5 p-5"
                >
                  {tasks.map((task, index) => (
                    <ToDoItem
                      key={task.id}
                      task={task}
                      index={index}
                      moveTaskUp={moveTaskUp}
                      moveTaskDown={moveTaskDown}
                    />
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        ) : (
          <div className="flex flex-col items-center rounded-xl gap-5 py-14 bg-gray200">
            <div className="w-40 h-40 rounded-full">
              <Icons.taskslist />
            </div>
            <div className="text-sm text-center text-black max-w-[50%]">
              Add to-dos to your project with [Client Name] to organize,
              prioritize, and track your collaboration.
            </div>
          </div>
        )}
      </div>

      <AddToDoModal
        index={tasks.length + 1}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddTask={(newTask) => {
          setTasks([...tasks, newTask]);
          setIsModalOpen(false);
        }}
        onAddAnother={(newTask) => {
          setTasks([...tasks, newTask]);
        }}
      />
    </>
  );
};

export default ToDosList;
