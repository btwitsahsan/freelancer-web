"use client";

import React, {
  useState,
  useMemo,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
import TaskCard from "./taskcard";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import TaskDetailModal from "../task-detail-modal";
import {
  apiUrl,
  TmProjectType,
  TmTaskWithFullDataType,
} from "@/utils/constant";
import axios from "axios";

export interface TaskBoardProps {
  tmTasks?: TmTaskWithFullDataType[];
  setTmTasks: Dispatch<SetStateAction<TmTaskWithFullDataType[]>>;
  tmProjects: TmProjectType[];
  tmProject?: TmProjectType;
}

interface Column {
  name: string;
  tasks: TmTaskWithFullDataType[];
}

const TaskBoard: React.FC<TaskBoardProps> = ({
  tmTasks,
  setTmTasks,
  tmProjects,
  tmProject,
}) => {
  const [tasks, setTasks] = useState<TmTaskWithFullDataType[]>(tmTasks || []);
  const [selectedTask, setSelectedTask] =
    useState<TmTaskWithFullDataType | null>(null);

  useEffect(() => {
    if (tmTasks) {
      setTasks(tmTasks);
    }
  }, [tmTasks]);

  const columns = useMemo<Record<string, Column>>(() => {
    const grouped: Record<string, Column> = {
      backlog: { name: "Backlog", tasks: [] },
      upcoming: { name: "Upcoming", tasks: [] },
      ongoing: { name: "On Going", tasks: [] },
      completed: { name: "Completed", tasks: [] },
    };

    tasks.forEach((task) => {
      const status = task.status ? task.status.toLowerCase() : "backlog";
      if (grouped[status]) {
        grouped[status].tasks.push(task);
      }
    });
    return grouped;
  }, [tasks]);

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    const newTasks = [...tasks];

    const grouped: Record<string, TmTaskWithFullDataType[]> = {
      backlog: [],
      upcoming: [],
      ongoing: [],
      completed: [],
    };

    newTasks.forEach((task) => {
      const status = task.status ? task.status.toLowerCase() : "backlog";
      if (grouped[status]) {
        grouped[status].push(task);
      }
    });

    const sourceColumnId = source.droppableId;
    const destColumnId = destination.droppableId;

    const sourceTasks = [...grouped[sourceColumnId]];
    const destTasks =
      sourceColumnId === destColumnId
        ? sourceTasks
        : [...grouped[destColumnId]];

    const [movedTask] = sourceTasks.splice(source.index, 1);

    if (sourceColumnId !== destColumnId) {
      movedTask.status = destColumnId;
      const token = localStorage.getItem("freelancingPlatformAuthToken");

      axios
        .put(
          `${apiUrl}/api/tmProjects/task/${movedTask._id}`,
          { status: movedTask.status },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then(() => {
          console.log(
            `Task ${movedTask._id} status updated to ${movedTask.status}`
          );
        })
        .catch((err) => {
          console.log(err);
        });
    }
    destTasks.splice(destination.index, 0, movedTask);

    grouped[sourceColumnId] = sourceTasks;
    grouped[destColumnId] = destTasks;

    const updatedTasks = [
      ...grouped["backlog"],
      ...grouped["upcoming"],
      ...grouped["ongoing"],
      ...grouped["completed"],
    ];

    setTasks(updatedTasks);
  };

  const columnColors: Record<string, string> = {
    backlog: "bg-gray500",
    upcoming: "bg-yellow400",
    ongoing: "bg-blue500",
    completed: "bg-green500",
  };

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-4 gap-4 px-4">
          {Object.entries(columns).map(([columnId, column]) => (
            <div key={columnId} className="flex flex-col gap-4">
              <div className="flex items-center font-normal text-md gap-2.5">
                <span
                  className={`w-3 h-3 rounded-full ${columnColors[columnId]}`}
                ></span>
                <div className="flex space-x-1">
                  <span className="text-context text-md font-normal">
                    {column.name}
                  </span>
                  <span className="text-gray500 text-md">
                    {column.tasks.length}
                  </span>
                </div>
              </div>
              <Droppable droppableId={columnId}>
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="flex flex-col gap-5"
                  >
                    {column.tasks.length
                      ? column.tasks.map((task, index) => (
                          <Draggable
                            key={task._id}
                            draggableId={task._id ?? "1"}
                            index={index}
                          >
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                onDoubleClick={() => setSelectedTask(task)}
                              >
                                <TaskCard
                                  {...task}
                                  tmTasks={tmTasks || []}
                                  setTmTasks={setTmTasks}
                                />
                              </div>
                            )}
                          </Draggable>
                        ))
                      : ""}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
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

export default TaskBoard;
