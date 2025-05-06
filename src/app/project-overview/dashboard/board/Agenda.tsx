import React from "react";
import Collapsible from "./Collapsible";

const Agenda: React.FC = () => {
  return (
    <Collapsible title="Agenda">
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-6">
          <div className="text-black text-xs font-normal">Feb 13, Thu</div>
          <div data-svg-wrapper>
            {/* Example SVG for a date slider */}
            <svg width="36" height="16" viewBox="0 0 36 16" fill="none">
              <path
                d="M10 4C10 4 6 6.94593 6 8C6 9.05413 10 12 10 12"
                stroke="#374151"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M26 4C26 4 30 6.94593 30 8C30 9.05413 26 12 26 12"
                stroke="#374151"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-black text-xs">Today</div>
          <div data-svg-wrapper className="relative">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 1.33301V2.66634M4 1.33301V2.66634"
                stroke="#374151"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M7.997 8.66699H8.003M7.997 11.3337H8.003M10.6607 8.66699H10.6667M5.33334 8.66699H5.33932M5.33334 11.3337H5.33932"
                stroke="#374151"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M2.33334 5.33301H13.6667"
                stroke="#374151"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M1.66666 8.16213C1.66666 5.25729 1.66666 3.80485 2.50141 2.90243C3.33616 2 4.67966 2 7.36666 2H8.63333C11.3203 2 12.6639 2 13.4986 2.90243C14.3333 3.80485 14.3333 5.25729 14.3333 8.16213V8.50453C14.3333 11.4094 14.3333 12.8618 13.4986 13.7643C12.6639 14.6667 11.3203 14.6667 8.63333 14.6667H7.36666C4.67966 14.6667 3.33616 14.6667 2.50141 13.7643C1.66666 12.8618 1.66666 11.4094 1.66666 8.50453V8.16213Z"
                stroke="#374151"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M2 5.33301H14"
                stroke="#374151"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-400 mt-4 flex flex-col items-center justify-center min-h-40">
        <div data-svg-wrapper className="relative">
          <svg
            width="65"
            height="64"
            viewBox="0 0 65 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0_4572_930)">
              <g filter="url(#filter0_d_4572_930)">
                <path
                  d="M8 24.7118V47.667C8 50.667 9.5 52.167 12.5 52.167H51.5C54.5 52.167 56 50.667 56 47.667V24.7118M8 24.7118V19.667C8 16.667 9.5 15.334 12.5 15.334H51.5C54.5 15.334 56 16.667 56 19.667V24.7118M8 24.7118H56"
                  stroke="#9CA3AF"
                  stroke-width="1.5"
                  stroke-linejoin="round"
                />
              </g>
              <g filter="url(#filter1_d_4572_930)">
                <path
                  d="M18.6667 11V19"
                  stroke="#9CA3AF"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </g>
              <g filter="url(#filter2_d_4572_930)">
                <path
                  d="M45.3333 11V19"
                  stroke="#9CA3AF"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </g>
              <g filter="url(#filter3_d_4572_930)">
                <path
                  d="M48 31H42.6667"
                  stroke="#9CA3AF"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </g>
              <g filter="url(#filter4_d_4572_930)">
                <path
                  d="M48 45H42.6667"
                  stroke="#9CA3AF"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </g>
              <g filter="url(#filter5_d_4572_930)">
                <path
                  d="M34.6667 31H29.3333"
                  stroke="#9CA3AF"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </g>
              <g filter="url(#filter6_d_4572_930)">
                <path
                  d="M34.6667 45H29.3333"
                  stroke="#9CA3AF"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </g>
              <g filter="url(#filter7_d_4572_930)">
                <path
                  d="M21.3333 31H16"
                  stroke="#9CA3AF"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </g>
              <g filter="url(#filter8_d_4572_930)">
                <path
                  d="M21.3333 45H16"
                  stroke="#9CA3AF"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </g>
              <g filter="url(#filter9_d_4572_930)">
                <path
                  d="M48 38H42.6667"
                  stroke="#9CA3AF"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </g>
              <g filter="url(#filter10_d_4572_930)">
                <path
                  d="M34.6667 38H29.3333"
                  stroke="#9CA3AF"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </g>
              <g filter="url(#filter11_d_4572_930)">
                <path
                  d="M21.3333 38H16"
                  stroke="#9CA3AF"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </g>
            </g>
            <defs>
              <filter
                id="filter0_d_4572_930"
                x="-26.0833"
                y="14.584"
                width="116.167"
                height="105"
                filterUnits="userSpaceOnUse"
                color-interpolation-filters="sRGB"
              >
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
                />
                <feOffset dy="33.3333" />
                <feGaussianBlur stdDeviation="16.6667" />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
                />
                <feBlend
                  mode="normal"
                  in2="BackgroundImageFix"
                  result="effect1_dropShadow_4572_930"
                />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="effect1_dropShadow_4572_930"
                  result="shape"
                />
              </filter>
              <filter
                id="filter1_d_4572_930"
                x="-15.4167"
                y="10.25"
                width="68.1667"
                height="76.1667"
                filterUnits="userSpaceOnUse"
                color-interpolation-filters="sRGB"
              >
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
                />
                <feOffset dy="33.3333" />
                <feGaussianBlur stdDeviation="16.6667" />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
                />
                <feBlend
                  mode="normal"
                  in2="BackgroundImageFix"
                  result="effect1_dropShadow_4572_930"
                />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="effect1_dropShadow_4572_930"
                  result="shape"
                />
              </filter>
              <filter
                id="filter2_d_4572_930"
                x="11.25"
                y="10.25"
                width="68.1667"
                height="76.1667"
                filterUnits="userSpaceOnUse"
                color-interpolation-filters="sRGB"
              >
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
                />
                <feOffset dy="33.3333" />
                <feGaussianBlur stdDeviation="16.6667" />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
                />
                <feBlend
                  mode="normal"
                  in2="BackgroundImageFix"
                  result="effect1_dropShadow_4572_930"
                />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="effect1_dropShadow_4572_930"
                  result="shape"
                />
              </filter>
              <filter
                id="filter3_d_4572_930"
                x="8.58332"
                y="30.25"
                width="73.5"
                height="68.1667"
                filterUnits="userSpaceOnUse"
                color-interpolation-filters="sRGB"
              >
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
                />
                <feOffset dy="33.3333" />
                <feGaussianBlur stdDeviation="16.6667" />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
                />
                <feBlend
                  mode="normal"
                  in2="BackgroundImageFix"
                  result="effect1_dropShadow_4572_930"
                />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="effect1_dropShadow_4572_930"
                  result="shape"
                />
              </filter>
              <filter
                id="filter4_d_4572_930"
                x="8.58332"
                y="44.25"
                width="73.5"
                height="68.1667"
                filterUnits="userSpaceOnUse"
                color-interpolation-filters="sRGB"
              >
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
                />
                <feOffset dy="33.3333" />
                <feGaussianBlur stdDeviation="16.6667" />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
                />
                <feBlend
                  mode="normal"
                  in2="BackgroundImageFix"
                  result="effect1_dropShadow_4572_930"
                />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="effect1_dropShadow_4572_930"
                  result="shape"
                />
              </filter>
              <filter
                id="filter5_d_4572_930"
                x="-4.74999"
                y="30.25"
                width="73.5"
                height="68.1667"
                filterUnits="userSpaceOnUse"
                color-interpolation-filters="sRGB"
              >
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
                />
                <feOffset dy="33.3333" />
                <feGaussianBlur stdDeviation="16.6667" />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
                />
                <feBlend
                  mode="normal"
                  in2="BackgroundImageFix"
                  result="effect1_dropShadow_4572_930"
                />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="effect1_dropShadow_4572_930"
                  result="shape"
                />
              </filter>
              <filter
                id="filter6_d_4572_930"
                x="-4.74999"
                y="44.25"
                width="73.5"
                height="68.1667"
                filterUnits="userSpaceOnUse"
                color-interpolation-filters="sRGB"
              >
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
                />
                <feOffset dy="33.3333" />
                <feGaussianBlur stdDeviation="16.6667" />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
                />
                <feBlend
                  mode="normal"
                  in2="BackgroundImageFix"
                  result="effect1_dropShadow_4572_930"
                />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="effect1_dropShadow_4572_930"
                  result="shape"
                />
              </filter>
              <filter
                id="filter7_d_4572_930"
                x="-18.0833"
                y="30.25"
                width="73.5"
                height="68.1667"
                filterUnits="userSpaceOnUse"
                color-interpolation-filters="sRGB"
              >
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
                />
                <feOffset dy="33.3333" />
                <feGaussianBlur stdDeviation="16.6667" />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
                />
                <feBlend
                  mode="normal"
                  in2="BackgroundImageFix"
                  result="effect1_dropShadow_4572_930"
                />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="effect1_dropShadow_4572_930"
                  result="shape"
                />
              </filter>
              <filter
                id="filter8_d_4572_930"
                x="-18.0833"
                y="44.25"
                width="73.5"
                height="68.1667"
                filterUnits="userSpaceOnUse"
                color-interpolation-filters="sRGB"
              >
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
                />
                <feOffset dy="33.3333" />
                <feGaussianBlur stdDeviation="16.6667" />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
                />
                <feBlend
                  mode="normal"
                  in2="BackgroundImageFix"
                  result="effect1_dropShadow_4572_930"
                />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="effect1_dropShadow_4572_930"
                  result="shape"
                />
              </filter>
              <filter
                id="filter9_d_4572_930"
                x="8.58332"
                y="37.25"
                width="73.5"
                height="68.1667"
                filterUnits="userSpaceOnUse"
                color-interpolation-filters="sRGB"
              >
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
                />
                <feOffset dy="33.3333" />
                <feGaussianBlur stdDeviation="16.6667" />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
                />
                <feBlend
                  mode="normal"
                  in2="BackgroundImageFix"
                  result="effect1_dropShadow_4572_930"
                />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="effect1_dropShadow_4572_930"
                  result="shape"
                />
              </filter>
              <filter
                id="filter10_d_4572_930"
                x="-4.74999"
                y="37.25"
                width="73.5"
                height="68.1667"
                filterUnits="userSpaceOnUse"
                color-interpolation-filters="sRGB"
              >
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
                />
                <feOffset dy="33.3333" />
                <feGaussianBlur stdDeviation="16.6667" />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
                />
                <feBlend
                  mode="normal"
                  in2="BackgroundImageFix"
                  result="effect1_dropShadow_4572_930"
                />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="effect1_dropShadow_4572_930"
                  result="shape"
                />
              </filter>
              <filter
                id="filter11_d_4572_930"
                x="-18.0833"
                y="37.25"
                width="73.5"
                height="68.1667"
                filterUnits="userSpaceOnUse"
                color-interpolation-filters="sRGB"
              >
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
                />
                <feOffset dy="33.3333" />
                <feGaussianBlur stdDeviation="16.6667" />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
                />
                <feBlend
                  mode="normal"
                  in2="BackgroundImageFix"
                  result="effect1_dropShadow_4572_930"
                />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="effect1_dropShadow_4572_930"
                  result="shape"
                />
              </filter>
              <clipPath id="clip0_4572_930">
                <rect
                  width="64"
                  height="64"
                  fill="white"
                  transform="translate(0.5)"
                />
              </clipPath>
            </defs>
          </svg>
        </div>
        <div className="text-gray-400 text-xs">
          No events scheduled for today.
        </div>
      </div>
    </Collapsible>
  );
};

export default Agenda;
