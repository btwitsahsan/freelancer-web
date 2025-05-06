"use client";

import React, { useEffect, useState } from "react";
import Sidebar from "./project-sidebar";
import Header from "./project-header";
import TaskBoard from "./board/taskboard";
import ProjectOverviewModal from "@/components/Modal/ProjectOverviewModal";
import CreateProjectModal from "@/components/Modal/CreateProjectModal";
import CreateTaskModal from "@/components/Modal/CreateTaskModal";
import {
  TmProjectType,
  TmTaskWithFullDataType,
  TmUserType,
} from "@/utils/constant";
import { apiUrl } from "@/utils/constant";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import TableBoard from "./table/tableboard";
import ListBoard from "./list/listboard";
import CalendarBoard from "./calendar/calendarboard";
import BacklogBoard from "./backlog/backlogboard";

export const VIEWS = {
  BOARD: "Board",
  TABLE: "Table",
  LIST: "List",
  CALENDAR: "Calendar",
  BACKLOG: "Backlog",
};

const Main = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [projectModal, setProjectModal] = useState(false);
  const [taskModal, setTaskModal] = useState(false);
  const [tmProjects, setTmProjects] = useState<TmProjectType[]>([]);
  const [tmProject, setTmProject] = useState<TmProjectType>();
  const [tmUsers, setTmUsers] = useState<TmUserType[]>([]);
  const [tmTasks, setTmTasks] = useState<TmTaskWithFullDataType[]>([]);
  const searchParams = useSearchParams();
  const [activeView, setActiveView] = useState<string>("Board");

  useEffect(() => {
    const fetchTmProjects = () => {
      const token = localStorage.getItem("freelancingPlatformAuthToken");

      axios
        .get(`${apiUrl}/api/tmProjects/projects`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setTmProjects(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    fetchTmProjects();
  }, []);

  useEffect(() => {
    const slug = searchParams.get("project");
    const viewMode = searchParams.get("viewMode");

    if (slug && tmProjects.length) {
      const foundProject = tmProjects.find((proj) => proj.slug === slug);
      setTmProject(foundProject);
    }
    if (viewMode) {
      setActiveView(viewMode);
    }
  }, [searchParams, tmProjects]);

  useEffect(() => {
    const token = localStorage.getItem("freelancingPlatformAuthToken");

    if (tmProject) {
      axios
        .get(`${apiUrl}/api/tmProjects/project/users`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: { projectId: tmProject._id },
        })
        .then((res) => {
          setTmUsers(res.data);
        })
        .catch((err) => {
          console.log(err);
        });

      axios
        .get(`${apiUrl}/api/tmProjects/project/tasks`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: { projectId: tmProject._id },
        })
        .then((res) => {
          setTmTasks(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [tmProject]);

  return (
    <div className="relative flex px-10 gap-5">
      <Sidebar
        tmProjects={tmProjects}
        setTmProject={setTmProject}
        onOpenModal={() => setProjectModal(true)}
      />
      <div className="flex-1 flex flex-col gap-8">
        <Header
          tmProject={tmProject}
          tmUsers={tmUsers}
          onOpenTaskModal={() => setTaskModal(true)}
          onOpenModal={() => setModalOpen(true)}
          activeView={activeView}
          setActiveView={setActiveView}
        />

        {activeView === VIEWS.BOARD && (
          <TaskBoard
            tmTasks={tmTasks}
            setTmTasks={setTmTasks}
            tmProjects={tmProjects}
            tmProject={tmProject}
          />
        )}
        {activeView === VIEWS.TABLE && (
          <TableBoard
            tmTasks={tmTasks}
            setTmTasks={setTmTasks}
            tmProjects={tmProjects}
            tmProject={tmProject}
          />
        )}
        {activeView === VIEWS.LIST && (
          <ListBoard
            tmTasks={tmTasks}
            setTmTasks={setTmTasks}
            tmProjects={tmProjects}
            tmProject={tmProject}
          />
        )}
        {activeView === VIEWS.CALENDAR && (
          <CalendarBoard
            tmTasks={tmTasks}
            setTmTasks={setTmTasks}
            tmProjects={tmProjects}
            tmProject={tmProject}
          />
        )}
        {activeView === VIEWS.BACKLOG && <BacklogBoard />}

        <ProjectOverviewModal
          isOpen={isModalOpen}
          tmUsers={tmUsers}
          setTmUsers={setTmUsers}
          tmProject={tmProject}
          onClose={() => setModalOpen(false)}
        />
        <CreateProjectModal
          isOpen={projectModal}
          tmProjects={tmProjects}
          setTmProjects={setTmProjects}
          onClose={() => setProjectModal(false)}
        />
        <CreateTaskModal
          projectId={tmProject?._id}
          tmUsers={tmUsers}
          isOpen={taskModal}
          onClose={() => setTaskModal(false)}
        />
      </div>
    </div>
  );
};

export default Main;
