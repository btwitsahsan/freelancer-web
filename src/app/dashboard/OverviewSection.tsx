"use client"

import { useEffect, useRef, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import DraftJobPostCard from "./DraftJobPostCard";
import JobPostCard from "./JobPostCard";
import PostJobButton from "./PostJobButton";

import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

import "swiper/css";
import "swiper/css/navigation";
import axios from "axios";
import { ProjectType, apiUrl } from "@/utils/constant";

const OverviewSection = () => {
    const prevRef = useRef(null);
    const nextRef = useRef(null);
    const [projects, setProjects] = useState<ProjectType[]>([]);

    useEffect(() => {
        const token = localStorage.getItem('freelancingPlatformAuthToken');

        axios
            .get(`${apiUrl}/api/projects`, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            })
            .then(res => {
                setProjects(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, [])

    return (
        <div className="w-full flex-col justify-start items-start gap-4 flex">
            <div className="w-full text-black text-2xl font-semibold">Overview</div>

            <div className="flex items-center gap-1.5 w-full">
                <button
                    ref={prevRef}
                    className="flex justify-center items-center w-6 h-6 border border-context rounded-full"
                >
                    <FaAngleLeft width={20} height={20} />
                </button>
                <Swiper
                    spaceBetween={10}
                    slidesPerView={3}
                    modules={[Navigation]}
                    onSlideChange={() => console.log("slide change")}
                    onSwiper={(swiper) => console.log(swiper)}
                    navigation={{
                        prevEl: prevRef.current,
                        nextEl: nextRef.current,
                    }}
                    className="flex-1"
                >
                    {
                        projects.length ? projects.map((project) => {
                            return (
                                <SwiperSlide key={`project-${project._id}`}>
                                    <JobPostCard project={project} />
                                </SwiperSlide>
                            )
                        }) : <PostJobButton />
                    }
                    <SwiperSlide>
                        <DraftJobPostCard />
                    </SwiperSlide>
                    <SwiperSlide>
                        <PostJobButton />
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

export default OverviewSection;
