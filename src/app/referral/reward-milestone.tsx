const RewardMilestone = () => {
  return (
    <div className="flex flex-col gap-5 p-5 rounded-2xl bg-white border">
      <h4 className="font-semibold text-2xl text-black">Reward & Milestones</h4>
      <div className="flex items-center gap-2.5">
        <span className="px-3 py-1 text-sm font-semibold text-gray500 border rounded-md">
          $25 REWARDS
        </span>
        <div className="flex-grow relative">
          <div className="bg-[#D1FAE5] h-5 rounded-full">
            <div
              className="bg-[#6EE7B7] h-full rounded-full"
              style={{ width: "40%" }}
            ></div>
          </div>
          <span className="absolute inset-y-0 left-2 bottom-1 transform text-sm font-semibold text-white">
            2/5
          </span>
        </div>
        <span className="px-3 py-1 text-sm font-semibold text-gray500 border rounded-md">
          $35 REWARDS
        </span>
      </div>
    </div>
  );
};

export default RewardMilestone;
