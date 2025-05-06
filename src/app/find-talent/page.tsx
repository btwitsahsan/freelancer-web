"use client";

import Header from "@/components/HeaderClient";
import SearchBar from "./search";
import SidebarFilter from "./SidebarFilter";
import Main from "./Main";
import axios from "axios";
import { useState, useEffect } from "react";
import { UserType } from "@/utils/constant";
import { apiUrl } from "@/utils/constant";

export interface DropdownItem {
  id: number;
  label: string;
  slug: string;
}

const FindTalent = () => {
  const [users, setUsers] = useState<UserType[]>([]);
  const [locations, setLocations] = useState<DropdownItem[]>([]);
  const [salaryRange, setSalaryRange] = useState<number[]>([10, 100]);

  useEffect(() => {
    const token = localStorage.getItem("freelancingPlatformAuthToken");

    const filterEmptyParams = (params: Record<string, string | number>) => {
      return Object.fromEntries(
        Object.entries(params).filter(
          ([, value]) => value !== undefined && value !== ""
        )
      );
    };

    const params = {
      minRate: Number(salaryRange[0]),
      maxRate: Number(salaryRange[1]),
      locations: locations.map((location) => location?.slug).join(","),
    };

    const filteredParams = filterEmptyParams(params);

    axios
      .get(`${apiUrl}/api/users/filter`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: filteredParams,
      })
      .then((res) => {
        setUsers(res.data.users);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [salaryRange, locations]);

  return (
    <main className="m-auto bg-gray100 overflow-hidden">
      <Header white={true} round={false} />
      <SearchBar
        locations={locations}
        setLocations={setLocations}
        salaryRange={salaryRange}
        setSalaryRange={setSalaryRange}
      />
      <div className="flex p-10 gap-8">
        <SidebarFilter />
        <div className="w-0.5 min-h-full bg-gray200" />
        <Main users={users} />
      </div>
    </main>
  );
};
export default FindTalent;
