"use client";

import Header from "@/components/Header";
import Main from "./main";
import { useEffect, useState } from "react";
import axios from "axios";
import { ProjectType, ProposalType, apiUrl } from "@/utils/constant";

const ProjectView = () => {
  const [project, setProject] = useState<ProjectType>();
  const [proposals, setProposals] = useState<ProposalType[]>([]);

  useEffect(() => {
    const token = localStorage.getItem('freelancingPlatformAuthToken');

    axios
      .get(`${apiUrl}/api/projects/getProjectById`, {
        headers: {
          Authorization: `Bearer ${token}`
        },
        params: { projectId: '677b5a2e24721eef28bd9433' }
      })
      .then(res => {
        setProject(res.data);
      })
      .catch(err => {
        console.log(err);
      });

    axios
      .get(`${apiUrl}/api/projects/proposals`, {
        headers: {
          Authorization: `Bearer ${token}`
        },
        params: { projectId: '677b5a2e24721eef28bd9433' }
      })
      .then(res => {
        setProposals(res.data);
      })
      .catch(err => {
        console.log(err);
      });


  }, []);

  return (
    <main className="m-auto min-h-screen bg-gray100 overflow-hidden">
      <Header />

      <div className="flex flex-col py-4 px-10">
        <Main
          project={project}
          proposals={proposals}
        />
      </div>
    </main>
  );
};

export default ProjectView;
