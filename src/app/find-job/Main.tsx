"use client";

import React, { useEffect, useState } from "react";
import JobCard from "./JobCard";
import { Icons } from "@/icons";
import FindJobModal from "@/components/Modal/FindJobModal";
import JobDetails from "./job-details";
import ClientProfile from "./client-profile";
import {
  Button,
  ButtonGroup,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { SelectChangeEvent } from '@mui/material';
import { useAppDispatch } from "@/store";
import { setProjectState } from "@/store/projectSlice";
import { ProjectType } from "@/utils/constant";

interface MainProps {
  projects: ProjectType[];
}

const Main: React.FC<MainProps> = ({ projects }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortOption, setSortOption] = useState("latest");
  const [viewOption, setViewOption] = useState("grid");
  const [sidebarOption, setSidebarOption] = useState("job");
  const [projectId, setProjectId] = useState('');
  const [project, setProject] = useState<ProjectType>();

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (projectId) {
      setProject(projects.find((project: ProjectType) => project._id === projectId));
      dispatch(setProjectState(projectId));
    }
  }, [projectId]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleChange = (event: SelectChangeEvent<string>, child: React.ReactNode) => {
    setSortOption(event.target.value as string);
  };

  return (
    <>
      <div className="flex flex-1 flex-col">
        <div className="w-full flex items-center pb-4 justify-between">
          <div className="flex gap-2 items-center">
            <Typography fontWeight={600} fontSize={24}>
              Recommended Jobs
            </Typography>
            <div className="flex items-center border border-gray500 text-center px-2 py-1 justify-center rounded-md">
              {projects?.length}
            </div>
          </div>

          <div className="flex space-x-6 items-center">
            <div className="flex items-center">
              <span className="text-gray400">Sort by:</span>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={sortOption}
                label=""
                onChange={handleChange}
                size="small"
                sx={{
                  ".MuiOutlinedInput-notchedOutline": {
                    border: "none",
                  },
                }}
              >
                <MenuItem value="latest">Latest</MenuItem>
                <MenuItem value="oldest">Oldest</MenuItem>
                <MenuItem value="lowest_price">Lowest Price</MenuItem>
                <MenuItem value="highest_price">Highest Price</MenuItem>
              </Select>
            </div>
            <div className="relative">
              <ButtonGroup variant="contained">
                <Button
                  onClick={() => setViewOption("grid")}
                  sx={{
                    borderColor: "var(--gray-200) !important",
                  }}
                  className={`${viewOption === "grid"
                    ? "bg-gradient-to-r from-gradientStart to-gradientEnd"
                    : "bg-white"
                    }`}
                >
                  <Icons.grid
                    width="20"
                    className={`${viewOption === "grid" ? "stroke-white" : "stroke-black"
                      }`}
                  />
                </Button>
                <Button
                  onClick={() => setViewOption("list")}
                  className={`${viewOption === "list"
                    ? "bg-gradient-to-r from-gradientStart to-gradientEnd"
                    : "bg-white"
                    }`}
                >
                  <Icons.list
                    width="20"
                    className={`${viewOption === "list" ? "stroke-white" : "stroke-black"
                      }`}
                  />
                </Button>
              </ButtonGroup>
            </div>
          </div>
        </div>

        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {projects?.map((job: any, index: number) => (
            <JobCard key={index} {...job} setProjectId={setProjectId} index={index} openModal={openModal} />
          ))}
        </div>
      </div>

      <FindJobModal isOpen={isModalOpen} onClose={closeModal}>
        {sidebarOption === "job" ? (
          project ? (

            <JobDetails project={project} onclick={() => setSidebarOption("profile")} />
          )
            : (<div>No project selected</div>)
        ) : (
          <ClientProfile />
        )}
      </FindJobModal>
    </>
  );
};

export default Main;
