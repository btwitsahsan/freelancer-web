"use client";

import Image from "next/image";
import { FaEllipsis } from "react-icons/fa6";
import { useState } from "react";
import { Icons } from "@/icons";
import Overview from "./overview";
import Timesheet from "./timesheet";

const Main = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Overview");

  const tabs = ["Overview", "Timesheet", "Messages", "Contract details"];

  return (
    <>
      <div className="flex flex-col items-center gap-5 pt-4">
        <div className="flex justify-between w-full max-w-[1480px] px-5">
          <h1 className="flex-1 text-3xl font-semibold">
            The Freelance Platform
          </h1>
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="group flex justify-center items-center w-8 h-8 rounded-full border border-gray400 hover:border-green500 transition-all"
            >
              <FaEllipsis className="w-5 h-5 text-gray500 group-hover:text-green500 transition-all" />
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-1 w-[200px] bg-white border border-gray200 rounded-lg shadow-lg z-10">
                <ul className="py-2.5">
                  <li
                    className="flex items-center px-4 py-1.5 gap-2.5 text-sm text-gray700 hover:bg-gray100 text-context cursor-pointer"
                    onClick={() => console.log("Propose new contract")}
                  >
                    <Icons.mailopen />
                    Propose new contract
                  </li>
                  <li
                    className="flex items-center px-4 py-1.5 gap-2.5 text-sm text-gray700 hover:bg-gray100 text-context cursor-pointer"
                    onClick={() => console.log("Give a refund")}
                  >
                    <Icons.moneysend />
                    Give a refund
                  </li>
                  <li
                    className="flex items-center px-4 py-1.5 gap-2.5 text-sm text-gray700 hover:bg-gray100 text-context cursor-pointer"
                    onClick={() => console.log("End contract")}
                  >
                    <Icons.cancelcircle />
                    End contract
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2.5 w-full max-w-[1480px] px-5">
          <div className="relative w-[50px] h-[50px]">
            <Image
              src="/image/avatar/1.jpg"
              alt="Avatar"
              width={50}
              height={50}
              className="rounded-full"
            />
            <div className="absolute w-2.5 h-2.5 top-[3px] left-[3px] border border-blue400 bg-green500 rounded-full" />
          </div>
          <div className="flex flex-col gap-2">
            <div className="text-base font-bold leading-none">John Doe</div>
            <div className="text-xs leading-none">USA - Sun 3:47 AM</div>
          </div>
        </div>
        <div className="flex gap-2.5 w-full max-w-[1480px] px-5">
          {tabs.map((tab) => (
            <div
              key={tab}
              className="group flex flex-col gap-2 cursor-pointer"
              onClick={() => setActiveTab(tab)}
            >
              <div className={`text-sm text-context leading-none`}>{tab}</div>
              <div
                className={`bg-gradient-to-r from-gradientStart to-gradientEnd w-full h-px rounded transform transition-transform duration-300 ${
                  activeTab === tab ? "scale-x-100" : "scale-x-0"
                } group-hover:scale-x-100`}
              />
            </div>
          ))}
        </div>
      </div>
      {activeTab === "Overview" && <Overview />}
      {activeTab === "Timesheet" && <Timesheet />}
    </>
  );
};

export default Main;
