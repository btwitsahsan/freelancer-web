import React, { useState, ReactNode } from "react";

interface CollapsibleProps {
  title: string;
  children: ReactNode;
  defaultCollapsed?: boolean;
}

const Collapsible: React.FC<CollapsibleProps> = ({
  title,
  children,
  defaultCollapsed = false,
}) => {
  const [collapsed, setCollapsed] = useState(defaultCollapsed);

  return (
    <div className="p-3 bg-white rounded-lg border border-gray-400 hover:shadow-lg transition-shadow">
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setCollapsed(!collapsed)}
      >
        <div className="flex items-center gap-2">
          {/* You could inject an icon here if desired */}
          <span className="text-black text-base font-medium">{title}</span>
        </div>
        <button className="text-gray-500 hover:text-black transition-colors">
          {collapsed ? (
            <div data-svg-wrapper className="relative">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.33488 8.84201C4.89782 8.83401 6.76213 8.44674 7.1574 8.84201C7.55267 9.23728 7.1654 11.1016 7.1574 11.6645M8.84567 4.33123C8.83767 4.89416 8.4504 6.75848 8.84567 7.15374C9.24093 7.54901 11.1053 7.16174 11.6682 7.15374M13.9994 1.99902L9.07353 6.92048M6.91273 9.08214L2 14.0003"
                  stroke="#141B34"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          ) : (
            <div data-svg-wrapper className="relative">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.9999 2.17747C11.5629 2.16947 13.4272 1.78219 13.8225 2.17747C14.2177 2.57275 13.8305 4.43706 13.8225 5M13.6706 2.32731L9.0014 6.9974"
                  stroke="#141B34"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M2.1776 11.0007C2.1696 11.5636 1.78231 13.428 2.1776 13.8232C2.57288 14.2185 4.43718 13.8312 5.00012 13.8232M7.00135 8.99902L2.33218 13.6691"
                  stroke="#141B34"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          )}
        </button>
      </div>
      {!collapsed && <div className="mt-4">{children}</div>}
    </div>
  );
};

export default Collapsible;
