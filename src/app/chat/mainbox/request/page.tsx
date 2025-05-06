"use client";

import { useState } from "react";
import { Icons } from "@/icons";
import RequestItem from "./requestItem";

const Request = () => {

    const [cat, setCat] = useState<string>("requests");

    return (
        <div className="inline-flex flex-col justify-start items-end w-[calc(100vw-400px)] h-[calc(100vh-160px)] self-stretch">
          <div className="inline-flex justify-start items-center gap-3 border-[#f3f3f3] bg-white px-5 py-2.5 border-b self-stretch">
            <Icons.mail />
            <div className="font-semibold text-base text-black leading-normal">
              Message Requests
            </div>
            <div className="flex justify-start items-center gap-2.5 h-6 basis-0 grow shrink">
              <button
                onClick={() => setCat("requests")}
                className={`${
                  cat === "requests" && "bg-gray-100"
                } flex justify-center items-center gap-2.5  w-32 p-5 h-6`}
              >
                <div className="text-center">
                  <span className="font-normal text-gray-400 text-xs leading-normal">
                    Requests
                  </span>
                  <span className="font-['Poppins'] font-normal text-gray-400 text-xs leading-normal">
                    {" "}
                    (18)
                  </span>
                </div>
              </button>
              <button
                onClick={() => setCat("spams")}
                className={`${
                  cat === "spams" && "bg-gray-100"
                } p-3 w-[120px] font-normal text-center text-gray-400 text-xs leading-normal`}
              >
                Spam (3)
              </button>
            </div>
          </div>

          <div className="inline-flex justify-start items-start self-stretch">
            <div className="inline-flex flex-col justify-start items-start bg-white py-2.5 basis-0 grow shrink">
              {cat === "requests" && (
                <div className="flex flex-col justify-start items-start gap-2 bg-white px-5 py-2.5 self-stretch">
                  <div className="h-2.5 font-medium text-gray-400 text-sm leading-normal">
                    Requests - 18
                  </div>

                  <div className="flex flex-col max-h-[calc(100vh-265px)] overflow-auto grow hide-scrollbar self-stretch shrink">

                  <RequestItem />

                  <RequestItem />

                  <RequestItem />

                  <RequestItem />

                  <RequestItem />

                  <RequestItem />

                  <RequestItem />

                  <RequestItem />

                  <RequestItem />

                  <RequestItem />

                  <RequestItem />

                  <RequestItem />

                  <RequestItem />

                  <RequestItem />

                  <RequestItem />

                  <RequestItem />

                  <RequestItem />

                  <RequestItem />

                  </div>

                </div>
              )}
              {cat === "spams" && (
                <div className="flex flex-col justify-start items-start gap-2 bg-white px-5 py-2.5 self-stretch">
                  <div className="w-[624px] h-2.5 font-medium text-gray-400 text-sm leading-normal">
                    Spams - 3
                  </div>

                  <div className="flex flex-col max-h-[calc(100vh-265px)] overflow-auto grow hide-scrollbar self-stretch shrink">

                  <RequestItem />

                  <RequestItem />

                  <RequestItem />

                  </div>

                </div>
              )}
            </div>
          </div>
        </div>
    )
}

export default Request