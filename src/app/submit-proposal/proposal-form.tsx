"use client";

import { FC, useState } from "react";
import axios from "axios";
import { FiUpload, FiFile } from "react-icons/fi";
import { Icons } from "@/icons";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { ProjectType } from "./page";
import { toast } from "react-toastify";
import { apiUrl } from "@/utils/constant";

type ProjectProps = {
  project: ProjectType;
};

const ProposalForm: FC<ProjectProps> = ({ project }) => {
  const [coverLetter, setCoverLetter] = useState("");
  const [price, setPrice] = useState("");
  const [files, setFiles] = useState<File[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFiles([...files, ...Array.from(event.target.files)]);
    }
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem('freelancingPlatformAuthToken');
    const formData = new FormData();

    formData.append("coverLetter", coverLetter);
    formData.append("price", price);
    formData.append("projectId", project?._id);

    files.forEach((file) => formData.append("portfolios", file));

    try {
      await axios.post(`${apiUrl}/api/projects/writeProposal`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }).then(() => {
        toast.success('Proposal sent successfully.');
      })
        .catch(error => {
          console.log(error);
          toast.error('Failed to write a proposal.');
        })
    } catch (error) {
      console.error("Error submitting proposal:", error);
    }
  };

  return (
    <div className="h-full basis-1/2">
      <div className="sticky top-10 flex flex-col gap-8 py-6">
        <div className="flex flex-col gap-5">
          <h2 className="text-2xl font-medium">Submit proposal</h2>
          <div className="flex flex-col gap-2.5">
            <textarea
              className="w-full h-64 bg-transparent p-3 border rounded-lg outline-none focus:ring hover:ring focus:border-blue300 hover:border-blue300 transition-all"
              placeholder="Write your cover letter..."
              maxLength={5000}
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
            />
            <div className="text-right font-normal text-sm">
              {coverLetter.length}/5000
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <h3 className="text-2xl font-medium">Relevant portfolio</h3>
          <label className="flex items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray100">
            <FiUpload className="text-gray500 text-2xl" />
            <input
              type="file"
              className="hidden"
              onChange={handleFileChange}
              multiple
              accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
            />
            <span className="ml-2 text-gray500">
              Drag or <span className="text-blue500 underline">upload</span>{" "}
              files
            </span>
          </label>
          <p className="text-gray500 text-sm">
            You may attach up to 10 files under the size of 25 MB each. Include
            work samples or other documents to support your application.
          </p>
          {files.length > 0 && (
            <div className="flex flex-col gap-2">
              <h4 className="text-lg font-medium mb-2">Uploaded Files:</h4>
              <ul className="flex flex-col gap-2">
                {files.map((file, index) => (
                  <li key={index} className="flex items-center text-gray500">
                    <FiFile className="mr-2 text-lg" />
                    {file.name}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        {project?.type === "hourly" ? (
          <div className="flex justify-between items-center">
            <label className="text-lg font-semibold">
              Offer hourly rate to this client
            </label>
            <div className="relative">
              <input
                type="number"
                placeholder="00.00/hr"
                className="rounded-md px-4 py-3 w-48 bg-white text-sm outline-none focus:ring hover:ring focus:border-blue300 hover:border-blue300 transition-all"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
              <RiMoneyDollarCircleLine className="absolute right-3 top-2.5 text-gray500 w-6 h-6 bg-white rounded-full" />
            </div>
          </div>
        ) : (
          <div className="flex justify-between items-center">
            <label className="text-lg font-semibold">
              Offer fixed budget to this client
            </label>
            <div className="relative">
              <input
                type="number"
                placeholder="$"
                className="rounded-md px-4 py-3 w-48 bg-white text-sm outline-none focus:ring hover:ring focus:border-blue300 hover:border-blue300 transition-all"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
              <RiMoneyDollarCircleLine className="absolute right-3 top-2.5 text-gray500 w-6 h-6 bg-white rounded-full" />
            </div>
          </div>
        )}

        <button
          className="w-full bg-gradient-to-r from-gradientStart to-gradientEnd flex items-center space-x-2 justify-center text-white py-3 rounded-md font-semibold"
          onClick={handleSubmit}
        >
          <Icons.send width="20" />
          <span>Apply Now</span>
        </button>
      </div>
    </div>
  );
};

export default ProposalForm;
