"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Icons } from "@/icons";
import { useAtom } from "jotai";
import { chatMainBox, DmlistUpdate } from "@/store/auth";
import { addMessageRequest, getFriendRequest } from "@/utils/axios";
import { userAtom } from "@/store/auth";
import { toast } from "react-toastify";
import { socket } from "@/utils/socketClient";

import {
  InputAdornment,
  Checkbox,
  FormControlLabel,
  TextField,
} from "@mui/material";

import FriendItem from "./friendItem";

const ChatFriend = () => {
  const [cat, setCat] = useState<string>("all");
  const [bubble, setBubble] = useState<boolean>(false);
  const [allRequest, setAllRequest] = useState<Array<any>>([]);
  const [listNumber, setListNumber] = useAtom(DmlistUpdate);
  const [, setMainBox] = useAtom(chatMainBox);
  const [friendEmail, setFriendEmail] = useState<string>("");
  const [user] = useAtom(userAtom);
  const bubbleRef = useRef<HTMLDivElement>(null);
  const [reply, setReply] = useState(false);

  const getRequest = async () => {
    if (user) {
      const response = await getFriendRequest(user.uid);
      setAllRequest(response);
    }
  };

  useEffect(() => {
    getRequest();
  }, [reply]);

  useEffect(() => {

    if (user) { 

      socket.on("message-request-received", (data) => {
        toast.success(`${data.message} from ${data.fromUserName}`);
        getRequest();
      });

      socket.on("accept-message-request", (data) => {
        toast.success(data.fromUser + " " + data.message);
        getRequest();
        setListNumber(Math.random());
      });

      socket.on("cancel-message-request", (data) => {
        toast.success(data.fromUser + " " + data.message);
        getRequest();
        setListNumber(Math.random());
      });
      
    }
    return () => {
      socket.off("message-request-received");
      socket.off("accept-message-request");
      socket.off("cancel-message-request");
    };
  }, [])

  const handleFriendRequest = () => {
    if (user) {
      const sendMessageRequest = async () => {
        try {
          const status = await addMessageRequest(user.uid, friendEmail);
          if (status) {
            getRequest();
            socket.emit("send-message-request", {
              toUserId: friendEmail,
              fromUserId: user.uid,
            });
          }
        } catch (error) {
          toast.error(error instanceof Error ? error.message : String(error));
        }
      };
      sendMessageRequest();
    } else {
      toast.error("user is null. Cannot send message request.");
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        bubbleRef.current &&
        !bubbleRef.current.contains(event.target as Node) &&
        bubble
      )
        setBubble(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [bubble]);

  return (
    <div className="inline-flex flex-col justify-start items-end bg-gray-100 flex-1">
      <div className="inline-flex justify-start items-center self-stretch gap-3 bg-white p-2.5 border-[#f3f3f3] border-b overflow-hidden">
        <Icons.user />
        <div className="font-semibold text-black text-base leading-normal">
          Message Requests
        </div>
        <div className="flex justify-start items-center gap-2.5 h-7 basis-0 grow shrink">
          {/* <button
                onClick={() => setCat("online")}
                className={`${
                  cat === "online" && "bg-gray-200"
                } flex justify-center items-center gap-2.5 p-5 h-6`}
              >
                <div className="font-normal text-gray-400 text-base text-center leading-normal basis-0 grow shrink">
                  Online
                </div>
              </button> */}

          <button
            onClick={() => setCat("all")}
            className={`${
              cat === "all" && "bg-gray-200"
            } flex justify-center items-center gap-2.5 p-5 h-6`}
          >
            <div className="font-normal text-gray-400 text-base text-center leading-normal basis-0 grow shrink">
              All
            </div>
          </button>

          <button
            onClick={() => setCat("pending")}
            className={`${
              cat === "pending" && "bg-gray-200"
            } flex justify-center items-center gap-2.5 p-5 h-6`}
          >
            <div className="font-normal text-gray-400 text-base text-center leading-normal basis-0 grow shrink">
              Pending
            </div>
          </button>

          {/* <button
                onClick={() => setCat("blocked")}
                className={`${
                  cat === "blocked" && "bg-gray-200"
                } flex justify-center items-center gap-2.5 p-5 h-6`}
              >
                <div className="font-normal text-gray-400 text-base text-center leading-normal basis-0 grow shrink">
                  Blocked
                </div>
              </button> */}

          <button
            onClick={() => setCat("add")}
            className={` ${
              cat !== "add" && "bg-emerald-500"
            } flex justify-center items-center gap-2.5  mx-5 px-2 py-1.5 rounded`}
          >
            <div
              className={` ${
                cat == "add" ? "text-emerald-500" : "text-white"
              } font-normal text-base leading-none`}
            >
              Add New
            </div>
          </button>
        </div>
        {/* <button onClick={() => setBubble(!bubble)}>
          <Icons.bubble_chat_Add />
        </button> */}

        <div
          ref={bubbleRef}
          className={` ${
            !bubble && "hidden"
          } inline-flex top-[204px] right-[50px] absolute absolute flex-col justify-start items-start gap-1 border-gray-100 bg-white shadow-[0px_12px_16px_-4px_rgba(16,24,40,0.08)] shadow-[0px_4px_6px_-2px_rgba(16,24,40,0.03)] py-2.5 border rounded-lg w-[250px] overflow-hidden`}
        >
          <div className="flex flex-col justify-start items-start self-stretch gap-1">
            <div className="flex flex-col justify-start items-start self-stretch px-2.5 pb-2">
              <div className="font-normal text-gray-700 text-s text-center leading-3">
                Select Friends
              </div>
            </div>
            <div className="inline-flex justify-start items-start self-stretch gap-2.5 px-2.5 py-2">
              <div className="font-normal text-[14px] text-gray-700 leading-[8px] basis-0 grow shrink">
                You can add 9 more friends
              </div>
            </div>
          </div>

          <div className="flex flex-col self-stretch gap-2.5 px-2 py-1">
            <TextField
              variant="outlined"
              size="small"
              fullWidth
              placeholder="Type the username of a friend"
              color="success"
              sx={{
                "& .MuiOutlinedInput-root": {
                  fontSize: "14px",
                  borderRadius: "10px",
                  borderColor: "var(--gray-200) !important",
                },
                ".Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "var(--green-500)",
                },
              }}
            />
          </div>

          <div className="flex flex-col self-stretch gap-2.5 px-2 py-1">
            <FormControlLabel
              value="you"
              control={<Checkbox />}
              label={
                <div className="relative flex gap-2.5">
                  <Image
                    src="/image/avatar/avatar-1.png"
                    alt="Avatar"
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                  <div className="absolute bg-emerald-500 mt-6 ml-7 border border-white rounded-full w-2 h-2" />
                  <span className="mt-1">Raymond Wu</span>
                </div>
              }
              sx={{
                ".Mui-checked": {
                  color: "var(--green-500) !important",
                },
              }}
            />

            <FormControlLabel
              value="you"
              control={<Checkbox />}
              label={
                <div className="flex gap-2.5">
                  <Image
                    src="/image/avatar/avatar-2.png"
                    alt="Avatar"
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                  <div className="absolute bg-emerald-500 mt-6 ml-7 border border-white rounded-full w-2 h-2" />
                  <span className="mt-1">Raymond Wu</span>
                </div>
              }
              sx={{
                ".Mui-checked": {
                  color: "var(--green-500) !important",
                },
              }}
            />

            <FormControlLabel
              value="you"
              control={<Checkbox />}
              label={
                <div className="flex gap-2.5">
                  <Image
                    src="/image/avatar/avatar-3.png"
                    alt="Avatar"
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                  <div className="absolute bg-emerald-500 mt-6 ml-7 border border-white rounded-full w-2 h-2" />
                  <span className="mt-1">Raymond Wu</span>
                </div>
              }
              sx={{
                ".Mui-checked": {
                  color: "var(--green-500) !important",
                },
              }}
            />
          </div>

          <button
            onClick={() => setMainBox("dm")}
            className="inline-flex justify-between items-center self-stretch px-2.5"
          >
            <div className="flex justify-center items-center bg-gradient-to-r from-[#198bd8] to-[#f03dce] px-2.5 py-1.5 rounded-lg h-10 basis-0 grow shrink">
              <div className="font-normal text-s text-white text-center">
                Create DM
              </div>
            </div>
          </button>
        </div>
      </div>

      <div className="inline-flex justify-start items-start self-stretch">
        {cat === "add" ? (
          <div className="flex-col grow">
            <div className="flex-col justify-center items-start gap-3 bg-white p-5 border-[#f3f3f3] border-b h-[152px] overflow-hidden basis-0 shrink">
              <div className="font-semibold text-black text-base leading-tight">
                ADD New User
              </div>
              <div className="py-3 font-normal text-black text-xs leading-3">
                You can add new users with their username.
              </div>
              <div className="flex flex-col justify-start items-start self-stretch gap-2 bg-white h-[46px]">
                <div className="inline-flex justify-start items-center self-stretch gap-2.5 bg-gray-100 px-2.5 py-2 rounded-lg">
                  <TextField
                    variant="outlined"
                    sx={{
                      "& fieldset": { border: "none" },
                      "&:hover fieldset, &:focus fieldset": {
                        border: "none",
                      },
                    }}
                    value={friendEmail}
                    onChange={(e) => setFriendEmail(e.target.value)}
                    size="small"
                    placeholder="Type the username"
                    color="success"
                    style={{ flex: 1 }}
                  />

                  <button
                    onClick={handleFriendRequest}
                    className="flex justify-center items-center gap-2.5 bg-emerald-500 p-2.5 rounded overflow-hidden"
                  >
                    <div className="font-medium text-white text-sm leading-normal">
                      Send Message Request
                    </div>
                  </button>
                </div>
              </div>
            </div>

            <div className="flex-col justify-start items-start gap-3 bg-white p-5 border-[#f3f3f3] border-b h-[400px] overflow-hidden">
              <div className="pb-3 font-semibold text-black text-base leading-tight">
                OTHER PLACES TO MAKE FRIENDS
              </div>
              <button className="inline-flex justify-start items-center gap-2.5 bg-gray-100 p-2 border border-gray-100 rounded-xl">
                <div className="flex justify-center items-center gap-2.5 bg-emerald-500 rounded-lg w-10 h-10">
                  <Icons.city_1_white />
                </div>
                <div className="font-medium text-gray-400 text-base leading-tight">
                  Explore Discoverable Servers
                </div>
              </button>
            </div>
          </div>
        ) : (
          <div className="inline-flex flex-col justify-start items-start basis-0 grow shrink">
            {/* <div className="flex flex-col justify-start items-start self-stretch gap-2.5 h-[52px]">
              <div className="flex flex-col justify-start items-start self-stretch gap-2 bg-white px-5 py-2.5 h-[52px]">
                <TextField
                  variant="outlined"
                  size="small"
                  fullWidth
                  placeholder="Search..."
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Icons.search />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      fontSize: "14px",
                      borderRadius: "10px",
                      borderColor: "var(--gray-200) !important",
                    },
                    ".Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "var(--green-500)",
                    },
                    backgroundColor: "gray-400",
                  }}
                />
              </div>
            </div> */}
            {/* {cat === "online" && (
                  <div className="flex flex-col justify-start items-start self-stretch gap-2 bg-white px-5 py-2.5 h-[500px]">
                    <div className="w-[624px] h-2.5 font-medium text-gray-400 text-sm leading-normal">
                      Online
                    </div>
                    <div className="flex flex-col justify-start items-start self-stretch h-[400px]">

                    { 
                      allRequest &&
                        allRequest.map((item, index) => (
                          <FriendItem
                            key={index}
                            avatar={item.requester.avatar}
                            name={item.requester.fullName}
                          />
                      ))
                    }
                      
                    </div>
                  </div>
                )} */}

            {cat === "all" && (
              <div className="flex flex-col justify-start items-start self-stretch gap-2 bg-white px-5 py-2.5">
                <div className="font-medium text-gray-400 text-sm leading-normal">
                  All
                </div>
                <div className="flex flex-col justify-start items-start self-stretch">
                  {allRequest.map((item, index) => {
                    if (user && item.requester.uid === user.uid) {
                      return (
                        <FriendItem
                          key={index}
                          id={item._id}
                          status={item.status}
                          permission={false}
                          avatar={item.recipient.avatar}
                          name={item.recipient.fullName}
                          reply={reply}
                          setReply={setReply}
                        />
                      )
                    } else {
                      return (
                        <FriendItem
                          key={index}
                          id={item._id} 
                          status={item.status}
                          permission={true}
                          avatar={item.requester.avatar}
                          name={item.requester.fullName}
                          reply={reply}
                          setReply={setReply}
                        />
                      );
                    }
                  })}
                </div>
              </div>
            )}

            {cat === "pending" && (
              <div className="flex flex-col justify-start items-start self-stretch gap-2 bg-white px-5 py-2.5">
                <div className="w-[624px] h-2.5 font-medium text-gray-400 text-sm leading-normal">
                  pending
                </div>
                <div className="flex flex-col justify-start items-start self-stretch">
                  {
                    allRequest.map((item, index) => {
                      if (
                        user &&
                        item.requester.uid === user.uid &&
                        item.status === "pending"
                      ) {
                        return (
                          <FriendItem
                            key={index}
                            id={item._id} // Ensure you have the unique ID for each friend
                            status={item.status}
                            permission={false}
                            avatar={item.recipient.avatar}
                            name={item.recipient.fullName}
                            reply={reply}
                            setReply={setReply}
                          />
                        );
                      }
                      if (
                        user &&
                        item.requester.uid !== user.uid &&
                        item.status === "pending"
                      ) {
                        return (
                          <FriendItem
                            key={index}
                            id={item._id} // Ensure you have the unique ID for each friend
                            status={item.status}
                            permission={true}
                            avatar={item.requester.avatar}
                            name={item.requester.fullName}
                            reply={reply}
                            setReply={setReply}
                          />
                        );
                      }
                    })
                  }
                </div>
              </div>
            )}

            {/* {cat === "blocked" && (
                  <div className="flex flex-col justify-start items-start self-stretch gap-2 bg-white px-5 py-2.5 h-[500px]">
                    <div className="w-[624px] h-2.5 font-medium text-gray-400 text-sm leading-normal">
                      blocked
                    </div>
                    <div className="flex flex-col justify-start items-start self-stretch h-[400px]">

                      
                    { 
                      allRequest.map((item, index) => {
                        if (item.status === 'blocked') {
                          return (
                            <FriendItem
                              key={index}
                              id={ item.requester.uid} // Ensure you have the unique ID for each blocked friend
                              avatar={item.requester.avatar}
                              name={item.requester.fullName}
                            />
                          );
                        }
                        return null;
                      })
                    }

                    </div>
                  </div>
                )} */}
          </div>
        )}

        {/* <div className="inline-flex flex-col justify-start items-center gap-2.5 bg-white border-gray-100 border-l w-80 h-[550px]">
          <div className="inline-flex justify-start items-start self-stretch gap-2.5 bg-white p-5 border-gray-100 border-b border-l overflow-hidden">
            <div className="font-semibold text-[#171718] text-xl leading-tight basis-0 grow shrink">
              Active Now
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default ChatFriend;