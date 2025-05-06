import Image from "next/image";

interface CommunityItemProps {
    id: number;
    image: string;
}

const CommunityItem: React.FC<CommunityItemProps> = ({ id, image }) => {
    return (
        <button className="inline-flex relative flex-col justify-start items-start bg-gray-100 border border-gray-100 rounded-xl max-w-[320px] h-[276px]">
                    <Image
                      className="self-stretch rounded-tl-xl rounded-tr-xl h-40"
                      src={image}
                      width={320}
                      height={180}
                      alt="server"
                    />
                    <div data-svg-wrapper className="top-[140px] left-[18px] absolute">
                      <svg
                        width="41"
                        height="40"
                        viewBox="0 0 41 40"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          x="1.33337"
                          y="1"
                          width="38"
                          height="38"
                          rx="7"
                          fill="#10B981"
                        />
                        <rect
                          x="1.33337"
                          y="1"
                          width="38"
                          height="38"
                          rx="7"
                          stroke="#F3F4F6"
                          stroke-width="2"
                        />
                        <path
                          d="M22.0001 16.666H18.6667C16.5984 16.666 16.1667 17.0977 16.1667 19.166V28.3327H24.5001V19.166C24.5001 17.0977 24.0684 16.666 22.0001 16.666Z"
                          stroke="white"
                          stroke-width="1.5"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M19.5 20H21.1667M19.5 22.5H21.1667M19.5 25H21.1667"
                          stroke="white"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M27.8334 28.3327V16.8207C27.8334 15.7971 27.8334 15.2854 27.5845 14.8741C27.3356 14.4628 26.8873 14.2339 25.9908 13.7762L22.3727 11.9288C21.4057 11.4351 21.1667 11.6091 21.1667 12.69V16.4189"
                          stroke="white"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M12.8334 28.3333V20.8333C12.8334 20.1439 12.9773 20 13.6667 20H16.1667"
                          stroke="white"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M28.6667 28.334H12"
                          stroke="white"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </div>
        
                    <div className="flex flex-col justify-center items-center self-stretch gap-1 p-5 h-[116px]">
                      <div className="inline-flex justify-start items-center self-stretch gap-1">
                        <div className="relative w-4 h-4 overflow-hidden">
                          <div className="top-[0.51px] left-[0.50px] absolute w-[15px] h-[14.99px]">
                            <div className="top-[4.21px] left-[3.31px] absolute bg-white w-[8.62px] h-[6.94px]" />
                            <div data-svg-wrapper className="top-0 left-0 absolute">
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M15.125 7.09022L14.687 6.65222C14.507 6.47222 14.3985 6.06822 14.4645 5.82222L14.6245 5.22372C14.7135 4.89322 14.6675 4.54672 14.495 4.24922C14.323 3.95122 14.0465 3.73872 13.716 3.65022L13.117 3.48972C12.871 3.42372 12.5755 3.12822 12.509 2.88222L12.349 2.28372C12.17 1.61422 11.447 1.19272 10.775 1.37472L10.177 1.53472C9.9465 1.59572 9.5185 1.48372 9.347 1.31272L8.9085 0.873719C8.425 0.391219 7.576 0.390719 7.0915 0.874219L6.653 1.31272C6.4815 1.48522 6.052 1.59672 5.823 1.53522L5.2245 1.37472C4.552 1.19572 3.8295 1.61522 3.65 2.28372L3.4905 2.88172C3.4245 3.12822 3.1285 3.42422 2.8825 3.48972L2.2845 3.64972C1.9535 3.73872 1.6765 3.95172 1.5045 4.24972C1.3325 4.54772 1.287 4.89322 1.376 5.22272L1.536 5.82172C1.602 6.06822 1.4945 6.47172 1.3135 6.65172L0.876 7.08972C0.6335 7.33272 0.5 7.65522 0.5 7.99922C0.5 8.34322 0.633 8.66572 0.875 8.90772L1.3125 9.34522C1.4925 9.52572 1.601 9.93022 1.5355 10.1762L1.3755 10.7747C1.287 11.1052 1.333 11.4517 1.505 11.7492C1.677 12.0472 1.954 12.2597 2.2845 12.3477L2.882 12.5077C3.129 12.5742 3.4245 12.8702 3.491 13.1157L3.651 13.7142C3.83 14.3822 4.5525 14.8017 5.225 14.6227L5.823 14.4627C6.054 14.4012 6.4815 14.5132 6.6535 14.6847L7.0915 15.1227C7.3335 15.3657 7.6565 15.4992 8.0005 15.4992C8.3445 15.4992 8.667 15.3657 8.909 15.1237L9.348 14.6857C9.5195 14.5132 9.9415 14.4002 10.1785 14.4637L10.7755 14.6232C10.8835 14.6522 10.995 14.6672 11.1065 14.6672H11.107C11.688 14.6672 12.1995 14.2757 12.3495 13.7142L12.509 13.1172C12.5755 12.8707 12.8715 12.5747 13.1175 12.5087L13.716 12.3487C14.4005 12.1642 14.808 11.4577 14.6235 10.7752L14.464 10.1767C14.398 9.93022 14.506 9.52622 14.686 9.34622L15.1245 8.90822C15.626 8.40572 15.6255 7.59072 15.125 7.09022ZM11.3535 6.35272L7.3535 10.3527C7.256 10.4502 7.128 10.4992 7 10.4992C6.872 10.4992 6.744 10.4502 6.6465 10.3527L4.6465 8.35272C4.451 8.15722 4.451 7.84122 4.6465 7.64572C4.842 7.45022 5.158 7.45022 5.3535 7.64572L7 9.29222L10.6465 5.64572C10.842 5.45022 11.158 5.45022 11.3535 5.64572C11.549 5.84122 11.549 6.15722 11.3535 6.35272Z"
                                  fill="#10B981"
                                />
                              </svg>
                            </div>
                          </div>
                        </div>
                        <div className="font-['DM font-medium text-gray-500 text-base leading-tight Sans']">
                          Server {id}
                        </div>
                      </div>
                      <div className="self-stretch text-[10px] text-gray-500 text-left leading-3">
                        This is a paragraph with more information about something
                        important. This something has many uses and is made of 100%
                        recycled material.
                      </div>
                      <div className="inline-flex justify-start items-center self-stretch gap-2.5">
                        <div className="flex justify-start items-center gap-1">
                          <div className="bg-[#12b669] rounded-sm w-1 h-1" />
                          <div className="font-['DM font-normal text-[#12b669] text-[8px] leading-3 Sans']">
                            1,456,156 Online
                          </div>
                        </div>
                        <div className="flex justify-start items-center gap-1">
                          <div className="bg-gray-500 rounded-sm w-1 h-1" />
                          <div className="font-['DM font-normal text-[8px] text-gray-500 leading-3 Sans']">
                            2,123,241 Members
                          </div>
                        </div>
                      </div>
                    </div>
                  </button>
    )
}

export default CommunityItem;