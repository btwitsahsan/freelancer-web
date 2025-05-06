import Header from "@/components/Header";
import { Icons } from "@/icons";
import Main from "./Main";

const Referral = () => {
  return (
    <main className="m-auto bg-gradient-to-l from-[#f2e2fa] to-[#f7faff] overflow-hidden">
      <Header />

      <div className="flex flex-col">
        <div className="flex gap-2 px-10 py-6 items-center">
          <Icons.referral width="32" height="32" />

          <span className="text-2xl  font-normal  text-black">
            Earn a{" "}
            <span className="text-context font-semibold">$25 bonus</span> on
            every client invite for a limited time
          </span>
        </div>

        <Main />
      </div>
    </main>
  );
};

export default Referral;
