import { User } from "@/types";
import TalentCard from "../find-talent/TalentCard";
import { useState } from "react";
import FindJobModal from "@/components/Modal/FindJobModal";
import TalentDetails from "../find-talent/talent-details";

const InviteTalent = ({ users }: { users: User[] }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="bg-white rounded-xl py-5">
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
