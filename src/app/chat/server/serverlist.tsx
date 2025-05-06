"use client";
import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import Image from "next/image";
import { Icons } from "@/icons";
import { chatServerAtom, ServerFlag } from "@/store/auth";
import { getAllServer } from "@/utils/axios";
// import serverData from "../server.json";

const ServerList = () => {
  const [server, setServer] = useAtom(chatServerAtom);
  const [serverList, setServerList] = useState<
    Array<{ _id: string; imageUrl: string, type: string, name: string }>
  >([]);
  const [flag] = useAtom(ServerFlag);
  const handleServer = (type: string, ide: string, name: string, imageUrl: string) => {
    setServer({
      ...server, // Spread the existing chatServer state
      type, // Update only the type
      id: ide, // Ensure id is defined
      name,
      imageUrl
    });
  };

  useEffect(() => {
    const fetchServers = async () => {
      const response = await getAllServer();
      setServerList(response);
      console.log(response);
    };
    fetchServers();
  }, [flag]);

  return (
    <div className="flex flex-col w-20 !h-[80vh]">
      <div className="flex-col h-[72vh] overflow-y-auto hide-scrollbar">
        <button
          className={` ${
            server.type === "dm" && "border-[#288491] bg-gray-100"
          } flex justify-center items-center border-r-2 w-20 h-20 `}
          onClick={() => handleServer("dm", "0", "", "")}
        >
          <Image
            className="w-10 h-10"
            alt="Logo"
            width={40}
            height={40}
            src="/./image/logo.svg"
          />
        </button>

        <div className="flex justify-center py-1">
          <div className="border border-gray-100 w-14 h-[0px]"></div>
        </div>

        {serverList.map(
          (item: { _id: string; imageUrl: string, name:string }, key: number) => (
            <button
              key={key}
              className={` ${
                server.type === "server" &&
                item._id === server.id &&
                "border-[#288491] bg-gray-100"
              } inline-flex justify-center items-center  p-2 border-r-2 h-20 `}
              onClick={() => handleServer("server", item._id, item.name, item.imageUrl)}
            >
              <Image
                width={62}
                height={62}
                alt="server"
                className="self-stretch rounded basis-0 grow shrink"
                src="http://localhost:8000/uploads/1745892593618.jpg"
              />
            </button>
          )
        )}
      </div>

      <button
        onClick={() => handleServer("community", "0", "", "")}
        className={` ${
          server.type === "community" &&
          "bg-gray-100 border-r-2 border-[#288491]"
        } inline-flex justify-center items-center gap-2.5 py-2.5 w-20 !h-[8vh] p-2`}
      >
        <div className="flex justify-center items-center gap-2.5 bg-gray-100 rounded-lg w-10 h-10">
          <Icons.city_1 />
        </div>
      </button>
    </div>
  );
};

export default ServerList;