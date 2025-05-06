import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Icons } from "@/icons";
import { useAtom } from "jotai";
import { DmlistUpdate, userAtom } from "@/store/auth";
import { requestAccept, requestCancel } from "@/utils/axios";
import { socket } from "@/utils/socketClient";
import { ObjectId } from "mongodb";

interface FriendItemProps {
  avatar: string;
  name: string;
  id: ObjectId; // Add id to identify the friend
  permission: boolean; // Optional: if you want to handle permissions
  status: string;
  reply: boolean;
  setReply: React.Dispatch<React.SetStateAction<boolean>>;
}

const FriendItem: React.FC<FriendItemProps> = ({
  avatar,
  name,
  permission,
  status,
  id,
  reply,
  setReply
}) => {

  const [drop, setDrop] = useState<boolean>(false);
  const [listNumber, setListNumber] = useAtom(DmlistUpdate);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [user] = useAtom(userAtom);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        drop
      ) {
        setDrop(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [drop]);

  const setAccept = async (requestId: ObjectId) => {

    try {
      if (user) {
        await requestAccept(requestId);
        socket.emit("accept-message-request", {
          fromUserId: user.uid,
          requestId: id
        })
        setReply(!reply);
        setListNumber(Math.random());
      }

    } catch (error) {
      console.error("Error accepting message request:", error);
    }
  };

  const setCancel = async (requestId: ObjectId) => {

    try {
      if (user) {
        socket.emit("cancel-message-request", {
          fromUserId: user.uid,
          requestId: id
        })
        await requestCancel(requestId);
        setReply(!reply);
        setListNumber(Math.random());
      }  

    } catch (error) {
      console.error("Error deleting message request:", error);
    }
  };

  return (
    <div className="inline-flex relative z-1 justify-start items-center gap-2.5 border-gray-100 p-2.5 border-t hover:cursor-pointer self-stretch">
      <Image
        className="relative rounded-2xl w-8 h-8"
        alt="avatar"
        width={32}
        height={32}
        src={avatar}
      />
      <div className="font-medium text-gray-500 text-sm leading-normal basis-0 grow shrink">
        {name}
      </div>

      {status === "pending" ? (
        permission ? (
          <button
            onClick={() => setAccept(id)}
            className="flex justify-center items-center gap-2.5 bg-gray-500 rounded-2xl w-7 h-7"
          >
            <Icons.checkmark />
          </button>
        ) : (
          <button
            onClick={() => setCancel(id)}
            className="flex justify-center items-center gap-2.5 bg-gray-500 rounded-2xl w-7 h-7"
          >
            <Icons.cancle_circle />
          </button>
        )
      ) : (
        <>
          
          <button
            onClick={() => setCancel(id)}
            className="flex justify-center items-center gap-2.5 bg-gray-500 rounded-2xl w-7 h-7"
          >
            <Icons.cancle_circle />
          </button>
          <button
            onClick={() => setDrop(!drop)}
            className="flex justify-center items-center gap-2.5 bg-gray-500 rounded-2xl w-7 h-7"
          >
            <Icons.dot_h_2 />
          </button>
        </>
      )}

      <div
        ref={dropdownRef}
        className={` ${
          !drop && "hidden"
        }  z-50 top-8 right-5 absolute flex-col justify-start items-start border-gray-100 bg-white p-2 border rounded-lg w-[130px] h-[65px] overflow-hidden`}
      >
        <div className="flex flex-col justify-start items-start bg-white h-[114px] overflow-hidden self-stretch">
          <button className="inline-flex justify-start items-center gap-2.5 hover:bg-gray-200 py-1.5 overflow-hidden self-stretch">
            <div className="font-normal text-gray-700 text-xs leading-none basis-0 grow shrink">
              Start Video Call
            </div>
          </button>
          <button className="inline-flex justify-start items-center gap-2.5 hover:bg-gray-200 py-1.5 overflow-hidden self-stretch">
            <div className="font-normal text-gray-700 text-xs leading-none basis-0 grow shrink">
              Start Audio Call
            </div>
          </button>
          {/* <div className="bg-gray-100 h-px self-stretch" />
          <button className="inline-flex justify-start items-center gap-2.5 hover:bg-gray-200 py-1.5 overflow-hidden self-stretch">
            <div className="font-normal text-red-600 text-xs leading-none basis-0 grow shrink">
              Remove Friend
            </div>
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default FriendItem;
