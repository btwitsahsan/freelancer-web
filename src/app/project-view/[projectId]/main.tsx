"use client";
import { useState } from "react";
import MainTab from "./main-tab";
import SubHeader from "./subheader";
import JobDetails from "./job-details";
import InviteTalent from "./invite-talent";
import { User } from "@/types";
import ManageProposal from "./manage-proposal";
import Hired from "./hired";
import { ProjectType, apiUrl, BadgeType, ProposalType } from "@/utils/constant";

export type Tab =
  | "viewJobPost"
  | "inviteFreelancers"
  | "reviewProposals"
  | "hire";

const talents: User[] = [
  {
    fullName: "Sydorenko Zlata",
    position: "Senior UI/UX Designer",
    location: "Ukraine",
    avatar: "/image/avatar/1.jpg",
    hourlyRate: 25,
    job_success: 83,
    earning: 70001,
    available: true,
    online: true,
    badge: "top-rated-plus" as BadgeType,
    skills: [
      "Logo Design",
      "Graphic Design",
      "Logo",
      "Brand Identity",
      "Brand Identity & Guidelines",
      "Brand Identity Design",
      "Web design",
      "Figma",
      "Figma",
      "Landing Page",
      "Graphic Design",
      "Adobe XD",
      "Adobe Illustration",
      "Adobe Photoshop",
      "Canva",
    ],
  },
  {
    fullName: "Artur Chornyi",
    position: "Senior UI/UX Designer",
    location: "Ukraine",
    avatar: "/image/avatar/2.jpg",
    hourlyRate: 25,
    job_success: 83,
    earning: 70001,
    available: true,
    online: true,
    badge: "top-rated-plus" as BadgeType,
    skills: [
      "Logo Design",
      "Graphic Design",
      "Logo",
      "Brand Identity",
      "Brand Identity & Guidelines",
      "Brand Identity Design",
      "Web design",
      "Figma",
      "Figma",
      "Landing Page",
      "Graphic Design",
      "Adobe XD",
      "Adobe Illustration",
      "Adobe Photoshop",
      "Canva",
    ],
  },
  {
    fullName: "Marko Markovic",
    position: "Senior UI/UX Designer",
    location: "Serbia",
    avatar: "/image/avatar/3.jpg",
    hourlyRate: 25,
    job_success: 83,
    earning: 70001,
    available: true,
    online: true,
    badge: "top-rated-plus" as BadgeType,
    skills: [
      "Logo Design",
      "Graphic Design",
      "Logo",
      "Brand Identity",
      "Brand Identity & Guidelines",
      "Brand Identity Design",
      "Web design",
      "Figma",
      "Figma",
      "Landing Page",
      "Graphic Design",
      "Adobe XD",
      "Adobe Illustration",
      "Adobe Photoshop",
      "Canva",
    ],
  },
  {
    fullName: "Judicael Boschat",
    position: "Senior UI/UX Designer",
    location: "Serbia",
    avatar: "/image/avatar/4.jpg",
    hourlyRate: 25,
    job_success: 83,
    earning: 70001,
    available: true,
    online: true,
    badge: "top-rated-plus" as BadgeType,
    skills: [
      "Logo Design",
      "Graphic Design",
      "Logo",
      "Brand Identity",
      "Brand Identity & Guidelines",
      "Brand Identity Design",
      "Web design",
      "Figma",
      "Figma",
      "Landing Page",
      "Graphic Design",
      "Adobe XD",
      "Adobe Illustration",
      "Adobe Photoshop",
      "Canva",
    ],
  },
];

type MainProps = {
  project: ProjectType | undefined | null;
  proposals: ProposalType[] | [];
}

const Main: React.FC<MainProps> = ({ project, proposals }) => {
  const [activeTab, setActiveTab] = useState<Tab>("viewJobPost");

  const renderContent = () => {
    switch (activeTab) {
      case "viewJobPost":
        return <JobDetails project={project} proposalCount={proposals.length} />;
      case "inviteFreelancers":
        return <InviteTalent users={talents} />;
      case "reviewProposals":
        return <ManageProposal proposals={proposals} />;
      case "hire":
        return <Hired users={talents} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <SubHeader title={project?.title} />

      <MainTab activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="content">{renderContent()}</div>
    </div>
  );
};

export default Main;
