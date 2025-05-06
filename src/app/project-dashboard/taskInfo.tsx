import { FaPencil } from "react-icons/fa6";

const TaskInfo = () => {
  return (
    <div className="flex px-4 py-5 gap-4 bg-gray200 rounded-2xl">
      <div className="flex flex-col gap-4 basis-2/5">
        <div className="text-sm leading-none">Earnings this week</div>
        <div className="font-medium text-xl leading-none">$2620.42</div>
      </div>
      <div className="flex flex-col gap-4 basis-1/5">
        <div className="text-sm leading-none">Contract’s rate</div>
        <div className="flex flex-col gap-1">
          <div className="font-medium text-xl leading-none">$70.00 /hr</div>
          <div className="flex items-center text-xs leading-none text-green500">
            Change rate&nbsp;
            <FaPencil className="w-3 h-3" />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4 basis-1/5">
        <div className="text-sm leading-none">This week’s tracked</div>
        <div className="flex flex-col gap-1">
          <div className="font-medium text-xl leading-none">0:00 hrs</div>
          <div className="flex items-center text-xs leading-none text-context">
            of 40 hrs weekly limit
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2 basis-1/5">
        <button className="flex h-10 justify-center items-center text-sm text-white bg-black rounded hover:bg-gray-800 transition-colors duration-300">
          Add time manually
        </button>
        <button className="flex h-10 justify-center items-center text-sm border border-black rounded hover:bg-black hover:text-white transition-colors duration-300">
          View timesheet
        </button>
      </div>
    </div>
  );
};

export default TaskInfo;
