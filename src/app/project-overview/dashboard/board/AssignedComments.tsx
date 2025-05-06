import React from 'react';
import Collapsible from './Collapsible';

const AssignedComments: React.FC = () => {
  return (
    <Collapsible title="Assigned comments">
      <div className="flex flex-col items-center justify-center min-h-40">
        <div data-svg-wrapper className="relative">
          {/* Placeholder SVG illustration */}
          <svg width="65" height="64" viewBox="0 0 65 64" fill="none">
            <path
              d="M4.5 9V41H13.5V51.1875L16.75 48.5625L26.1875 41H44.5V9H4.5ZM7.5 12H41.5V38H24.8125L23.25 39.4375L16.5 44.8125V41.4062V38H7.5V12ZM47.5 16V19H56.5V45H48.5V50.8125L40.1875 45H24.1875L20.1875 48H38.8125L51.5 58.1875V48H59.5V16H47.5Z"
              fill="#9CA3AF"
            />
          </svg>
        </div>
        <div>
          <span className="text-gray-400 text-xs">You don’t have any assigned comments. </span>
          <span className="text-emerald-500 text-xs cursor-pointer hover:underline">Learn more</span>
        </div>
      </div>
    </Collapsible>
  );
};

export default AssignedComments;
