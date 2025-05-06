"use client"

import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import TalentCard from "./TalentCard";

import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

import "swiper/css";
import "swiper/css/navigation";

const TalentSection = () => {
    const prevRef = useRef(null);
    const nextRef = useRef(null);

    return (
        <div className="w-full flex-col justify-start items-start gap-4 flex">
            <div className="w-full flex-col justify-start items-start gap-1 flex">
                <div className="w-full justify-start items-center gap-2 flex">
                    <div className="text-black text-2xl font-semibold">
                        Personalized talent
                    </div>
                    <div data-svg-wrapper className="relative">
                        <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M8.00016 14.6673C11.6821 14.6673 14.6668 11.6825 14.6668 8.00065C14.6668 4.31875 11.6821 1.33398 8.00016 1.33398C4.31826 1.33398 1.3335 4.31875 1.3335 8.00065C1.3335 11.6825 4.31826 14.6673 8.00016 14.6673Z"
                                stroke="#141B34"
                                stroke-width="1.5"
                            />
                            <path
                                d="M6.6665 5.99935C6.6665 5.26297 7.26344 4.66602 7.99984 4.66602C8.73624 4.66602 9.33317 5.26297 9.33317 5.99935C9.33317 6.26478 9.25564 6.5121 9.1219 6.71988C8.72344 7.33915 7.99984 7.92962 7.99984 8.66602V8.99935"
                                stroke="#141B34"
                                stroke-width="1.5"
                                stroke-linecap="round"
                            />
                            <path
                                d="M7.99463 11.334H8.00063"
                                stroke="#141B34"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                        </svg>
                    </div>
                </div>
                <div className="w-full justify-start items-start gap-4 flex">
                    <div className="justify-start items-center gap-2 flex">
                        <div className="text-green500 text-base font-medium">Refresh</div>
                        <div data-svg-wrapper className="relative">
                            <svg
                                width="12"
                                height="12"
                                viewBox="0 0 12 12"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M8 3H10M10 3C10 3 9.8209 2.77954 9.72685 2.66667C8.8113 1.64375 7.48085 1 6 1C3.23857 1 1 3.23857 1 6C1 8.7614 3.23857 11 6 11C8.7614 11 11 8.7614 11 6M10 3L10.0046 1"
                                    stroke="#10B981"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                />
                            </svg>
                        </div>
                    </div>
                    <div className="justify-start items-center gap-2 flex">
                        <div className="text-green500 text-base font-medium">
                            Browse talent
                        </div>
                        <div data-svg-wrapper className="relative">
                            <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M13.3332 8H2.6665"
                                    stroke="#10B981"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                />
                                <path
                                    d="M10.0001 11.3327C10.0001 11.3327 13.3333 8.87775 13.3333 7.99935C13.3333 7.12095 10 4.66602 10 4.66602"
                                    stroke="#10B981"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex items-center gap-1.5 w-full">
                <button
                    ref={prevRef}
                    className="flex justify-center items-center w-6 h-6 border border-context rounded-full"
                >
                    <FaAngleLeft width={20} height={20} />
                </button>
                <Swiper
                    spaceBetween={10}
                    slidesPerView={3.5}
                    modules={[Navigation]}
                    onSlideChange={() => console.log("slide change")}
                    onSwiper={(swiper) => console.log(swiper)}
                    navigation={{
                        prevEl: prevRef.current,
                        nextEl: nextRef.current,
                    }}
                    className="flex-1"
                >
                    <SwiperSlide>
                        <TalentCard />
                    </SwiperSlide>
                    <SwiperSlide>
                        <TalentCard />
                    </SwiperSlide>
                    <SwiperSlide>
                        <TalentCard />
                    </SwiperSlide>
                    <SwiperSlide>
                        <TalentCard />
                    </SwiperSlide>
                </Swiper>
                <button
                    ref={nextRef}
                    className="flex justify-center items-center w-6 h-6 border border-context rounded-full"
                >
                    <FaAngleRight width={20} height={20} />
                </button>
            </div>
        </div>
    );
};

export default TalentSection 