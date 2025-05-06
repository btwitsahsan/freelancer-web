"use client";

import { useState } from "react";
import { Icons } from "@/icons";
import { InputAdornment, TextField } from "@mui/material";
import CreateServerModal from "./createServer";
import CommunityItem from "./communityItem";

const Community = () => {

  const [open, setOpen] = useState<boolean>(false);

  const [tab, setTab] = useState<string>('home');

  const serverItem = [
    { id: 1, image: '/image/server/server1.png' },
    { id: 2, image: '/image/server/server2.png' },
    { id: 3, image: '/image/server/server3.png' },
    { id: 4, image: '/image/server/server4.png' },
    { id: 5, image: '/image/server/server5.png' },
    { id: 6, image: '/image/server/server6.png' },
    { id: 7, image: '/image/server/server1.png' },
    { id: 8, image: '/image/server/server2.png' },
  ]

  return (
    <div className="flex flex-col w-full">
      {/* <div className="inline-flex justify-center items-center self-stretch gap-2.5 bg-white px-5 py-2.5 border-[#f3f3f3] border-b w-full h-12 overflow-hidden">
        <Icons.city_1_black />
        <button 
          onClick={() => setTab('home')}
          className={`font-['DM font-semibold text-base leading-normal Sans'] ${tab === 'home' ? 'border-b-2 text-[#12b669] border-[#12b669]' : 'text-gray-400'}`}
        >
          Home
        </button>
        <div className="flex flex-1 justify-start items-center gap-4 h-6 grow shrink basis-0">
          <button 
            onClick={() => setTab('account')}
          className={`font-['DM font-semibold  text-base leading-normal Sans'] ${tab === 'account' ? 'border-b-2 text-[#12b669] border-[#12b669]' : 'text-gray-400'}`} >
            Accounting & Consulting
          </button>
          <button 
            onClick={() => setTab('admin')}
          className={`font-['DM font-semibold text-base leading-normal Sans'] ${tab === 'admin' ? 'border-b-2 text-[#12b669] border-[#12b669]' : 'text-gray-400'}`} >
            Admin Support
          </button>
          <button 
            onClick={() => setTab('dc')}
          className={`font-['DM font-semibold text-base leading-normal Sans'] ${tab === 'dc' ? 'border-b-2 text-[#12b669] border-[#12b669]' : 'text-gray-400'}`} >
            Data Science & Analytics
          </button>
          <button 
            onClick={() => setTab('design')}
          className={`font-['DM font-semibold text-base leading-normal Sans'] ${tab === 'design' ? 'border-b-2 text-[#12b669] border-[#12b669]' : 'text-gray-400'}`} >
            Design & Creative
          </button>
          <button 
            onClick={() => setTab('it')}
          className={`font-['DM font-semibold text-base leading-normal Sans'] ${tab === 'it' ? 'border-b-2 text-[#12b669] border-[#12b669]' : 'text-gray-400'}`} >
            IT & Networking
          </button>
        </div>
        <button>
          <Icons.bubble_chat_Add />
        </button>
      </div> */}

      <div className="inline-flex flex-col justify-center items-start gap-3 bg-white px-[230px] py-5 border-[#f3f3f3] border-b h-[132px] overflow-hidden">
        <div className="inline-flex justify-start items-center self-stretch gap-3">
          <div className="inline-flex flex-col justify-center items-start gap-2 grow shrink basis-0">
            <div className="font-['DM font-semibold text-black text-base leading-tight Sans']">
              FIND YOUR COMMUNITY HERE
            </div>
            <div className="font-['DM font-normal text-black text-xs leading-3 Sans']">
              From various kinds of topic, there is a place for you.
            </div>
          </div>
          <button
            onClick={() => setOpen(true)}
            className="flex justify-center items-center gap-2.5 bg-gradient-to-r from-[#198bd8] to-[#f03dce] px-5 py-2.5 rounded overflow-hidden"
          >
            <div className="font-['DM font-medium text-white text-sm leading-normal Sans']">
              Create Server
            </div>
          </button>
        </div>
        {/* <div className="flex flex-col justify-start items-start self-stretch gap-2 bg-white h-10">
          <div className="inline-flex justify-start items-center self-stretch gap-2.5 bg-gray-100 py-2 rounded-lg h-10">
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
      </div>

      <div className="px-[230px] py-5">
        <div className="pb-3 font-['DM font-semibold text-black text-base leading-tight Sans']">
          Featured Servers
        </div>

        <div className="flex flex-wrap justify-start gap-2 max-h-[calc(100vh-412px)] overflow-y-auto hide-scrollbar">
          {
            tab === 'home' &&
            <>
              {
                serverItem.map((item) => (
                  <CommunityItem key={item.id} id={item.id} image={item.image} />
                ))
              }
            </>
          }
          {
            tab === 'account' &&
            <>
              <CommunityItem id={serverItem[0].id} image={serverItem[0].image} />
              <CommunityItem id={serverItem[1].id} image={serverItem[1].image} />
              <CommunityItem id={serverItem[2].id} image={serverItem[2].image} />
            </>
          }
          {
            tab === 'admin' &&
            <>
              <CommunityItem id={serverItem[3].id} image={serverItem[3].image} />
              <CommunityItem id={serverItem[4].id} image={serverItem[4].image} />
              <CommunityItem id={serverItem[5].id} image={serverItem[5].image} />
            </>
          }
          {
            tab === 'dc' &&
            <>
              <CommunityItem id={serverItem[6].id} image={serverItem[6].image} />
              <CommunityItem id={serverItem[7].id} image={serverItem[7].image} />
            </>
          }
          {
            tab === 'design' &&
            <>
              <CommunityItem id={serverItem[0].id} image={serverItem[0].image} />
              <CommunityItem id={serverItem[1].id} image={serverItem[1].image} />
              <CommunityItem id={serverItem[2].id} image={serverItem[2].image} />
            </>
          }
          {
            tab === 'it' &&
            <>
              <CommunityItem id={serverItem[3].id} image={serverItem[3].image} />
              <CommunityItem id={serverItem[4].id} image={serverItem[4].image} />
              <CommunityItem id={serverItem[5].id} image={serverItem[5].image} />
            </>
          }

        </div>
      </div>

      <CreateServerModal isOpen={open} onClose={() => setOpen(false)} />
        
    </div>
  );
};

export default Community;