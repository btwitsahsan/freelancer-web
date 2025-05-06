import { atomWithStorage } from "jotai/utils";
import { User } from "firebase/auth";
import { atom } from "jotai";

interface ChatSelectUser {
  name: string;
  avatar: string;
  id: string;
  timezone: string;
  // news: number;
  // role: string;
  // phone: string;
}

interface ChatServer {
  type: string;
  id: string;
  name: string;
  imageUrl: string;
}

export const userAtom = atomWithStorage<User | null>("user", null);

export const ServerFlag = atomWithStorage<boolean>("ServerFlag", false);

export const chatServerAtom = atomWithStorage<ChatServer>("chatserver", {
  type: "dm",
  id: "0",
  name: "",
  imageUrl: ""
});

export const chatSelectUserAtom = atomWithStorage<ChatSelectUser>(
  "chatselecter",
  {
    name: "",
    avatar: "",
    id: "",
    // news: 0,
    // role: "",
    timezone: "",
  }
);

export const chatMainBox = atomWithStorage<string>("chatMainBox", "dm");

export const DmlistUpdate = atomWithStorage<number>("DmlistUpdate", 0);