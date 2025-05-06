import { User } from "@/types";
import { useState } from "react";
import FindJobModal from "@/components/Modal/FindJobModal";
import TalentDetails from "../../find-talent/talent-details";
import ProposalCard from "./ProposalCard";
import { ProposalType, UserType } from "@/utils/constant";

const ManageProposal = ({ proposals }: { proposals: ProposalType[] }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState<UserType | undefined>();

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="bg-white rounded-xl">
      <div className="flex-1 flex flex-col">
        {proposals?.map((proposal, index) => (
          <ProposalCard
            key={index}
            proposal={proposal}
            openModal={openModal}
            setUser={setUser}
          />
        ))}

        <FindJobModal isOpen={isModalOpen} onClose={closeModal}>
          <TalentDetails user={user} />
        </FindJobModal>
      </div>
    </div>
  );
};

export default ManageProposal;
