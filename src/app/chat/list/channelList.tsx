"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { Icons } from "@/icons";
import { useAtom } from "jotai";
import { chatServerAtom } from "@/store/auth";
import { toast } from "react-toastify";
// import ChannelItem from "./channelItem";
import InviteModel from "./inviteModel";
import NotModel from "./notificationModel";
import PriModel from "./privacyModel";
import { ServerFlag } from "@/store/auth";
// import channel from "../channel.json";
import { deleteServer } from "@/utils/axios";

const ChannelList = () => {
  const [ServerDrop, SetServerDrop] = useState<boolean>(false);
  const [flag, setFlag] = useAtom(ServerFlag);
  const [server] = useAtom(chatServerAtom);
  const ServerDropRef = useRef<HTMLDivElement>(null);
  const [inviteOpen, setInviteOpen] = useState<boolean>(false);
  const [mute, setMute] = useState<boolean>(false);
  const [noti, setNoti] = useState<boolean>(false);
  const [pri, setPri] = useState<boolean>(false);
  
  const handleLeaveServer = (serverId: string) => {
    deleteServer(serverId)
      .then(() => {
        toast.success("Server deleted successfully.");
        setFlag(!flag);
      })
      .catch((error) => {
        console.error("Error deleting server:", error);
      });
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        ServerDropRef.current &&
        !ServerDropRef.current.contains(event.target as Node) &&
        ServerDrop
      ) {
        SetServerDrop(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ServerDrop]);

  return (
    <div className="inline-flex z-1 relative flex-col justify-start items-center bg-white border-gray-100 border-r w-85 h-[calc(100vh-170px)] overflow-auto hide-scrollbar w-[320px]">
      <button onClick={() => SetServerDrop(!ServerDrop)}>
        <Image
          width={320}
          height={160}
          alt={server.imageUrl}
          src={ process.env.NEXT_PUBLIC_UPLOAD_URL + server.imageUrl }
        />
      </button>

      <div
        ref={ServerDropRef}
        className={` ${
          !ServerDrop && "hidden"
        } top-12 left-24 z-50 absolute flex-col justify-start items-start border-gray-100 bg-white py-1 border rounded-lg w-[200px] overflow-hidden`}
      >
        <div className="flex flex-col justify-start items-start self-stretch bg-white overflow-hidden">
          <button
            onClick={() => {
              // setInvite(true);
              SetServerDrop(false);
            }}
            className="inline-flex justify-start items-center self-stretch gap-2.5 px-2.5 py-2 overflow-hidden"
          >
            <div className="flex font-normal text-gray-700 text-xs leading-none basis-0 grow shrink">
              Server Boost
            </div>
          </button>
          <div className="self-stretch bg-gray-100 h-px" />

          <button
            onClick={() => {
              // setInvite(true);
              SetServerDrop(false);
            }}
            className="inline-flex justify-start items-center self-stretch gap-2.5 px-2.5 py-2 overflow-hidden"
          >
            <div className="flex font-normal text-gray-700 text-xs leading-none basis-0 grow shrink">
              Mark as Read
            </div>
          </button>
          <div className="self-stretch bg-gray-100 h-px" />

          <button
            onClick={() => {
              setInviteOpen(true);
              SetServerDrop(false);
            }}
            className="inline-flex justify-start items-center self-stretch gap-2.5 px-2.5 py-2 overflow-hidden"
          >
            <div className="flex font-normal text-gray-700 text-xs leading-none basis-0 grow shrink">
              Invite People
            </div>
          </button>
          <div className="self-stretch bg-gray-100 h-px" />

          <button
            onClick={() => {
              setMute(!mute);
              SetServerDrop(false);
            }}
            className="inline-flex justify-start items-center self-stretch gap-2.5 px-2.5 py-2 overflow-hidden"
          >
            <div className="flex font-normal text-gray-700 text-xs leading-none basis-0 grow shrink">
              {mute ? "Unmute Server" : "Mute Server"}
            </div>
            {mute ? (
              <div className={`bg-red-500 rounded-full w-2 h-2 mr-0.5`}></div>
            ) : (
              <div className={`bg-green-500 rounded-full w-2 h-2 mr-0.5`}></div>
            )}
          </button>
          <div className="self-stretch bg-gray-100 h-px" />

          <button
            onClick={() => {
              setNoti(!noti);
              SetServerDrop(false);
            }}
            className="inline-flex justify-start items-center self-stretch gap-2.5 px-2.5 py-2 overflow-hidden"
          >
            <div className="flex font-normal text-gray-700 text-xs leading-none basis-0 grow shrink">
              Notification Settings
            </div>
            {/* <Icons.arrow_right /> */}
          </button>
          <div className="self-stretch bg-gray-100 h-px" />

          <button
            onClick={() => {
              setPri(!noti);
              SetServerDrop(false);
            }}
            className="inline-flex justify-start items-center self-stretch gap-2.5 px-2.5 py-2 overflow-hidden"
          >
            <div className="flex font-normal text-gray-700 text-xs leading-none basis-0 grow shrink">
              Privacy Settings
            </div>
            {/* <Icons.arrow_right /> */}
          </button>
          <div className="self-stretch bg-gray-100 h-px" />

          <button
              onClick={() => {
                handleLeaveServer(server.id);
                SetServerDrop(false);
              }}
            className="inline-flex justify-start items-center self-stretch gap-2.5 px-2.5 py-2"
          >
            <div className="flex font-normal text-red-500 text-xs leading-none basis-0 grow shrink">
              Leave server
            </div>
          </button>
        </div>
      </div>

      <div className="flex flex-col justify-start items-start self-stretch gap-1 py-2.5">
        <button className="inline-flex justify-start items-start self-stretch gap-2.5 px-5 py-2">
          <Icons.direct_right />
          <div className="font-['DM font-semibold text-gray-500 text-xl leading-normal Sans']">
            {server.name}
          </div>
        </button>
        <div className="inline-flex justify-start items-center self-stretch gap-2.5 px-5 py-2">
          <Icons.calender_3 />
          <div className="font-['DM font-semibold text-gray-500 text-xl leading-normal basis-0 grow Sans'] shrink">
            Events
          </div>
          <div className="inline-flex flex-col justify-center items-center gap-2.5 bg-gray-500 rounded-lg w-4 h-4">
            <div className="self-stretch mt-1 h-4 font-['DM font-semibold text-white text-xs text-center leading-none Sans']">
              1
            </div>
          </div>
        </div>
        <button className="inline-flex justify-start items-start self-stretch gap-2.5 px-5 py-2">
          <Icons.user_list />
          <div className="font-['DM font-semibold text-gray-500 text-xl leading-normal Sans']">
            Channels & Roles
          </div>
        </button>
      </div>

      <div className="flex flex-col justify-start items-start self-stretch gap-1 py-2.5">
        
      </div>

      <InviteModel isOpen={inviteOpen} onClose={() => setInviteOpen(false)} />
      <NotModel isOpen={noti} onClose={() => setNoti(false)} />
      <PriModel isOpen={pri} onClose={() => setPri(false)} />
    </div>
  );
};

export default ChannelList;
