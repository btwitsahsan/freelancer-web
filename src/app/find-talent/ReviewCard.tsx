import React from "react";
import { FaStar } from "react-icons/fa";

type ReviewCardProps = {
  jobData?: {
    title?: string;
    review?: string;
    rating?: number;
    startDate?: string;
    endDate?: string;
    amount?: number;
    reviewCount?: number;
  };
};

const ReviewCard = ({ jobData }: ReviewCardProps) => {
  // Default values if no data is provided
  const title = jobData?.title || "Lead Generation";
  const review =
    jobData?.review ||
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a vulputate mauris. Etiam ex sem, congue eget erat ac, egestas rhoncus tortor. Praesent rutrum vestibulum nibh, eget mattis mauris semper vel. Praesent eu magna id mauris";
  const rating = jobData?.rating || 4;
  const startDate = jobData?.startDate || "Oct 10, 2024";
  const endDate = jobData?.endDate || "Nov 15, 2024";
  const amount = jobData?.amount || 3125;
  const reviewCount = jobData?.reviewCount || 1;

  // Generate stars based on rating
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FaStar
          key={i}
          color={i <= rating ? "var(--yellow-400)" : "var(--gray-400)"}
        />
      );
    }
    return stars;
  };

  return (
    <div className="flex flex-col gap-2.5">
      <div className="text-lg text-black leading-none">{title}</div>
      <div className="flex gap-2.5 items-center">
        <div className="flex gap-0.5 items-center">{renderStars()}</div>
        <div className="text-sm">
          {rating.toFixed(2)} of {reviewCount} reviews
        </div>
        <hr className="w-px h-4 bg-context" />
        <div className="text-sm">
          {startDate} - {endDate}
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-sm leading-tight line-clamp-2">"{review}"</p>
        <div className="leading-none text-sm">
          <button className="underline text-green400 hover:text-green500 transition-all leading-none">
            See more
          </button>
        </div>
      </div>
      <div className="text-sm text-context leading-none">
        ${amount.toLocaleString()} earned
      </div>
    </div>
  );
};

export default ReviewCard;
