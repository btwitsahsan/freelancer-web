// src/components/TaskDetailModal/ActivitySection.tsx
import React from "react";
import ActivityHeader from "./ActivityHeader";
import ActivityItem from "./ActivityItem";
import ActivityReply from "./ActivityReply";
import ActivitySidebar from "./ActivitySidebar";

const ActivitySection: React.FC = () => {
  return (
    <div className="flex w-[450px] bg-gray100">
      <div className="flex-1 flex flex-col border-r border-gray400">
        <ActivityHeader />
        <div className="flex flex-col gap-2 p-4 flex-1">
          <div className="flex-1 flex flex-col gap-2.5">
            <ActivityItem
              avatarUrl="/image/avatar/1.jpg"
              name="Brooklyn"
              message="we are 1 week away from launch! Thank you for every team member for their hard work."
              time="2 hours ago"
              likes={5}
            />
            <ActivityItem
              avatarUrl="/image/avatar/1.jpg"
              name="Brooklyn"
              message="we are 1 week away from launch! Thank you for every team member for their hard work."
              time="2 hours ago"
              likes={5}
            />
            <ActivityItem
              avatarUrl="/image/avatar/1.jpg"
              name="Brooklyn"
              message="we are 1 week away from launch! Thank you for every team member for their hard work."
              time="2 hours ago"
              likes={5}
            />
          </div>
          <ActivityReply />
        </div>
      </div>
      <ActivitySidebar />
    </div>
  );
};

export default ActivitySection;
