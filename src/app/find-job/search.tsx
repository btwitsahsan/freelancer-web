import React, { useEffect, useState } from "react";
import Slider from "@mui/material/Slider";
import {
  FiSearch,
  FiX,
  FiMapPin,
  FiBriefcase,
  FiDollarSign,
} from "react-icons/fi";
import Dropdown from "@/components/Dropdown";

interface DropdownItem {
  id: number;
  label: string;
  slug: string;
}

type SearchBarProps = {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  salaryRange: number[];
  setSalaryRange: (range: number[]) => void;
  locations: DropdownItem[];
  setLocations: (locations: DropdownItem[]) => void;
  levels: DropdownItem[];
  setLevels: (levels: DropdownItem[]) => void;
  types: DropdownItem[];
  setTypes: (types: DropdownItem[]) => void;
};

const valuetext = (value: number) => {
  return `$${value}`;
};

const minDistance = 100;

const SearchBar: React.FC<SearchBarProps> = ({
  searchTerm,
  setSearchTerm,
  salaryRange,
  setSalaryRange,
  locations,
  setLocations,
  levels,
  setLevels,
  types,
  setTypes,
}) => {

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
      <div className="flex items-center border-t-[1px] gap-6 py-7 bg-white justify-center w-full m-auto">
        <div className="flex items-center gap-2 flex-1 bg-gray100 px-3 py-2 rounded-md border border-solid border-gray100 outline-none focus-within:ring hover:ring focus-within:border-blue300 hover:border-blue300 transition-all">
          <FiSearch className="text-context w-5 h-5" />
          <input
            type="text"
            placeholder="Search Jobs..."
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
            { id: 2, label: "Saudi Arabia", slug: "SA" },
            { id: 3, label: "United Kingdom", slug: "UK" },
            { id: 4, label: "United States", slug: "US" },
            { id: 5, label: "Ukraine", slug: "UA" },
          ]}
          showSearch={true}
          name="Work location"
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
            { id: 1, label: "Entry Level", slug: "entry" },
            { id: 2, label: "Intermediate Level", slug: "intermediate" },
            { id: 3, label: "Expert Level", slug: "expert" },
          ]}
          name="Experience"
          onSelect={(selectedItem) => setLevels(selectedItem)}
          icon={
            <div className="flex items-center justify-center p-2.5 rounded-full border border-gray200">
              <FiBriefcase className="text-gray400 w-5 h-5" />
            </div>
          }
        />

        <div className="w-px h-16 bg-gray200" />

        <Dropdown
          items={[
            { id: 1, label: "Per hour", slug: "hourly" },
            { id: 5, label: "Fixed price", slug: "fixed" },
          ]}
          name="Payment"
          onSelect={(selectedItem) => { setTypes(selectedItem) }}
          icon={
            <div className="flex items-center justify-center p-2.5 rounded-full border border-gray200">
              <FiDollarSign className="text-gray400 w-5 h-5" />
            </div>
          }
        />

        <div className="w-px h-16 bg-gray200" />

        <div className="w-[25%] flex flex-col gap-2">
          <div className="flex justify-between">
            <span className="text-gray-700 text-sm">Salary Range</span>
            <span className="text-gray-700 text-sm">
              ${salaryRange[0]} - ${salaryRange[1]}
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
              min={0}
              max={99999}
              step={10}
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
