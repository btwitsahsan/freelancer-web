import React from "react";
import { LineChart } from "@mui/x-charts/LineChart";

const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];

const ProfileStats = () => {
  return (
    <div className="w-[calc(100%+100px)] m-[-50px]">
      <LineChart
        height={240}
        series={[
          {
            data: uData,
            label: "Proposals",
            area: true,
            showMark: false,
          },
        ]}
        bottomAxis={null}
        leftAxis={null}
        slotProps={{
          legend: {
            hidden: true,
          },
        }}
      />
    </div>
  );
};

export default ProfileStats;
