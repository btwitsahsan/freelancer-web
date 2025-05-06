import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import IgnoreModel from "./ignoreModel";
import BlockModel from "./blockModel";

const userItem = () => {

  const [drop, setDrop] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [ignore, setIgnore] = useState(false);
  const [block, setBlock] = useState(false);


  const handleRightClick = (event) => {
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
    <button 
      onContextMenu={handleRightClick}
      className="inline-flex relative justify-start items-center self-stretch gap-2.5 px-5 py-2.5">
      <div className="relative flex justify-start items-center gap-2.5 w-10 h-10">
        <Image
          width={40}
          height={40}
          alt="avatar"
          className="relative rounded-3xl h-10"
          src="/image/avatar/avatar-1.png"
        />
        <div className="top-8 right-0 absolute bg-emerald-500 border border-white rounded-full w-2 h-2" />
      </div>
      <div className="inline-flex flex-col justify-start items-start gap-1 basis-0 grow shrink">
        <div className="inline-flex justify-start items-center self-stretch gap-2">
          <div className="font-['DM font-semibold text-[#171718] text-base leading-normal Sans']">
            Ralph Edwards
          </div>
        </div>
      </div>

      <div
        ref={dropdownRef}
        className={` ${
          !drop && "hidden"
        } top-5 right-5 z-50 absolute flex-col justify-start items-start border-gray-100 bg-white shadow-[0px_12px_16px_-4px_rgba(16,24,40,0.08)] shadow-[0px_4px_6px_-2px_rgba(16,24,40,0.03)] py-1 w-32 border rounded-lg overflow-hidden`}
      >
        <div className="flex flex-col justify-start items-start self-stretch bg-white overflow-hidden">
          <button
            onClick={() => {
              setDrop(false);
            }}
            className="inline-flex justify-start items-center self-stretch gap-2.5 px-2.5 py-2"
          >
            <div className="flex font-normal text-red-500 text-xs leading-none basis-0 grow shrink">
              Profile
            </div>
          </button>
          <button
            onClick={() => {
              setDrop(false);
              // setInviteOpen(true);
            }}
            className="inline-flex justify-start items-center self-stretch gap-2.5 px-2.5 py-2 overflow-hidden"
          >
            <div className="flex font-normal text-gray-700 text-xs leading-none basis-0 grow shrink">
              Mention
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
              Message
            </div>
          </button>
          <button
            onClick={() => {
              setDrop(false);
            }}
            className="inline-flex justify-start items-center self-stretch gap-2.5 px-2.5 py-2"
          >
            <div className="flex font-normal text-xs leading-none basis-0 grow shrink">
              Call
            </div>
          </button>
          <button
            onClick={() => {
              setDrop(false);
            }}
            className="inline-flex justify-start items-center self-stretch gap-2.5 px-2.5 py-2"
          >
            <div className="flex font-normal text-xs leading-none basis-0 grow shrink">
              Mute
            </div>
          </button>
          <button
            onClick={() => {
              setDrop(false);
            }}
            className="inline-flex justify-start items-center self-stretch gap-2.5 px-2.5 py-2"
          >
            <div className="flex font-normal text-xs leading-none basis-0 grow shrink">
              Invite to Server
            </div>
          </button>
          <button
            onClick={() => {
              setDrop(false);
            }}
            className="inline-flex justify-start items-center self-stretch gap-2.5 px-2.5 py-2"
          >
            <div className="flex font-normal text-xs leading-none basis-0 grow shrink">
              Remove Friend
            </div>
          </button>
          <button
            onClick={() => {
              setDrop(false);
              setIgnore(true);
            }}
            className="inline-flex justify-start items-center self-stretch gap-2.5 px-2.5 py-2"
          >
            <div className="flex font-normal text-xs leading-none basis-0 grow shrink">
              Ignore
            </div>
          </button>
          <button
            onClick={() => {
              setBlock(true);
              setDrop(false);
            }}
            className="inline-flex justify-start items-center self-stretch gap-2.5 px-2.5 py-2"
          >
            <div className="flex font-normal text-xs leading-none basis-0 grow shrink">
              Block
            </div>
          </button>
          <div className="self-stretch bg-gray-100 h-px" />
        </div>
      </div>
      <IgnoreModel
        isOpen={ignore}
        onClose={() => setIgnore(false)}
      />
      <BlockModel
        isOpen={block}
        onClose={() => setBlock(false)}
      />
    </button>
  );
};

export default userItem;
