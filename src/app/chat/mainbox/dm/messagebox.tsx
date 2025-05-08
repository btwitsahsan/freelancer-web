"use client";
import React from 'react';
import { useAtom } from "jotai";
import { TextField } from "@mui/material";
import { Icons } from "@/icons";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import SettingModel from "./setting";
import { chatSelectUserAtom, userAtom, DmlistUpdate } from "@/store/auth";
import { toast } from "react-toastify";
import { sendMessage, getMessage, newMsgInit } from "@/utils/axios";
import { formatDate } from "@/utils";
import {
  FaFilePdf,
  FaFileWord,
  FaFileArchive,
  FaFileAudio,
  FaFile,
  FaFileImage,
  FaFileVideo,
  FaFileExcel,
} from "react-icons/fa";
import TypingIndicator from "./TypingIndicator";
import { socket } from "@/utils/socketClient";

interface MessageBoxProps {
  sidebar: boolean;
  setSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}

interface TypingStatus {
  [userId: string]: boolean;
}

const MessageBox: React.FC<MessageBoxProps> = ({ sidebar, setSidebar }) => {
  const emojis = [
    "😀",
    "😂",
    "😍",
    "😎",
    "😭",
    "🤔",
    "🎉",
    "🔥",
    "👍",
    "❤️",
    "🥺",
    "😜",
    "😊",
    "🙃",
    "😋",
    "🥳",
    "😇",
    "😈",
    "🤩",
    "😱",
    "😅",
    "🥺",
    "💀",
    "👑",
    "🦄",
    "💯",
    "👏",
    "💋",
    "🤗",
    "🤭",
    "🤨",
    "🥶",
    "🥵",
    "🙄",
    "😌",
    "🤔",
    "🤫",
    "😏",
    "😝",
    "👻",
    "💖",
    "🧡",
    "💛",
    "💚",
    "💙",
    "💜",
    "🤍",
    "🤎",
    "🖤",
    "💙",
    "🍕",
    "🍔",
    "🍩",
    "🍪",
    "🥗",
    "🥑",
    "🥒",
    "🍎",
    "🍌",
    "🍓",
    "🍉",
    "🍇",
    "🥭",
    "🍍",
    "🥥",
    "🍉",
    "🍊",
    "🥝",
    "🍒",
    "🍓",
    "🍜",
    "🍱",
    "🍣",
    "🍛",
    "🍤",
    "🍚",
    "🍡",
    "🍧",
    "🍨",
    "🍪",
  ];

  let typingTimeout: NodeJS.Timeout;

  // const [isTyping, setIsTyping] = useState(false);
  const [message, setMessage] = useState<string>("");
  const [isSettingOpen, setIsSettingOpen] = useState(false);
  const [selector] = useAtom(chatSelectUserAtom);
  const [user] = useAtom(userAtom);
  const [showEmojis, setShowEmojis] = useState(false);
  const [messageList, setMessageList] = useState<Array<any>>([]); // State to hold messages
  const [typingStatus, setTypingStatus] = useState<TypingStatus>({});
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const [, setListNumber] = useAtom(DmlistUpdate);
  const API_URL = process.env.NEXT_PUBLIC_UPLOAD_URL;

  const getMessageList = async () => {
    if (user) {
      const response = await getMessage(selector.id, user.uid);
      setMessageList(response || []); // Set the messages or an empty array if none found
    }
  };

  const newMessageInit = async (sender: any, receiver: any) => {
    await newMsgInit(sender, receiver);
  };

  useEffect(() => {
    if (user) {
      socket.on(
        "typingStatus",
        (data: { senderId: string; isTyping: boolean }) => {
          if (data.senderId !== user.uid) {
            setTypingStatus((prev) => ({
              ...prev,
              [data.senderId]: data.isTyping,
            }));
          }
        }
      );

      socket.on("new Message", (data: { senderId: string }) => {
        getMessageList();
        setListNumber(Math.random());
      });

      return () => {
        socket.off("typingStatus");
        socket.off("new Message");
      };
    }
  }, [user]);

  useEffect(() => {
    getMessageList();
    newMessageInit(selector.id, user?.uid);
    setListNumber(Math.random());
  }, [selector]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messageList]);

  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<
    { type: string; url: string; name: string }[]
  >([]);

  const handleTyping = (event: any) => {
    if (user) {
      const typing = event.target.value.length > 0;
      // Emit typing event to the selected user
      socket.emit("typing", {
        senderId: user.uid,
        receiverId: selector.id,
        isTyping: true,
      });

      clearTimeout(typingTimeout);

      typingTimeout = setTimeout(() => {
        socket.emit("typing", {
          senderId: user.uid,
          receiverId: selector.id,
          isTyping: false,
        });
      }, 3000);

      // Update local typing state
      // setIsTyping(typing);
    }
    // alert("hello");
  };

  const handleKeyDown = async (event: any) => {
    if (event.key === "Enter" && event.shiftKey === false && user) {
      event.preventDefault();
      await handleUpload();
      getMessageList();
      setFiles([]);
      setMessage("");
      socket.emit("new Message", {
        senderId: user.uid,
        receiverId: selector.id,
      });
    }
  };

  const handleFileClick = () => {
    document.getElementById("fileInput")?.click();
  };

  const handleInsertEmoji = (emoji: string) => {
    if (inputRef.current) {
      const input = inputRef.current;

      // Ensure we are working with a <textarea> element that supports setSelectionRange
      if (input instanceof HTMLTextAreaElement) {
        const start = input.selectionStart;
        const end = input.selectionEnd;

        // Insert the emoji at the current cursor position
        const newText =
          message.substring(0, start) + emoji + message.substring(end);

        // Update the state with new text
        setMessage(newText);

        // Focus and move the cursor to the end of the inserted emoji
        setTimeout(() => {
          input.focus();
          input.setSelectionRange(start + emoji.length, start + emoji.length);
        }, 0);

        // Close the emoji picker
        setShowEmojis(false);
      }
    }
  };

  // Handle file selection
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files || []);
    if (selectedFiles.length > 10) {
      toast.error("You can only upload up to 10 files at a time.");
      return;
    }
    const newFiles = [...selectedFiles];

    const newPreviews = selectedFiles.map((file) => {
      if (file.type.startsWith("image/")) {
        return {
          type: "image",
          url: URL.createObjectURL(file),
          name: file.name,
        };
      } else if (file.type.startsWith("video/")) {
        return {
          type: "video",
          url: URL.createObjectURL(file),
          name: file.name,
        };
      } else {
        return { type: "file", url: "", name: file.name };
      }
    });

    setFiles(newFiles);
    setPreviews([...newPreviews]);
  };

  // Remove a selected file
  const handleRemoveFile = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index);
    const newPreviews = previews.filter((_, i) => i !== index);

    setFiles(newFiles);
    setPreviews(newPreviews);
  };

  const getFileIcon = (fileName: string) => {
    const ext = fileName.split(".").pop()?.toLowerCase();

    if (!ext) return <FaFile className="text-gray-500 text-4xl" />; // Unknown file

    const icons: { [key: string]: React.ReactElement } = {
      pdf: <FaFilePdf className="text-red-500 text-4xl" />,
      doc: <FaFileWord className="text-blue-500 text-4xl" />,
      docx: <FaFileWord className="text-blue-500 text-4xl" />,
      xls: <FaFileExcel className="text-green-500 text-4xl" />,
      xlsx: <FaFileExcel className="text-green-500 text-4xl" />,
      zip: <FaFileArchive className="text-yellow-500 text-4xl" />,
      rar: <FaFileArchive className="text-yellow-500 text-4xl" />,
      mp3: <FaFileAudio className="text-purple-500 text-4xl" />,
      wav: <FaFileAudio className="text-purple-500 text-4xl" />,
      mp4: <FaFileVideo className="text-green-500 text-4xl" />,
      avi: <FaFileVideo className="text-green-500 text-4xl" />,
      mov: <FaFileVideo className="text-green-500 text-4xl" />,
      gif: <FaFileVideo className="text-green-500 text-4xl" />,
      jpg: <FaFileImage className="text-green-500 text-4xl" />,
      jpeg: <FaFileImage className="text-green-500 text-4xl" />,
      png: <FaFileImage className="text-green-500 text-4xl" />,
      svg: <FaFileImage className="text-green-500 text-4xl" />,
    };

    return icons[ext] || <FaFile className="text-gray-500 text-4xl" />; // Default icon for unknown files
  };

  // Upload files to the server
  const handleUpload = async () => {
    const formData = new FormData();
    files.forEach((file) => formData.append("files", file));
    formData.append("message", message.trim() || ""); // Add message if it's not empty
    if (user) formData.append("senderId", user.uid); // Add sender ID
    formData.append("receiverId", selector.id); // Add receiver ID

    try {
      await sendMessage(formData);
      setFiles([]); // Clear files after upload
      setPreviews([]);
    } catch (error) {
      toast.error("Message transform is failed");
    }
  };

  const handleDownload = async (filename: string) => {
    const fileUrl = API_URL + filename;
    const response = await fetch(fileUrl);
    const blob = await response.blob();
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Cleanup blob URL
    URL.revokeObjectURL(link.href);
  };

  return (
    <div className="flex flex-col flex-1 w-150">
      <div className="flex justify-start items-center self-stretch gap-3 bg-white p-5 border-[#f3f3f3] border-b overflow-hidden">
        <Image
          width={48}
          height={48}
          alt="user"
          className="relative rounded-3xl"
          src={selector.avatar}
        />
        <div className="inline-flex flex-col justify-start items-start gap-1 basis-0 grow shrink">
          <div className="self-stretch font-semibold text-[#202226] text-base leading-normal tracking-tight">
            {selector.name}
          </div>
          <div className="font-medium text-emerald-500 text-xs leading-[18px] tracking-wide">
            Online
          </div>
        </div>
        <div className="flex justify-start items-center gap-4">
          <button className="flex justify-center items-center bg-white shadow-[0px_8px_16px_0px_rgba(93,106,131,0.02)] p-2.5 border border-gray-200 rounded-full w-10 h-10 overflow-hidden">
            <Icons.video />
          </button>
          <button className="flex justify-center items-center bg-white shadow-[0px_8px_16px_0px_rgba(93,106,131,0.02)] p-2.5 border border-gray-200 rounded-full w-10 h-10 overflow-hidden">
            <Icons.call />
          </button>
          <button className="flex justify-center items-center bg-white shadow-[0px_8px_16px_0px_rgba(93,106,131,0.02)] p-2.5 border border-gray-200 rounded-full w-10 h-10 overflow-hidden">
            <Icons.translate />
          </button>
          {/* <button
            onClick={() => setIsSettingOpen(true)}
            className="flex justify-center items-center bg-white shadow-[0px_8px_16px_0px_rgba(93,106,131,0.02)] p-2.5 border border-gray-200 rounded-full w-10 h-10 overflow-hidden"
          >
            <Icons.settings />
          </button> */}
          <button
            onClick={() => {
              setSidebar(!sidebar);
            }}
            className="flex justify-center items-center bg-white shadow-[0px_8px_16px_0px_rgba(93,106,131,0.02)] p-2.5 border border-gray-200 rounded-full w-10 h-10 overflow-hidden"
          >
            <Icons.sidebar />
          </button>
        </div>
      </div>

      <div className="flex-col justify-end items-center self-stretch gap-2.5 bg-gray-100 mb-4 p-5 h-[60vh] overflow-auto hide-scrollbar basis-0 grow">
        {messageList.length > 0 &&
          user &&
          messageList.map((msg, index) =>
            msg.senderId === user?.uid ? (
              <div
                className="flex justify-start items-start self-stretch gap-2 my-2"
                key={index}
              >
                {user?.photoURL && (
                  <Image
                    className="relative rounded-3xl"
                    width={48}
                    height={48}
                    alt="user"
                    src={user.photoURL}
                  />
                )}

                <div className="inline-flex flex-col justify-start items-start gap-1 basis-0 grow shrink">
                  <div className="inline-flex justify-start items-center self-stretch gap-2">
                    <div className="font-bold text-[#041925] text-xs leading-none">
                      {user.displayName}
                    </div>
                    <div className="font-medium text-[#838e9c] text-[10px] tracking-tight">
                      {formatDate(msg.timestamp)}
                    </div>
                    {/* <button>
                      <Icons.readreciept />
                    </button> */}
                  </div>
                  <div className="inline-flex justify-start items-start self-stretch gap-2.5 p-2.5 rounded-tr-2xl rounded-bl-2xl rounded-br-2xl overflow-hidden text-bold">
                    <div className="inline-flex flex-col justify-center items-end gap-1 basis-0 grow shrink">
                      <div
                        className="self-stretch font-medium text-[#041925] text-xs leading-tight tracking-tight"
                        style={{ whiteSpace: "pre-line" }}
                      >
                        {msg.message}
                      </div>

                      {msg.files &&
                        msg.files.length > 0 &&
                        msg.files.map((file, fileIndex) => (
                          <div
                            className="flex flex-col justify-start items-start self-stretch gap-2.5 h-16"
                            key={fileIndex}
                          >
                            <div className="inline-flex justify-start items-center gap-2.5 bg-[#dce8f6] p-2.5 border rounded-xl h-20">
                              {getFileIcon(file)}
                              <div className="inline-flex flex-col justify-start items-start gap-2">
                                <div className="self-stretch font-bold text-[#041925] text-xs leading-none">
                                  {file}
                                </div>
                              </div>
                              <div className="flex justify-center items-center gap-2.5 bg-white px-0.5 py-2 border rounded-[10px] w-[36.47px] h-10">
                                <div className="relative w-6 h-6 overflow-hidden">
                                  <button onClick={() => handleDownload(file)}>
                                    <Icons.download />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              msg.senderId === selector.id && (
                <div
                  className="flex justify-start items-start self-stretch gap-2 my-2"
                  key={index}
                >
                  <Image
                    className="relative rounded-3xl"
                    width={48}
                    height={48}
                    alt="user"
                    src={selector.avatar}
                  />
                  <div className="inline-flex flex-col justify-start items-start gap-1 basis-0 grow shrink">
                    <div className="inline-flex justify-start items-center self-stretch gap-2">
                      <div className="font-bold text-[#041925] text-xs leading-none">
                        {selector.name}
                      </div>
                      <div className="font-medium text-[#838e9c] text-[10px] tracking-tight">
                        {formatDate(msg.timestamp)}
                      </div>
                      {/* <button>
                        <Icons.readreciept />
                      </button> */}
                    </div>
                    <div className="inline-flex justify-start items-start self-stretch gap-2.5 p-2.5 rounded-tr-2xl rounded-bl-2xl rounded-br-2xl overflow-hidden text-bold">
                      <div className="inline-flex flex-col justify-center items-end gap-1 basis-0 grow shrink">
                        <div
                          className="self-stretch font-medium text-[#041925] text-xs leading-tight tracking-tight"
                          style={{ whiteSpace: "pre-line" }}
                        >
                          {msg.message}
                        </div>

                        {msg.files &&
                          msg.files.length > 0 &&
                          msg.files.map((file, fileIndex) => (
                            <div
                              className="flex flex-col justify-start items-start self-stretch gap-2.5 h-16"
                              key={fileIndex}
                            >
                              <div className="inline-flex justify-start items-center gap-2.5 bg-[#dce8f6] p-2.5 border rounded-xl h-20">
                                {getFileIcon(file)}
                                <div className="inline-flex flex-col justify-start items-start gap-2">
                                  <div className="self-stretch font-bold text-[#041925] text-xs leading-none">
                                    {file}
                                  </div>
                                </div>
                                <div className="flex justify-center items-center gap-2.5 bg-white px-0.5 py-2 border rounded-[10px] w-[36.47px] h-10">
                                  <div className="relative w-6 h-6 overflow-hidden">
                                    <button
                                      onClick={() => handleDownload(file)}
                                    >
                                      <Icons.download />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                </div>
              )
            )
          )}
        <div ref={messagesEndRef} />
      </div>

      <div className="flex flex-col justify-start items-start self-stretch gap-2 bg-white mb-2.5 px-5 w-full">
        {/* <div className="flex justify-start items-start self-stretch gap-2 my-1">
            <TypingIndicator avatarUrl={selector.avatar} name={selector.name} />
          </div> */}

        {typingStatus[selector.id] && (
          <div className="flex justify-start items-start self-stretch gap-2 my-1">
            <TypingIndicator avatarUrl={selector.avatar} name={selector.name} />
          </div>
        )}

        <div className="inline-flex items-start self-stretch bg-gray-100 px-3 py-1 rounded-lg relative">
          <div className="flex justify-start items-center pt-2">
            <button onClick={() => setShowEmojis(!showEmojis)}>
              <Icons.smile />
            </button>
          </div>
          <div className="flex-1 bg-gray-100 border-gray-200 rounded-lg">
            {/* Preview Section */}
            {previews.length > 0 && (
              <div className="flex gap-4 p-[14px] border-b border-gray-300 max-w-[630px] overflow-x-auto">
                {previews.map((file, index) => (
                  <div
                    key={index}
                    className="relative border p-2 rounded-lg bg-gray-100 w-40"
                  >
                    {file.type === "image" ? (
                      <>
                        <Image
                          src={file.url}
                          alt={file.name}
                          width={96}
                          height={48}
                          className="w-24 h-12 object-cover rounded"
                        />
                        <div className="flex items-center space-x-2 w-36 pt-1">
                          <span className="text-gray-700 truncate">
                            {file.name}
                          </span>
                        </div>
                      </>
                    ) : file.type === "video" ? (
                      <>
                        <video src={file.url} className="w-24 h-12 rounded" />
                        <div className="flex items-center space-x-2 w-36 pt-1">
                          <span className="text-gray-700 truncate">
                            {file.name}
                          </span>
                        </div>
                      </>
                    ) : (
                      <>
                        {getFileIcon(file.name)}
                        <div className="flex items-center space-x-2 w-36 pt-4">
                          <span className="text-gray-700 truncate">
                            {file.name}
                          </span>
                        </div>
                      </>
                    )}

                    <button
                      onClick={() => handleRemoveFile(index)}
                      className="absolute top-1 right-1 bg-green-500 text-white px-2 py-1 text-xs rounded"
                    >
                      X
                    </button>
                  </div>
                ))}
              </div>
            )}

            <TextField
              variant="outlined"
              size="small"
              multiline
              placeholder="Send your message..."
              inputRef={inputRef}
              value={message}
              onChange={(e) => {
                handleTyping(e); // <- use the local e, not the global event
                setMessage(e.target.value);
              }}
              onKeyDown={handleKeyDown}
              color="success"
              sx={{
                width: "640px",
                "& .MuiOutlinedInput-root": {
                  fontSize: "14px",
                  borderRadius: "10px",
                  borderColor: "var(--gray-200) !important",
                },
                ".Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "var(--green-500)",
                },
                "& fieldset": { border: "none" },
                "&:hover fieldset, &:focus fieldset": { border: "none" },
              }}
            />
          </div>
          <div className="flex justify-end pt-2 align-end">
            {/* <button onClick={handleFileClick} id="gallery">
              <Icons.gallery />
            </button> */}
            <input
              type="file"
              id="fileInput"
              multiple
              onChange={handleFileChange}
              className="hidden"
            />
            <button onClick={handleFileClick} className="ml-4">
              <Icons.attach />
            </button>

            <input
              type="file"
              id="fileInput"
              className="hidden"
              onChange={handleFileChange}
            />

            {/* <button className="ml-4">
              <Icons.location_2 />
            </button> */}
          </div>
          {showEmojis && (
            <div className="top-[-180px] absolute gap-2 grid grid-cols-5 bg-white shadow-md p-2 border rounded-lg max-h-48 overflow-y-auto hide-scrollbar">
              {emojis.map((emoji) => (
                <button
                  key={emoji}
                  onClick={() => handleInsertEmoji(emoji)}
                  className="hover:bg-gray-200 p-1 rounded text-xl"
                >
                  {emoji}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <SettingModel
        isOpen={isSettingOpen}
        onClose={() => setIsSettingOpen(false)}
      />
    </div>
  );
};

export default MessageBox;
