const TimesheetInfo = () => {
  return (
    <div className="flex px-4 py-5 gap-4 bg-gray200 rounded-2xl">
      <div className="flex flex-col gap-4 basis-1/4">
        <div className="text-sm leading-none">Last 24 hours</div>
        <div className="font-medium text-xl leading-none">5:25 hrs</div>
      </div>
      <div className="flex flex-col gap-4 basis-1/5">
        <div className="text-sm leading-none">This week</div>
        <div className="flex flex-col gap-1">
          <div className="font-medium text-xl leading-none">21:32 hrs</div>
          <div className="flex items-center text-xs leading-none text-context">
            of 40 hrs weekly limit
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4 basis-1/4">
        <div className="text-sm leading-none">Last week</div>
        <div className="font-medium text-xl leading-none">36:30 hrs</div>
      </div>
      <div className="flex flex-col gap-4 basis-1/4">
        <div className="text-sm leading-none">Since start</div>
        <div className="font-medium text-xl leading-none">318:45 hrs</div>
      </div>
    </div>
  );
};
export default TimesheetInfo;
