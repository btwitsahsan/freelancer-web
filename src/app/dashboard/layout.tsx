import React from "react";
import Header from "@/components/Header";
import MainBanner from "./main-banner";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <main className="m-auto min-h-screen bg-gray100 overflow-hidden">
      <div className="relative z-10">
        <Header />
      </div>

      <MainBanner />

      <div className="flex flex-col p-10">{children}</div>
    </main>
  );
};

export default Layout;
