const HelpAndResources = () => {
  return (
    <div className="w-full flex-col justify-start items-start gap-4 flex">
      <div className="w-full justify-between items-center flex">
        <div className="text-black text-2xl font-semibold">
          Help and resources
        </div>
        <div className="justify-center items-center gap-1 flex">
          <div className="text-black text-sm font-normal">
            View all resources
          </div>
          <div data-svg-wrapper className="relative">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.3332 8H2.6665"
                stroke="#141B34"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M9 12.5C9 12.5 13.3333 8.87775 13.3333 7.99935C13.3333 7.12095 9 3.5 9 3.5"
                stroke="#141B34"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
      <div className="w-full p-6 rounded-lg border border-gray-200 flex-col justify-center items-start gap-2.5 flex overflow-hidden">
        <div className="text-gray-500 text-base font-semibold">Get started</div>
        <div className="text-black text-2xl font-semibold">
          Get started and connect with talent to get work done
        </div>
        <div className="px-4 py-2 rounded-lg border border-gray-200 justify-center items-center gap-2.5 flex">
          <div className="text-green500 text-base font-semibold">Learn more</div>
        </div>
      </div>
    </div>
  );
};

export default HelpAndResources