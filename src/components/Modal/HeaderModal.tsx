import { Icons } from "@/icons";

const HeaderModal = () => {
  return (
    <div className="absolute top-full right-0 pt-2 z-10">
      <div className="flex flex-col gap-6 bg-white shadow-lg rounded-lg w-80 max-h-[420px] px-5 py-7 drop-shadow-md">
        <h3 className="font-semibold text-lg">Recent Activity</h3>
        <ul className="flex h-full flex-col gap-4 overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-thumb]:rounded-full">
          <li className="flex items-start gap-3">
            <div className="w-7 h-7 flex items-center justify-center rounded-full bg-green500">
              <Icons.notifmessage className="w-4 h-4" />
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-sm text-context font-normal leading-normal">
                <strong>Akash</strong> leave some comments on <br />
                <span>Konsep Ilustrasi</span>
              </p>
              <p className="text-xs text-gray400 leading-none">Nov 8</p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <div className="w-7 h-7 flex items-center justify-center rounded-full bg-[#7784EE]">
              <Icons.notifedit className="w-4 h-4" />
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-sm text-context font-normal leading-normal">
                <strong>Raymond</strong> change project info on <br />
                <span>Project Homepage</span>
              </p>
              <p className="text-xs text-gray400 leading-none">Nov 8</p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <div className="w-7 h-7 flex items-center justify-center rounded-full bg-yellow500">
              <Icons.notifflag className="w-4 h-4" />
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-sm text-context font-normal leading-normal">
                <strong>Sandip</strong> change the due date of <br />
                <span>Project Homepage</span>
              </p>
              <p className="text-xs text-gray400 leading-none">Nov 8</p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <div className="w-7 h-7 flex items-center justify-center rounded-full bg-green500">
              <Icons.notifmessage className="w-4 h-4" />
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-sm text-context font-normal leading-normal">
                <strong>Akash</strong> leave some comments on <br />
                <span>Konsep Ilustrasi</span>
              </p>
              <p className="text-xs text-gray400 leading-none">Nov 8</p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <div className="w-7 h-7 flex items-center justify-center rounded-full bg-[#7784EE]">
              <Icons.notifedit className="w-4 h-4" />
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-sm text-context font-normal leading-normal">
                <strong>Raymond</strong> change project info on <br />
                <span>Project Homepage</span>
              </p>
              <p className="text-xs text-gray400 leading-none">Nov 8</p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <div className="w-7 h-7 flex items-center justify-center rounded-full bg-yellow500">
              <Icons.notifflag className="w-4 h-4" />
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-sm text-context font-normal leading-normal">
                <strong>Sandip</strong> change the due date of <br />
                <span>Project Homepage</span>
              </p>
              <p className="text-xs text-gray400 leading-none">Nov 8</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default HeaderModal;
