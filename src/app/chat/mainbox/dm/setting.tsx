"use client";

import {
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import React from "react";
import { FaXmark } from "react-icons/fa6";
import { Icons } from "@/icons";

interface SettingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const IOSSwitch = styled(Switch)(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(16px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: "#65C466",
        opacity: 1,
        border: 0,
        ...theme.applyStyles("dark", {
          backgroundColor: "#2ECA45",
        }),
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#33cf4d",
      border: "6px solid #fff",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color: theme.palette.grey[100],
      ...theme.applyStyles("dark", {
        color: theme.palette.grey[600],
      }),
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: 0.7,
      ...theme.applyStyles("dark", {
        opacity: 0.3,
      }),
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 22,
    height: 22,
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: "#E9E9EA",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
    ...theme.applyStyles("dark", {
      backgroundColor: "#39393D",
    }),
  },
}));

const Setting: React.FC<SettingModalProps> = ({ isOpen, onClose }) => {
  const handleSave = () => {
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="z-50 fixed inset-0 flex justify-center items-center">
      <div className="absolute bg-black opacity-10 w-full h-full" />
      <div className="z-10 flex flex-col gap-5 bg-white shadow-lg p-5 rounded-lg w-full max-w-xl">
        <div className="flex justify-between gap-4">
          <h2 className="font-semibold text-xl">Chat settings</h2>
          <button
            className="group flex justify-center items-center border border-gray500 hover:border-red400 rounded-full w-6 h-6 transition-all"
            onClick={onClose}
          >
            <FaXmark className="group-hover:text-red400 w-4 h-4 text-context transition-all" />
          </button>
        </div>
        <hr />

        <div className="flex flex-col gap-2.5">
          <FormControlLabel
            control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
            label="When posted as links to chat"
          />
        </div>

        <div className="flex flex-col gap-2.5">
          <FormControlLabel
            control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
            label="Images larger than 10MB will not be previewed."
          />
        </div>

        <div className="flex flex-col gap-2.5">
          <FormControlLabel
            control={<IOSSwitch sx={{ m: 1 }} />}
            label="Image descriptions are used to describe images for screenreaders."
          />
        </div>

        <div className="flex flex-col gap-2.5">
          <FormControlLabel
            control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
            label="Show embeds and preview website links pasted into chat."
          />
        </div>

        <div className="flex flex-col gap-2.5">
          <FormControlLabel
            control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
            label="Show emoji reactions on messages."
          />
        </div>

        <div className="flex items-center gap-2.5 bg-gray100 p-2.5 rounded-lg h-10">
          <Icons.lightbulbon />
          <div className="text-gray500 text-sm">Show spoiler content</div>
        </div>

        <div className="flex flex-col gap-2.5">
          <RadioGroup row={false} defaultValue="click">
            <FormControlLabel
              value="click"
              control={<Radio />}
              label="On click"
              sx={{
                ".Mui-checked": {
                  color: "var(--green-500) !important",
                },
              }}
            />
            <FormControlLabel
              value="server"
              control={<Radio />}
              label="On servers"
              sx={{
                ".Mui-checked": {
                  color: "var(--green-500) !important",
                },
              }}
            />
            <FormControlLabel
              value="always"
              control={<Radio />}
              label="Always"
              sx={{
                ".Mui-checked": {
                  color: "var(--green-500) !important",
                },
              }}
            />
          </RadioGroup>
        </div>

        <div className="flex flex-col gap-2.5">
          <FormControlLabel
            control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
            label="Stickers in Autocomplete"
          />
        </div>

        <div className="flex flex-col gap-2.5">
          <FormControlLabel
            control={<IOSSwitch sx={{ m: 1 }}  />}
            label="Open threads in split view"
          />
        </div>

        <div className="flex justify-end gap-2.5 h-10">
          <button
            className="bg-green500 hover:bg-green600 hover:shadow-lg px-4 py-2 rounded-lg min-w-24 text-white hover:scale-105 transition-all duration-200"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Setting;
