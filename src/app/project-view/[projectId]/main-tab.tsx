import React, { Dispatch, SetStateAction } from "react";
import { Tab } from "./main";

const MainTab = ({
  activeTab,
  setActiveTab,
}: {
  activeTab: string;
  setActiveTab: Dispatch<SetStateAction<Tab>>;
}) => {
  return (
    <div className="max-w-5xl mx-auto w-full">
      <div className="flex border border-gray400 rounded overflow-hidden">
        <button
          className={`basis-1/4 h-16 py-4 px-6 transition-all duration-300 font-semibold uppercase ${activeTab === "viewJobPost"
              ? "bg-green500 text-white hover:text-lg"
              : "text-gray-500 hover:text-bg"
            }`}
          onClick={() => setActiveTab("viewJobPost")}
        >
          View Job Post
        </button>
        <button
          className={`basis-1/4 h-16 py-4 px-6 transition-all duration-300 font-semibold uppercase ${activeTab === "inviteFreelancers"
              ? "bg-green500 text-white hover:text-lg"
              : "text-gray-500 hover:bg-green500 hover:text-white"
            }`}
          onClick={() => setActiveTab("inviteFreelancers")}
        >
          Invite Freelancers
        </button>
        <button
          className={`basis-1/4 h-16 py-4 px-6 transition-all duration-300 font-semibold uppercase ${activeTab === "reviewProposals"
              ? "bg-green500 text-white hover:text-lg"
              : "text-gray-500 hover:bg-green500 hover:text-white"
            }`}
          onClick={() => setActiveTab("reviewProposals")}
        >
          Review Proposals
        </button>
        <button
          className={`basis-1/4 h-16 py-4 px-6 transition-all duration-300 font-semibold uppercase ${activeTab === "hire"
              ? "bg-green500 text-white hover:text-lg"
              : "text-gray-500 hover:bg-green500 hover:text-white"
            }`}
          onClick={() => setActiveTab("hire")}
        >
          Hire
        </button>
      </div>
    </div>
  );
};

export default MainTab;
