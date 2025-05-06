import Header from "@/components/Header";
import Main from "./main";

const Dashboard = () => {
  return (
    <main className="m-auto min-h-screen bg-gray100 overflow-hidden">
      <Header />

      <div className="flex flex-col pt-10">
        <Main />
      </div>
    </main>
  );
};

export default Dashboard;
