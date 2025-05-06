"use client";

import React, { useEffect, useRef, useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import { FaChevronDown, FaRegCircleXmark } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";

interface DropdownItem {
  id: number;
  label: string;
  slug: string;
}

interface DropdownProps {
  items?: DropdownItem[];
  name?: string;
  onSelect?: (selectedItems: DropdownItem[]) => void;
  icon?: React.ReactNode;
  showSearch?: boolean;
}

const Dropdown: React.FC<DropdownProps> = ({
  items = [],
  name = "Select Items",
  onSelect,
  icon,
  showSearch = false
}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedItems, setSelectedItems] = useState<DropdownItem[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const filteredItems = items.filter((item) =>
    item.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleToggleSelect = (item: DropdownItem) => {
    let updatedSelection;

    if (selectedItems.some((selectedItem) => selectedItem.id === item.id)) {
      updatedSelection = selectedItems.filter(
        (selectedItem) => selectedItem.id !== item.id
      );
    } else {
      updatedSelection = [...selectedItems, item];
    }

    setSelectedItems(updatedSelection);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="flex items-center text-sm text-context gap-2.5"
        onClick={() => setIsOpen(!isOpen)}
      >
        {icon && <span className="icon">{icon}</span>}
        <span className="flex-1 text-start min-w-32">{name}</span>
        <FaChevronDown />
      </button>
      {isOpen && (
        <div className="absolute top-full -left-2.5 -right-2.5 pt-4 z-10 drop-shadow">
          <div className="bg-white border border-gray100 rounded-lg">
            {
              showSearch ?
                <div className="p-2.5 border-b border-gray100">
                  <div className="flex p-2.5 gap-2.5 items-center bg-gray100 rounded-md">
                    <FaSearch className="text-gray500" />
                    <input
                      type="text"
                      placeholder="Search..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="flex-1 bg-transparent outline-none"
                    />
                    <button
                      className={`text-gray500 hover:text-black transition-all ${searchTerm ? "opacity-100 visible" : "opacity-0 invisible"
                        }`}
                      onClick={() => setSearchTerm("")}
                    >
                      <FaRegCircleXmark />
                    </button>
                  </div>
                </div> : ""
            }
            <ul className="dropdown-list">
              {filteredItems.map((item) => (
                <li key={`item-${item.slug}`}>
                  <label className="flex items-center text-sm">
                    <Checkbox
                      checked={selectedItems.some(
                        (selectedItem) => selectedItem.id === item.id
                      )}
                      onChange={() => handleToggleSelect(item)}
                      sx={{ color: "var(--black-color) !important" }}
                    />
                    {item.label}
                  </label>
                </li>
              ))}
            </ul>
            <div className="flex text-sm gap-2.5 p-2.5 justify-end border-t border-gray100">
              <button
                className="py-2 px-2.5 border border-black rounded"
                onClick={() => setSelectedItems([])}
              >
                Cancel
              </button>
              <button
                className="py-2 px-2.5 border border-black rounded bg-black text-white"
                onClick={() => onSelect && onSelect(selectedItems)}
              >
                Show results
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
