"use client";

import { useState } from "react";
import Header from "@/components/Header";
import JobDetails from "./job-details";
import ProposalForm from "./proposal-form";
import ClientProfile from "./client-profile";
import ReduxProvider from "@/store/reduxProvider";

export type UserType = {
  avatar: string;
  fullName: string;
  email: string;
  userName: string;
  location: string;
  uid: string;
}

export type ProjectType = {
  _id: string;
  title: string;
  company: string;
  owner: UserType;
  createdAt: string;
  minHourlyRate: string;
  maxHourlyRate: string;
  estimatedPrice: string;
  location: string;
  skills: string[];
  index: number;
  type: string;
};

const SubmitProposal = () => {
  const [viewOption, setViewOption] = useState("job");
  const [project, setProject] = useState<ProjectType>();

  return (
    <ReduxProvider>
      <main className="m-auto bg-gray100 pb-4 overflow-hidden">
        <Header white={true} round={true} />

        <div className="flex gap-10 px-10 py-5">
          {project && <ProposalForm project={project} />}

          {viewOption === "job" ? (
            <JobDetails project={project} setProject={setProject} onclick={() => setViewOption("profile")} />
          ) : (
            <ClientProfile />
          )}
        </div>
      </main>
    </ReduxProvider>
  );
};

export default SubmitProposal;
