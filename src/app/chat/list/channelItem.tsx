import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Icons } from "@/icons";
// import { useAtom } from "jotai";
// import { chatMainBox } from "@/store/auth";
import InviteModel from "./inviteModel";

interface ChannelItemProps {
  item: string;
  key: number;
}

const ChannelItem: React.FC<ChannelItemProps> = ({ item }) => {
  const [drop, setDrop] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [inviteOpen, setInviteOpen] = useState<boolean>(false);

  const handleRightClick = (event: React.MouseEvent) => {
    event.preventDefault(); // Prevent the default context menu
    // setMessage("Right-click detected!");
    setDrop(!drop);
  };

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

  return (
    <div
      onContextMenu={handleRightClick}
      className="inline-flex relative justify-start items-start self-stretch gap-2.5 px-5 py-2"
    >
      <Icons.share_1 />
      <button className="font-['DM font-semibold text-gray-500 text-xl leading-normal Sans']">
        {item}
      </button>
      <div
        ref={dropdownRef}
        className={` ${
          !drop && "hidden"
        } top-5 right-5 z-50 absolute flex-col justify-start items-start border-gray-100 bg-white shadow-[0px_12px_16px_-4px_rgba(16,24,40,0.08)] shadow-[0px_4px_6px_-2px_rgba(16,24,40,0.03)] py-1 w-32 border rounded-lg overflow-hidden`}
      >
        <div className="flex flex-col justify-start items-start self-stretch bg-white h-[114px] overflow-hidden">
          <button
            onClick={() => {
              setDrop(false);
            }}
            className="inline-flex justify-start items-center self-stretch gap-2.5 px-2.5 py-2"
          >
            <div className="flex font-normal text-red-500 text-xs leading-none basis-0 grow shrink">
              Mark As Read
            </div>
          </button>
          <button
            onClick={() => {
              setDrop(false);
              setInviteOpen(true);
            }}
            className="inline-flex justify-start items-center self-stretch gap-2.5 px-2.5 py-2 overflow-hidden"
          >
            <div className="flex font-normal text-gray-700 text-xs leading-none basis-0 grow shrink">
              Invite people
            </div>
          </button>
          <div className="self-stretch bg-gray-100" />
          <button
            onClick={() => {
              setDrop(false);
            }}
            className="inline-flex justify-start items-center self-stretch gap-2.5 px-2.5 py-2"
          >
            <div className="flex font-normal text-xs leading-none basis-0 grow shrink">
              Copy Link
            </div>
          </button>
          <button
            onClick={() => {
              setDrop(false);
            }}
            className="inline-flex justify-start items-center self-stretch gap-2.5 px-2.5 py-2"
          >
            <div className="flex font-normal text-xs leading-none basis-0 grow shrink">
              Mute Channel
            </div>
          </button>
          <div className="self-stretch bg-gray-100 h-px" />
        </div>
      </div>
      <InviteModel isOpen={inviteOpen} onClose={() => setInviteOpen(false)} />
    </div>
  );
};

export default ChannelItem;
