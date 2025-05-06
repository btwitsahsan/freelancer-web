import { Icons } from "@/icons";
import Image from "next/image";
import { useState } from "react";
import { PiHeart, PiHeartFill } from "react-icons/pi";
import { locations, BadgeType, getCountryName } from '@/utils/constant';

type TalentCardProps = {
  fullName?: string;
  position?: string;
  location?: string;
  avatar?: string;
  hourlyRate?: number;
  job_success?: number;
  earning?: number;
  available?: boolean;
  online?: boolean;
  badge?: BadgeType;
  skills?: string[];
  description?: string;
  openModal: () => void;
};

const TalentCard = ({
  fullName,
  position,
  location,
  avatar,
  hourlyRate,
  job_success,
  earning,
  available,
  online,
  badge,
  skills = [],
  description,
  openModal,
}: TalentCardProps) => {
  const [isBookmarked, setIsBookmarked] = useState(false);

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  return (
    <div className="flex flex-col gap-2.5 p-5 border-b border-gray200">
      <div className="flex justify-between gap-5">
        <div className="flex gap-2.5">
          <div className="relative">
            <Image
              src={avatar ?? 'default.png'}
              className="rounded-full"
              alt="Talent Image"
              width={50}
              height={50}
            />
            <div
              className={`absolute top-1 left-1 w-2 h-2 border border-white rounded-full ${online ? "bg-green400" : "bg-gray500"
                }`}
            />
            <div className="absolute bottom-0 right-0">
              {badge === "top-rated-plus" && <Icons.topratedplus />}
              {badge === "top-rated" && <Icons.toprated />}
              {badge === "rising-talent" && <Icons.risingtalent />}
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <div className="text-black text-sm leading-none">{fullName}</div>
            <div className="text-black text-lg leading-none">{position}</div>
            <div className="text-gray500 text-xs leading-none">
              {getCountryName(location ?? "worldwide")}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2.5">
          <div
            onClick={toggleBookmark}
            className={`flex justify-center items-center w-10 h-10 rounded-full top-4 right-4 border border-green500 transition-transform duration-300 ease-in-out transform hover:scale-110 cursor-pointer ${isBookmarked ? "bg-green500" : "bg-transparent"
              }`}
          >
            {isBookmarked ? (
              <PiHeartFill className="text-white" size={20} />
            ) : (
              <PiHeart className="text-green500" size={20} />
            )}
          </div>
          <button
            onClick={openModal}
            className="h-10 px-4 py-2 bg-green500 text-sm text-white rounded leading-none"
          >
            Invite to job
          </button>
        </div>
      </div>
      <div className="flex gap-5 text-gray400">
        <div>${hourlyRate}/hr</div>
        {
          job_success ?
            <div className="flex items-center gap-1">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="8"
                  cy="8"
                  r="7"
                  transform="rotate(-90 8 8)"
                  stroke="#E5E7EB"
                  strokeWidth="2"
                />
                <mask id="path-3-inside-1_3326_1188" fill="white">
                  <path d="M8 9.53674e-07C9.7539 9.53674e-07 11.4592 0.576385 12.8535 1.64045C14.2477 2.70451 15.2537 4.19728 15.7165 5.88902C16.1793 7.58076 16.0733 9.37771 15.4149 11.0033C14.7564 12.6289 13.582 13.9931 12.0723 14.8859C10.5627 15.7787 8.80145 16.1507 7.0597 15.9445C5.31795 15.7384 3.69222 14.9656 2.4327 13.745C1.17317 12.5244 0.349664 10.9238 0.0889078 9.18938C-0.171849 7.45497 0.144598 5.68293 0.989547 4.14597L8 8L8 9.53674e-07Z" />
                </mask>
                <circle
                  cx="8"
                  cy="8"
                  r="7"
                  stroke="#007DFC"
                  strokeWidth="2"
                  strokeDasharray={`${(44 * job_success) / 100} 44`}
                  transform="rotate(-90 8 8)"
                />
                <circle cx="8" cy="8" r="6" fill="white" />
                <path
                  d="M5 8C6.5 8 8 6.5 8 5C8 6.5 9.5 8 11 8C9.5 8 8 9.5 8 11C8 9.5 6.5 8 5 8Z"
                  stroke="#007DFC"
                  strokeLinejoin="round"
                />
                <path
                  d="M4.66675 10.4993C4.94452 10.4993 5.50008 9.94378 5.50008 9.66602C5.50008 9.94378 6.05564 10.4993 6.33341 10.4993C6.05564 10.4993 5.50008 11.0549 5.50008 11.3327C5.50008 11.0549 4.94452 10.4993 4.66675 10.4993Z"
                  stroke="#007DFC"
                  strokeWidth="0.5"
                  strokeLinejoin="round"
                />
                <path
                  d="M9.33325 5.66602C9.66659 5.66602 10.3333 4.99935 10.3333 4.66602C10.3333 4.99935 10.9999 5.66602 11.3333 5.66602C10.9999 5.66602 10.3333 6.33268 10.3333 6.66602C10.3333 6.33268 9.66659 5.66602 9.33325 5.66602Z"
                  stroke="#007DFC"
                  strokeWidth="0.5"
                  strokeLinejoin="round"
                />
              </svg>

              <div>{job_success}% Job Success</div>
            </div> : ""
        }
        {
          earning ?
            <div>
              $
              {earning < 1000
                ? "Less than 1000"
                : `${Math.floor(earning / 1000)}K+`}{" "}
              earned
            </div> : ""
        }
        {available && (
          <div className="flex items-center px-2 py-1 gap-1 text-[10px] text-blue400 border border-blue400 rounded-full">
            <Icons.available />
            Available now
          </div>
        )}
      </div>
      <div className="flex items-center gap-2">
        {skills.slice(0, 10).map((item, index) => (
          <div
            key={`skill-${index}`}
            className="px-2 py-1 text-xs border border-gray500 rounded leading-none whitespace-nowrap"
          >
            {item}
          </div>
        ))}
        {skills.length > 10 && (
          <div className="px-2 py-1 text-xs border border-gray500 rounded leading-none whitespace-nowrap">
            {skills.length - 10} +
          </div>
        )}
      </div>
      <p className="leading-xs text-black leading-tight">
        {description}
      </p>
    </div>
  );
};

export default TalentCard;
