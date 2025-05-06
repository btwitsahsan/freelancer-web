import type { PropsWithChildren } from "react";
import { stringOrDate } from "react-big-calendar";
import { BadgeType } from "@/utils/constant";

export interface ComponentProps extends PropsWithChildren {
  className?: string;
}

export interface UserType {
  fullName: string;
  email: string;
  userName: string;
  password: string;
}

export interface SignInUserType {
  email: string;
  password: string;
}

export interface ResetPassword {
  password: string;
  confirmPassword: string;
}

export interface Task {
  id: number;
  status: "DONE" | "CANCELLED" | "NOT_STARTED";
  type: string;
  task: string;
  assignee: {
    avatar: string;
    name: string;
  };
  dueDate: string;
  description: string;
}

export interface User {
  fullName: string;
  position: string;
  location: string;
  avatar: string;
  hourlyRate: number;
  job_success: number;
  earning: number;
  available: boolean;
  online: boolean;
  badge: BadgeType;
  skills: string[];
  description?: string;
}

export enum EventStatus {
  backlog = "backlog",
  upcoming = "upcoming",
  on_going = "ongoing",
  completed = "completed",
}

export interface EventType {
  title: string;
  desc?: string;
  allDay?: boolean;
  start: stringOrDate;
  end: stringOrDate;
  status: EventStatus
}