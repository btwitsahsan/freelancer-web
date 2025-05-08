"use client";
import Image from "next/image";
import FloatingImage from "./FloatingImage";
import { motion } from "framer-motion";
import Link from "next/link";

const Landing = () => {
  return (
    <motion.div
      // className="relative mx-0 md:mx-10 h-[800px] bg-gradient-to-r from-[#198cd852] to-[#f03dcf52] rounded-lg"
      className="relative mx-0 md:mx-10 h-[800px] md:h-[900px] bg-gradient-to-r from-[#198cd852] to-[#f03dcf52] rounded-lg"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 0.8, y: 0 }}
        transition={{ duration: 1.2 }}
      >
        <Image
          src="/image/home-header.png"
          alt="home header"
          width={1300}
          height={50}
          className="absolute w-full"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 0.8, y: 0 }}
        transition={{ duration: 1.2 }}
      >
        <Image
          src="/image/home-bottom.png"
          alt="home bottom"
          width={1300}
          height={50}
          className="absolute w-full bottom-0"
        />
      </motion.div>

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, delay: 0.5 }}
      >
        <FloatingImage
          src="/image/customer-success.svg"
          alt="customer success"
          width={272}
          height={110}
          className="absolute top-[60px] left-[5%] md:top-[100px] md:left-[170px]"
        />
      </motion.div>

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, delay: 0.8 }}
      >
        <FloatingImage
          src="/image/design-engineer.svg"
          alt="design engineer"
          width={207}
          height={70}
          className="absolute top-[200px] right-[10%] md:top-[240px] md:right-[170px]"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.8 }}
      >
        <FloatingImage
          src="/image/product-designer.svg"
          alt="product designer"
          width={281}
          height={173}
          className="absolute left-[40%] md:left-[3%] bottom-[70px] md:bottom-[100px] lg:bottom-[90px]"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.5 }}
      >
        <FloatingImage
          src="/image/top-job-categories.svg"
          alt="top job categories"
          width={307}
          height={239}
          className="absolute right-[5%] md:right-[3%] lg:right-[5%] hidden md:block md:bottom-[45px] lg:bottom-[30px]"
        />
      </motion.div>

      <div className="relative flex flex-col items-center justify-center h-full text-center z-1">
        <motion.div
          className="font-medium bg-clip-text text-transparent bg-gradient-to-r from-gradientStart to-gradientEnd px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 1 }}
        >
          <h2 className="text-lg md:text-2xl">
            A Platform <span className="text-black">Built for the Future</span>
          </h2>
          <h1 className="text-3xl md:text-5xl lg:text-[64px] leading-tight">
            <span className="text-black">Freelance Smarter,</span> Earn More!
          </h1>
        </motion.div>

        <motion.span
          className="font-jost text-sm sm:text-base md:text-xl w-11/12 md:w-2/3 lg:w-1/2 mt-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 1.2 }}
        >
          Seamless crypto payments, secure contracts, AI-powered security, and
          personalized tools — all in one place. Join the revolution today.
        </motion.span>

        <motion.button
          className="z-10 mt-6 md:mt-10 font-jost text-sm md:text-base text-white capitalize hover:drop-shadow-xl transition-all"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          <Link
            href="/sign-up"
            className="py-2 px-5 md:py-3 md:px-7 bg-gradient-to-r from-gradientStart to-gradientEnd rounded-lg"
          >
            Start Freelancing Career
          </Link>
        </motion.button>
      </div>
    </motion.div>
  );
};

export default Landing;
