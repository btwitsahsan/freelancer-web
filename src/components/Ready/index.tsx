"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import FloatingImage from "../Landing/FloatingImage";
import { useRouter } from "next/navigation";

const Ready = () => {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const router = useRouter();

  const fadeIn = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
  };

  const handleCreateAccount = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setErrorMessage("Please enter a valid email address.");
    } else {
      setErrorMessage(null);
      router.push(`/sign-up?email=${encodeURIComponent(email)}`);
    }
  };

  return (
    <div className="flex w-full justify-center">
      <div className="w-full">
        <motion.div
          className="relative bg-gradient-to-r from-[#198BD833] to-[#F03DCE33] rounded-lg"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={fadeIn}
        >
          <Image
            src="/image/ready-freelancer.png"
            alt="ready freelancer"
            width={1434}
            height={50}
            className="absolute w-full h-full bottom-0 opacity-50 z-1"
          />

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={fadeIn}
          >
            <FloatingImage
              src="/image/design-engineer.svg"
              alt="design engineer"
              width={207}
              height={70}
              className="absolute top-[35px] right-[40px] hidden md:block"
            />
          </motion.div>

          <div className="px-6 py-12 md:py-[50px] md:px-[50px] flex flex-col md:flex-row items-center gap-10 md:gap-[100px] z-20">
  <motion.div
    className="w-full md:w-2/5"
    initial="hidden"
    whileInView="visible"
    variants={fadeIn}
  >
    <h2 className="mb-5 font-medium text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-gradientStart to-gradientEnd z-10 w-fit">
      <span className="text-black">Ready to</span> Freelance Smarter?
    </h2>
    <span className="font-jost text-base md:text-xl">
      Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
    </span>
    <div className="w-full bg-white mt-6 p-2 rounded-lg flex flex-col sm:flex-row items-center gap-3 border border-solid border-white hover:border-gray400 focus-within:!border-blue400 transition-all">
      <input
        className="w-full pl-2 font-jost text-base focus:outline-none z-10"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button
        className="z-10 py-3 px-6 bg-gradient-to-r from-gradientStart to-gradientEnd rounded-lg font-jost text-base text-white whitespace-nowrap hover:drop-shadow-xl transition-all"
        onClick={handleCreateAccount}
      >
        Create an Account
      </button>
    </div>
    {errorMessage && (
      <div className="mt-2 text-red500">{errorMessage}</div>
    )}
  </motion.div>

  <motion.div
    initial="hidden"
    whileInView="visible"
    variants={fadeIn}
    className="w-full md:w-auto"
  >
    <FloatingImage
      src="/image/product-designer.svg"
      alt="product designer"
      width={281}
      height={173}
      className="z-10 mx-auto md:mx-0"
    />
  </motion.div>
</div>

        </motion.div>
      </div>
    </div>
  );
};

export default Ready;
