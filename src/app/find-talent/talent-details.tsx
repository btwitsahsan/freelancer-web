import { Icons } from "@/icons";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { FaMapLocation } from "react-icons/fa6";
import { PiHeart, PiHeartFill } from "react-icons/pi";
import ReviewCard from "./ReviewCard";
import { UserType } from "@/utils/constant";

import "swiper/css";
import "swiper/css/navigation";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

type propsType = {
  onclick?: () => void;
  userData: UserType;
};

const TalentDetails = ({ onclick, userData }: propsType) => {
  const [isBookmarked, setIsBookmarked] = useState(false);

  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  // Ensure workHistory is an array
  const workHistory = Array.isArray(userData.workHistory)
    ? userData?.workHistory
    : [];

  // Ensure portfolios is an array
  const portfolios = Array.isArray(userData.portfolios)
    ? userData?.portfolios
    : [];

  // Ensure skills is an array
  const skills = Array.isArray(userData.skills) ? userData.skills : [];

  // Calculate completed and in-progress jobs
  const completedJobs = workHistory.filter(
    (job) => job.status === "completed"
  ).length;
  const inProgressJobs = workHistory.filter(
    (job) => job.status === "in_progress"
  ).length;

  // Calculate total hours
  const totalHours = workHistory.reduce((acc, job) => {
    const hours = typeof job.hours === "number" ? job.hours : 0;
    return acc + hours;
  }, 0);

  return (
    <div className="flex flex-col gap-6 pb-4 px-4 overflow-x-visible overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-thumb]:rounded-full">
      <div className="flex w-full items-center justify-between">
        <div className="flex items-start gap-4">
          <Image
            width={50}
            height={50}
            src={userData.avatar || "/image/default.png"}
            alt="Profile Image"
            className="rounded-full"
          />
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2.5 text-black text-xl font-medium leading-none">
                <div>{userData.fullName}</div>
                <Icons.verify2 />
              </div>
              <div className="flex items-center gap-1 text-gray500 text-sm font-normal leading-none">
                <FaMapLocation />
                <div>{userData.location || "Location not specified"}</div>
              </div>
            </div>
            <div className="flex items-center gap-4 text-gray500">
              <p className="flex items-center gap-1 text-lg font-medium">
                <Icons.dollarbag width="15" />
                <span className="text-black text-md">
                  ${userData.hourlyRate || 0}/hr
                </span>
              </p>
              <div className="flex items-center gap-1">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="10"
                    cy="10"
                    r="9"
                    transform="rotate(-90 10 10)"
                    stroke="#E5E7EB"
                    strokeWidth="2"
                  />
                  <mask id="path-3-inside-1_3331_2046" fill="white">
                    <path d="M10 -7.15256e-07C12.1924 -7.15256e-07 14.324 0.720479 16.0668 2.05056C17.8096 3.38063 19.0671 5.24659 19.6456 7.36127C20.2241 9.47595 20.0916 11.7221 19.2686 13.7542C18.4455 15.7862 16.9775 17.4914 15.0904 18.6074C13.2033 19.7234 11.0018 20.1884 8.82463 19.9307C6.64744 19.673 4.61528 18.707 3.04087 17.1813C1.46647 15.6556 0.437081 13.6547 0.111135 11.4867C-0.214811 9.31871 0.180747 7.10366 1.23693 5.18246L10 10L10 -7.15256e-07Z" />
                  </mask>
                  <circle
                    cx="10"
                    cy="10"
                    r="9"
                    stroke="#007DFC"
                    strokeWidth="2"
                    strokeDasharray={`${(56.5 * 83) / 100} 56.5`}
                    transform="rotate(-90 10 10)"
                  />
                  <circle cx="10" cy="10" r="8" fill="white" />
                  <g clipPath="url(#clip0_3331_2046)">
                    <path
                      d="M6.25 10C8.125 10 10 8.125 10 6.25C10 8.125 11.875 10 13.75 10C11.875 10 10 11.875 10 13.75C10 11.875 8.125 10 6.25 10Z"
                      stroke="#007DFC"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M5.83331 13.1257C6.18053 13.1257 6.87498 12.4312 6.87498 12.084C6.87498 12.4312 7.56943 13.1257 7.91665 13.1257C7.56943 13.1257 6.87498 13.8201 6.87498 14.1673C6.87498 13.8201 6.18053 13.1257 5.83331 13.1257Z"
                      stroke="#007DFC"
                      strokeWidth="0.5"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M11.6667 7.08398C12.0834 7.08398 12.9167 6.25065 12.9167 5.83398C12.9167 6.25065 13.75 7.08398 14.1667 7.08398C13.75 7.08398 12.9167 7.91732 12.9167 8.33398C12.9167 7.91732 12.0834 7.08398 11.6667 7.08398Z"
                      stroke="#007DFC"
                      strokeWidth="0.5"
                      strokeLinejoin="round"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_3331_2046">
                      <rect
                        width="10"
                        height="10"
                        fill="white"
                        transform="translate(5 5)"
                      />
                    </clipPath>
                  </defs>
                </svg>

                <div className="text-sm text-black font-medium whitespace-nowrap">
                  83% Job Success
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Icons.topratedplus />
                <div className="text-sm text-black font-medium whitespace-nowrap">
                  Top Rated Plus
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex justify-end items-center gap-4">
            <button
              onClick={onclick}
              className="relative text-sm font-medium bg-gradient-to-r from-blue500 to-purple-500 bg-clip-text text-transparent hover:text-blue500"
            >
              View profile
              <span className="absolute left-0 bottom-0 w-full h-[1px] bg-gradient-to-r from-blue500 to-purple-500"></span>
            </button>

            <button
              onClick={toggleBookmark}
              className={`flex justify-center items-center w-10 h-10 rounded-full top-4 right-4 border border-green500 transition-transform duration-300 ease-in-out transform-all cursor-pointer ${
                isBookmarked ? "bg-green500" : "bg-transparent"
              }`}
            >
              {isBookmarked ? (
                <PiHeartFill className="text-white" size={20} />
              ) : (
                <PiHeart className="text-green500" size={20} />
              )}
            </button>
          </div>
          <div className="flex justify-end gap-2.5">
            <div className="flex flex-col">
              <div className="text-black">{workHistory.length}</div>
              <div className="text-black text-xs">Total jobs</div>
            </div>
            <div className="flex flex-col">
              <div className="text-black">{totalHours}</div>
              <div className="text-black text-xs">Total hours</div>
            </div>
          </div>
        </div>
      </div>

      <hr />

      <div className="flex flex-col gap-4">
        <h3 className="text-xl font-medium">
          {userData.jotTitle || "Freelancer"}
        </h3>
        <div className="flex flex-col gap-2.5">
          <div className="text-sm text-context">
            {userData.description || "No description provided."}
          </div>
          {userData.description && userData.description.length > 200 && (
            <div className="leading-none">
              <button className="underline text-green400 hover:text-green500 transition-all leading-none">
                more
              </button>
            </div>
          )}
        </div>
      </div>

      <hr />

      <div className="flex flex-col gap-5">
        <h3 className="text-xl font-medium">Work history</h3>
        <div className="flex flex-col gap-5">
          <div className="flex border-b-2 border-gray200">
            <div className="px-2 py-1 -mb-0.5 text-sm text-context border-b-2 border-green500">
              Completed jobs ({completedJobs})
            </div>
            <div className="px-2 py-1 -mb-0.5 text-sm text-context border-b-2 border-gray200 hover:border-green500 transition-all">
              In progress ({inProgressJobs})
            </div>
          </div>
          {workHistory.length > 0 ? (
            workHistory.map((job, index) => (
              <ReviewCard key={index} jobData={job} />
            ))
          ) : (
            <div className="text-center text-gray-500 py-4">
              No work history available
            </div>
          )}
        </div>
      </div>

      {portfolios.length > 0 && (
        <div className="flex flex-col gap-5">
          <h3 className="text-xl font-medium">Portfolio</h3>
          <div className="flex items-center gap-1.5">
            <button
              ref={prevRef}
              className="flex justify-center items-center w-6 h-6 border border-context rounded-full"
            >
              <FaAngleLeft width={20} height={20} />
            </button>
            <Swiper
              spaceBetween={10}
              slidesPerView={3}
              modules={[Navigation]}
              navigation={{
                prevEl: prevRef.current,
                nextEl: nextRef.current,
              }}
              className="w-full"
              loop={portfolios.length > 3}
            >
              {portfolios.map((portfolio, index) => (
                <SwiperSlide key={index}>
                  <div className="flex flex-col gap-2.5">
                    <Image
                      src={portfolio.image || "/image/portfolio.jpg"}
                      alt={portfolio.title || "Portfolio Image"}
                      width={200}
                      height={140}
                    />
                    <div>{portfolio.title || `Portfolio ${index + 1}`}</div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            <button
              ref={nextRef}
              className="flex justify-center items-center w-6 h-6 border border-context rounded-full"
            >
              <FaAngleRight width={20} height={20} />
            </button>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-5">
        <h3 className="text-xl font-medium">Skills</h3>
        <div className="flex flex-wrap gap-2">
          {skills.length > 0 ? (
            skills.map((skill, index) => (
              <span
                key={index}
                className="bg-gray100 text-black py-1 px-3 rounded text-sm font-medium"
              >
                {skill}
              </span>
            ))
          ) : (
            <span className="text-gray-500">No skills listed</span>
          )}
        </div>
      </div>

      <Link
        href="/submit-proposal"
        className="w-full bg-gradient-to-r from-gradientStart to-gradientEnd flex items-center space-x-2 justify-center text-white py-3 rounded-md font-semibold hover:drop-shadow-lg transition-all"
      >
        <Icons.send width="20" />
        <span>Invite to job</span>
      </Link>
    </div>
  );
};

export default TalentDetails;
