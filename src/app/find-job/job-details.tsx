import { Icons } from "@/icons";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { PiBookmark, PiBookmarkFill } from "react-icons/pi";
import { locations } from "@/utils/constant";
import { ProjectType } from "@/utils/constant";

type propsType = {
  project: ProjectType;
  onclick: () => void;
};

const JobDetails = ({ project, onclick }: propsType) => {
  const [isBookmarked, setIsBookmarked] = useState(false);

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const getCountryName = (shortCode: string) => {
    const location = locations.find(loc => loc.slug === shortCode);
    return location ? location.label : shortCode;
  }

  return (
    <div className="flex flex-col gap-6 pb-4 px-4 overflow-x-visible overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-thumb]:rounded-full">
      <div className="flex w-full items-center justify-between">
        <div className="flex items-start gap-4">
          <Image
            width={50}
            height={50}
            src={project?.owner?.avatar ? project?.owner?.avatar : "/image/default.png"}
            alt="Company Logo"
            className="rounded-full"
          />
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <h2 className="text-sm text-context font-normal leading-none">
                Amazon
              </h2>
              <p className="text-black text-lg font-medium leading-none">
                {project?.owner?.fullName || ""}
              </p>
              <p className="text-gray500 text-sm font-normal leading-none">
                {project?.owner?.location ? getCountryName(project?.owner?.location) : ""}
              </p>
            </div>
            <div className="flex items-center gap-4 text-gray500">
              <p className="flex items-center gap-1 text-lg font-medium">
                <Icons.dollarbag width="15" />
                <span className="text-context text-md">$250/hr</span>
              </p>
              <p className="flex items-center gap-1 text-lg font-medium">
                <Icons.calender width="15" />
                <span className="text-context text-md">1 Month</span>
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex justify-end items-center gap-4">
            <button
              onClick={onclick}
              className="relative text-sm font-medium bg-gradient-to-r from-blue500 to-purple-500 bg-clip-text text-transparent hover:text-blue500"
            >
              View profile
              <span className="absolute left-0 bottom-0 w-full h-[1px] bg-gradient-to-r from-blue500 to-purple-500"></span>
            </button>

            <button
              onClick={toggleBookmark}
              className="flex items-center justify-center w-10 h-10 rounded-full border border-gray300 hover:bg-gray100 transition-all"
            >
              {isBookmarked ? (
                <PiBookmarkFill className="text-black" size={18} />
              ) : (
                <PiBookmark className="text-gray400" size={18} />
              )}
            </button>
          </div>
          <div className="flex gap-2 justify-end flex-wrap">
            {["Part time", "Senior level", "Distant", "Project work"].map(
              (tag) => (
                <span
                  key={tag}
                  className="border border-gray400 rounded-md px-2 py-1 text-sm text-gray-700"
                >
                  {tag}
                </span>
              )
            )}
          </div>

          <div className="flex justify-end">
            <div className="group p-[1px] rounded-md bg-gradient-to-r from-purple-500 to-blue500">
              <button className="flex items-center justify-center gap-2 px-4 py-2 bg-white rounded-md w-full h-full stroke-context group-hover:bg-transparent group-hover:text-white group-hover:stroke-white transition-all">
                <Icons.envelope width="15" />

                <span>Message Client</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <hr />

      <div className="flex flex-col gap-4">
        <h3 className="text-2xl font-medium">Job Description</h3>
        <div className="flex flex-col text-context text-sm leading-normal">
          <div className="flex">
            <div className="flex items-center h-[21px] px-2">
              <div className="w-1.5 h-1.5 rounded-full bg-context" />
            </div>
            Collaborate with product managers and developers to understand
            project requirements and user needs.
          </div>
          <div className="flex">
            <div className="flex items-center h-[21px] px-2">
              <div className="w-1.5 h-1.5 rounded-full bg-context" />
            </div>
            Design intuitive and engaging user interfaces for web and mobile
            applications, ensuring a seamless user experience.
          </div>
          <div className="flex">
            <div className="flex items-center h-[21px] px-2">
              <div className="w-1.5 h-1.5 rounded-full bg-context" />
            </div>
            Develop wireframes, mockups, and prototypes to communicate design
            concepts and workflows.
          </div>
          <div className="flex">
            <div className="flex items-center h-[21px] px-2">
              <div className="w-1.5 h-1.5 rounded-full bg-context" />
            </div>
            Conduct user research and usability testing to gather feedback and
            iterate on designs.
          </div>
          <div className="flex">
            <div className="flex items-center h-[21px] px-2">
              <div className="w-1.5 h-1.5 rounded-full bg-context" />
            </div>
            Create design assets and documentation to support development teams
            during implementation.
          </div>
          <div className="flex">
            <div className="flex items-center h-[21px] px-2">
              <div className="w-1.5 h-1.5 rounded-full bg-context" />
            </div>
            Stay up-to-date with industry trends and UI/UX best practices,
            incorporating them into your work.
          </div>
          <div className="flex">
            <div className="flex items-center h-[21px] px-2">
              <div className="w-1.5 h-1.5 rounded-full bg-context" />
            </div>
            Work closely with cross-functional teams to ensure consistency and
            coherence across products and platforms.
          </div>
          <div className="flex">
            <div className="flex items-center h-[21px] px-2">
              <div className="w-1.5 h-1.5 rounded-full bg-context" />
            </div>
            Advocate for user-centric design principles and contribute to the
            continuous improvement of design processes.
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <h3 className="text-2xl font-medium">Requirement</h3>
        <div className="flex flex-col text-context text-sm leading-normal">
          <div className="flex">
            <div className="flex items-center h-[21px] px-2">
              <div className="w-1.5 h-1.5 rounded-full bg-context" />
            </div>
            Previous experience as a UI/UX designer or a similar role, with a
            strong portfolio showcasing your design work.
          </div>
          <div className="flex">
            <div className="flex items-center h-[21px] px-2">
              <div className="w-1.5 h-1.5 rounded-full bg-context" />
            </div>
            Proficiency in design tools such as Adobe XD, Sketch, Figma, or
            similar.
          </div>
          <div className="flex">
            <div className="flex items-center h-[21px] px-2">
              <div className="w-1.5 h-1.5 rounded-full bg-context" />
            </div>
            Solid understanding of user-centered design principles and
            methodologies.
          </div>
          <div className="flex">
            <div className="flex items-center h-[21px] px-2">
              <div className="w-1.5 h-1.5 rounded-full bg-context" />
            </div>
            Experience with user research techniques, including usability
            testing and persona development.
          </div>
          <div className="flex">
            <div className="flex items-center h-[21px] px-2">
              <div className="w-1.5 h-1.5 rounded-full bg-context" />
            </div>
            Strong visual design skills, with attention to typography, color,
            and layout.
          </div>
          <div className="flex">
            <div className="flex items-center h-[21px] px-2">
              <div className="w-1.5 h-1.5 rounded-full bg-context" />
            </div>
            Ability to translate complex requirements into intuitive and elegant
            user interfaces.
          </div>
          <div className="flex">
            <div className="flex items-center h-[21px] px-2">
              <div className="w-1.5 h-1.5 rounded-full bg-context" />
            </div>
            Excellent communication and collaboration skills, with the ability
            to present and justify design decisions.
          </div>
          <div className="flex">
            <div className="flex items-center h-[21px] px-2">
              <div className="w-1.5 h-1.5 rounded-full bg-context" />
            </div>
            Familiarity with front-end development technologies (HTML, CSS,
            JavaScript) is a plus but not required.
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <h3 className="text-2xl font-medium">Skills Required</h3>
        <div className="flex flex-wrap gap-2">
          {
            project?.skills && project?.skills?.length && project?.skills?.map((skill) => (
              <span
                key={skill}
                className="bg-gray100 text-black py-1 px-3 rounded text-sm font-medium"
              >
                {skill}
              </span>
            ))
          }
        </div>
      </div>

      <Link
        href="/submit-proposal"
        className="w-full bg-gradient-to-r from-gradientStart to-gradientEnd flex items-center space-x-2 justify-center text-white py-3 rounded-md font-semibold hover:drop-shadow-lg transition-all"
      >
        <Icons.send width="20" />

        <span>Apply Now</span>
      </Link>
    </div>
  );
};

export default JobDetails;
