import Image from "next/image";
import Link from "next/link";

import { FaInstagram } from "react-icons/fa";
import { PiLinkedinLogo } from "react-icons/pi";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  const MenuList = [
    { title: "Why Choose Us" },
    { title: "Core Features" },
    { title: "Explore Plans" },
  ];

  return (
    <div className="w-full flex flex-col justify-center px-4 sm:px-8">

      <div className="flex justify-center w-full py-10 border-y border-gray-200">
        <div className="w-full max-w-[1440px] flex flex-col md:flex-row items-center justify-between gap-6 md:gap-0">

          <Link href="/" className="flex items-center gap-3 md:w-[112px]">
            <Image src="/image/logo.svg" alt="logo" width={50} height={50} />
          </Link>

          <ul className="flex flex-wrap justify-center gap-6 font-jost text-base capitalize">
            {MenuList.map((item, index) => (
              <li key={index} className="hover:underline">
                <Link href="#">{item.title}</Link>
              </li>
            ))}
          </ul>

          <div className="flex gap-5">
            <Link href="https://linkedin.com" target="_blank">
              <PiLinkedinLogo size={24} color="#171718" />
            </Link>
            <Link href="https://instagram.com" target="_blank">
              <FaInstagram size={24} color="#171718" />
            </Link>
            <Link href="https://x.com" target="_blank">
              <FaXTwitter size={24} color="#171718" />
            </Link>
          </div>
        </div>
      </div>

      <p className="py-6 text-center text-base font-jost text-gray-600">
        © 2024 TheFreelanceWebsite, All Rights Reserved.
      </p>
    </div>
  );
};

export default Footer;
