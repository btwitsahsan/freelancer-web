import Header from "@/components/Header";
import Main from "./Main";

const Balance = () => {
  return (
    <main className="m-auto bg-gradient-to-l from-[#f2e2fa] to-[#e8f1ff] overflow-hidden">
      <Header />

      <div className="flex flex-col gap-8 pt-8">
        <h1 className="text-3xl px-10 font-semibold">Membership Plan</h1>
        <Main />
      </div>
    </main>
  );
};

export default Balance;
