"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const Feature = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
  };

  return (
    <div className="relative w-full flex justify-center px-4 md:px-8">

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        variants={fadeIn}
        className="absolute left-[-100px] top-[50px] hidden sm:block"
      >
        <Image
          src="/image/cube.svg"
          alt="cube"
          width={250}
          height={250}
          className="opacity-20 rotate-[-30deg]"
        />
      </motion.div>


      <div className="w-3/4 md:w-2/3 mx-auto">
        <motion.h2
          className="text-3xl sm:text-4xl md:text-5xl lg:text-[2rem] text-center leading-snug sm:leading-tight text-transparent bg-clip-text bg-gradient-to-r from-gradientStart to-gradientEnd"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={fadeIn}
        >
          Join the Future of Freelancing{" "}
          <span className="text-black">
            Start working with lower fees, more security, and tools that
          </span>{" "}
          make your projects seamless.
        </motion.h2>
      </div>
    </div>
  );
};

export default Feature;
