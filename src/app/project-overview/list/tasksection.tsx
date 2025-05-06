import { FiPlus } from "react-icons/fi";
import { FaAngleDown } from "react-icons/fa";
import { taskStatuses, TaskStatusKey } from "./listboard";
import { TmTaskWithFullDataType } from "@/utils/constant";
import TaskRow from "./taskrow";

// Props for TaskSection
interface TaskSectionProps {
  status: TaskStatusKey;
  tasks: TmTaskWithFullDataType[];
}

// Task section component
const TaskSection: React.FC<TaskSectionProps> = ({ status, tasks }) => {
  return (
    <div className="self-stretch flex-col justify-start items-start gap-2.5 flex">
      <div className="self-stretch justify-start items-center gap-2 inline-flex">
        <div className="w-3 h-3 flex-col justify-center items-center inline-flex">
          <FaAngleDown />
        </div>
        <div className="mix-blend-multiply flex">
          <div
            className={`pl-1.5 pr-2 py-0.5 ${taskStatuses[status].badgeBg} rounded flex items-center gap-0.5`}
          >
            <div className="w-3.5 h-3.5">{taskStatuses[status].icon}</div>
            <div
              className={`text-xs font-medium ${taskStatuses[status].textColor}`}
            >
              {taskStatuses[status].label}
            </div>
          </div>
        </div>
        <div className="w-3 h-3 text-gray-500 text-xs font-medium">
          {tasks.length}
        </div>
        <div className="h-4 flex items-center">
          <div className="w-4 h-4">
            <FiPlus className="text-gray-500" />
          </div>
          <div className="text-gray-500 text-xs font-medium">Add Task</div>
        </div>
      </div>
      <div className="flex-col justify-start items-start flex w-full">
        {tasks.map((task) => (
          <TaskRow key={task._id} task={task} status={status} />
        ))}
        <div className="w-full py-2 justify-start items-start inline-flex">
          <div className="basis-1/12 h-6 pl-5 flex items-center gap-2.5">
            <div className="w-4 h-4">
              <FiPlus className="text-gray-400" />
            </div>
            <div className="text-gray-400 text-xs font-medium">Add Task</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskSection;
