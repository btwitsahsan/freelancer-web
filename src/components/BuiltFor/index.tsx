"use client";

import { useState } from "react";
import Image from "next/image";
import { Icons } from "@/icons";
import { motion } from "framer-motion";
import Link from "next/link";

const BuiltFor = () => {
  const [selected, setSelected] = useState(0);
  const FeaturesList = [
    {
      title: "Web Developers",
      content: (
        <span>
          Present live projects, case{" "}
          <span className="text-black font-normal">
            studies, and client reviews.
          </span>
        </span>
      ),
      image: "/image/developer.png",
    },
    {
      title: "Video Editors",
      content: (
        <span>
          Share full videos, showreels,{" "}
          <span className="text-black font-normal">
            and behind-the-scenes footage.
          </span>
        </span>
      ),
      image: "/image/editor.png",
    },
    {
      title: "Graphic Designers",
      content: (
        <span>
          Showcase your best work{" "}
          <span className="text-black font-normal">
            with customizable portfolios.
          </span>
        </span>
      ),
      image: "/image/designer.png",
    },
    {
      title: "Copy Writers",
      content: (
        <span>
          Organize articles, blogs,{" "}
          <span className="text-black font-normal">
            and published works with ease.
          </span>
        </span>
      ),
      image: "/image/writer.png",
    },
  ];

  const fadeIn = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
  };

  return (
    <div className="relative w-full flex flex-row justify-center" id="core-features">
      <div className="absolute right-[-170px] top-[420px] animate-floatingY">
        <Image
          src="/image/cube.svg"
          alt="cube"
          width={318}
          height={341}
          className="opacity-20 rotate-[-30deg]"
        />
      </div>
      <div className="w-full flex flex-col gap-24 lg:gap-48 px-4 md:px-8">
        <div className="flex flex-col justify-center gap-16">
          <motion.h2
            className="text-3xl md:text-4xl lg:text-5xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-gradientStart to-gradientEnd text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={fadeIn}
          >
            <span className="text-black">Built for</span> Every Freelancer
          </motion.h2>

          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            {FeaturesList.map(
              (item, key) =>
                selected === key && (
                  <motion.div
                    key={key}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={fadeIn}
                    className="basis-1/2"
                  >
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={670}
                      height={568}
                      className="rounded-lg w-full h-auto max-w-[500px] mx-auto"
                    />
                  </motion.div>
                )
            )}

            <div className="flex flex-col items-start justify-start w-auto">
              <motion.h3
                className="text-2xl md:text-3xl lg:text-[32px] font-medium text-black"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                variants={fadeIn}
              >
                Tailored Tools for Every Profession
              </motion.h3>
              <motion.span
                className="text-lg md:text-xl font-jost mt-1"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                variants={fadeIn}
              >
                No matter what you do, our platform is built to support you.
              </motion.span>

              <motion.div
                className="flex flex-wrap mid:flex-row mt-[50px] gap-2"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                variants={fadeIn}
              >
                {FeaturesList.map((item, key) => (
                  <div
                    className="group relative inline-block p-[1px]"
                    key={key}
                    onClick={() => setSelected(key)}
                  >
                    <button
                      className={`group relative z-10 px-4 py-3 text-base rounded-lg uppercase font-jost ${
                        selected === key
                          ? "bg-white drop-shadow-[0_4px_4px_#9C9C9C40]"
                          : "bg-gray100"
                      } hover:bg-white hover:drop-shadow-[0_4px_4px_#9C9C9C40] transition-all`}
                    >
                      <span
                        className={`${
                          selected === key
                            ? "opacity-0"
                            : "opacity-100 group-hover:opacity-0"
                        } transition-all`}
                      >
                        {item.title}
                      </span>
                      <span
                        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-transparent bg-clip-text bg-gradient-to-r from-gradientStart to-gradientEnd ${
                          selected === key
                            ? "opacity-100"
                            : "opacity-0 group-hover:opacity-100"
                        } transition-all`}
                      >
                        {item.title}
                      </span>
                    </button>
                    {selected === key ? (
                      <></>
                    ) : (
                      <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-gradientStart to-gradientEnd group-hover:opacity-0 transition-all"></div>
                    )}
                  </div>
                ))}
              </motion.div>

              {FeaturesList.map(
                (item, key) =>
                  selected === key && (
                    <motion.span
                      key={key}
                      className="font-jost font-light text-[40px] leading-tight text-transparent bg-clip-text bg-gradient-to-r from-gradientStart to-gradientEnd mt-[30px]"
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.5 }}
                      variants={fadeIn}
                    >
                      {item.content}
                    </motion.span>
                  )
              )}

              <motion.span
                className="font-jost text-xl mt-8"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                variants={fadeIn}
              >
                No matter your skillset, we&apos;ve got you covered.
              </motion.span>
              <motion.div
                className="font-jost text-base text-white mt-[30px] hover:drop-shadow-xl transition-all"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                variants={fadeIn}
              >
                <Link href="/sign-up" className="px-7 py-3 bg-gradient-to-r from-gradientStart to-gradientEnd rounded-lg">Start Freelancing Career</Link>
              </motion.div>
            </div>
          </div>
        </div>



        <div className="flex flex-col-reverse lg:flex-row items-center gap-12">
          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-2">
              <motion.h4
                className="font-medium text-[32px] leading-none text-black"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                variants={fadeIn}
              >
                Security You Can Count On
              </motion.h4>

              <motion.span
                className="font-jost text-xl leading-none"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                variants={fadeIn}
              >
                We&apos;ve designed our platform to protect your work and
                earnings.
              </motion.span>
            </div>

            <div className="grid grid-cols-2 gap-5">
              <motion.div
                className="group relative inline-block p-[1px]"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                variants={fadeIn}
              >
                <div className="relative flex flex-col h-full z-10 bg-white group-hover:bg-transparent group-hover:text-white rounded-lg p-5 transition-all">
                  <Icons.escrow
                    width="30"
                    height="30"
                    className="mb-4 h-[30px] group-hover:h-0 group-hover:mb-0 transition-all"
                  />

                  <p className="mb-4 font-medium text-xl leading-none">
                    Escrow Payment System
                  </p>
                  <div className="font-jost text-base leading-tight">
                    Payments are held securely until both parties are satisfied.
                  </div>

                  <Icons.bigarrow
                    width="40"
                    height="26"
                    className="ml-auto h-0 mt-0 group-hover:mt-4 group-hover:h-[30px] transition-all"
                  />
                </div>
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-gradientStart to-gradientEnd"></div>
              </motion.div>
              <motion.div
                className="group relative inline-block p-[1px]"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                variants={fadeIn}
              >
                <div className="relative flex flex-col h-full z-10 bg-white group-hover:bg-transparent group-hover:text-white rounded-lg p-5 transition-all">
                  <Icons.dispute
                    width="30"
                    height="30"
                    className="mb-4 h-[30px] group-hover:h-0 group-hover:mb-0 transition-all"
                  />

                  <p className="mb-4 font-medium text-xl leading-none">
                    Dispute Resolution
                  </p>
                  <div className="font-jost text-base leading-tight">
                    Our AI-driven system ensures fair and fast resolution for
                    any issues that arise.
                  </div>

                  <Icons.bigarrow
                    width="40"
                    height="26"
                    className="ml-auto h-0 mt-0 group-hover:mt-4 group-hover:h-[30px] transition-all"
                  />
                </div>
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-gradientStart to-gradientEnd"></div>
              </motion.div>
              <motion.div
                className="group relative inline-block p-[1px]"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                variants={fadeIn}
              >
                <div className="relative flex flex-col h-full z-10 bg-white group-hover:bg-transparent group-hover:text-white rounded-lg p-5 transition-all">
                  <Icons.verify
                    width="30"
                    height="30"
                    className="mb-4 h-[30px] group-hover:h-0 group-hover:mb-0 transition-all"
                  />

                  <p className="mb-4 font-medium text-xl leading-none">
                    Client Verification
                  </p>
                  <div className="font-jost text-base leading-tight">
                    Work only with verified clients to ensure trustworthy
                    projects.
                  </div>

                  <Icons.bigarrow
                    width="40"
                    height="26"
                    className="ml-auto h-0 mt-0 group-hover:mt-4 group-hover:h-[30px] transition-all"
                  />
                </div>
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-gradientStart to-gradientEnd"></div>
              </motion.div>
              <motion.div
                className="group relative inline-block p-[1px]"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                variants={fadeIn}
              >
                <div className="relative flex flex-col h-full z-10 bg-white group-hover:bg-transparent group-hover:text-white rounded-lg p-5 transition-all">
                  <Icons.chat
                    width="30"
                    height="30"
                    className="mb-4 h-[30px] group-hover:h-0 group-hover:mb-0 transition-all"
                  />

                  <p className="mb-4 font-medium text-xl leading-none">
                    Real-Time Messaging
                  </p>
                  <div className="font-jost text-base leading-tight">
                    Instant messaging, with smooth navigation and quick access
                    to conversations.
                  </div>

                  <Icons.bigarrow
                    width="40"
                    height="26"
                    className="ml-auto h-0 mt-0 group-hover:mt-4 group-hover:h-[30px] transition-all"
                  />
                </div>
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-gradientStart to-gradientEnd"></div>
              </motion.div>
            </div>

            <motion.div
              className="font-jost text-xl leading-none h-5"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              variants={fadeIn}
            >
              Your earnings, your privacy, your protection — guaranteed.
            </motion.div>
          </div>

          <motion.div
            className="text-6xl md:text-8xl leading-none text-transparent bg-clip-text bg-gradient-to-r from-gradientStart to-gradientEnd"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={fadeIn}
          >
            <h1 className="text-center hidden lg:block">Secure<br/>Transparent<br/>Fair</h1>
            <h1 className="text-center lg:hidden">Secure Transparent Fair</h1>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default BuiltFor;
