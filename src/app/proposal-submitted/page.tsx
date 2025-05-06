import Header from "@/components/Header";
import SuccessMessage from "./success-message";

const ProposalSubmitted = () => {
  return (
    <main className="flex flex-col h-screen bg-gray100">
      <Header />

      <div className="flex flex-1 justify-center items-center">
        <SuccessMessage />
      </div>
    </main>
  );
};

export default ProposalSubmitted;
