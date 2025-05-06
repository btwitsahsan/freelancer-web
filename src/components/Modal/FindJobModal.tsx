import React, { ReactElement, useRef, useEffect } from "react";
import { Icons } from "@/icons";

interface FindJobModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactElement<{ onClose?: () => void }>;
}

const FindJobModal: React.FC<FindJobModalProps> = ({
  isOpen,
  onClose,
  children,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div
      className={`fixed inset-0 w-full h-screen z-50 transition-all duration-300 ease-out ${
        isOpen ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
    >
      <div className="absolute inset-0 bg-[#17171819]" onClick={onClose}></div>

      <div
        ref={modalRef}
        className={`flex flex-col bg-white absolute h-full right-0 py-8 px-4 rounded-tl-lg shadow-lg max-w-[720px] mx-auto transform transition-all duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex">
          <button onClick={onClose}>
            <Icons.back className="cursor-pointer w-6" />
          </button>
        </div>

        {React.cloneElement(children, { onClose })}
      </div>
    </div>
  );
};

export default FindJobModal;
