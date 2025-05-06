"use client";

import { useAtom } from "jotai";
import Header from "@/components/Header";
import ServerList from "./server/serverlist";
import Banner from "@/components/Banner";
import { chatServerAtom } from "@/store/auth";
import List from "./list/page";
import MainBox from "./mainbox/page";
import Community from "./community/page";
import { useEffect } from "react";
import { socket } from "@/utils/socketClient";
import { userAtom } from "@/store/auth";


const Chat = () => {

  const [server] = useAtom(chatServerAtom);
  const [user] = useAtom(userAtom);
  

  useEffect(() => {
    if (user) {
      socket.emit("register", user.uid);
    }
  }, [user])

  return (
    <main className="flex flex-col m-auto min-h-screen overflow-auto">

      <Header />

      <Banner title="message" />

      <div className="flex w-full">

        <ServerList />

        {
          server.type === 'community' ?
          <Community /> :
          <>
            <List />
            <MainBox />
          </>
        }

      </div>

    </main>
  );
};

export default Chat;
