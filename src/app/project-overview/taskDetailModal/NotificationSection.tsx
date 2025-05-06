// src/components/TaskDetailModal/NotificationSection.tsx
import React from "react";
import { Switch } from "@mui/material";

interface NotificationSectionProps {
  notificationActive: boolean;
  handleNotificationChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const NotificationSection: React.FC<NotificationSectionProps> = ({
  notificationActive,
  handleNotificationChange,
}) => {
  return (
    <div className="flex items-center border border-gray400 rounded-lg p-2.5 gap-5">
      <div className="flex-1 flex flex-col gap-2">
        <div className="text-sm">Activate Notifications</div>
        <div className="text-sm text-context">
          Task reminder will be sent to task assignee and task creator
        </div>
      </div>
      <Switch
        checked={notificationActive}
        onChange={handleNotificationChange}
        size="medium"
      />
    </div>
  );
};

export default NotificationSection;
