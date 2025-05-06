"use client";

import { Icons } from "@/icons";
import { FiRefreshCcw } from "react-icons/fi";
import { useState } from "react";
import {
  FaFileImage,
  FaFileVideo,
  FaFileAudio,
  FaFileAlt,
  FaFile,
} from "react-icons/fa";

const FilesList = () => {
  const [files, setFiles] = useState<File[]>([]);

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newFiles = Array.from(event.target.files);
      setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    }
  };

  const getFileTypeIcon = (fileName: string) => {
    const extension = fileName.split(".").pop()?.toLowerCase();

    switch (extension) {
      // Image file extensions
      case "jpg":
      case "jpeg":
      case "png":
      case "gif":
      case "bmp":
      case "svg":
      case "webp":
        return <FaFileImage className="w-5 h-5 text-blue-500" />;

      // Video file extensions
      case "mp4":
      case "avi":
      case "mov":
      case "mkv":
      case "flv":
      case "wmv":
      case "webm":
        return <FaFileVideo className="w-5 h-5 text-red-500" />;

      // Audio file extensions
      case "mp3":
      case "wav":
      case "ogg":
      case "flac":
      case "aac":
      case "m4a":
        return <FaFileAudio className="w-5 h-5 text-green-500" />;

      // Text and document file extensions
      case "txt":
      case "doc":
      case "docx":
      case "pdf":
      case "odt":
      case "rtf":
      case "tex":
      case "wpd":
        return <FaFileAlt className="w-5 h-5 text-yellow-500" />;

      // Default icon for other file types
      default:
        return <FaFile className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
    <div className="flex flex-col max-w-[340px]">
      <div className="p-5 gap-5 rounded-xl border border-gray400">
        <div className="flex items-center gap-2.5">
          <div className="flex-1 text-xl text-black">Recent files</div>
          <button className="flex items-center justify-center w-6 h-6 border border-gray400 rounded-full hover:bg-gray200 transition-all">
            <FiRefreshCcw className="w-3 h-3" />
          </button>
          <label className="px-2.5 py-1 text-sm border rounded-lg border-gray400 hover:bg-gray200 transition-all cursor-pointer">
            Upload
            <input
              type="file"
              multiple
              onChange={handleUpload}
              style={{ display: "none" }}
            />
          </label>
        </div>

        {files.length > 0 ? (
          <div className="mt-5">
            <ul className="flex flex-col list-disc pl-2 gap-4">
              {files.map((file, index) => (
                <li key={index} className="flex items-center gap-2">
                  {getFileTypeIcon(file.name)}
                  <div className="flex-1 text-context text-ellipsis overflow-hidden whitespace-nowrap">
                    {file.name}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <>
            <div className="flex justify-center">
              <Icons.folder />
            </div>
            <div className="text-sm text-context">
              Files shared in messages, work submissions, or as part of the
              requirements, will be shown here
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default FilesList;
