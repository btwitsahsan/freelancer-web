import React, { Dispatch, useCallback, useEffect, useRef, SetStateAction, useState } from "react";
import { SelectChangeEvent } from '@mui/material/Select';
import { Icons } from "@/icons";
import { RiCloseCircleLine } from "react-icons/ri";
import { MenuItem, Select } from "@mui/material";
import { TmUserType, apiUrl, TmRoleType, TmProjectType } from "@/utils/constant";
import Image from "next/image";
import axios from "axios";

type propsType = {
  isOpen?: boolean;
  tmUsers: TmUserType[];
  setTmUsers: Dispatch<SetStateAction<TmUserType[]>>;
  tmProject: TmProjectType | null | undefined;
  onClose?: () => void;
};

const ProjectOverviewModal = ({ isOpen, tmUsers, setTmUsers, tmProject, onClose }: propsType) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [inputValue, setInputValue] = useState<string>('');

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose?.();
      }
    },
    [onClose, modalRef]
  );

  useEffect(() => {
    if (isOpen) {
      // document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, handleClickOutside]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleInvite = () => {
    const token = localStorage.getItem('freelancingPlatformAuthToken');

    const fetchUserData = () => {
      axios
        .get(`${apiUrl}/api/tmProjects/user/${inputValue}`, {
          headers: {
            Authorization: `Bearer ${token}`
          },
        })
        .then(res => {
          setInputValue('');
          axios
            .post(
              `${apiUrl}/api/tmProjects/role`,
              {
                user: res.data._id,
                project: tmProject?._id,
                role: 'Editor'
              },
              {
                headers: {
                  Authorization: `Bearer ${token}`
                },
              }
            )
            .then(res => {
              setTmUsers([...tmUsers, { _id: res.data._id, user: res.data.user, role: 'Editor' }]);
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(err => {
          console.log(err);
        });
    }

    if (inputValue) {
      fetchUserData();
    }
  }

  const handleChangeRole = (member: TmUserType) => (event: SelectChangeEvent<string>) => {
    const newRole = event.target.value;
    const token = localStorage.getItem('freelancingPlatformAuthToken');

    if (newRole === 'Remove') {
      axios
        .delete(`${apiUrl}/api/tmProjects/role/${member._id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then(() => {
          setTmUsers(tmUsers.filter(user => user._id !== member._id));
          console.log(`${member._id} role deleted successfully.`);
        })
        .catch(err => {
          console.log(err);
        });
      return;
    }

    axios
      .put(`${apiUrl}/api/tmProjects/role/${member._id}`, { role: newRole }, {
        headers: {
          Authorization: `Bearer ${token}`
        },
      })
      .then(() => {
        console.log(`${member._id} role updated to ${newRole}`);
      })
      .catch(err => {
        console.log(err);
      });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#17171819] flex justify-center items-center z-50">
      <div
        ref={modalRef}
        className="flex flex-col bg-white w-[30rem] p-6 rounded-lg shadow-xl gap-4"
      >
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">
            Share The Freelancer Website
          </h2>
          <button
            className="w-6 h-6 text-gray500 hover:rotate-90 transition-all"
            onClick={onClose}
          >
            <RiCloseCircleLine className="w-6 h-6" />
          </button>
        </div>
        <hr />
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2.5">
            <h3 className="text-xl font-medium leading-none">
              Invite With Email
            </h3>
            <div className="flex items-center gap-0 rounded-lg overflow-hidden border border-gray200 bg-gray200 w-full focus-within:ring-2 focus-within:ring-green500">
              <input
                type="email"
                placeholder="Add username, or emails"
                className="flex-1 px-4 py-3 text-sm text-gray500 bg-gray100 focus:outline-none"
                value={inputValue}
                onChange={handleInputChange}
              />
              <button
                className="h-11 w-[100px] bg-gradient-to-r from-blue500 to-pink-500 text-white font-medium px-2.5 hover:text-lg hover:shadow transition-all"
                onClick={handleInvite}
              >
                Invite
              </button>
            </div>
          </div>
          <hr />
          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-medium leading-none">Members</h3>
            <ul className="flex flex-col gap-4">
              {tmUsers?.length ? tmUsers.map((member, index) => (
                <li key={index} className="flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-10 h-10 rounded-full text-white flex justify-center items-center`}
                    >
                      <Image
                        className="w-8 h-8 rounded-full border border-black"
                        src={member.user.avatar ?? '/image/default.png'}
                        width={32}
                        height={32}
                        alt="User"
                      />
                    </div>
                    <div className="flex items-center space-x-4">
                      <p className="font-medium text-context">{member.user.fullName}</p>
                    </div>
                  </div>
                  <div>
                    <Select
                      defaultValue={member.role}
                      onChange={handleChangeRole(member)}
                      variant="standard"
                      sx={{
                        color: "gray",
                        backgroundColor: "transparent",
                        fontSize: "0.875rem",
                        fontWeight: 500,
                        minWidth: "80px",
                        "&:focus": {
                          outline: "none",
                        },
                        "&:after": {
                          borderBottom: "none !important",
                        },
                        "&:before": {
                          borderBottom: "none !important",
                        },
                      }}
                    >
                      <MenuItem value="Editor">Can Edit</MenuItem>
                      <MenuItem value="Guest">View Only</MenuItem>
                      <MenuItem value="Admin">Admin</MenuItem>
                      <MenuItem value="Remove">Remove</MenuItem>
                    </Select>
                  </div>
                </li>
              )) : ""}
            </ul>
          </div>
        </div>
        <hr />
        <div className="flex justify-end items-center">
          <button className="text-gray500 text-sm p-2 border rounded-md hover:bg-gray100 flex items-center gap-2 transition-all">
            <Icons.copylink width="14" />
            Copy project link
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectOverviewModal;
