"use client";

import { useState, useEffect, useRef } from "react";
import { chatMainBox } from "@/store/auth";
import { Icons } from "@/icons";
import AddDMmodel from "./addDMuser";
import AddChannelModel from "./addChannel";
import UserItem from "./useritem";
import Image from "next/image";
import { getDM } from "@/utils/axios";
import { useAtom } from "jotai";
import { chatSelectUserAtom, DmlistUpdate, userAtom } from "@/store/auth";
// import dm from "../dm.json";

const DMList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isChannelModelOpen, setIsChannelModelOpen] = useState(false);
  const [drop, setDrop] = useState<boolean>(false);
  const [user] = useAtom(userAtom);
  const [state, setState] = useState<string>("Online");
  const [, setMainBox] = useAtom(chatMainBox);
  const dotRef = useRef<HTMLDivElement>(null);
  const [DM, setDM] = useState<Array<any>>([]);
  const [selector, setSelector] = useAtom(chatSelectUserAtom);
  const [listFlag] = useAtom(DmlistUpdate);
  const [newMessage, setNewMessage] = useState<Array<any>>([]);

  const getNew = (name: string) => {
    const matchedItem = newMessage.find((item) => item.fullName === name);
    if (matchedItem) return matchedItem.newMessagesCount;
    return 0;
  };

  useEffect(() => {
    const getDMlist = async () => {
      if (user && user.uid) {
        const response = await getDM(user.uid);
        setDM(response.friendLists);
        setNewMessage(response.newMessages);
      }
    };

    getDMlist();
  }, [listFlag, user]); // Fetch DM list when user changes

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dotRef.current &&
        !dotRef.current.contains(event.target as Node) &&
        drop
      )
        setDrop(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [drop]);

  return (
    <div className="relative flex flex-col bg-white border-gray-100 border-r w-80">
      <div className="flex flex-col justify-start items-start self-stretch overflow-auto hide-scrollbar">
        <button
          onClick={() => {
            setDrop(!drop);
          }}
          className="inline-flex justify-start items-center self-stretch gap-2.5 bg-white px-6 py-3.5 border border-gray-100 border-b-2"
        >
          <div className="relative flex justify-start items-center gap-2.5 h-12">
            <Image
              width={48}
              height={48}
              alt="avatar"
              className="rounded-3xl"
              src={user?.photoURL}
            />
            {state === "Online" && (
              <div className="absolute bg-emerald-500 mt-10 ml-10 border border-white rounded-full w-2 h-2" />
            )}
            {state === "Idle" && (
              <div className="absolute bg-yellow-500 mt-10 ml-10 border border-white rounded-full w-2 h-2" />
            )}
            {state === "Do Not Disturb" && (
              <div className="absolute bg-red-500 mt-10 ml-10 border border-white rounded-full w-2 h-2" />
            )}
            {state === "Invisible" && (
              <div className="absolute bg-gray-500 mt-10 ml-10 border border-white rounded-full w-2 h-2" />
            )}
          </div>
          <div className="inline-flex flex-col justify-start items-start gap-1 basis-0 grow shrink">
            <div className="inline-flex justify-start items-center self-stretch gap-2">
              <div className="font-semibold text-[#171718] text-base leading-normal">
                {user?.displayName}
              </div>
            </div>
            <div className="inline-flex justify-start items-start self-stretch gap-1">
              <div className="flex font-normal text-[#171718] text-sm leading-normal basis-0 grow shrink">
                {state}
              </div>
            </div>
          </div>
        </button>
      </div>

      <div
        ref={dotRef}
        className={` ${
          !drop && "hidden"
        } top-10 right-5 z-50 absolute flex-col justify-start items-start border-gray-100 bg-white shadow-[0px_12px_16px_-4px_rgba(16,24,40,0.08)] shadow-[0px_4px_6px_-2px_rgba(16,24,40,0.03)] py-1 border rounded-lg overflow-hidden`}
      >
        <div className="flex flex-col justify-start items-start self-stretch bg-white h-[114px] overflow-hidden">
          <button
            onClick={() => {
              setState("Online");
              setDrop(false);
            }}
            className="inline-flex justify-start items-center self-stretch gap-2.5 px-2.5 py-2 overflow-hidden"
          >
            <div className="bg-green-500 rounded-full w-2 h-2"></div>
            <div className="flex font-normal text-green-500 text-xs leading-none basis-0 grow shrink">
              Online
            </div>
          </button>
          <div className="self-stretch bg-gray-100 h-px" />
          <button
            onClick={() => {
              setState("Idle");
              setDrop(false);
            }}
            className="inline-flex justify-start items-center self-stretch gap-2.5 px-2.5 py-2"
          >
            <div className="bg-yellow-500 rounded-full w-2 h-2"></div>
            <div className="flex font-normal text-yellow-500 text-xs leading-none basis-0 grow shrink">
              Idle
            </div>
          </button>
          <button
            onClick={() => {
              setState("Do Not Disturb");
              setDrop(false);
            }}
            className="inline-flex justify-start items-center self-stretch gap-2.5 px-2.5 py-2"
          >
            <div className="bg-red-500 rounded-full w-2 h-2"></div>
            <div className="flex font-normal text-red-500 text-xs leading-none basis-0 grow shrink">
              Do not disturb
            </div>
          </button>
          <button
            onClick={() => {
              setState("Invisible");
              setDrop(false);
            }}
            className="inline-flex justify-start items-center self-stretch gap-2.5 px-2.5 py-2"
          >
            <div className="bg-gray-500 rounded-full w-2 h-2"></div>
            <div className="flex font-normal text-gray-700 text-xs leading-none basis-0 grow shrink">
              Invisible
            </div>
          </button>
        </div>
      </div>

      {/* <div className="flex flex-col justify-start items-start self-stretch gap-2.5 h-12">
        <button
          onClick={() => setIsChannelModelOpen(true)}
          className="inline-flex justify-start items-center self-stretch gap-2.5 p-2.5 border-gray-100 border-b h-12"
        >
          <div className="flex justify-start items-center gap-1 px-1.5 py-1 border border-gray-100 rounded-lg h-6 basis-0 grow shrink">
            <Icons.search />
            <div className="font-medium text-gray-400 text-xs text-right leading-none">
              Find or start a conversation
            </div>
          </div>
        </button>
      </div> */}

      <div className="flex flex-col justify-start items-start self-stretch gap-2.5 py-2.5">
        <button
          onClick={() => {
            setMainBox("friend");
            setSelector({ ...selector, name: "none" });
          }}
          className="inline-flex justify-start items-center self-stretch gap-2.5 px-5 overflow-hidden"
        >
          <Icons.mail />
          <div className="font-normal text-gray-400 text-xl leading-10 shrink">
            Message Requests
          </div>
        </button>
        {/* <button
          onClick={() => setMainBox("request")}
          className="inline-flex justify-start items-center self-stretch gap-2.5 px-5 overflow-hidden"
        >
          <Icons.mail />
          <div className="font-normal text-gray-400 text-xl leading-10 shrink">
            Message Requests
          </div>
        </button> */}
      </div>

      <div className="flex justify-between items-center px-5">
        <div className="m-2 Sansmr-1 ml-0 w-64 h-5 font-normal text-gray-400 text-base">
          Direct messages
        </div>
        {/* <button onClick={() => setIsModalOpen(true)}>
          <Icons.plus />
        </button> */}
      </div>

      <div className="flex flex-col justify-start items-start self-stretch h-[45vh] overflow-auto hide-scrollbar">
        {user &&
          DM.map((item, index) =>
            user.uid === item.requester.uid ? (
              <UserItem
                key={index}
                avatar={item.recipient.avatar}
                name={item.recipient.fullName}
                id={item.recipient.uid}
                timezone={item.timezone}
                newMessages={getNew(item.recipient.fullName)}
              />
            ) : (
              <UserItem
                key={index}
                avatar={item.requester.avatar}
                name={item.requester.fullName}
                id={item.requester.uid}
                timezone={item.timezone}
                newMessages={getNew(item.requester.fullName)}
              />
            )
          )}
      </div>

      <AddDMmodel isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      <AddChannelModel
        isOpen={isChannelModelOpen}
        onClose={() => setIsChannelModelOpen(false)}
      />
    </div>
  );
};

export default DMList;