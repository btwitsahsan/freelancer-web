"use client";

import { FC, useState } from "react";
import Image from "next/image";
import Datepicker from "react-tailwindcss-datepicker";
import { FiSearch } from "react-icons/fi";
import Proposals from "./proposals";
import ProfileStats from "./profile-stats";
import { Icons } from "@/icons";
import Transactions from "./transactions";

type DateRange = {
  startDate: Date | null;
  endDate: Date | null;
};
const Main: FC = () => {
  const [activeTab, setActiveTab] = useState("proposals");
  const [transTab, setTransTab] = useState("all");
  const [value, setValue] = useState<DateRange>({
    startDate: null,
    endDate: null,
  });
  const handleDateChange = (newValue: DateRange | null) => {
    if (newValue) {
      setValue(newValue);
    }
  };
  return (
    <div className="flex flex-col gap-10 w-full px-10">
      <div className="flex flex-col gap-5">
        <div className="flex gap-4 items-center">
          <div className="text-3xl font-semibold">Balance Details</div>
          <div className="w-80">
            <Datepicker
              value={value}
              displayFormat="DD/MM/YYYY"
              onChange={handleDateChange}
              showShortcuts={true}
              separator="-"
              inputClassName="w-full p-2 border border-gray300 rounded pl-3 pr-10"
            />
          </div>
        </div>

        <hr />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div className="flex flex-col gap-8 px-5 py-8 bg-white shadow-md rounded-2xl">
            <div className="flex gap-5">
              <Icons.usdt width="30" />
              <div className="flex flex-col">
                <div className="text-sm font-normal text-gray400 mb-1 leading-none">
                  Total balances
                </div>
                <div className="text-3xl font-semibold mb-3 leading-none">
                  4,302.00 USDT
                </div>
                <div className="text-sm text-context leading-none">
                  1 USDT = $0.9989
                  <span className="text-gray400 ml-2">As of today</span>
                </div>
              </div>
            </div>

            <div className="flex gap-2.5">
              <button className="flex w-60 justify-center items-center gap-2 px-4 py-2 bg-black text-white rounded">
                Send
                <Icons.sendPayment width="16" />
              </button>
              <button className="flex w-60 justify-center items-center gap-2 px-4 py-2 bg-black text-white rounded">
                Withdraw to Bank
                <Icons.withdraw width="14" />
              </button>
            </div>

            <hr />

            <div className="">
              <div className="flex justify-between w-full items-center">
                <div className="text-lg  font-medium text-black">Goals</div>
                <div className="flex space-x-2">
                  <span className="text-sm text-gray500">
                    2000 USDT remaining to achieve your goals{" "}
                  </span>
                  <span className="text-sm font-medium text-context">
                    8000/10,000 USDT
                  </span>
                </div>
              </div>
              <div className="bg-gray200 rounded-full h-2.5 mt-2">
                <div
                  className="bg-[#10B981] h-2.5 rounded-full"
                  style={{ width: "60%" }}
                ></div>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-between p-5 border rounded-2xl">
            <div className="flex justify-between items-center">
              <div className="text-xl font-semibold text-black w-full">
                Proposals{" "}
                <span className="text-sm font-normal text-gray400">
                  This month
                </span>
              </div>
              <div className="relative">
                <ul
                  className="relative flex gap-2 list-none rounded-md bg-slate-100"
                  data-tabs="tabs"
                  role="list"
                >
                  <li className="z-30 flex-auto text-center">
                    <button
                      className={`z-30 flex items-center justify-center px-4 py-2.5 text-sm transition-all ease-in-out border-0 rounded-md cursor-pointer whitespace-nowrap ${
                        activeTab === "proposals"
                          ? "bg-white text-slate-800"
                          : "bg-inherit text-slate-600"
                      } hover:bg-white transition-all`}
                      onClick={() => setActiveTab("proposals")}
                      data-tab-target=""
                      role="tab"
                      aria-selected={activeTab === "proposals"}
                    >
                      Proposals
                    </button>
                  </li>
                  <li className="z-30 flex-auto text-center">
                    <button
                      className={`z-30 flex items-center justify-center px-4 py-2.5 text-sm transition-all ease-in-out border-0 rounded-md cursor-pointer whitespace-nowrap ${
                        activeTab === "profile"
                          ? "bg-white text-slate-800"
                          : "bg-inherit text-slate-600"
                      } hover:bg-white transition-all`}
                      onClick={() => setActiveTab("profile")}
                      data-tab-target=""
                      role="tab"
                      aria-selected={activeTab === "profile"}
                    >
                      Profile Stats
                    </button>
                  </li>
                </ul>
              </div>
            </div>

            <div>
              {activeTab === "proposals" && <Proposals />}
              {activeTab === "profile" && <ProfileStats />}
            </div>

            <div className="flex items-center bg-gradient-to-r from-blue100 to-purple-100 rounded-lg p-4 shadow-sm">
              <div className="flex-shrink-0">
                <Image
                  src="/image/logo.svg"
                  alt="Logo"
                  width={10}
                  height={10}
                  className="w-10 h-10 mr-4"
                />
              </div>
              <div className="text-gray-700">
                <span className="text-context"> The Freelance Website </span>{" "}
                has thousands of available jobs. Browse the ones that best suit
                you and then send your proposal.{""}
                <a
                  href="/find-job"
                  className="font-medium text-context underline"
                >
                  Search jobs
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-5">
            <div className="text-2xl font-semibold text-black">
              Transactions
            </div>

            <div className="relative">
              <ul className="flex gap-1 rounded-md">
                <li>
                  <button
                    onClick={() => setTransTab("all")}
                    className={`px-3 py-1 rounded-md cursor-pointer border border-gray100 hover:bg-white hover:border-gray200 transition-all ${
                      transTab === "all"
                        ? "bg-white text-slate-800 border-gray200"
                        : "text-slate-600"
                    }`}
                  >
                    All <span className="text-xs text-gray500">163</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setTransTab("completed")}
                    className={`px-3 py-1 rounded-md cursor-pointer border border-gray100 hover:bg-white hover:border-gray200 transition-all ${
                      transTab === "completed"
                        ? "bg-white text-slate-800 border-gray200"
                        : "text-slate-600"
                    }`}
                  >
                    Completed <span className="text-xs text-gray500">150</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setTransTab("pending")}
                    className={`px-3 py-1 rounded-md cursor-pointer border border-gray100 hover:bg-white hover:border-gray200 transition-all ${
                      transTab === "pending"
                        ? "bg-white text-slate-800 border-gray200"
                        : "text-slate-600"
                    }`}
                  >
                    Pending <span className="text-xs text-gray500">11</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setTransTab("failed")}
                    className={`px-3 py-1 rounded-md cursor-pointer border border-gray100 hover:bg-white hover:border-gray200 transition-all ${
                      transTab === "failed"
                        ? "bg-white text-slate-800 border-gray200"
                        : "text-slate-600"
                    }`}
                  >
                    Failed <span className="text-xs text-gray500">2</span>
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative flex w-80 p-2 gap-2 items-center border rounded-md text-gray500 bg-white outline-none focus-within:ring hover:ring focus-within:border-blue300 hover:border-blue300 transition-all">
              <FiSearch className="w-5 h-5 text-black" />
              <input
                type="text"
                placeholder="Search"
                className="bg-transparent w-full outline-none"
              />
            </div>

            <button className="flex w-40 justify-center px-4 py-2 border border-black rounded text-context text-sm hover:bg-black hover:text-white transition-all">
              Download CSV
            </button>
          </div>
        </div>

        <Transactions />
      </div>
    </div>
  );
};

export default Main;
