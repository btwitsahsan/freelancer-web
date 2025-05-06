import { useState } from "react";
import { PiBookmark, PiBookmarkFill } from "react-icons/pi";
import { locations } from '@/utils/constant';

type UserType = {
  fullName: string;
  email: string;
  userName: string;
  location: string;
  uid: string;
}

type JobCardProps = {
  _id: string;
  title: string;
  company: string;
  owner: UserType;
  createdAt: string;
  minHourlyRate: string;
  maxHourlyRate: string;
  estimatedPrice: string;
  location: string;
  skills: string[];
  index: number;
  type: string;
  setProjectId: (id: string) => void;
  openModal: () => void;
};

const JobCard = ({
  _id,
  title,
  company,
  owner,
  createdAt,
  minHourlyRate,
  maxHourlyRate,
  estimatedPrice,
  location,
  skills,
  index,
  type,
  setProjectId,
  openModal,
}: JobCardProps) => {
  const [isBookmarked, setIsBookmarked] = useState(false);

  const colors = [
    "bg-[#FFE1CC]",
    "bg-[#D5F6ED]",
    "bg-[#E4DBFA]",
    "bg-[#DFF3FE]",
    "bg-[#FBE2F4]",
    "bg-[#EDEFF5]",
  ];

  const color = colors[index % colors.length];

  const getCountryName = (shortCode: string) => {
    const location = locations.find(loc => loc.slug === shortCode);
    return location ? location.label : shortCode;
  }

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const formatDate = (isoString: string) => {
    const date = new Date(isoString);

    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
    };

    const formattedDate = date.toLocaleDateString('en-US', options);
    return formattedDate;
  };

  const handleDetails = (_id: string) => {
    openModal();
    setProjectId(_id);
  }

  return (
    <div className="p-4 bg-white shadow-md rounded-xl border border-gray200 max-h-fit">
      <div className={`p-4 ${color} rounded-lg relative`}>
        <div
          onClick={toggleBookmark}
          className="absolute bg-white p-2 rounded-full top-4 right-4 transition-transform duration-300 ease-in-out transform hover:scale-110 cursor-pointer"
        >
          {isBookmarked ? (
            <PiBookmarkFill className="text-black" size={20} />
          ) : (
            <PiBookmark className="text-gray400" size={20} />
          )}
        </div>

        <p className="text-xs text-black bg-white px-2 py-1 rounded inline-block mb-2">
          {formatDate(createdAt)}
        </p>

        <h3 className="text-sm font-medium text-black">{company}</h3>
        <p className="text-lg font-bold text-context mb-4">{title}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {skills?.map((skill) => (
            <span
              key={skill}
              className="text-xs text-gray-700 border border-gray-700 rounded px-2 py-1"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      <div className="flex justify-between">
        <div className="flex flex-col mt-4 w-11/12">
          <p className="text-lg font-bold text-context">
            {
              type === 'hourly' ?
                `$${minHourlyRate}~$${maxHourlyRate}/hr` :
                `$${estimatedPrice}`
            }

          </p>
          <p className="text-sm text-gray500">
            {location === 'local' ? getCountryName(owner?.location) : location}
          </p>
        </div>

        <button
          onClick={e => handleDetails(_id)}
          className="w-full mt-4 py-2 text-sm font-medium text-white bg-black rounded-md ease-in-out transform hover:bg-gray500 transition-all"
        >
          Details
        </button>
      </div>
    </div>
  );
};

export default JobCard;
