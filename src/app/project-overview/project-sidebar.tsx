import { Icons } from "@/icons";
import { TmProjectType } from "@/utils/constant";
import { Dispatch, SetStateAction, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

type SidebarProps = {
  tmProjects: TmProjectType[];
  setTmProject: Dispatch<SetStateAction<TmProjectType | undefined>>;
  onOpenModal: () => void;
  isOpen?: boolean;
  toggleSidebar?: () => void;
};

const Sidebar = ({
  tmProjects,
  setTmProject,
  onOpenModal,
  isOpen = true,
  toggleSidebar,
}: SidebarProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleProjectClick = (slug: string) => {
    const urlFriendlyTitle = encodeURIComponent(slug);
    const params = new URLSearchParams(searchParams);
    params.set("project", urlFriendlyTitle);
    router.push(`/project-overview?${params.toString()}`);
  };
  console.log(tmProjects, "tmProjects");

  return (
    <>
      {/* Mobile Toggle Button - Outside sidebar */}
      <button
        className="fixed top-4 left-4 z-40 block md:hidden bg-gray100 p-2 rounded-md shadow-md"
        onClick={toggleSidebar}
      >
        {isOpen ? (
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        )}
      </button>

      {/* Sidebar Container */}
      <div
        className={`${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } fixed top-0 left-0 z-30 h-full md:sticky md:top-0 md:translate-x-0 transition-transform duration-300 ease-in-out w-64 flex flex-col bg-gray100 pr-3 sm:pr-5 border-r border-gray200 gap-6 sm:gap-10 pl-3 sm:pl-5 pt-16 md:pt-6 pb-4 sm:pb-6 overflow-y-auto`}
      >
        <div className="text-black text-xs font-bold uppercase">Main Menu</div>

        <div>
          <Link
            href="/project-overview/dashboard"
            className="flex items-center space-x-2 text-black text-sm font-medium cursor-pointer"
          >
            <Icons.mainmenu width="20" />
            <span className="text-gray500">Dashboard</span>
          </Link>
        </div>

        <div className="flex flex-col gap-3 sm:gap-5">
          <div className="flex justify-between items-center text-gray500 text-xs font-semibold uppercase">
            <span className="text-black text-xs font-bold uppercase">
              Project
            </span>
            <button
              onClick={onOpenModal}
              className="text-black hover:rotate-90 transition-all"
            >
              <Icons.addpro width="15" />
            </button>
          </div>
          <ul className="flex flex-col gap-4 sm:gap-6 max-h-80 overflow-y-auto">
            {tmProjects?.length ? (
              tmProjects?.map((project, index) => {
                return (
                  <li
                    key={`project-${index}`}
                    className="text-black text-sm sm:text-base font-medium cursor-pointer truncate hover:text-gray-700 transition-colors"
                    onClick={() => {
                      if (project.slug) {
                        handleProjectClick(project.slug);
                        // Close sidebar on mobile after selection
                        if (toggleSidebar && window.innerWidth < 768) {
                          toggleSidebar();
                        }
                      }
                    }}
                  >
                    {project.title}
                  </li>
                );
              })
            ) : (
              <li className="text-gray-500 text-sm">No projects available</li>
            )}
          </ul>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={toggleSidebar}
        />
      )}
    </>
  );
};

export default Sidebar;
