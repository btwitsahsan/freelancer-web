import { User } from "@/types";
import TalentCard from "../../find-talent/TalentCard";
import { useState } from "react";
import FindJobModal from "@/components/Modal/FindJobModal";
import TalentDetails from "../../find-talent/talent-details";
import { Switch } from "@mui/material";

const InviteTalent = ({ users }: { users: User[] }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(1);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col gap-4 p-10">
      <div className="border-b border-gray-200 justify-start items-center gap-2.5 inline-flex">
        <button className="px-2 border-b-2 border-gray-700 justify-center items-center gap-2.5 flex">
          <div className="text-center text-gray-700 text-base font-semibold">Search</div>
        </button>
        <button className="px-2 justify-center items-center gap-2.5 flex">
          <div className="text-center text-gray-700 text-base font-semibold">Invited Freelancers</div>
        </button>
        <button className="px-2 justify-center items-center gap-2.5 flex">
          <div className="text-center text-gray-700 text-base font-semibold">My Hires</div>
        </button>
        <button className="px-2 justify-center items-center gap-2.5 flex">
          <div className="text-center text-gray-700 text-base font-semibold">Saved</div>
        </button>
      </div>

      <div className="flex-col justify-start items-start gap-2 inline-flex">
        <div className="self-stretch justify-start items-center gap-2.5 inline-flex">
          <div className="grow shrink basis-0 px-4 py-3 rounded-lg border border-gray-200 justify-start items-center gap-2.5 flex">
            <div data-svg-wrapper className="relative">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.667 11.666L14.667 14.666" stroke="#141B34" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M13.333 7.33398C13.333 4.02028 10.6467 1.33398 7.33301 1.33398C4.0193 1.33398 1.33301 4.02028 1.33301 7.33398C1.33301 10.6477 4.0193 13.334 7.33301 13.334C10.6467 13.334 13.333 10.6477 13.333 7.33398Z" stroke="#141B34" stroke-width="1.5" stroke-linejoin="round" />
              </svg>
            </div>
            <div className="text-center text-black text-base font-medium">Search</div>
          </div>
          <div className="justify-start items-center gap-1 flex">
            <Switch />
            <div className="text-center text-gray-700 text-sm font-medium">Available now</div>
          </div>
          <div className="px-2 py-2.5 rounded-lg border border-emerald-500 justify-center items-center gap-1 flex">
            <div data-svg-wrapper className="relative">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.5 5.83398H5" stroke="#10B981" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M2.5 14.166H7.5" stroke="#10B981" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M15 14.166H17.5" stroke="#10B981" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M12.5 5.83398H17.5" stroke="#10B981" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M5 5.83398C5 5.05742 5 4.66913 5.12687 4.36284C5.29602 3.95447 5.62048 3.63001 6.02886 3.46085C6.33515 3.33398 6.72343 3.33398 7.5 3.33398C8.27657 3.33398 8.66483 3.33398 8.97117 3.46085C9.3795 3.63001 9.704 3.95447 9.87317 4.36284C10 4.66913 10 5.05742 10 5.83398C10 6.61055 10 6.99883 9.87317 7.30513C9.704 7.7135 9.3795 8.03796 8.97117 8.20712C8.66483 8.33398 8.27657 8.33398 7.5 8.33398C6.72343 8.33398 6.33515 8.33398 6.02886 8.20712C5.62048 8.03796 5.29602 7.7135 5.12687 7.30513C5 6.99883 5 6.61055 5 5.83398Z" stroke="#10B981" stroke-width="1.5" />
                <path d="M10 14.166C10 13.3894 10 13.0012 10.1268 12.6948C10.296 12.2865 10.6205 11.962 11.0288 11.7928C11.3352 11.666 11.7234 11.666 12.5 11.666C13.2766 11.666 13.6648 11.666 13.9712 11.7928C14.3795 11.962 14.704 12.2865 14.8732 12.6948C15 13.0012 15 13.3894 15 14.166C15 14.9426 15 15.3308 14.8732 15.6372C14.704 16.0455 14.3795 16.37 13.9712 16.5392C13.6648 16.666 13.2766 16.666 12.5 16.666C11.7234 16.666 11.3352 16.666 11.0288 16.5392C10.6205 16.37 10.296 16.0455 10.1268 15.6372C10 15.3308 10 14.9426 10 14.166Z" stroke="#10B981" stroke-width="1.5" />
              </svg>
            </div>
            <div className="text-center text-emerald-500 text-sm font-medium">Filters</div>
          </div>
        </div>
        <div className="text-center text-emerald-500 text-base font-medium">Advanced search</div>
      </div>

      <div className="flex-1 flex flex-col">

        {users?.map((talent, index) => (
          <TalentCard key={index} {...talent} openModal={openModal} />
        ))}

        <FindJobModal isOpen={isModalOpen} onClose={closeModal}>
          <TalentDetails />
        </FindJobModal>
      </div>
    </div>
  );
};

export default InviteTalent;
