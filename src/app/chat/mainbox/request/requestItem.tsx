import Image from "next/image";
import { useAtom } from "jotai";
import { chatMainBox } from "@/store/auth";

const RequestItem = () => {

  const [, setMainBox] = useAtom(chatMainBox);

  return (
    <div className="flex flex-col justify-start items-start self-stretch">
      <div className="inline-flex justify-start items-center gap-2.5 border-gray-100 p-2.5 border-t self-stretch">
        <Image
          width={32}
          height={32}
          alt="avatar"
          className="relative rounded-2xl"
          src="/image/avatar/avatar-1.png"
        />
        <div className="inline-flex flex-col justify-start items-start gap-1 basis-0 grow shrink">
          <div className="inline-flex justify-start items-center gap-1 self-stretch">
            <div className="w-[43px] font-medium text-[#171718] text-sm leading-[14px]">
              James
            </div>
            <div className="w-[89px] font-medium text-gray-500 text-sm leading-[14px]">
              james029190
            </div>
            <div className="font-medium text-gray-500 text-xs leading-3 basis-0 grow shrink">
              26d ago
            </div>
          </div>
          <div className="inline-flex justify-start items-center gap-1 self-stretch">
            <div className="flex justify-start items-center gap-1 h-2">
              <Image
                width={8}
                height={8}
                alt="server"
                className="rounded w-2 h-2"
                src="/image/chat/small_server1.gif"
              />
              <Image
                width={8}
                height={8}
                alt="server"
                className="rounded w-2 h-2"
                src="/image/chat/small_server2.png"
              />
            </div>
            <div className="font-medium text-[10px] text-gray-500 leading-[10px]">
              2 Mutual Servers
            </div>
          </div>
        </div>
        <button
          onClick={ () => setMainBox('dm') }
          className="flex justify-center items-center gap-2.5 bg-gray-500 px-2.5 py-2 rounded"
        >
          <div className="font-medium text-[10px] text-white leading-[10px]">
            Accept DM
          </div>
        </button>
        <button className="flex justify-center items-center gap-2.5 bg-red-500 px-2.5 py-2 rounded">
          <div className="font-medium text-[10px] text-white leading-[10px]">
            Report
          </div>
        </button>
      </div>
    </div>
  );
};

export default RequestItem;
