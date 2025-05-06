import React from "react";
import { Icons } from "@/icons";
import { useAtom } from "jotai";
import { toast } from "react-toastify";
import { chatSelectUserAtom } from "@/store/auth";

interface BlockModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BlockModal: React.FC<BlockModalProps> = ({ isOpen, onClose }) => {

  if (!isOpen) return null;
  const [selector, setSelector] = useAtom(chatSelectUserAtom);

  const sendBlock: () => void = () => {
      toast.success(`Block submitted for user`);
    };

  return (
    <div className="z-50 fixed inset-0 flex justify-center items-center">
      <div className="inline-flex flex-col justify-start items-center gap-8 bg-white shadow-[0px_20px_24px_-4px_rgba(16,24,40,0.08)] shadow-[0px_8px_8px_-4px_rgba(16,24,40,0.03)] p-6 rounded-xl w-[400px] h-[268px] overflow-hidden">
        <div className="flex flex-col justify-start items-start gap-5 h-36 self-stretch">
          <div className="inline-flex justify-center items-center border-8 bg-red-100 border-red-50 rounded-[28px] w-12 h-12">
            <Icons.alert_circle />
          </div>
          <div className="flex flex-col justify-start items-start gap-2 h-[76px] self-stretch">
            <div className="font-['Inter'] font-medium text-[#0f1728] text-lg leading-7 self-stretch">
              Block { selector.name }?
            </div>
            <div className="font-['Inter'] font-normal text-[#667084] text-sm leading-tight self-stretch">
              Are you sure you want to block [userid]? Blocking this user will
              also remove them from your friends list.
            </div>
          </div>
        </div>
        <div className="inline-flex justify-start items-start gap-3 self-stretch">
          <button
            onClick={onClose}
            className="flex justify-start items-start rounded-lg h-11 basis-0 grow shrink"
          >
            <div className="flex justify-center items-center gap-2 border-[#cfd4dc] bg-white shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] px-[18px] py-2.5 border rounded-lg h-11 overflow-hidden basis-0 grow shrink">
              <div className="font-['Inter'] font-medium text-[#344053] text-base leading-normal">
                Nevermind
              </div>
            </div>
          </button>
          <button
            onClick={ () => { onClose(); sendBlock(); } }
            className="flex justify-start items-start rounded-lg h-11 basis-0 grow shrink"
          >
            <div className="flex justify-center items-center gap-2 bg-red-500 shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] px-[18px] py-2.5 border border-red-500 rounded-lg h-11 overflow-hidden basis-0 grow shrink">
              <div className="font-['Inter'] font-medium text-base text-white leading-normal">
                Block
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlockModal;
