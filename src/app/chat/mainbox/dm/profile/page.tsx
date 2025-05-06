"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Icons } from "@/icons";
import Link from "next/link";
import BlockModal from "./blockmodal";
import ReportModal from "./reportmodal";
import { chatSelectUserAtom } from "@/store/auth";
import { useAtom } from "jotai";

const Profile = () => {
  const [tab, setTab] = useState<string>("media");
  const [block, setBlock] = useState<boolean>(false);
  const [drop, setDrop] = useState<boolean>(false);
  const [report, setReport] = useState<boolean>(false);
  const dotRef = useRef<HTMLDivElement>(null);
  const [selector] = useAtom(chatSelectUserAtom);

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
    <div className="inline-flex flex-col items-center gap-2.5 bg-white border-gray-100 border-l w-80 max-h-[calc(100vh-200px)] overflow-y-auto hide-scrollbar">
      <div className="inline-flex relative justify-start items-start self-stretch gap-2.5 bg-white p-5 border-gray-100 border-b border-l">
        <div className="font-semibold text-[#171718] text-xl leading-tight basis-0 grow shrink">
          Profile
        </div>
        <button
          onClick={() => {
            setDrop(!drop);
          }}
        >
          <Icons.dot_h />
        </button>

        <div
          ref={dotRef}
          className={` ${
            !drop && "hidden"
          } top-9 right-6 z-50 absolute flex-col justify-start items-start border-gray-100 bg-white shadow-[0px_12px_16px_-4px_rgba(16,24,40,0.08)] shadow-[0px_4px_6px_-2px_rgba(16,24,40,0.03)] py-1 border rounded-lg w-[200px] h-[122px] overflow-hidden`}
        >
          <div className="flex flex-col justify-start items-start self-stretch bg-white h-[114px] overflow-hidden">
            <button className="inline-flex justify-start items-center self-stretch gap-2.5 px-2.5 py-2 overflow-hidden">
              <div className="flex font-normal text-gray-700 text-xs leading-none basis-0 grow shrink">
                Invite to Server
              </div>
              <Icons.arrow_right />
            </button>
            <div className="self-stretch bg-gray-100" />
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
            <button
              onClick={() => {
                setReport(true);
                setDrop(false);
              }}
              className="inline-flex justify-start items-center self-stretch gap-2.5 px-2.5 py-2"
            >
              <div className="flex font-normal text-red-500 text-xs leading-none basis-0 grow shrink">
                Report User Profile
              </div>
            </button>
            <div className="self-stretch bg-gray-100 h-px" />
            <button className="inline-flex justify-start items-center self-stretch gap-2.5 px-2.5 py-2">
              <div className="flex font-normal text-gray-700 text-xs leading-none basis-0 grow shrink">
                Copy User ID
              </div>
              <Icons.id_verify />
            </button>
          </div>
        </div>
        
      </div>
      <div className="flex flex-col justify-start items-center gap-2.5">
        <Image
          className="relative rounded-[10px]"
          width={160}
          height={160}
          alt="profile"
          src={selector.avatar}
        />
      </div>
      <div className="flex flex-col justify-start self-stretch px-5 h-[75px]">
        <div className="font-extrabold text-[#171718] text-lg text-center leading-normal tracking-tight">
          {selector.name}
        </div>
        <div className="font-medium text-gray-500 text-sm text-center leading-[21px] tracking-tight">
          {selector.role}
        </div>
        {/* <div className="inline-flex justify-center items-center gap-2 px-1 w-[76px]">
          <div className="bg-[#10b981] rounded-sm w-1 h-1" />
          <div className="font-medium text-[10px] text-gray-500 leading-[15px] tracking-tight basis-0 grow shrink">
            Active
          </div>
        </div> */}
        {/* <div className="inline-flex justify-center items-center gap-1">
          <Icons.time_4 />
          <div className="font-medium text-[10px] text-gray-500 leading-[15px] tracking-tight">
            {selector.timezone}
          </div>
        </div> */}
      </div>
      <div className="self-stretch bg-gray-100 h-px" />
      <div className="flex flex-col justify-start items-start self-stretch gap-2.5 px-5 h-[108px]">
        <div className="inline-flex justify-start items-center self-stretch gap-3">
          <div className="font-semibold text-[#171718] text-base leading-normal basis-0 grow shrink">
            Contact information
          </div>
        </div>
        <div className="flex flex-col justify-start items-start self-stretch gap-2.5 h-[74px]">
          <div className="inline-flex justify-start items-center self-stretch gap-2.5">
            <div className="flex justify-center items-center gap-2.5 bg-gray-100 rounded w-6 h-6">
              <Icons.mail_1 />
            </div>
            <div className="inline-flex flex-col justify-start items-start basis-0 grow shrink">
              <div className="self-stretch font-semibold text-[#171718] text-xs leading-none">
                Email Verified
              </div>
              <div className="inline-flex justify-start items-start gap-3">
                <div className="font-normal text-gray-400 text-xs leading-none">
                  {selector.email}
                </div>
              </div>
            </div>
          </div>
          <div className="inline-flex justify-start items-center self-stretch gap-2.5">
            <div className="flex justify-center items-center gap-2.5 bg-gray-100 rounded w-6 h-6">
              <Icons.call_2 />
            </div>
            <div className="inline-flex flex-col justify-start items-start basis-0 grow shrink">
              <div className="self-stretch font-semibold text-[#171718] text-xs leading-none">
                Phone Verified
              </div>
              <div className="inline-flex justify-start items-start gap-3">
                <div className="font-normal text-gray-400 text-xs leading-none">
                  {selector.phone}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="self-stretch bg-gray-100 h-px" />
      <div className="flex flex-col justify-start items-start self-stretch gap-2.5 px-5 h-[334px]">
        <div className="inline-flex justify-start items-center self-stretch">
          <button
            onClick={() => setTab("media")}
            className={`${
              tab === "media" ? "border-gray-400" : "border-gray-100"
            } flex justify-center items-center gap-2.5 border-b h-6 basis-0 grow shrink`}
          >
            <div className="font-semibold text-[#171718] text-base text-center leading-normal basis-0 grow shrink">
              Media
            </div>
          </button>

          <button
            onClick={() => setTab("links")}
            className={`${
              tab === "links" ? "border-gray-400" : "border-gray-100"
            } flex justify-center items-center gap-2.5 border-b h-6 basis-0 grow shrink`}
          >
            <div className="font-semibold text-[#171718] text-base text-center leading-normal basis-0 grow shrink">
              Links
            </div>
          </button>

          <button
            onClick={() => setTab("groups")}
            className={`${
              tab === "groups" ? "border-gray-400" : "border-gray-100"
            } flex justify-center items-center gap-2.5 border-b h-6 basis-0 grow shrink`}
          >
            <div className="font-semibold text-[#171718] text-base text-center leading-normal basis-0 grow shrink">
              Groups
            </div>
          </button>

          {/* <button className="flex justify-center items-center gap-2.5 border-gray-100 border-b h-6 basis-0 grow shrink">
                        <div className="font-semibold text-[#171718] text-base text-center leading-normal basis-0 grow shrink">Links</div>
                    </button>
                    <button className="flex justify-center items-center gap-2.5 border-gray-100 border-b h-6 basis-0 grow shrink">
                        <div className="font-semibold text-[#171718] text-base text-center leading-normal basis-0 grow shrink">Groups</div>
                    </button> */}
        </div>
        <div className="flex flex-col justify-start items-start self-stretch gap-2.5 h-[250px]">
          {tab === "media" && (
            <>
              <div className="inline-flex justify-start items-start self-stretch gap-2.5">
                <Image
                  className="rounded-xl basis-0 grow shrink"
                  height={120}
                  width={135}
                  alt="image"
                  src="/./image/wallpaper/1.png"
                />
                <Image
                  className="rounded-xl basis-0 grow shrink"
                  height={120}
                  width={135}
                  alt="image"
                  src="/./image/wallpaper/2.png"
                />
              </div>
              <div className="inline-flex justify-start items-start self-stretch gap-2.5">
                <Image
                  className="rounded-xl basis-0 grow shrink"
                  height={120}
                  width={135}
                  alt="image"
                  src="/./image/wallpaper/3.png"
                />
                <div className="relative h-[120px] overflow-hidden">
                  <Image
                    className="rounded-xl basis-0 grow shrink"
                    height={120}
                    width={135}
                    alt="image"
                    src="/./image/wallpaper/4.png"
                  />
                  <div className="top-[43px] left-[50px] absolute font-semibold text-white text-2xl text-center leading-loose">
                    12+
                  </div>
                </div>
              </div>
            </>
          )}
          {tab === "links" && (
            <>
              <div className="inline-flex justify-start items-center self-stretch gap-2.5 px-5 overflow-hidden">
                <Icons.attach />
                <Link
                  href="/"
                  className="font-normal text-black text-xl leading-10 basis-0 grow shrink"
                >
                  Link 1
                </Link>
              </div>
              <div className="inline-flex justify-start items-center self-stretch gap-2.5 px-5 overflow-hidden">
                <Icons.attach />
                <Link
                  href="/"
                  className="font-normal text-black text-xl leading-10 basis-0 grow shrink"
                >
                  Link 2
                </Link>
              </div>
              <div className="inline-flex justify-start items-center self-stretch gap-2.5 px-5 overflow-hidden">
                <Icons.attach />
                <Link
                  href="/"
                  className="font-normal text-black text-xl leading-10 basis-0 grow shrink"
                >
                  Link 3
                </Link>
              </div>
              <div className="inline-flex justify-start items-center self-stretch gap-2.5 px-5 overflow-hidden">
                <Icons.attach />
                <Link
                  href="/"
                  className="font-normal text-black text-xl leading-10 basis-0 grow shrink"
                >
                  Link 4
                </Link>
              </div>
            </>
          )}
          {tab === "groups" && (
            <>
              <button className="inline-flex justify-start items-center self-stretch gap-2.5 bg-gray-100 px-5 py-3.5 border-l-2">
                <div className="flex justify-start items-center gap-2.5 h-12">
                  <Image
                    width={48}
                    height={48}
                    alt="avatar"
                    className="relative rounded-3xl"
                    src="/image/avatar/avatar-1.png"
                  />
                </div>
                <div className="inline-flex flex-col justify-start items-start gap-1 basis-0 grow shrink">
                  <div className="inline-flex justify-start items-center self-stretch gap-2">
                    <div className="font-semibold text-[#171718] text-base leading-normal">
                      Group1
                    </div>
                  </div>
                </div>
              </button>
              <button className="inline-flex justify-start items-center self-stretch gap-2.5 bg-gray-100 px-5 py-3.5 border-l-2">
                <div className="flex justify-start items-center gap-2.5 h-12">
                  <Image
                    width={48}
                    height={48}
                    alt="avatar"
                    className="relative rounded-3xl"
                    src="/image/avatar/avatar-2.png"
                  />
                </div>
                <div className="inline-flex flex-col justify-start items-start gap-1 basis-0 grow shrink">
                  <div className="inline-flex justify-start items-center self-stretch gap-2">
                    <div className="font-semibold text-[#171718] text-base leading-normal">
                      Group2
                    </div>
                  </div>
                </div>
              </button>
              <button className="inline-flex justify-start items-center self-stretch gap-2.5 bg-gray-100 px-5 py-3.5 border-l-2">
                <div className="flex justify-start items-center gap-2.5 h-12">
                  <Image
                    width={48}
                    height={48}
                    alt="avatar"
                    className="relative rounded-3xl"
                    src="/image/avatar/avatar-3.png"
                  />
                </div>
                <div className="inline-flex flex-col justify-start items-start gap-1 basis-0 grow shrink">
                  <div className="inline-flex justify-start items-center self-stretch gap-2">
                    <div className="font-semibold text-[#171718] text-base leading-normal">
                      Group3
                    </div>
                  </div>
                </div>
              </button>
            </>
          )}
        </div>
        {/* <div className="inline-flex justify-center items-center self-stretch gap-2 bg-gray-200 shadow-[0px_3px_4px_0px_rgba(0,0,0,0.25)] px-7 py-2 rounded-lg">
                    <div className="font-bold text-[#171718] text-[15px] leading-normal">View all</div>
                </div> */}
      </div>
      <div className="self-stretch bg-gray-100 h-px" />

      <BlockModal isOpen={block} onClose={() => setBlock(false)} />

      <ReportModal isOpen={report} onClose={() => setReport(false)} />
    </div>
  );
};

export default Profile;