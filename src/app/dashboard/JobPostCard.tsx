"use client"

import { ProjectType, formatDate } from "@/utils/constant";
import React from "react";
import { useRouter } from "next/navigation";

type JobPostCardProps = {
    project: ProjectType;
}

const JobPostCard: React.FC<JobPostCardProps> = ({ project }) => {
    const router = useRouter();

    const handleOpenJobPost = () => {
        router.push(`project-view/${project._id}`);
    }

    return (
        <div className="flex-1 p-4 min-h-60 rounded-lg border border-gray-200 flex-col justify-start gap-2.5 flex">
            <div className="w-full justify-start items-start gap-2.5 flex">
                <div data-svg-wrapper>
                    <svg
                        width="32"
                        height="32"
                        viewBox="0 0 32 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <rect width="32" height="32" rx="16" fill="#9CA3AF" />
                        <path
                            d="M15.9998 16.6673L19.3332 19.6673M15.9998 16.6673L12.6665 19.6673M15.9998 16.6673V13.334"
                            stroke="white"
                            stroke-width="1.5"
                        />
                        <path
                            d="M20.1277 18.9631C20.4721 18.765 20.6443 18.666 20.8333 18.666C21.0224 18.666 21.1946 18.765 21.539 18.9631L21.961 19.2058C22.3054 19.4039 22.4776 19.5029 22.5721 19.666C22.6667 19.8291 22.6667 20.0272 22.6667 20.4233V20.9087C22.6667 21.3048 22.6667 21.5029 22.5721 21.666C22.4776 21.8291 22.3054 21.9281 21.961 22.1262L21.539 22.3689C21.1946 22.567 21.0224 22.666 20.8333 22.666C20.6443 22.666 20.4721 22.567 20.1277 22.3689L19.7057 22.1262C19.3613 21.9281 19.1891 21.8291 19.0945 21.666C19 21.5029 19 21.3048 19 20.9087V20.4233C19 20.0272 19 19.8291 19.0945 19.666C19.1891 19.5029 19.3613 19.4039 19.7057 19.2058L20.1277 18.9631Z"
                            stroke="white"
                            stroke-width="1.5"
                        />
                        <path
                            d="M10.4612 18.9631C10.8056 18.765 10.9777 18.666 11.1668 18.666C11.3559 18.666 11.5281 18.765 11.8725 18.9631L12.2945 19.2058C12.6389 19.4039 12.8111 19.5029 12.9056 19.666C13.0002 19.8291 13.0002 20.0272 13.0002 20.4233V20.9087C13.0002 21.3048 13.0002 21.5029 12.9056 21.666C12.8111 21.8291 12.6389 21.9281 12.2945 22.1262L11.8725 22.3689C11.5281 22.567 11.3559 22.666 11.1668 22.666C10.9777 22.666 10.8056 22.567 10.4612 22.3689L10.0391 22.1262C9.69476 21.9281 9.52258 21.8291 9.42804 21.666C9.3335 21.5029 9.3335 21.3048 9.3335 20.9087V20.4233C9.3335 20.0272 9.3335 19.8291 9.42804 19.666C9.52258 19.5029 9.69476 19.4039 10.0391 19.2058L10.4612 18.9631Z"
                            stroke="white"
                            stroke-width="1.5"
                        />
                        <path
                            d="M15.2942 9.63107C15.6386 9.43301 15.8108 9.33398 15.9998 9.33398C16.1889 9.33398 16.3611 9.43301 16.7055 9.63107L17.1275 9.87378C17.4719 10.0718 17.6441 10.1709 17.7386 10.334C17.8332 10.4971 17.8332 10.6952 17.8332 11.0913V11.5767C17.8332 11.9728 17.8332 12.1709 17.7386 12.334C17.6441 12.4971 17.4719 12.5961 17.1275 12.7942L16.7055 13.0369C16.3611 13.235 16.1889 13.334 15.9998 13.334C15.8108 13.334 15.6386 13.235 15.2942 13.0369L14.8722 12.7942C14.5278 12.5961 14.3556 12.4971 14.261 12.334C14.1665 12.1709 14.1665 11.9728 14.1665 11.5767V11.0913C14.1665 10.6952 14.1665 10.4971 14.261 10.334C14.3556 10.1709 14.5278 10.0718 14.8722 9.87378L15.2942 9.63107Z"
                            stroke="white"
                            stroke-width="1.5"
                        />
                    </svg>
                </div>
                <div className="flex-1 flex-col justify-start items-start gap-2 flex">
                    <div className="w-full text-black text-base font-normal">
                        {project?.title}
                    </div>
                </div>
                <div data-svg-wrapper className="relative">
                    <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M13.3333 7H12.6667C12.2985 7 12 7.29848 12 7.66667V8.33333C12 8.70152 12.2985 9 12.6667 9H13.3333C13.7015 9 14 8.70152 14 8.33333V7.66667C14 7.29848 13.7015 7 13.3333 7Z"
                            stroke="#10B981"
                            stroke-width="1.5"
                        />
                        <path
                            d="M8.33333 7H7.66667C7.29848 7 7 7.29848 7 7.66667V8.33333C7 8.70152 7.29848 9 7.66667 9H8.33333C8.70152 9 9 8.70152 9 8.33333V7.66667C9 7.29848 8.70152 7 8.33333 7Z"
                            stroke="#10B981"
                            stroke-width="1.5"
                        />
                        <path
                            d="M3.33333 7H2.66667C2.29848 7 2 7.29848 2 7.66667V8.33333C2 8.70152 2.29848 9 2.66667 9H3.33333C3.70152 9 4 8.70152 4 8.33333V7.66667C4 7.29848 3.70152 7 3.33333 7Z"
                            stroke="#10B981"
                            stroke-width="1.5"
                        />
                    </svg>
                </div>
            </div>
            <div className="w-full justify-start items-center gap-2.5 flex">
                <div className="px-2 py-1 bg-[#007dfc] rounded flex-col justify-start items-start gap-2 flex overflow-hidden">
                    <div className="w-full text-white text-xs font-normal">
                        Open job post
                    </div>
                </div>
                <div className="text-gray-500 text-xs font-normal">
                    {formatDate(project.createdAt)}
                </div>
            </div>
            <div className="w-full grow shrink basis-0 justify-between items-start flex">
                <div className="flex-col justify-center items-center gap-2 flex">
                    <div className="w-full text-center text-black text-xs font-normal">
                        Invited
                    </div>
                    <div className="w-full justify-center items-center gap-1 flex">
                        <div data-svg-wrapper className="relative">
                            <svg
                                width="12"
                                height="12"
                                viewBox="0 0 12 12"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M2.50018 3.5L1.89077 3.90626C1.45392 4.1975 1.23549 4.34313 1.11711 4.56521C0.998736 4.78729 0.999616 5.0483 1.00137 5.5703C1.00348 6.19875 1.00932 6.8391 1.0255 7.48705C1.06387 9.02435 1.08306 9.793 1.64826 10.3582C2.21346 10.9234 2.99249 10.9429 4.55054 10.9818C5.51985 11.006 6.48055 11.006 7.4498 10.9818C9.0079 10.9429 9.7869 10.9234 10.3521 10.3582C10.9173 9.793 10.9365 9.02435 10.9749 7.48705C10.9911 6.8391 10.9969 6.19875 10.999 5.5703C11.0008 5.0483 11.0016 4.78728 10.8833 4.56521C10.7649 4.34313 10.5465 4.1975 10.1096 3.90626L9.50015 3.5"
                                    stroke="#141B34"
                                    stroke-linejoin="round"
                                />
                                <path
                                    d="M1 5L4.45651 7.0739C5.2085 7.5251 5.5845 7.7507 6 7.7507C6.4155 7.7507 6.7915 7.5251 7.5435 7.0739L11 5"
                                    stroke="#141B34"
                                    stroke-linejoin="round"
                                />
                                <path
                                    d="M2.50018 3.5V6C2.50018 6.94281 2.50018 7.41422 2.79298 7.70711C3.08587 8 3.55727 8 4.5 8H7.50018C8.44299 8 8.91441 8 9.2073 7.70711C9.50018 7.41422 9.50018 6.94281 9.50018 6V3.5"
                                    stroke="#141B34"
                                />
                            </svg>
                        </div>
                        <div className="text-black text-xs font-normal">6/30</div>
                    </div>
                </div>
                <div className="flex-col justify-center items-center gap-2 flex">
                    <div className="w-full text-center text-black text-xs font-normal">
                        Proposals
                    </div>
                    <div className="w-full justify-center items-center gap-1 flex">
                        <div data-svg-wrapper className="relative">
                            <svg
                                width="13"
                                height="12"
                                viewBox="0 0 13 12"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M11.0535 9C11.4282 9 11.7262 8.76425 11.9937 8.43455C12.5415 7.7597 11.6422 7.2204 11.2992 6.9563C10.9505 6.6878 10.5612 6.5357 10.1665 6.5M9.6665 5.5C10.3569 5.5 10.9165 4.94036 10.9165 4.25C10.9165 3.55964 10.3569 3 9.6665 3"
                                    stroke="#141B34"
                                    stroke-width="0.75"
                                    stroke-linecap="round"
                                />
                                <path
                                    d="M2.27949 9C1.90483 9 1.60684 8.76425 1.33928 8.43455C0.791549 7.7597 1.69084 7.2204 2.03383 6.9563C2.38249 6.6878 2.7718 6.5357 3.16651 6.5M3.41651 5.5C2.72615 5.5 2.16651 4.94036 2.16651 4.25C2.16651 3.55964 2.72615 3 3.41651 3"
                                    stroke="#141B34"
                                    stroke-width="0.75"
                                    stroke-linecap="round"
                                />
                                <path
                                    d="M4.70841 7.5556C4.19752 7.8715 2.858 8.51655 3.67386 9.3237C4.0724 9.718 4.51627 10 5.07432 10H8.25872C8.81677 10 9.26062 9.718 9.65917 9.3237C10.475 8.51655 9.13552 7.8715 8.62462 7.5556C7.42657 6.8148 5.90642 6.8148 4.70841 7.5556Z"
                                    stroke="#141B34"
                                    stroke-width="0.75"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                />
                                <path
                                    d="M8.41651 3.75C8.41651 4.7165 7.63301 5.5 6.66651 5.5C5.70001 5.5 4.9165 4.7165 4.9165 3.75C4.9165 2.7835 5.70001 2 6.66651 2C7.63301 2 8.41651 2.7835 8.41651 3.75Z"
                                    stroke="#141B34"
                                    stroke-width="0.75"
                                />
                            </svg>
                        </div>
                        <div className="text-black text-xs font-normal">
                            69 (66 new)
                        </div>
                    </div>
                </div>
                <div className="flex-col justify-center items-center gap-2 flex">
                    <div className="w-full text-center text-black text-xs font-normal">
                        Messaged
                    </div>
                    <div className="w-full justify-center items-center gap-1 flex">
                        <div data-svg-wrapper className="relative">
                            <svg
                                width="13"
                                height="12"
                                viewBox="0 0 13 12"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M4.5835 7.25H8.0835M4.5835 4.75H6.3335"
                                    stroke="#141B34"
                                    stroke-width="0.75"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                />
                                <path
                                    d="M7.41879 10.4452C9.51029 10.3062 11.1763 8.6166 11.3134 6.49545C11.3402 6.08035 11.3402 5.65045 11.3134 5.23535C11.1763 3.11419 9.51029 1.42457 7.41879 1.28554C6.70524 1.23811 5.96029 1.23821 5.24819 1.28554C3.15669 1.42457 1.4907 3.11419 1.35361 5.23535C1.32679 5.65045 1.32679 6.08035 1.35361 6.49545C1.40354 7.268 1.74521 7.9833 2.14745 8.5873C2.381 9.01015 2.22686 9.5379 1.9836 9.9989C1.8082 10.3313 1.7205 10.4975 1.79091 10.6175C1.86133 10.7376 2.01862 10.7414 2.33321 10.7491C2.95533 10.7642 3.37483 10.5879 3.70783 10.3423C3.89669 10.2031 3.99113 10.1334 4.05621 10.1254C4.12129 10.1174 4.24938 10.1702 4.5055 10.2757C4.7357 10.3705 5.00297 10.4289 5.24819 10.4452C5.96029 10.4926 6.70524 10.4927 7.41879 10.4452Z"
                                    stroke="#141B34"
                                    stroke-width="0.75"
                                    stroke-linejoin="round"
                                />
                            </svg>
                        </div>
                        <div className="text-black text-xs font-normal">0</div>
                    </div>
                </div>
                <div className="flex-col justify-center items-center gap-2 flex">
                    <div className="w-full text-center text-black text-xs font-normal">
                        Hired
                    </div>
                    <div className="w-full justify-center items-center gap-1 flex">
                        <div data-svg-wrapper className="relative">
                            <svg
                                width="12"
                                height="12"
                                viewBox="0 0 12 12"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M2 8.9904V4.85377C2 3.03708 2 2.12874 2.58578 1.56437C3.17157 1 4.11438 1 6 1C7.8856 1 8.82845 1 9.4142 1.56437C10 2.12874 10 3.03708 10 4.85377V8.9904C10 10.1434 10 10.7198 9.6136 10.9262C8.86525 11.3257 7.4616 9.9926 6.795 9.5912C6.4084 9.3584 6.2151 9.242 6 9.242C5.7849 9.242 5.5916 9.3584 5.205 9.5912C4.5384 9.9926 3.13474 11.3257 2.38643 10.9262C2 10.7198 2 10.1434 2 8.9904Z"
                                    stroke="#141B34"
                                    stroke-width="0.75"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                />
                                <path
                                    d="M5 6.85715C5 6.85715 5.5 7.11785 5.75 7.5C5.75 7.5 6.5 6 7.5 5.5"
                                    stroke="#141B34"
                                    stroke-width="0.75"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                />
                                <path
                                    d="M2 3.5H10"
                                    stroke="#141B34"
                                    stroke-width="0.75"
                                />
                            </svg>
                        </div>
                        <div className="text-black text-xs font-normal">0/1</div>
                    </div>
                </div>
            </div>
            <div className="w-full justify-start items-center gap-2.5 flex">
                <button
                    onClick={handleOpenJobPost}
                    className="grow shrink basis-0 px-2 py-1 border border-green500 rounded-lg flex-col justify-center items-center gap-2 flex overflow-hidden text-green500 text-sm font-normal hover:bg-green500 hover:text-white transition-all">
                    Open job post
                </button>
            </div>
        </div>
    );
};

export default JobPostCard