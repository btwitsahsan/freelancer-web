"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useAtom } from "jotai";
import { chatMainBox } from "@/store/auth";
import { chatSelectUserAtom } from "@/store/auth";
import IgnoreModel from "./ignoreModel";
import BlockModel from "./blockModel";

interface UserItemProps {
  avatar: string;
  name: string;
  timezone: string;
  id: string;
  newMessages: number;
  // number: number;
  // user: number;
  // news: number;
  // role: string;
  // phone: string;
  // setUser: React.Dispatch<React.SetStateAction<number>>;
}

const UserItem: React.FC<UserItemProps> = ({ avatar, name, id, timezone, newMessages }) => {
  const [selector, setSelector] = useAtom(chatSelectUserAtom);
  const [, setMainBox] = useAtom(chatMainBox);
  const dotRef = useRef<HTMLDivElement>(null);
  const [drop, setDrop] = useState<boolean>(false);
  const [ignore, setIgnore] = useState(false);
  const [block, setBlock] = useState(false);

  const handleServer = (
    name: string,
    avatar: string,
    timezone: string,
    id: string
  ) => {
    setSelector({
      ...selector, // Spread the existing chatServer state
      name,
      avatar,
      timezone,
      id,
    });
  };

  const handleRightClick = (event: React.MouseEvent) => {
    event.preventDefault(); // Prevent the default context menu
    // setMessage("Right-click detected!");
    setDrop(!drop);
  };

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
    <div className="relative self-stretch">
      <button
        onClick={() => {
          setMainBox("dm");
          handleServer(name, avatar, timezone, id);
        }}
        onContextMenu={handleRightClick}
        className={
          name === selector.name
            ? "inline-flex justify-start items-center gap-2.5 w-full border-emerald-500 bg-gray-100 px-5 py-3.5 border-l-2 self-stretch"
            : "inline-flex justify-start items-center gap-2.5 w-full border-[#f3f3f3] px-5 py-3.5 border-b self-stretch"
        }
      >
        <div className="relative flex justify-start items-center gap-2.5 h-12">
          <Image
            width={48}
            height={48}
            alt="avatar"
            className="rounded-3xl"
            src={avatar}
          />
          <div className="absolute bg-emerald-500 mt-10 ml-10 border border-white rounded-full w-2 h-2" />
        </div>
        <div className="inline-flex flex-col justify-start items-start gap-1 basis-0 grow shrink">
          <div className="inline-flex justify-start items-center self-stretch gap-2">
            <div className="font-semibold text-[#171718] text-base leading-normal">
              {name}
            </div>
            {/* <Icons.check /> */}
            {/* <div className="font-normal text-gray-400 text-sm text-right leading-normal basis-0 grow shrink">
              11:03 AM{" "}
            </div> */}
          </div>
          <div className="inline-flex justify-end items-start self-stretch gap-1">
            {/* <div className="flex font-normal text-[#171718] text-sm leading-normal basis-0 grow shrink">
              Okay, I got you
            </div> */}
            {
              newMessages > 0 &&
                <div className="inline-flex flex-col justify-center items-center gap-2 bg-emerald-500 px-2 py-1 rounded-[50px] w-5 h-5">
                  <div className="font-['Plus font-medium text-white text-xs text-center leading-tight Jakarta">
                    {newMessages}
                  </div>
                </div>
            }
          </div>
        </div>
      </button>
      <div
        ref={dotRef}
        className={` ${
          !drop && "hidden"
        } top-5 right-5 z-50 absolute flex-col justify-start items-start border-gray-100 bg-white shadow-[0px_12px_16px_-4px_rgba(16,24,40,0.08)] shadow-[0px_4px_6px_-2px_rgba(16,24,40,0.03)] py-1 w-32 border rounded-lg overflow-hidden`}
      >
        <div className="flex flex-col justify-start items-start self-stretch bg-white h-[114px] overflow-hidden">
          <button
            onClick={() => {
              // setEdit(true);
              setDrop(false);
            }}
            className="inline-flex justify-start items-center self-stretch gap-2.5 px-2.5 py-2 overflow-hidden"
          >
            <div className="flex font-normal text-gray-700 text-xs leading-none basis-0 grow shrink">
              Close DM
            </div>
          </button>
          <div className="self-stretch bg-gray-100" />
          <button
            onClick={() => {
              // setBlock(true);
              setDrop(false);
            }}
            className="inline-flex justify-start items-center self-stretch gap-2.5 px-2.5 py-2"
          >
            <div className="flex font-normal text-xs leading-none basis-0 grow shrink">
              Add Friend
            </div>
          </button>
          <button
            onClick={() => {
              setIgnore(true);
              setDrop(false);
            }}
            className="inline-flex justify-start items-center self-stretch gap-2.5 px-2.5 py-2"
          >
            <div className="flex font-normal text-xs leading-none basis-0 grow shrink">
              Ignore
            </div>
          </button>
          <div className="self-stretch bg-gray-100 h-px" />
          <button
            onClick={() => {
              setBlock(true);
              setDrop(false);
            }}
            className="inline-flex justify-start items-center self-stretch gap-2.5 px-2.5 py-2"
          >
            <div className="flex font-normal text-red-500 text-xs leading-none basis-0 grow shrink">
              Block
            </div>
          </button>
        </div>
      </div>
      <IgnoreModel isOpen={ignore} onClose={() => setIgnore(false)} />
      <BlockModel isOpen={block} onClose={() => setBlock(false)} />
    </div>
  );
};

export default UserItem;