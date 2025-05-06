"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

const Plan = () => {
  const PlanList = [
    {
      title: "$10/month.",
      content: "Get started with the essentials",
    },
    {
      title: "$20/month.",
      content: "Unlock comprehensive features",
    },
    {
      title: "Contact us.",
      content:
        "For top-tier professionals, with exclusive tools and priority search placement.",
    },
  ];

  const fadeIn = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  return (
    <div className="relative flex justify-center w-full" id="explore-plan">
      <div className="absolute right-[-130px] animate-floatingY">
        <Image
          src="/image/cube.svg"
          alt="cube"
          width={318}
          height={341}
          className="opacity-20 rotate-[-30deg]"
        />
      </div>

      <motion.div
        className="w-full flex flex-col gap-16 items-center p-4 md:p-0"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        variants={fadeIn}
      >
        <motion.h2
          className="font-medium text-5xl text-transparent bg-clip-text bg-gradient-to-r from-gradientStart to-gradientEnd text-center"
          variants={fadeIn}
        >
          <span className="text-black">Simple</span> Subscription Plans
        </motion.h2>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-5"
          initial="hidden"
          whileInView="visible"
          variants={containerVariants}
        >
          {PlanList.map((item, index) => (
            <motion.div
              className="relative inline-block p-[1px] text-center"
              key={index}
              variants={fadeIn}
            >
              <div className="relative z-10 bg-gray100 h-[230px] rounded-lg flex flex-col items-center justify-center">
                <h3 className="font-medium text-5xl text-black pb-3">
                  {item.title}
                </h3>
                <span className="font-jost text-xl w-4/5">{item.content}</span>
              </div>
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-gradientStart to-gradientEnd"></div>
            </motion.div>
          ))}
        </motion.div>

        <div className="flex flex-col gap-8">
          <motion.span
            className="font-jost text-xl text-center"
            variants={fadeIn}
          >
            Sign up today and choose a plan that suits your needs.
          </motion.span>

          <motion.button
            className="z-10 font-jost text-base text-white capitalize hover:drop-shadow-xl transition-all"
            variants={fadeIn}
          >
            <Link
              href="/sign-up"
              className="py-3 px-7 bg-gradient-to-r from-gradientStart to-gradientEnd rounded-lg"
            >
              Start Freelancing Career
            </Link>
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default Plan;
