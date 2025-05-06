"use client"

import Header from "@/components/Header";
import SearchBar from "./search";
import SidebarFilter from "./SidebarFilter";
import Main from "./Main";
import { useEffect, useState } from "react";
import axios from "axios";
import ReduxProvider from "@/store/reduxProvider";
import { ProjectType } from "@/utils/constant";
import { apiUrl } from "@/utils/constant";

interface DropdownItem {
  id: number;
  label: string;
  slug: string;
}

const Job = () => {
  const [projects, setProjects] = useState<ProjectType[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [salaryRange, setSalaryRange] = useState<number[]>([1200, 40000]);
  const [locations, setLocations] = useState<DropdownItem[]>([]);
  const [levels, setLevels] = useState<DropdownItem[]>([]);
  const [types, setTypes] = useState<DropdownItem[]>([]);

  useEffect(() => {
    const token = localStorage.getItem('freelancingPlatformAuthToken');

    const filterEmptyParams = (params: Record<string, string | number>) => {
      return Object.fromEntries(
        Object.entries(params).filter(([_, value]) => value !== undefined && value !== '')
      );
    };

    const params = {
      searchTerm,
      minRate: salaryRange[0],
      maxRate: salaryRange[1],
      levels: levels.map(level => level?.slug).join(','),
      types: types.map(type => type?.slug).join(','),
      locations: locations.map(location => location?.slug).join(',')
    };

    const filteredParams = filterEmptyParams(params);

    axios
      .get(`${apiUrl}/api/projects/filter`, {
        headers: {
          Authorization: `Bearer ${token}`
        },
        params: filteredParams
      })
      .then(res => {
        setProjects(res.data.projects);
      })
      .catch(err => {
        console.log(err);
      });
  }, [salaryRange, levels, locations, types]);

  return (
    <ReduxProvider>
      <main className="m-auto bg-gray100 overflow-hidden">
        <Header white={true} round={false} />
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          salaryRange={salaryRange}
          setSalaryRange={setSalaryRange}
          locations={locations}
          setLocations={setLocations}
          levels={levels}
          setLevels={setLevels}
          types={types}
          setTypes={setTypes}
        />

        <div className="flex p-10 gap-8">
          <SidebarFilter />
          <div className="w-0.5 min-h-full bg-gray200" />
          <Main projects={projects} />
        </div>
      </main>
    </ReduxProvider>
  );
};
export default Job;
