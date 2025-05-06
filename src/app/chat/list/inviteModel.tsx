"use client";

import { TextField } from "@mui/material";
import Image from "next/image";
import React, { useState } from "react";
import { FaXmark } from "react-icons/fa6";

interface InviteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const InviteModel: React.FC<InviteModalProps> = ({ isOpen, onClose }) => {
  const [title, setTitle] = useState<string>("");

  //   const handleSave = () => {
  //     resetForm();
  //     onClose();
  //   };

  //   const resetForm = () => {
  //     setTitle("");
  //   };

  if (!isOpen) return null;

  return (
    <div className="z-50 fixed inset-0 flex justify-center items-center">
      <div className="absolute bg-black opacity-10 h-full" />
      <div className="z-10 flex flex-col gap-5 bg-white shadow-lg p-5 rounded-lg w-full max-w-2xl">
        <div className="flex justify-between gap-4">
          <h2 className="font-semibold text-xl">
            Invite friends to this group
          </h2>
          <button
            className="group flex justify-center items-center border border-gray500 hover:border-red400 rounded-full w-6 h-6 transition-all"
            onClick={onClose}
          >
            <FaXmark className="group-hover:text-red400 w-4 h-4 text-context transition-all" />
          </button>
        </div>
        <hr />
        {/* <div className="flex items-center gap-2.5 bg-gray100 p-2.5 rounded-lg h-10">
          <Icons.lightbulbon />
          <div className="text-gray500 text-sm">
            Add new friend for sending direct messages
          </div>
        </div> */}
        <div className="flex flex-col gap-2.5">
          <TextField
            variant="outlined"
            size="small"
            fullWidth
            placeholder="Search the friend"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            color="success"
            sx={{
              "& .MuiOutlinedInput-root": {
                fontSize: "14px",
                borderRadius: "10px",
                borderColor: "var(--gray-200) !important",
              },
              ".Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "var(--green-500)",
              },
            }}
          />
        </div>
        <div className="flex flex-col gap-2.5">
          <div className="flex flex-col justify-start items-start self-stretch">
            <div className="inline-flex justify-start items-center self-stretch gap-2.5 p-2.5 border-gray-100 border-t">
              <Image
                width={32}
                height={32}
                alt="avatar"
                className="relative rounded-2xl"
                src="/image/avatar/avatar-1.png"
              />
              <div className="inline-flex flex-col justify-start items-start gap-1 basis-0 grow shrink">
                <div className="inline-flex justify-start items-center self-stretch gap-1">
                  {/* <div className="w-[43px] font-medium text-[#171718] text-sm leading-[14px]">
                    James
                  </div> */}
                  <div className="w-[89px] font-medium text- text-gray-500m leading-[14px]">
                    james029190
                  </div>
                  {/* <div className="font-medium text-gray-500 text-xs leading-3 basis-0 grow shrink">
                    26d ago
                  </div> */}
                </div>
                {/* <div className="inline-flex justify-start items-center self-stretch gap-1">
                  <div className="flex justify-start items-center gap-1 h-2">
                    <Image
                      width={8}
                      height={8}
                      alt="server"
                      className="rounded w-2 h-2"
                      src="/image/chat/small_server1.gif"
                    />
                    <Image
                      width={8}
                      height={8}
                      alt="server"
                      className="rounded w-2 h-2"
                      src="/image/chat/small_server2.png"
                    />
                  </div>
                  <div className="font-medium text-[10px] text-gray-500 leading-[10px]">
                    2 Mutual Servers
                  </div>
                </div> */}
              </div>
              <button
                onClick={onClose}
                className="flex justify-center items-center gap-2.5 bg-green-500 p-3 rounded"
              >
                <div className="font-medium text-white leading-[10px]">
                  Invite
                </div>
              </button>
              {/* <button className="flex justify-center items-center gap-2.5 bg-red-500 px-2.5 py-2 rounded">
                <div className="font-medium text-[10px] text-white leading-[10px]">
                  Report
                </div>
              </button> */}
            </div>
          </div>
          <div className="flex flex-col justify-start items-start self-stretch">
            <div className="inline-flex justify-start items-center self-stretch gap-2.5 p-2.5 border-gray-100 border-t">
              <Image
                width={32}
                height={32}
                alt="avatar"
                className="relative rounded-2xl"
                src="/image/avatar/avatar-1.png"
              />
              <div className="inline-flex flex-col justify-start items-start gap-1 basis-0 grow shrink">
                <div className="inline-flex justify-start items-center self-stretch gap-1">
                  {/* <div className="w-[43px] font-medium text-[#171718] text-sm leading-[14px]">
                    James
                  </div> */}
                  <div className="w-[89px] font-medium text- text-gray-500m leading-[14px]">
                    james029190
                  </div>
                  {/* <div className="font-medium text-gray-500 text-xs leading-3 basis-0 grow shrink">
                    26d ago
                  </div> */}
                </div>
                {/* <div className="inline-flex justify-start items-center self-stretch gap-1">
                  <div className="flex justify-start items-center gap-1 h-2">
                    <Image
                      width={8}
                      height={8}
                      alt="server"
                      className="rounded w-2 h-2"
                      src="/image/chat/small_server1.gif"
                    />
                    <Image
                      width={8}
                      height={8}
                      alt="server"
                      className="rounded w-2 h-2"
                      src="/image/chat/small_server2.png"
                    />
                  </div>
                  <div className="font-medium text-[10px] text-gray-500 leading-[10px]">
                    2 Mutual Servers
                  </div>
                </div> */}
              </div>
              <button
                onClick={onClose}
                className="flex justify-center items-center gap-2.5 bg-green-500 p-3 rounded"
              >
                <div className="font-medium text-white leading-[10px]">
                  Invite
                </div>
              </button>
              {/* <button className="flex justify-center items-center gap-2.5 bg-red-500 px-2.5 py-2 rounded">
                <div className="font-medium text-[10px] text-white leading-[10px]">
                  Report
                </div>
              </button> */}
            </div>
          </div>
          <div className="flex flex-col justify-start items-start self-stretch">
            <div className="inline-flex justify-start items-center self-stretch gap-2.5 p-2.5 border-gray-100 border-t">
              <Image
                width={32}
                height={32}
                alt="avatar"
                className="relative rounded-2xl"
                src="/image/avatar/avatar-1.png"
              />
              <div className="inline-flex flex-col justify-start items-start gap-1 basis-0 grow shrink">
                <div className="inline-flex justify-start items-center self-stretch gap-1">
                  {/* <div className="w-[43px] font-medium text-[#171718] text-sm leading-[14px]">
                    James
                  </div> */}
                  <div className="w-[89px] font-medium text- text-gray-500m leading-[14px]">
                    james029190
                  </div>
                  {/* <div className="font-medium text-gray-500 text-xs leading-3 basis-0 grow shrink">
                    26d ago
                  </div> */}
                </div>
                {/* <div className="inline-flex justify-start items-center self-stretch gap-1">
                  <div className="flex justify-start items-center gap-1 h-2">
                    <Image
                      width={8}
                      height={8}
                      alt="server"
                      className="rounded w-2 h-2"
                      src="/image/chat/small_server1.gif"
                    />
                    <Image
                      width={8}
                      height={8}
                      alt="server"
                      className="rounded w-2 h-2"
                      src="/image/chat/small_server2.png"
                    />
                  </div>
                  <div className="font-medium text-[10px] text-gray-500 leading-[10px]">
                    2 Mutual Servers
                  </div>
                </div> */}
              </div>
              <button
                onClick={onClose}
                className="flex justify-center items-center gap-2.5 bg-green-500 p-3 rounded"
              >
                <div className="font-medium text-white leading-[10px]">
                  Invite
                </div>
              </button>
              {/* <button className="flex justify-center items-center gap-2.5 bg-red-500 px-2.5 py-2 rounded">
                <div className="font-medium text-[10px] text-white leading-[10px]">
                  Report
                </div>
              </button> */}
            </div>
          </div>
          <div className="flex flex-col justify-start items-start self-stretch">
            <div className="inline-flex justify-start items-center self-stretch gap-2.5 p-2.5 border-gray-100 border-t">
              <Image
                width={32}
                height={32}
                alt="avatar"
                className="relative rounded-2xl"
                src="/image/avatar/avatar-1.png"
              />
              <div className="inline-flex flex-col justify-start items-start gap-1 basis-0 grow shrink">
                <div className="inline-flex justify-start items-center self-stretch gap-1">
                  {/* <div className="w-[43px] font-medium text-[#171718] text-sm leading-[14px]">
                    James
                  </div> */}
                  <div className="w-[89px] font-medium text- text-gray-500m leading-[14px]">
                    james029190
                  </div>
                  {/* <div className="font-medium text-gray-500 text-xs leading-3 basis-0 grow shrink">
                    26d ago
                  </div> */}
                </div>
                {/* <div className="inline-flex justify-start items-center self-stretch gap-1">
                  <div className="flex justify-start items-center gap-1 h-2">
                    <Image
                      width={8}
                      height={8}
                      alt="server"
                      className="rounded w-2 h-2"
                      src="/image/chat/small_server1.gif"
                    />
                    <Image
                      width={8}
                      height={8}
                      alt="server"
                      className="rounded w-2 h-2"
                      src="/image/chat/small_server2.png"
                    />
                  </div>
                  <div className="font-medium text-[10px] text-gray-500 leading-[10px]">
                    2 Mutual Servers
                  </div>
                </div> */}
              </div>
              <button
                onClick={onClose}
                className="flex justify-center items-center gap-2.5 bg-green-500 p-3 rounded"
              >
                <div className="font-medium text-white leading-[10px]">
                  Invite
                </div>
              </button>
              {/* <button className="flex justify-center items-center gap-2.5 bg-red-500 px-2.5 py-2 rounded">
                <div className="font-medium text-[10px] text-white leading-[10px]">
                  Report
                </div>
              </button> */}
            </div>
          </div>
          <div className="flex flex-col justify-start items-start self-stretch">
            <div className="inline-flex justify-start items-center self-stretch gap-2.5 p-2.5 border-gray-100 border-t">
              <Image
                width={32}
                height={32}
                alt="avatar"
                className="relative rounded-2xl"
                src="/image/avatar/avatar-1.png"
              />
              <div className="inline-flex flex-col justify-start items-start gap-1 basis-0 grow shrink">
                <div className="inline-flex justify-start items-center self-stretch gap-1">
                  {/* <div className="w-[43px] font-medium text-[#171718] text-sm leading-[14px]">
                    James
                  </div> */}
                  <div className="w-[89px] font-medium text- text-gray-500m leading-[14px]">
                    james029190
                  </div>
                  {/* <div className="font-medium text-gray-500 text-xs leading-3 basis-0 grow shrink">
                    26d ago
                  </div> */}
                </div>
                {/* <div className="inline-flex justify-start items-center self-stretch gap-1">
                  <div className="flex justify-start items-center gap-1 h-2">
                    <Image
                      width={8}
                      height={8}
                      alt="server"
                      className="rounded w-2 h-2"
                      src="/image/chat/small_server1.gif"
                    />
                    <Image
                      width={8}
                      height={8}
                      alt="server"
                      className="rounded w-2 h-2"
                      src="/image/chat/small_server2.png"
                    />
                  </div>
                  <div className="font-medium text-[10px] text-gray-500 leading-[10px]">
                    2 Mutual Servers
                  </div>
                </div> */}
              </div>
              <button
                onClick={onClose}
                className="flex justify-center items-center gap-2.5 bg-green-500 p-3 rounded"
              >
                <div className="font-medium text-white leading-[10px]">
                  Invite
                </div>
              </button>
              {/* <button className="flex justify-center items-center gap-2.5 bg-red-500 px-2.5 py-2 rounded">
                <div className="font-medium text-[10px] text-white leading-[10px]">
                  Report
                </div>
              </button> */}
            </div>
          </div>
        </div>
        {/* <div className="flex justify-end gap-2.5 h-10">
          <button
            className="bg-green-500 hover:bg-green600 hover:shadow-lg px-4 py-2 rounded-lg min-w-24 text-white hover:scale-105 transition-all duration-200"
            onClick={handleSave}
          >
            Create DM
          </button>
        </div> */}
        <div className="flex flex-col justify-start items-start self-stretch gap-2 bg-white h-[46px]">
          <div className="inline-flex justify-start items-center self-stretch gap-2.5 bg-gray-100 px-2.5 py-2 rounded-lg">
            <TextField
              variant="outlined"
              sx={{
                "& fieldset": { border: "none" },
                "&:hover fieldset, &:focus fieldset": {
                  border: "none",
                },
              }}
              value="https://freelance.gg/X7UUQt2D"
              size="small"
              placeholder="Type the username"
              color="success"
              style={{ flex: 1 }}
            />

            <button className="flex justify-center items-center gap-2.5 bg-emerald-500 p-2.5 rounded overflow-hidden">
              <div className="font-medium text-white text-sm leading-normal">
                Copy
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InviteModel;