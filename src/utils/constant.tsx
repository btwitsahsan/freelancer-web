export const locations = [
  { label: "United States", slug: "US" },
  { label: "Canada", slug: "CA" },
  { label: "Mexico", slug: "MX" },
];

export const getCountryName = (shortCode: string) => {
  const location = locations.find((loc) => loc.slug === shortCode);
  return location ? location.label : shortCode;
};

export enum BadgeType {
  TopRatedPlus = "top-rated-plus",
  TopRated = "top-rated",
  RisingTalent = "rising-talent",
}

export type UserType = {
  workHistory: any;
  jotTitle: string;
  description: string;
  portfolios: boolean;
  hourlyRate: number;
  _id?: string;
  avatar: string;
  fullName: string;
  email: string;
  userName: string;
  location: string;
  skills: any;
  uid: string;
  job_success: number;
  earning: number;
  available: boolean;
  online: boolean;
  badge: BadgeType;
  position: string;
};

export type ProjectType = {
  _id: string;
  title: string;
  company: string;
  owner: UserType;
  createdAt: string;
  minHourlyRate: string;
  maxHourlyRate: string;
  estimatedPrice: string;
  location: string;
  level: string;
  skills: string[];
  index: number;
  type: string;
};

export type ProposalType = {
  _id: string;
  project: ProjectType;
  user: UserType;
  coverLetter: string;
  price: number;
  status: string;
};

export type TmProjectType = {
  _id?: string;
  title?: string;
  isPrivate?: boolean;
  owner?: UserType;
  status?: string;
  slug?: string;
};

export type TmRoleType = {
  _id?: string;
  userId?: string;
  projectId?: string;
  role?: string;
};

export type TmRoleWithUserDataType = {
  _id?: string;
  user: UserType;
  projectId?: string;
  role?: string;
};
export type TmUserType = {
  _id: string;
  user: UserType;
  role: string;
};

export type TmTaskType = {
  _id?: string;
  name?: string;
  description?: string;
  creator?: string;
  project?: string;
  lead?: string;
  dueDate?: Date;
  priority?: string;
  assignee?: string;
  attachments?: string[];
  status?: string;
  isActive?: boolean;
};

export type TmTaskWithFullDataType = {
  _id?: string;
  name?: string;
  description?: string;
  creator?: string;
  project?: ProjectType;
  lead?: UserType;
  dueDate?: Date;
  priority?: string;
  assignee?: UserType;
  attachments?: string[];
  status?: string;
  isActive?: boolean;
};

export const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const formatDate = (dateValue: Date | string | undefined) => {
  if (!dateValue) return "No Due Date";
  const date = typeof dateValue === "string" ? new Date(dateValue) : dateValue;

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "2-digit",
  };

  const formattedDate = date.toLocaleDateString("en-US", options);
  return formattedDate;
};

export const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "Urgent":
      return "bg-[#FF0000] text-white";
    case "High":
      return "bg-[#FF5733] text-white";
    case "Medium":
      return "bg-[#FFD700] text-white";
    case "Low":
      return "bg-[#90EE90] text-white";
    default:
      return "bg-[#90EE90] text-white";
  }
};

export const priorities = ["Urgent", "High", "Medium", "Low"];
