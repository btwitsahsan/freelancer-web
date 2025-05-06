"use client";

import { useState } from "react";
import { Modal, Box } from "@mui/material";
import { Icons } from "@/icons";
import { FaPlus } from "react-icons/fa";

const ReferralHeader = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  interface StepCardProps {
    number: string;
    text: string;
  }

  const StepCard = ({ number, text }: StepCardProps) => {
    return (
      <div className="flex flex-col w-full justify-center gap-2 p-5 bg-blue100 rounded-2xl">
        <div className="flex items-center justify-center w-10 h-10 bg-white rounded-full text-blue-600 font-bold text-xl mr-4">
          {number}
        </div>
        <p className="text-context">{text}</p>
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-5 bg-white p-5 rounded-2xl border">
      <div className="flex items-center gap-2.5">
        <div className="flex-1 text-2xl font-semibold text-black">
          Earn when you invite your clients
        </div>

        <input
          type="email"
          placeholder="Client email address"
          className="flex-grow px-4 py-2 max-w-80 border rounded-md outline-none focus:ring hover:ring focus:border-blue300 hover:border-blue300 transition-all"
        />

        <button
          onClick={handleOpen}
          className="px-6 py-2 text-white bg-gradient-to-r from-gradientStart to-gradientEnd rounded-md hover:drop-shadow-lg transition-all"
        >
          Invite New Client
        </button>

        <div className="border m-auto p-2 rounded-md hover:bg-gray100 transition-all">
          <Icons.copy width="20" />
        </div>
      </div>

      <hr />

      <div className="flex gap-4">
        <StepCard
          number="1"
          text="Invite clients to contra via email, projects, and invoices."
        />
        <StepCard
          number="2"
          text="Your client completed $500+ project with freelancer"
        />
        <StepCard
          number="3"
          text="You get rewarded for every client. Every single time!"
        />
      </div>

      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            position: "fixed",
            top: "50%",
            left: "50%",
            width: 550,
            padding: "50px 50px 30px",
            boxShadow: 24,
            backgroundColor: "#fff",
            backgroundImage: "url(/image/gradient-bg.jpg)",
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            transform: "translate(-50%, -50%)",
            borderRadius: "16px",
          }}
        >
          <div className="relative flex flex-col gap-2.5 px-5 pt-10 pb-6 bg-white rounded-2xl">
            <h2 className="text-xl font-semibold leading-none">
              Invite and earn
            </h2>
            <input
              className="px-5 py-3 border rounded-lg border-gray200 outline-none hover:ring hover:border-blue400 focus:border-blue400 focus:ring transition-all"
              placeholder="Enter Email Address"
            />
            <button className="w-full py-3 bg-context rounded-lg text-white font-semibold hover:bg-black hover:drop-shadow transition-all">
              Invite
            </button>
            <div className="absolute top-0 left-1/2 flex justify-center items-center px-4 py-2 w-[140px] text-sm font-bold border rounded-full -translate-x-1/2 -translate-y-1/2 text-white bg-gradient-to-r from-gradientStart to-gradientEnd">
              $50 Reward
            </div>
          </div>
          <div className="flex gap-5">
            <button className="group flex basis-1/2 items-center p-px bg-gradient-to-r from-gradientStart to-gradientEnd rounded-full">
              <div className="flex items-center justify-center gap-1.5 w-full h-full px-4 py-3 bg-white rounded-full group-hover:bg-transparent group-hover:text-white group-hover:stroke-white transition-all">
                <FaPlus />
                <div>Send Invoices</div>
              </div>
            </button>
            <button className="group flex basis-1/2 items-center p-px bg-gradient-to-r from-gradientStart to-gradientEnd rounded-full">
              <div className="flex items-center justify-center gap-1.5 w-full h-full px-4 py-3 bg-white rounded-full group-hover:bg-transparent group-hover:text-white group-hover:stroke-white transition-all">
                <FaPlus />
                <div>Start Project</div>
              </div>
            </button>
          </div>
          <div className="flex flex-col gap-4 p-5 border border-gray200 rounded-2xl">
            <h3 className="text-xl font-semibold text-black text-center leading-none">
              Earn $50 or more on every client invite
            </h3>
            <p className="text-sm text-gray500 font-medium text-center">
              For a limited time, every client invite is worth $50 or more (
              normally $25).
            </p>
            <button className="flex justify-center items-center px-4 py-3 border border-context rounded-lg font-semibold text-context hover:bg-black hover:border-black hover:text-white transition-all">
              Start Earning
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default ReferralHeader;
