const MainBanner = () => {
  return (
    <div className="px-10 flex-col justify-start items-start gap-2.5 flex -mt-4 bg-gradient-to-r from-gradientStart/20 to-gradientEnd/20 bg-opacity-10">
      <div className="flex-col justify-start items-start gap-2.5 pt-4 flex w-full">
        <div className="h-28 flex-col justify-center items-center gap-5 flex w-full">
          <div className="w-full justify-center items-center gap-2.5 flex">
            <div className="grow shrink basis-0 text-[#171718] text-[32px] font-semibold">
              Welcome back, Artur Chornyi
            </div>
            <button className="w-32 h-8 bg-green500 rounded-2xl justify-center items-center gap-2.5 flex font-semibold text-white hover:shadow-lg transition-all">
              + Post a job
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainBanner;
