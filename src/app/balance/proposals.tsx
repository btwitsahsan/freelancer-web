const Proposals = () => {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center">
        <div className="flex-shrink-0 items-center w-32 flex gap-1">
          <span className="text-md">180</span>
          <span className="text-sm">sent</span>
        </div>
        <div className="w-full bg-gray200 rounded-full h-3">
          <div
            className="bg-[#A78BFA] h-3 rounded-r-full"
            style={{ width: "80%" }}
          ></div>
        </div>
      </div>

      <div className="flex items-center">
        <div className="flex-shrink-0 items-center w-32 flex gap-1">
          <span className="text-md">76</span>
          <span className="text-sm">viewed</span>
        </div>
        <div className="w-full bg-gray200 rounded-full h-3">
          <div
            className="bg-[#A78BFA] h-3 rounded-r-full"
            style={{ width: "60%" }}
          ></div>
        </div>
      </div>

      <div className="flex items-center">
        <div className="flex-shrink-0 items-center w-32 flex gap-1">
          <span className="text-md">22</span>
          <span className="text-sm">interviews</span>
        </div>
        <div className="w-full bg-gray200 rounded-full h-3">
          <div
            className="bg-[#A78BFA] h-3 rounded-r-full"
            style={{ width: "40%" }}
          ></div>
        </div>
      </div>

      <div className="flex items-center">
        <div className="flex-shrink-0 items-center w-32 flex gap-1">
          <span className="text-md">16</span>
          <span className="text-sm">hires</span>
        </div>
        <div className="w-full bg-gray200 rounded-full h-3">
          <div
            className="bg-[#A78BFA] h-3 rounded-r-full"
            style={{ width: "30%" }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Proposals;
