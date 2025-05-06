"use client"

import { useState } from "react";
import Image from "next/image";
import { PiHeart, PiHeartFill } from "react-icons/pi";
import InviteModal from "./InviteModal";

const TalentCard: React.FC = () => {
    const [isFav, setIsFav] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);

    const handleOpen = (): void => setOpen(true);
    const handleClose = (): void => setOpen(false);

    return (
        <div className="w-full p-4 rounded-lg border border-gray-200 flex-col justify-start items-start gap-2.5 flex">
            <div className="w-full justify-start items-start gap-2.5 flex">
                <div className="relative w-10 h-10">
                    <Image
                        src="/image/avatar/1.jpg"
                        alt="User Avatar"
                        width={40}
                        height={40}
                        className="w-10 h-10 rounded-full"
                    />
                    <div className="absolute bottom-0.5 right-0.5 w-2 h-2 rounded-full bg-green500" />
                </div>
                <div className="flex-1 flex-col justify-center items-start gap-1 flex">
                    <div className="w-full text-black text-base font-normal leading-tight">
                        Louis S.
                    </div>
                    <div className="w-full text-black text-xs font-normal leading-tight">
                        United States
                    </div>
                </div>
                <button onClick={() => setIsFav(prev => !prev)} className={`w-6 h-6 flex justify-center items-center border rounded-full transition-all hover:border-green500 hover:text-green500 ${isFav ? "border-green500 text-green500" : "border-gray500 text-gray500"}`}>
                    {
                        isFav ? <PiHeartFill className="w-4 h-4" /> : <PiHeart className="w-4 h-4" />
                    }
                </button>
            </div>
            <div className="w-full flex-col justify-start items-start gap-2.5 flex">
                <div className="w-full justify-between items-start flex">
                    <div className="flex-col justify-center items-center gap-2 flex">
                        <div className="w-full text-center text-black text-xs font-normal">
                            100 %
                        </div>
                        <div className="w-full justify-center items-center gap-1 flex">
                            <div className="text-black text-[10px] font-normal">
                                Job Success
                            </div>
                        </div>
                    </div>
                    <div className="flex-col justify-center items-center gap-2 flex">
                        <div className="w-full text-center text-black text-xs font-normal">
                            8
                        </div>
                        <div className="w-full justify-center items-center gap-1 flex">
                            <div className="text-black text-[10px] font-normal">Jobs</div>
                        </div>
                    </div>
                    <div className="flex-col justify-center items-center gap-2 flex">
                        <div className="w-full text-center text-black text-xs font-normal">
                            $60/hr
                        </div>
                        <div className="w-full justify-center items-center gap-1 flex">
                            <div className="text-black text-xs font-normal">Rate</div>
                        </div>
                    </div>
                </div>
                <div className="w-full justify-center items-center gap-1 flex">
                    <div className="grow shrink basis-0 text-black text-sm font-normal">
                        Full Stack Developer | React, Next, Node, JavaScript | AI, LLM, GenAI
                    </div>
                </div>
            </div>
            <div className="w-full justify-start items-center gap-1 flex flex-wrap">
                <div className="px-3 py-2 bg-[#007dfc] rounded-2xl flex-col justify-start items-start gap-2 flex overflow-hidden hover:shadow transition-all cursor-pointer">
                    <div className="w-full text-white text-xs font-normal whitespace-nowrap">react-js</div>
                </div>
                <div className="px-3 py-2 bg-[#007dfc] rounded-2xl flex-col justify-start items-start gap-2 flex overflow-hidden hover:shadow transition-all cursor-pointer">
                    <div className="w-full text-white text-xs font-normal whitespace-nowrap">next.js</div>
                </div>
                <div className="px-3 py-2 bg-[#007dfc] rounded-2xl flex-col justify-start items-start gap-2 flex overflow-hidden hover:shadow transition-all cursor-pointer">
                    <div className="w-full text-white text-xs font-normal whitespace-nowrap">javascript</div>
                </div>
                <div className="px-3 py-2 bg-[#007dfc] rounded-2xl flex-col justify-start items-start gap-2 flex overflow-hidden hover:shadow transition-all cursor-pointer">
                    <div className="w-full text-white text-xs font-normal whitespace-nowrap">node.js</div>
                </div>
                <div className="px-3 py-2 bg-[#007dfc] rounded-2xl flex-col justify-start items-start gap-2 flex overflow-hidden hover:shadow transition-all cursor-pointer">
                    <div className="w-full text-white text-xs font-normal whitespace-nowrap">angular</div>
                </div>
                <div className="px-3 py-2 bg-[#007dfc] rounded-2xl flex-col justify-start items-start gap-2 flex overflow-hidden hover:shadow transition-all cursor-pointer">
                    <div className="w-full text-white text-xs font-normal whitespace-nowrap">+10</div>
                </div>
            </div>
            <div className="w-full justify-start items-center gap-1 flex">
                <div className="px-3 py-2 bg-[#aeaeae] rounded-2xl justify-start items-start gap-0.5 flex overflow-hidden">
                    <div data-svg-wrapper className="relative">
                        <svg
                            width="12"
                            height="12"
                            viewBox="0 0 12 12"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M4.31407 6.3368H4.08459C3.34272 6.3368 2.97179 6.3368 2.81368 6.0922C2.65557 5.84765 2.80622 5.5069 3.10752 4.82542L4.01334 2.77661C4.28728 2.157 4.42426 1.84719 4.68998 1.67359C4.95571 1.5 5.29295 1.5 5.9675 1.5H7.0122C7.8316 1.5 8.2413 1.5 8.3958 1.76768C8.55035 2.03535 8.3471 2.39294 7.94055 3.10811L7.4046 4.05094C7.2025 4.40648 7.10145 4.58425 7.10285 4.72976C7.1047 4.91888 7.20525 5.0931 7.3677 5.1885C7.4927 5.26195 7.69635 5.26195 8.1037 5.26195C8.61865 5.26195 8.87615 5.26195 9.01025 5.3511C9.18445 5.4669 9.27565 5.6741 9.2437 5.8816C9.2191 6.0413 9.0459 6.2328 8.6995 6.61585L5.93195 9.67615C5.38835 10.2773 5.11655 10.5778 4.93403 10.4827C4.75151 10.3876 4.83916 9.9911 5.01445 9.1981L5.35785 7.6448C5.4913 7.041 5.55805 6.7391 5.39755 6.53795C5.23705 6.3368 4.92938 6.3368 4.31407 6.3368Z"
                                stroke="white"
                                stroke-linejoin="round"
                            />
                        </svg>
                    </div>
                    <div className="text-white text-xs font-normal">Available now</div>
                </div>
            </div>
            <div className="w-full justify-start items-center gap-2.5 flex">
                <button onClick={handleOpen} className="grow shrink basis-0 px-2 py-1 border border-green500 rounded-lg flex-col justify-center items-center gap-2 flex overflow-hidden text-green500 text-sm font-normal hover:bg-green500 hover:text-white transition-all">
                    Invite to job
                </button>
            </div>

            <InviteModal open={open} onClose={handleClose} talent={{ name: 'Louis S.', role: 'Full Stack Developer' }} />
        </div>
    );
};

export default TalentCard