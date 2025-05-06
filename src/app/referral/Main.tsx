import React from "react";

import Analytics from "./analytics";
import InviteLevel from "./invite-level";
import RewardMilestone from "./reward-milestone";
import ReferralHeader from "./referral-header";
// Main component
const Main = () => {
  return (
    <div className="bg-gray100 px-10 py-8 flex flex-col gap-5">
      <ReferralHeader />

      <RewardMilestone />

      <div className="flex gap-5 w-full">
        <InviteLevel />
        <Analytics />
      </div>
    </div>
  );
}

export default Main