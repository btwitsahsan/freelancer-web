import React from "react";
import Greeting from "./Greeting";
import Recents from "./Recents";
import MyWork from "./MyWork";
import AssignedComments from "./AssignedComments";
import Agenda from "./Agenda";
import AssignedToMe from "./AssignedToMe";

const Board: React.FC = () => {
  return (
    <div className="flex flex-col gap-6">
      <Greeting />
      <div className="w-full flex gap-4">
        {/* Left column */}
        <div className="basis-1/2 flex flex-col gap-4">
          <Recents />
          <MyWork />
          <AssignedComments />
        </div>
        {/* Right column */}
        <div className="basis-1/2 flex flex-col gap-4">
          <Agenda />
          <AssignedToMe />
        </div>
      </div>
    </div>
  );
};

export default Board;
