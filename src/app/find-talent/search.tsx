"use client";

import React, { useState } from "react";
import Slider from "@mui/material/Slider";
import { FiSearch, FiX, FiMapPin, FiBriefcase } from "react-icons/fi";
import Dropdown from "@/components/Dropdown";
import { FaEarthAmericas } from "react-icons/fa6";
import { DropdownItem } from "./page";

const valuetext = (value: number) => {
  return `$${value}`;
};

const minDistance = 10;

type SearchBarProps = {
  locations: DropdownItem[];
  setLocations: (locations: DropdownItem[]) => void;
  salaryRange: number[];
  setSalaryRange: (range: number[]) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  locations,
  setLocations,
  salaryRange,
  setSalaryRange,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleChange = (
    event: Event,
    newValue: number | number[],
    activeThumb: number
  ) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    const updatedValue =
      activeThumb === 0
        ? [Math.min(newValue[0], salaryRange[1] - minDistance), salaryRange[1]]
        : [salaryRange[0], Math.max(newValue[1], salaryRange[0] + minDistance)];

    setSalaryRange(updatedValue);
  };

  return (
    <div className="w-full bg-white px-10 rounded-b-[20px]">
      <div className="flex items-center border-t-[1px] gap-6 py-7 bg-white justify-center w-[full] m-auto">
        <div className="flex items-center gap-2 flex-1 bg-gray100 px-3 py-2 rounded-md border border-solid border-gray100 outline-none focus-within:ring hover:ring focus-within:border-blue300 hover:border-blue300 transition-all">
          <FiSearch className="text-context w-5 h-5" />
          <input
            type="text"
            placeholder="Search Talents..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full outline-none bg-gray100 text-context"
          />
          <button
            className={`text-context hover:text-black transition-all cursor-pointer ${searchTerm ? "opacity-100 visible" : "opacity-0 invisible"
              }`}
            onClick={() => setSearchTerm("")}
          >
            <FiX />
          </button>
        </div>

        <div className="w-px h-16 bg-gray200" />

        <Dropdown
          items={[
            { id: 1, label: "United Arab Emirates", slug: "UAE" },
            { id: 2, label: "Saudi Arabia", slug: "KSA" },
            { id: 3, label: "United Kingdom", slug: "UK" },
            { id: 4, label: "United States", slug: "US" },
            { id: 5, label: "Ukraine", slug: "UA" },
          ]}
          name="Talent location"
          onSelect={(selectedItem) => setLocations(selectedItem)}
          icon={
            <div className="flex items-center justify-center p-2.5 rounded-full border border-gray200">
              <FiMapPin className="text-gray400 w-5 h-5" />
            </div>
          }
        />

        <div className="w-px h-16 bg-gray200" />

        <Dropdown
          items={[
            { id: 1, label: "Eastern Time Zone", slug: "UTC−05:00" },
            { id: 2, label: "Central Time Zone", slug: "UTC−06:00" },
            { id: 3, label: "Mountain Time Zone", slug: "UTC−07:00" },
            { id: 4, label: "Pacific Time Zone", slug: "UTC−08:00" },
            {
              id: 5,
              label: "Greenwich Time zone",
              slug: "UTC+00:00",
            },
            {
              id: 6,
              label: "Central European Time zone",
              slug: "UTC+02:00",
            },
          ]}
          name="Talent time zone"
          onSelect={() => { }}
          icon={
            <div className="flex items-center justify-center p-2.5 rounded-full border border-gray200">
              <FaEarthAmericas className="text-gray400 w-5 h-5" />
            </div>
          }
        />

        <div className="w-px h-16 bg-gray200" />

        <Dropdown
          items={[
            {
              id: 1,
              label: "Senior Software Engineer",
              slug: "senior_software_engineer",
            },
            {
              id: 2,
              label: "Finance Consolutant",
              slug: "finance_consolutant",
            },
            { id: 3, label: "Database Manager", slug: "database_manager" },
            {
              id: 4,
              label: "Cybersecurity Guard",
              slug: "cybersecurity_guard",
            },
            { id: 5, label: "UI/UX Designer", slug: "ui_ux_designer" },
          ]}
          name="Category"
          onSelect={() => { }}
          icon={
            <div className="flex items-center justify-center p-2.5 rounded-full border border-gray200">
              <FiBriefcase className="text-gray400 w-5 h-5" />
            </div>
          }
        />

        <div className="w-px h-16 bg-gray200" />

        <div className="w-[25%] flex flex-col gap-2">
          <div className="flex justify-between">
            <span className="text-gray-700 text-sm">Hourly rate</span>
            <span className="text-gray-700 text-sm">
              ${salaryRange[0]} - ${salaryRange[1]}
              {salaryRange[1] > 99 ? "+" : ""}
            </span>
          </div>

          <div className="relative">
            <Slider
              getAriaLabel={() => "Minimum distance"}
              value={salaryRange}
              onChange={handleChange}
              valueLabelDisplay="auto"
              getAriaValueText={valuetext}
              disableSwap
              min={3}
              max={100}
              step={1}
              sx={{
                color: "var(--black-color)",
                height: "6px",
                "MuiSlider-thumb": {
                  width: "14px",
                  height: "14px",
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
