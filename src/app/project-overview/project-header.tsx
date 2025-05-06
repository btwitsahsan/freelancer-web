import { Icons } from "@/icons";
import { TmProjectType, TmUserType } from "@/utils/constant";
import Image from "next/image";
import { FiSearch } from "react-icons/fi";
import { VIEWS } from "./Main";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

type HeaderProps = {
  tmProject?: TmProjectType;
  tmUsers?: TmUserType[];
  onOpenModal: () => void;
  onOpenTaskModal: () => void;
  activeView?: string;
  setActiveView: (view: string) => void;
};

const Header = ({
  tmProject,
  tmUsers,
  activeView,
  setActiveView,
  onOpenModal,
  onOpenTaskModal,
}: HeaderProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleActiveView = (view: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("viewMode", view);
    router.push(`/project-overview?${params.toString()}`);
  };

  return (
    <div className="flex flex-col bg-gray100 gap-4 sm:gap-8 px-2 sm:px-4 py-3 sm:py-5">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full gap-4 sm:gap-0">
        <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
          <span className="text-xl sm:text-2xl md:text-4xl font-medium text-black break-words">
            {tmProject ? tmProject.title : ""}
          </span>

          <div className="flex items-center -space-x-2">
            {tmUsers?.length
              ? tmUsers.slice(0, 5).map((user, index) => {
                  return (
                    <Image
                      key={index}
                      className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border border-black"
                      src={user.user?.avatar ?? "/image/default.png"}
                      width={32}
                      height={32}
                      alt="User"
                    />
                  );
                })
              : ""}
            {tmUsers && tmUsers?.length > 5 ? (
              <div className="relative w-6 h-6 sm:w-8 sm:h-8 rounded-full border border-black">
                <Image
                  className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border border-black"
                  src="/image/avatar/1.jpg"
                  width={32}
                  height={32}
                  alt="User"
                />
                <div className="absolute w-full h-full top-0 left-0 bg-black opacity-50 rounded-full" />
                <span className="absolute top-1/2 left-1/2 text-white text-xs -translate-x-1/2 -translate-y-1/2">
                  +{tmUsers.length - 5}
                </span>
              </div>
            ) : (
              ""
            )}
          </div>

          <button
            onClick={onOpenModal}
            className="text-context text-xs sm:text-sm bg-white border px-2 sm:px-3 py-1.5 sm:py-2.5 rounded-md hover:bg-gray100 leading-none transition-all"
          >
            Invite
          </button>
        </div>

        <div className="flex w-full sm:w-auto items-center gap-2 sm:gap-3">
          {/* Mobile search toggle */}
          <div className="flex sm:hidden items-center ml-auto">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 text-gray500"
            >
              <FiSearch className="h-5 w-5" />
            </button>
          </div>

          {/* Search field - hidden on mobile unless toggled */}
          <div
            className={`${
              isSearchOpen ? "flex" : "hidden sm:flex"
            } flex-grow sm:flex-grow-0 px-3 sm:px-4 py-2 sm:py-2.5 gap-2 bg-white rounded-lg focus-within:ring-2 focus-within:ring-green500`}
          >
            <FiSearch className="h-5 w-5 sm:h-6 sm:w-6 text-gray500" />
            <input
              type="text"
              placeholder="Search"
              className="w-full sm:w-auto text-gray500 text-sm outline-none"
            />
          </div>

          <button
            onClick={onOpenTaskModal}
            className="whitespace-nowrap text-xs sm:text-sm bg-gradient-to-r from-gradientStart to-gradientEnd text-white px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg hover:shadow-lg transition-all"
          >
            Create Task
          </button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0">
        <div className="flex flex-wrap font-medium text-gray400 gap-4 sm:gap-8">
          {Object.values(VIEWS).map((view) => (
            <button
              key={view}
              onClick={() => handleActiveView(view)}
              className={`pb-1 sm:pb-2 text-sm sm:text-base ${
                activeView === view
                  ? "text-black border-b-2 border-black"
                  : "hover:text-black transition-all"
              }`}
            >
              {view}
            </button>
          ))}
        </div>

        <button className="w-8 h-8 sm:w-10 sm:h-10 text-gray500 bg-white rounded-lg px-1.5 sm:px-2 py-1.5 sm:py-2 flex justify-center items-center hover:shadow transition-all">
          <Icons.projectfilter width="16" height="20" />
        </button>
      </div>
    </div>
  );
};

export default Header;
