"use client";

import { ProjectType, formatDate, getCountryName } from "@/utils/constant";

type JobDetailsProps = {
  project: ProjectType | undefined | null;
  proposalCount: number;
}

const JobDetails: React.FC<JobDetailsProps> = ({ project, proposalCount }) => {
  return (
    <div className="flex p-10">
      <div className="flex flex-col">
        <div className="p-6 border-b border-gray-200 flex-col justify-start items-start gap-2.5 inline-flex">
          <div className="justify-center items-center gap-4 inline-flex">
            <div className="text-center text-black text-base font-medium">Posted last week</div>
            <div className="justify-center items-center gap-2.5 flex">
              <div data-svg-wrapper className="relative">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5.83301 15C4.3089 15.3431 3.33301 15.8703 3.33301 16.4614C3.33301 17.4953 6.31777 18.3333 9.99967 18.3333C13.6816 18.3333 16.6663 17.4953 16.6663 16.4614C16.6663 15.8703 15.6904 15.3431 14.1663 15" stroke="#141B34" stroke-width="1.5" stroke-linecap="round" />
                  <path d="M12.0837 7.49935C12.0837 8.64993 11.1509 9.58268 10.0003 9.58268C8.84974 9.58268 7.91699 8.64993 7.91699 7.49935C7.91699 6.34876 8.84974 5.41602 10.0003 5.41602C11.1509 5.41602 12.0837 6.34876 12.0837 7.49935Z" stroke="#141B34" stroke-width="1.5" />
                  <path d="M11.0482 14.5774C10.7671 14.848 10.3914 14.9993 10.0005 14.9993C9.60949 14.9993 9.23383 14.848 8.95274 14.5774C6.37891 12.0834 2.92965 9.29727 4.61175 5.25246C5.52124 3.06545 7.70444 1.66602 10.0005 1.66602C12.2965 1.66602 14.4797 3.06546 15.3892 5.25246C17.0692 9.29218 13.6283 12.0919 11.0482 14.5774Z" stroke="#141B34" stroke-width="1.5" />
                </svg>
              </div>
              <div className="text-center text-black text-base font-medium">
                {project?.location === 'worldwide' ? 'Worldwide' : getCountryName(project?.owner.location ?? '')}
              </div>
            </div>
          </div>
        </div>
        <div className="p-6 border-b border-gray-200 flex-col justify-start items-start gap-2.5 inline-flex">
          <div className="self-stretch justify-center items-center gap-4 inline-flex">
            <div className="grow shrink basis-0 text-[#171718] text-base font-normal leading-tight">
              {project?.description}
            </div>
          </div>
        </div>
        <div className="flex flex-col p-6 gap-4">
          <div className="justify-start items-center gap-2.5 inline-flex">
            <div className="grow shrink basis-0 justify-center items-center gap-4 flex">
              <div className="grow shrink basis-0 justify-start items-start gap-2.5 flex">
                <div data-svg-wrapper className="relative">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#141B34" stroke-width="1.25" />
                    <path d="M12 8V12L14 14" stroke="#141B34" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                </div>
                <div className="flex-col justify-center items-start gap-1 inline-flex">
                  <div className="text-center text-black text-base font-medium">Less than 30 hrs/week</div>
                  <div className="text-center text-gray-500 text-sm font-medium">Hourly</div>
                </div>
              </div>
            </div>
            <div className="grow shrink basis-0 justify-center items-center gap-4 flex">
              <div className="grow shrink basis-0 justify-start items-start gap-2.5 flex">
                <div data-svg-wrapper className="relative">
                  <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18.333 2V4M6.33301 2V4" stroke="#141B34" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M2.83301 12.2432C2.83301 7.88594 2.83301 5.70728 4.08513 4.35364C5.33725 3 7.3525 3 11.383 3H13.283C17.3135 3 19.3288 3 20.5809 4.35364C21.833 5.70728 21.833 7.88594 21.833 12.2432V12.7568C21.833 17.1141 21.833 19.2927 20.5809 20.6464C19.3288 22 17.3135 22 13.283 22H11.383C7.3525 22 5.33725 22 4.08513 20.6464C2.83301 19.2927 2.83301 17.1141 2.83301 12.7568V12.2432Z" stroke="#141B34" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M3.33301 8H21.333" stroke="#141B34" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                </div>
                <div className="flex-col justify-center items-start gap-1 inline-flex">
                  <div className="text-black text-base font-medium">1 to 3 months</div>
                  <div className="text-center text-gray-500 text-sm font-medium">Project Length</div>
                </div>
              </div>
            </div>
            <div className="grow shrink basis-0 justify-center items-center gap-4 flex">
              <div className="grow shrink basis-0 justify-start items-start gap-2.5 flex">
                <div data-svg-wrapper className="relative">
                  <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.88921 21.9948V18.4451C4.88921 17.1737 4.55626 16.5128 3.90181 15.4078C3.11729 14.0833 2.66699 12.5375 2.66699 10.8866C2.66699 5.97866 6.64668 2 11.5559 2C16.4651 2 20.4448 5.97866 20.4448 10.8866C20.4448 11.4663 20.4448 11.7562 20.469 11.9187C20.5268 12.3072 20.7081 12.6414 20.8864 12.9873L22.667 16.4407L21.2676 17.1402C20.862 17.3429 20.6593 17.4443 20.518 17.6314C20.3767 17.8184 20.337 18.0296 20.2574 18.4519L20.2496 18.4931C20.0674 19.4606 19.8663 20.5286 19.2999 21.2024C19.0999 21.4403 18.8523 21.6336 18.5729 21.7699C18.1117 21.9948 17.5447 21.9948 16.4107 21.9948C15.886 21.9948 15.3598 22.0069 14.8352 21.9942C13.5917 21.9639 12.667 20.9184 12.667 19.7044" stroke="#141B34" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M15.055 10.5315C14.6287 10.5315 14.2399 10.3702 13.9454 10.1048M15.055 10.5315C15.055 11.6774 14.3911 12.7658 13.1131 12.7658C11.8351 12.7658 11.1713 13.8541 11.1713 15M15.055 10.5315C17.2043 10.5315 17.2043 7.18017 15.055 7.18017C14.8597 7.18017 14.6723 7.21403 14.4982 7.27624C14.6032 4.77819 11.0019 4.1 10.1862 6.44018M10.1862 6.44018C10.7803 6.8411 11.1713 7.52323 11.1713 8.29729M10.1862 6.44018C8.33441 5.19034 5.86582 7.4331 7.04023 9.43277C5.06925 9.72827 5.27998 12.7658 7.28749 12.7658C7.85043 12.7658 8.3481 12.4844 8.64933 12.0538" stroke="#141B34" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                </div>
                <div className="grow shrink basis-0 flex-col justify-center items-start gap-1 inline-flex">
                  <div className="text-black text-base font-medium">{project?.level}</div>
                  <div className="self-stretch text-gray-500 text-sm font-medium">I am looking for a mix of experience and value</div>
                </div>
              </div>
            </div>
          </div>
          <div className="justify-start items-center gap-2.5 inline-flex">
            <div className="justify-center items-center gap-4 inline-flex">
              <div className="grow shrink basis-0 justify-start items-start gap-2.5 flex">
                <div data-svg-wrapper className="relative">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 22H13C17.9706 22 22 17.9706 22 13C22 8.02944 17.9706 4 13 4C8.36745 4 4.49744 7.50005 4 12" stroke="#141B34" stroke-width="1.5" stroke-linecap="round" />
                    <path d="M18.5 5.5L19.5 4.5M5.5 4.5L6.5 5.5" stroke="#141B34" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M16.5 9L13.5607 11.9394M13.5607 11.9394C13.2892 11.6679 12.9142 11.5 12.5 11.5C11.6716 11.5 11 12.1716 11 13C11 13.8285 11.6716 14.5 12.5 14.5C13.3284 14.5 14 13.8285 14 13C14 12.5858 13.8321 12.2108 13.5607 11.9394Z" stroke="#141B34" stroke-width="1.5" stroke-linecap="round" />
                    <path d="M12.5 3.5V2" stroke="#141B34" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M10.5 2H14.5" stroke="#141B34" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M2 15H5" stroke="#141B34" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M2 19H7" stroke="#141B34" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                </div>
                {
                  project?.type === 'hourly' ?
                    <div className="grow shrink basis-0 flex-col justify-center items-start gap-1 inline-flex">
                      <div className="text-black text-base font-medium">${project.minHourlyRate} - ${project.maxHourlyRate}</div>
                      <div className="text-center text-gray-500 text-sm font-medium">Hourly</div>
                    </div> :
                    <div className="grow shrink basis-0 flex-col justify-center items-start gap-1 inline-flex">
                      <div className="text-black text-base font-medium">${project?.estimatedPrice}</div>
                      <div className="text-center text-gray-500 text-sm font-medium">Fixed</div>
                    </div>
                }
              </div>
            </div>
            <div className="h-[42px] justify-center items-center gap-4 inline-flex">
            </div>
            <div className="h-[42px] justify-center items-center gap-4 inline-flex">
            </div>
          </div>
        </div>
        <div className="p-6 border-b border-gray-200 flex-col justify-start items-start gap-2.5 inline-flex">
          <div className="justify-center items-center gap-4 inline-flex">
            <div className="text-center text-black text-base font-medium">Project Type: Ongoing project</div>
          </div>
        </div>
        <div className="p-6 border-b border-gray-200 flex-col justify-start items-start gap-2.5 inline-flex">
          <div className="justify-center items-center gap-4 inline-flex">
            <div className="text-black text-2xl font-medium">Skills and Expertise</div>
          </div>
          <div className="justify-center items-center gap-1 inline-flex">
            {
              project?.skills.length ? project.skills.map((skill, index) => {
                return (
                  <div key={`skill-${index}`} className="px-2 py-1 bg-gray-200 rounded-2xl justify-center items-center gap-2.5 flex overflow-hidden">
                    <div className="text-[#171718] text-sm font-medium">{skill}</div>
                  </div>
                )
              }) : ''
            }
          </div>
        </div>
        <div className="p-6 flex-col justify-start items-start gap-4 inline-flex">
          <div className="self-stretch justify-center items-center gap-4 inline-flex">
            <div className="grow shrink basis-0 text-black text-2xl font-medium">Activity on this job</div>
          </div>
          <div className="self-stretch flex-col justify-start items-start gap-3 flex">
            <div className="justify-center items-center gap-1 inline-flex">
              <div className="justify-center items-center gap-2.5 flex">
                <div className="text-black text-sm font-medium">Proposals:</div>
                <div className="text-black text-sm font-medium">{proposalCount}</div>
              </div>
            </div>
            <div className="justify-center items-center gap-2.5 inline-flex">
              <div className="text-black text-sm font-medium">Last viewed by client:</div>
              <div className="text-black text-sm font-medium">last week</div>
            </div>
            <div className="justify-center items-center gap-2.5 inline-flex">
              <div className="text-black text-sm font-medium">Interviewing:</div>
              <div className="text-black text-sm font-medium">0</div>
            </div>
            <div className="justify-center items-center gap-2.5 inline-flex">
              <div className="text-black text-sm font-medium">Invites sent:</div>
              <div className="text-black text-sm font-medium">1</div>
            </div>
            <div className="justify-center items-center gap-2.5 inline-flex">
              <div className="text-black text-sm font-medium">Unanswered invites:</div>
              <div className="text-black text-sm font-medium">0</div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-[360px] pl-9 py-6 border-l border-gray-200 flex-col justify-start items-start gap-6 inline-flex">
        <div className="self-stretch flex-col justify-center items-start gap-5 flex">
          <button className="justify-center items-center gap-2.5 inline-flex hover:text-green500 stroke-black hover:stroke-green500 transition-all">
            <div data-svg-wrapper className="relative">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.2141 5.98239L16.6158 4.58063C17.39 3.80646 18.6452 3.80646 19.4194 4.58063C20.1935 5.3548 20.1935 6.60998 19.4194 7.38415L18.0176 8.78591M15.2141 5.98239L6.98023 14.2163C5.93493 15.2616 5.41226 15.7842 5.05637 16.4211C4.70047 17.058 4.3424 18.5619 4 20C5.43809 19.6576 6.94199 19.2995 7.57889 18.9436C8.21579 18.5877 8.73844 18.0651 9.78375 17.0198L18.0176 8.78591M15.2141 5.98239L18.0176 8.78591" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M11 20H17" stroke-width="1.25" stroke-linecap="round" />
              </svg>
            </div>
            <div className="text-center text-base font-medium">Edit posting</div>
          </button>
          <button className="justify-center items-center gap-2.5 inline-flex hover:text-green500 stroke-black hover:stroke-green500 transition-all">
            <div data-svg-wrapper className="relative">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21.544 11.045C21.848 11.4713 22 11.6845 22 12C22 12.3155 21.848 12.5287 21.544 12.955C20.1779 14.8706 16.6892 19 12 19C7.31078 19 3.8221 14.8706 2.45604 12.955C2.15201 12.5287 2 12.3155 2 12C2 11.6845 2.15201 11.4713 2.45604 11.045C3.8221 9.12944 7.31078 5 12 5C16.6892 5 20.1779 9.12944 21.544 11.045Z" stroke-width="1.25" />
                <path d="M15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15C13.6569 15 15 13.6569 15 12Z" stroke-width="1.25" />
              </svg>
            </div>
            <div className="text-center text-base font-medium">View posting</div>
          </button>
          <button className="justify-center items-center gap-2.5 inline-flex hover:text-green500 stroke-black hover:stroke-green500 transition-all">
            <div data-svg-wrapper className="relative">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 7C2 5.59987 2 4.8998 2.27248 4.36502C2.51217 3.89462 2.89462 3.51217 3.36502 3.27248C3.8998 3 4.59987 3 6 3C7.40013 3 8.1002 3 8.63498 3.27248C9.10538 3.51217 9.48783 3.89462 9.72752 4.36502C10 4.8998 10 5.59987 10 7V17C10 18.4001 10 19.1002 9.72752 19.635C9.48783 20.1054 9.10538 20.4878 8.63498 20.7275C8.1002 21 7.40013 21 6 21C4.59987 21 3.8998 21 3.36502 20.7275C2.89462 20.4878 2.51217 20.1054 2.27248 19.635C2 19.1002 2 18.4001 2 17V7Z" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M6 17H6.00748" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M2 7H10" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M11.4486 8.26843C11.0937 6.93838 10.9163 6.27336 11.0385 5.69599C11.146 5.18812 11.4108 4.72747 11.7951 4.38005C12.2319 3.98508 12.8942 3.80689 14.2187 3.4505C15.5432 3.09412 16.2055 2.91593 16.7804 3.03865C17.2862 3.1466 17.7449 3.41256 18.0909 3.79841C18.4842 4.23706 18.6617 4.90209 19.0166 6.23213L21.5514 15.7316C21.9063 17.0616 22.0837 17.7266 21.9615 18.304C21.854 18.8119 21.5892 19.2725 21.2049 19.62C20.7681 20.0149 20.1058 20.1931 18.7813 20.5495C17.4568 20.9059 16.7945 21.0841 16.2196 20.9614C15.7138 20.8534 15.2551 20.5874 14.9091 20.2016C14.5158 19.7629 14.3383 19.0979 13.9834 17.7679L11.4486 8.26843Z" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M17.7812 16.6953L17.7885 16.6934" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M12 8.00019L18.5001 6" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </div>
            <div className="text-center text-base font-medium">Reuse posting</div>
          </button>
          <button className="justify-center items-center gap-2.5 inline-flex hover:text-green500 stroke-black hover:stroke-green500 transition-all">
            <div data-svg-wrapper className="relative">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19.001 5L5.00098 19M5.00098 5L19.001 19" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </div>
            <div className="text-center text-base font-medium">Remove posting</div>
          </button>
          <button className="justify-center items-center gap-2.5 inline-flex hover:text-green500 stroke-black hover:stroke-green500 transition-all">
            <div data-svg-wrapper className="relative">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19.439 15.439C20.3636 14.5212 21.0775 13.6091 21.544 12.955C21.848 12.5287 22 12.3155 22 12C22 11.6845 21.848 11.4713 21.544 11.045C20.1779 9.12944 16.6892 5 12 5C11.0922 5 10.2294 5.15476 9.41827 5.41827M6.74742 6.74742C4.73118 8.1072 3.24215 9.94266 2.45604 11.045C2.15201 11.4713 2 11.6845 2 12C2 12.3155 2.15201 12.5287 2.45604 12.955C3.8221 14.8706 7.31078 19 12 19C13.9908 19 15.7651 18.2557 17.2526 17.2526" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M9.85786 10C9.32783 10.53 9 11.2623 9 12.0711C9 13.6887 10.3113 15 11.9289 15C12.7377 15 13.47 14.6722 14 14.1421" stroke-width="1.25" stroke-linecap="round" />
                <path d="M3 3L21 21" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </div>
            <div className="text-center text-base font-medium">Make private</div>
          </button>
        </div>
        <div className="flex-col justify-start items-start gap-6 flex">
          <div className="flex-col justify-start items-start gap-2.5 flex">
            <div className="justify-center items-center gap-2.5 inline-flex">
              <div className="text-[#171718] text-2xl font-medium">About the client</div>
              <div data-svg-wrapper className="relative">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15.2141 5.98239L16.6158 4.58063C17.39 3.80646 18.6452 3.80646 19.4194 4.58063C20.1935 5.3548 20.1935 6.60998 19.4194 7.38415L18.0176 8.78591M15.2141 5.98239L6.98023 14.2163C5.93493 15.2616 5.41226 15.7842 5.05637 16.4211C4.70047 17.058 4.3424 18.5619 4 20C5.43809 19.6576 6.94199 19.2995 7.57889 18.9436C8.21579 18.5877 8.73844 18.0651 9.78375 17.0198L18.0176 8.78591M15.2141 5.98239L18.0176 8.78591" stroke="#171718" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M11 20H17" stroke="#171718" stroke-width="1.5" stroke-linecap="round" />
                </svg>
              </div>
            </div>
          </div>
          <div className="flex-col justify-start items-start gap-1 flex">
            <div className="text-gray-700 text-base font-medium">{getCountryName(project?.owner?.location ?? '')}</div>
            <div className="text-gray-700 text-base font-medium">6:51 PM</div>
          </div>
          <div className="flex-col justify-start items-start gap-1 flex">
            <div className="text-gray-700 text-base font-medium">1 job posted</div>
            <div className="text-gray-700 text-base font-medium">0% hire rate, 1 open job</div>
          </div>
        </div>
        <div className="py-4 flex-col justify-start items-start gap-1 flex">
          <div className="text-gray-700 text-base font-medium">Member since {formatDate(project?.owner.createdAt)}</div>
        </div>
        <div className="flex-col justify-start items-start gap-2.5 flex">
          <div className="flex-col justify-start items-start gap-2.5 flex">
            <div className="justify-center items-center gap-2.5 inline-flex">
              <div className="text-[#171718] text-2xl font-medium">Job link</div>
            </div>
          </div>
          <div className="flex-col justify-center items-start gap-2.5 flex">
            <div className="p-4 bg-gray-200 rounded justify-center items-center gap-2.5 inline-flex overflow-hidden">
              <div className="text-gray-700 text-base font-medium">https://www.upwork.com/jobs/24659...</div>
            </div>
            <button className="text-emerald-500 text-base font-medium hover:underline transition-all">Copy link</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
