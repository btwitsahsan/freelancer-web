// src/components/TaskDetailModal/AttachedFilesSection.tsx
import React from "react";
import { IoCloseOutline } from "react-icons/io5";

interface AttachedFilesSectionProps {
  attachedFiles: File[];
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleRemoveFile: (index: number) => void;
}

const AttachedFilesSection: React.FC<AttachedFilesSectionProps> = ({
  attachedFiles,
  handleFileChange,
  handleRemoveFile,
}) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="font-medium leading-none">Attached Files</div>
      <div className="flex items-center w-full gap-4">
        <input
          type="file"
          multiple
          onChange={handleFileChange}
          className="text-sm"
        />
        <div className="flex gap-2">
          {attachedFiles.map((file, index) => (
            <div
              key={index}
              className="flex items-center justify-between border rounded-lg p-2"
            >
              <div className="whitespace-nowrap text-ellipsis overflow-hidden max-w-20">
                <strong>{file.name}</strong> (
                {(file.size / 1024).toFixed(2)} KB)
              </div>
              <button
                className="border border-gray400 rounded-full hover:shadow-lg transition-all"
                onClick={() => handleRemoveFile(index)}
              >
                <IoCloseOutline className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AttachedFilesSection;
