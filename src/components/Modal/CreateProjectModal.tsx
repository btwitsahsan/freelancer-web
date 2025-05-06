import { MenuItem, Select } from "@mui/material";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { RiCloseCircleLine } from "react-icons/ri";
import { TmProjectType, TmRoleType, UserType } from "@/utils/constant";
import axios from "axios";
import { apiUrl } from "@/utils/constant";
import { SelectChangeEvent } from "@mui/material/Select";
import { toast } from "react-toastify";
import { Dispatch, SetStateAction } from "react";

interface ModalProps {
  tmProjects: TmProjectType[];
  setTmProjects: Dispatch<SetStateAction<TmProjectType[]>>;
  isOpen: boolean;
  onClose: () => void;
}

const CreateProjectModal = ({
  tmProjects,
  setTmProjects,
  isOpen,
  onClose,
}: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [tmProject, setTmProject] = useState<TmProjectType>({
    title: "",
    isPrivate: false,
  });
  const [tmUsers, setTmUsers] = useState<UserType[]>([]);
  const [tmUser, setTmUser] = useState<UserType>();
  const [inputValue, setInputValue] = useState<string>("");
  const [roles, setRoles] = useState<TmRoleType[]>([]);
  const [error, setError] = useState<string>("");
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleInvite = () => {
    const token = localStorage.getItem("freelancingPlatformAuthToken");

    const fetchUserData = () => {
      axios
        .get(`${apiUrl}/api/tmProjects/user/${inputValue}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setTmUser(res.data);
          setTmUsers([...tmUsers, res.data]);
          setRoles([
            ...roles,
            { userId: res.data._id, role: "Editor", projectId: "" },
          ]);
          setInputValue("");
        })
        .catch((err) => {
          console.log(err);
        });
    };

    if (inputValue) {
      fetchUserData();
    }
  };

  const handleChangeRole =
    (member: UserType) => (event: SelectChangeEvent<string>) => {
      const newRole = event.target.value;

      if (newRole === "Remove") {
        removeMember(member.email);
        setRoles((prevRoles) =>
          prevRoles.filter((r) => r.userId !== member._id)
        );
        return;
      }

      setRoles((prevRoles) => {
        const roleIndex = prevRoles.findIndex((r) => r.userId === member._id);

        if (roleIndex !== -1) {
          const updatedRoles = [...prevRoles];
          updatedRoles[roleIndex].role = newRole;
          return updatedRoles;
        } else {
          return [
            ...prevRoles,
            {
              userId: member._id,
              projectId: "",
              role: newRole,
            },
          ];
        }
      });
    };

  const removeMember = (email: string) => {
    setTmUsers((prevMembers) => prevMembers.filter((m) => m.email !== email));
  };

  const handleCreateTmProject = () => {
    const token = localStorage.getItem("freelancingPlatformAuthToken");
    const userJson = localStorage.getItem("user");
    const user = userJson ? JSON.parse(userJson) : null;
    const userId = user ? user.uid : null;

    if (!userId) {
      setError("User ID not found. Please log in again.");
      return;
    }

    if (!tmProject.title || !tmProject.title.trim()) {
      setError("Project title is required.");
    } else {
      setError("");
      axios
        .post(
          `${apiUrl}/api/tmProjects/projects/new`,
          {
            title: tmProject.title,
            isPrivate: tmProject.isPrivate,
            roles: roles,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          setTmProjects([...tmProjects, res.data]);
          toast.success("Project created successfully!");
          onClose();
        })
        .catch((error) => {
          console.error(
            "Error creating project:",
            error.response?.data || error.message
          );
          toast.error(
            error.response?.data?.message || "Failed to create a new project."
          );
        });
    }
  };
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-[#17171819] z-50">
      <div
        ref={modalRef}
        className="flex flex-col bg-white w-[35rem] max-h-[90vh] overflow-y-auto p-6 rounded-[20px] shadow-xl gap-5 z-100"
      >
        <div className="flex flex-col gap-2.5">
          <div className="flex justify-center items-center gap-4">
            <h2 className="flex-1 text-xl font-semibold">Create Project</h2>
            <button
              className="w-6 h-6 text-gray500 hover:rotate-90 transition-all"
              onClick={onClose}
            >
              <RiCloseCircleLine className="w-6 h-6" />
            </button>
          </div>
          <div className="text-sm font-normal leading-none">
            A Project represents major tasks and people assign to it.
          </div>
        </div>

        <input
          type="text"
          placeholder="e.g. ABC project name"
          required={true}
          className="w-full px-4 py-3.5 bg-gray100 rounded-lg text-gray-700 text-sm border border-gray200 focus:outline-none focus:ring-2 focus:ring-green500"
          onChange={(e) =>
            setTmProject({ ...tmProject, title: e.target.value })
          }
        />

        {error && <div className="text-red-500 text-sm">{error}</div>}

        <div className="flex justify-between border-b pb-5 items-center">
          <div className="flex flex-col">
            <span className="text-sm font-medium text-context ">
              Make Private
            </span>
            <span className="text-sm text-gray-700 ">
              Only you and invited members have access
            </span>
          </div>

          <div className="relative">
            <input
              type="checkbox"
              className="appearance-none h-5 w-9 rounded-full bg-gray200 checked:bg-green500 transition duration-300 peer cursor-pointer"
              onChange={(e) =>
                setTmProject({ ...tmProject, isPrivate: e.target.checked })
              }
            />
            <span className="absolute h-4 w-4 bg-gray500 rounded-full top-0.5 left-0.5 transition-transform duration-300 peer-checked:bg-white peer-checked:translate-x-4"></span>
          </div>
        </div>

        <div className="flex flex-col border-b pb-5 gap-5">
          <h3 className="text-lg font-medium leading-none">Invite Members</h3>
          <div className="flex items-center gap-0 rounded-lg overflow-hidden px-0.5 bg-gray100 border border-gray200 focus-within:ring-2 focus-within:ring-green500 transition-all">
            <input
              type="text"
              placeholder="Add username, or emails"
              className="flex-1 px-4 py-3.5 text-sm text-gray500 bg-gray100 focus:outline-none"
              value={inputValue}
              onChange={handleInputChange}
            />
            <button
              className="bg-white text-black font-medium px-8 py-2.5 rounded-md hover:bg-green500 hover:text-white transition-all"
              onClick={handleInvite}
            >
              Invite
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <h3 className="text-lg font-medium">Members</h3>
          <ul className="flex flex-col gap-5">
            {tmUsers.map((member, index) => (
              <li key={index} className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <div
                    className={`w-10 h-10 rounded-full bg-orange-500 text-white flex justify-center items-center`}
                  >
                    {member.fullName.charAt(0)}
                  </div>
                  <div className="flex items-center gap-4">
                    <p className="font-medium text-context">
                      {member.fullName}
                    </p>
                  </div>
                </div>
                <div>
                  <Select
                    defaultValue="Editor"
                    variant="standard"
                    onChange={handleChangeRole(member)}
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
            ))}
          </ul>
        </div>

        <div className="flex justify-center">
          <button
            className="bg-gradient-to-r w-full from-blue500 to-pink-500 text-white font-medium px-8 py-2.5 rounded-lg hover:shadow-lg transition-all"
            onClick={handleCreateTmProject}
          >
            Create Project
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateProjectModal;
