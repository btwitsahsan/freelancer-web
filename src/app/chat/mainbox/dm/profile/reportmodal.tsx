import React from "react";
import { Icons } from "@/icons";
import Image from "next/image";
import { useAtom } from "jotai";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { TextField } from "@mui/material";
import { chatSelectUserAtom } from "@/store/auth";
import { toast } from "react-toastify";

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ReportModal: React.FC<ReportModalProps> = ({ isOpen, onClose }) => {

  if (!isOpen) return null;

  const [selector, setSelector] = useAtom(chatSelectUserAtom);
  const sendReport = (userId?: string) => {
      if (userId) {
          console.log(`Report submitted for user ID: ${userId}`);
      }
      toast.success("Thank you for your report! We will review it shortly.");
    }

  return (
    <div className="z-50 fixed inset-0 flex justify-center items-center">
      <div className="inline-flex flex-col justify-start items-start gap-2.5 bg-white px-5 py-[30px] rounded-[20px] w-[640px] h-[495px]">
        <div className="flex flex-col justify-start items-start gap-5 bg-white h-[435px] self-stretch">
          <div className="flex flex-col justify-start items-start gap-5 h-11 self-stretch">
            <div className="inline-flex justify-between items-center self-stretch">
              <div className="flex justify-start items-center gap-2.5 h-[17px] basis-0 grow shrink">
                <div className="font-semibold text-[#171718] text-2xl leading-[28.80px] basis-0 grow shrink">
                  Report User
                </div>
              </div>
              <button onClick={onClose}>
                <Icons.cancel />
              </button>
            </div>
            <div className="border-gray-100 border h-[0px] self-stretch"></div>
          </div>
          <div className="flex flex-col justify-start items-start gap-2.5 h-[61px] self-stretch">
            <div className="font-medium text-[#171718] text-base leading-tight self-stretch">
              Reason
            </div>

            <Select
              sx={{
                width: "100%",
                height: "40px",
                borderRadius: "8px",
              }}
              defaultValue=""
            >
              <MenuItem value={10}>Share the contact information</MenuItem>
              <MenuItem value={20}>Use automation reply.</MenuItem>
              <MenuItem value={30}>Other</MenuItem>
            </Select>
          </div>
          <div className="flex flex-col justify-start items-start gap-2.5 h-[61px] self-stretch">
            <div className="font-medium text-[#171718] text-base leading-tight self-stretch">
              Selected User
            </div>
            <div className="flex flex-col justify-start items-start h-10 self-stretch">
              <div className="inline-flex justify-start items-center gap-2.5 border-gray-200 p-2.5 border rounded-[10px] h-10 overflow-hidden self-stretch">
                <Image
                  width={24}
                  height={24}
                  alt="avatar"
                  src={selector.avatar}
                />
                <div className="font-normal text-gray-500 text-sm leading-[16.80px]">
                  {selector.name}
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-start items-start gap-2.5 self-stretch">
            <div className="font-medium text-[#171718] text-base leading-tight self-stretch">
              Description
            </div>

            <TextField
              fullWidth
              multiline
              rows={4}
              placeholder="Enter a description..."
              sx={{
                "& .MuiInputBase-input::placeholder": {
                  verticalAlign: "top", // Ensures text starts from the top
                },
              }}
            />
          </div>
          <div className="inline-flex justify-end items-start gap-2.5 self-stretch">
            <button
              onClick={onClose}
              className="flex justify-center items-center gap-2.5 border-gray-500 px-2.5 py-[15px] border rounded-lg w-[100px] h-10 overflow-hidden"
            >
              <div className="font-normal text-center text-gray-500 text-sm">
                Nevermind
              </div>
            </button>
            <button
              onClick={() => { onClose(); sendReport(selector?.id); }}
              className="flex justify-center items-center gap-2.5 bg-red-500 px-2.5 py-[15px] rounded-lg w-[100px] h-10 overflow-hidden"
            >
              <div className="font-normal text-base text-center text-white">
                Report
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportModal;
