import { User } from "@/types";
import { useState } from "react";
import FindJobModal from "@/components/Modal/FindJobModal";
import TalentDetails from "../find-talent/talent-details";
import ProposalCard from "./ProposalCard";

const Hired = ({ users }: { users: User[] }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="bg-white rounded-xl">
      <div className="flex-1 flex flex-col">
        {users?.slice(0, 2).map((talent, index) => (
          <ProposalCard key={index} {...talent} openModal={openModal} />
        ))}

        <FindJobModal isOpen={isModalOpen} onClose={closeModal}>
          <TalentDetails />
        </FindJobModal>
      </div>
    </div>
  );
};

export default Hired;
