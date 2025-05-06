"use client";

import Image from "next/image";
import { Icons } from "@/icons";
import { ProjectType } from "@/utils/constant";

type JobDetailsProps = {
  project: ProjectType | undefined | null;
}

const JobDetails: React.FC<JobDetailsProps> = ({ project }) => {
  return (
    <div className="basis-1/2 flex flex-col gap-6 bg-white p-10 rounded-md">
      <div className="flex w-full items-center justify-between">
        <div className="flex items-start gap-4">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4 text-gray500">
              <p className="flex items-center gap-1 text-lg font-medium">
                <Icons.dollarbag width="15" />
                <span className="text-context text-md">
                  {project?.type === 'hourly'}
                </span>
              </p>
              <p className="flex items-center gap-1 text-lg font-medium">
                <Icons.calender width="15" />
                <span className="text-context text-md">1 Month</span>
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">

          <div className="flex space-x-2  justify-end flex-wrap">
            <span
              className="border border-gray400 rounded-md px-2 py-1 text-sm text-gray-700"
            >
              {project?.level}
            </span>
            <span
              className="border border-gray400 rounded-md px-2 py-1 text-sm text-gray-700"
            >
              {project?.location}
            </span>
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

      <div>
        <h3 className="text-2xl font-medium mb-2">Skills Required</h3>
        <div className="flex flex-wrap gap-2">
          {project?.skills.map((skill) => (
            <span
              key={skill}
              className="bg-gray100 text-black py-1 px-3 rounded text-sm font-medium"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
