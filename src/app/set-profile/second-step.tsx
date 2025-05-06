"use client";

import { useState } from "react";
import { RiAddBoxLine, RiDeleteBinLine } from "react-icons/ri";
import Input from "@/components/Input";
import { UserType } from "./page";

type WorkHistory = {
  position: string;
  company: string;
};

type Education = {
  school: string;
  degree: string;
  year: string;
};

const SecondStep: React.FC<{ user: UserType, setUser: any, formik: any }> = ({ user, setUser, formik }) => {
  const [skillInput, setSkillInput] = useState<string>("");

  const addWorkHistory = () => {
    setUser((prevUser: any) => {
      const updatedWorkHistory = [...(prevUser.workHistory ?? [])];

      updatedWorkHistory.push({ position: "", company: "" });

      return {
        ...prevUser,
        workHistory: updatedWorkHistory,
      };
    });
  };

  const removeWorkHistory = (index: number) => {
    setUser((prevUser: any) => {
      const updatedWorkHistory = (prevUser.workHistory ?? []).filter((_: any, i: number) => i !== index);

      return {
        ...prevUser,
        workHistory: updatedWorkHistory,
      };
    });
  };

  const handleWorkHistoryChange = (
    index: number,
    field: keyof WorkHistory,
    value: string
  ) => {
    const updatedWorkHistory = [...(user?.workHistory ?? [])];

    updatedWorkHistory[index][field] = value;

    setUser((prevUser: any) => ({
      ...prevUser,
      workHistory: updatedWorkHistory,
    }));

    formik.setFieldValue("workHistory", updatedWorkHistory);
  };

  const addEducation = () => {
    setUser((prevUser: any) => {
      const updatedEducation = [...(prevUser.education ?? [])];

      updatedEducation.push({ school: "", degree: "", year: "" });
      return {
        ...prevUser,
        education: updatedEducation,
      };
    });
  };

  const removeEducation = (index: number) => {
    setUser((prevUser: any) => {
      const updatedEducation = (prevUser.education ?? []).filter((_: any, i: number) => i !== index);

      return {
        ...prevUser,
        education: updatedEducation,
      };
    });
  };

  const handleEducationChange = (
    index: number,
    field: keyof Education,
    value: string
  ) => {
    const updatedEducation = [...(user?.education ?? [])];

    updatedEducation[index][field] = value;

    setUser((prevUser: any) => ({
      ...prevUser,
      education: updatedEducation,
    }));

    formik.setFieldValue("education", updatedEducation);
  };

  const addSkill = () => {
    const trimmedSkill = skillInput.trim();
    if (trimmedSkill && user) {
      setUser((prevUser: any) => {
        const skills = prevUser.skills || [];

        if (!skills.includes(trimmedSkill)) {
          const updatedSkills = [...skills, trimmedSkill];
          formik.setFieldValue("skills", updatedSkills);
          return { ...prevUser, skills: updatedSkills };
        }

        return prevUser;
      });
      setSkillInput("");
    }
  };

  const removeSkill = (index: number) => {
    setUser((prevUser: any) => {
      const updatedSkills = prevUser.skills.filter((_: any, i: number) => i !== index);
      formik.setFieldValue("skills", updatedSkills);
      return { ...prevUser, skills: updatedSkills };
    });
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      addSkill();
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Work History Section */}
      <div className="w-full pb-5 border-b border-gray200">
        <div className="flex items-center justify-between">
          <span className="font-medium text-lg">Work History</span>
          <button
            className="flex items-center gap-2 text-blue-600 cursor-pointer"
            onClick={addWorkHistory}
          >
            <span>Add</span>
            <RiAddBoxLine className="rounded-lg" size={20} />
          </button>
        </div>
        {user?.workHistory && user?.workHistory.length && user?.workHistory.map((entry, index) => (
          <div key={index} className="flex justify-between mt-3 w-full">
            <div className="w-1/2 pr-2">
              <Input
                name={`workHistory[${index}].position`}
                value={entry.position}
                onChange={(e) =>
                  handleWorkHistoryChange(index, "position", e.target.value)
                }
                placeholder="Add Position"
                className="w-full"
              />
              {formik.touched.workHistory?.[index]?.position &&
                formik.errors.workHistory?.[index]?.position && (
                  <div className="text-red500 text-sm">
                    {formik.errors.workHistory?.[index]?.position}
                  </div>
                )}
            </div>
            <div className="w-1/2 pl-2">
              <Input
                name={`workHistory[${index}].company`}
                value={entry.company}
                onChange={(e) =>
                  handleWorkHistoryChange(index, "company", e.target.value)
                }
                placeholder="Add Company"
                className="w-full"
              />
              {formik.touched.workHistory?.[index]?.company &&
                formik.errors.workHistory?.[index]?.company && (
                  <div className="text-red500 text-sm">
                    {formik.errors.workHistory?.[index]?.company}
                  </div>
                )}
            </div>
            <button
              className="text-red-600 ml-2"
              onClick={() => removeWorkHistory(index)}
            >
              <RiDeleteBinLine size={20} />
            </button>
          </div>
        ))}
      </div>

      {/* Education Section */}
      <div className="w-full pb-5 border-b border-gray200">
        <div className="flex items-center justify-between">
          <span className="font-medium text-lg">Education</span>
          <button
            className="flex items-center gap-2 text-blue-600 cursor-pointer"
            onClick={addEducation}
          >
            <span>Add</span>
            <RiAddBoxLine className="rounded-lg" size={20} />
          </button>
        </div>
        {user?.education && user?.education.length && user?.education.map((entry, index) => (
          <div
            key={index}
            className="flex items-center justify-between gap-4 mt-3"
          >
            <div className="w-1/3">
              <Input
                name={`education[${index}].degree`}
                value={entry.degree}
                onChange={(e) =>
                  handleEducationChange(index, "degree", e.target.value)
                }
                placeholder="Add Degree"
                className="w-full"
              />
              {formik.touched.education?.[index]?.degree &&
                formik.errors.education?.[index]?.degree && (
                  <div className="text-red500 text-sm">
                    {formik.errors.education?.[index]?.degree}
                  </div>
                )}
            </div>

            <div className="w-1/3">
              <Input
                name={`education[${index}].school`}
                value={entry.school}
                onChange={(e) =>
                  handleEducationChange(index, "school", e.target.value)
                }
                placeholder="Add School/University"
                className="w-full"
              />
              {formik.touched.education?.[index]?.school &&
                formik.errors.education?.[index]?.school && (
                  <div className="text-red500 text-sm">
                    {formik.errors.education?.[index]?.school}
                  </div>
                )}
            </div>

            <div className="w-1/3">
              <select
                name={`education[${index}].year`}
                className="w-full px-3 py-2 border rounded-lg"
                value={entry.year}
                onChange={(e) =>
                  handleEducationChange(index, "year", e.target.value)
                }
              >
                <option value="">Year</option>
                {[...Array(50)].map((_, i) => (
                  <option key={i} value={2023 - i}>
                    {2023 - i}
                  </option>
                ))}
              </select>
              {formik.touched.education?.[index]?.year &&
                formik.errors.education?.[index]?.year && (
                  <div className="text-red500 text-sm">
                    {formik.errors.education?.[index]?.year}
                  </div>
                )}
            </div>
            <button
              className="text-red-600 ml-2"
              onClick={() => removeEducation(index)}
            >
              <RiDeleteBinLine size={20} />
            </button>
          </div>
        ))}
      </div>

      {/* Skills Section */}
      <div className="w-full">
        <div className="flex items-center justify-between">
          <span className="font-medium text-lg">Skills</span>
          <button
            className="flex items-center gap-2 text-blue-600 cursor-pointer"
            onClick={addSkill}
          >
            <span>Add</span>
            <RiAddBoxLine className="rounded-lg" size={20} />
          </button>
        </div>

        <div className="flex flex-wrap gap-2 mt-3">
          {user?.skills && user.skills.length > 0 && user?.skills.map((skill, index) => (
            <div
              key={index}
              className="flex items-center bg-gray200 px-2 py-1 rounded-lg text-sm"
            >
              <span>{skill}</span>
              <button
                onClick={() => removeSkill(index)}
                className="ml-2 text-red-600 font-bold"
              >
                ✕
              </button>
            </div>
          ))}
          <input
            type="text"
            value={skillInput}
            placeholder="Add Skills"
            onChange={(e) => setSkillInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-grow border-b focus:outline-none"
          />
        </div>

        {formik.touched.skills && formik.errors.skills && (
          <div className="text-red500 text-sm">{formik.errors.skills}</div>
        )}
      </div>
    </div>
  );
};

export default SecondStep;