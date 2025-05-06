"use client";

import Image from "next/image";
import Link from "next/link";
import { Icons } from "@/icons";
import { useState, useEffect, useRef } from "react";
import HeaderModal from "../Modal/HeaderModal";
import { usePathname } from "next/navigation";
import { useAtom } from "jotai";
import { userAtom } from "@/store/auth";
import IOSSwitch from "../IOSSwitch";
import { getAuth, signOut } from "firebase/auth";

type HeaderProps = {
  white?: boolean;
  round?: boolean;
};

const Header = ({ white = true, round = true }: HeaderProps) => {
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const [user] = useAtom(userAtom);

  useEffect(() => {
    const token = localStorage.getItem("freelancingPlatformAuthToken");
    setIsLoggedIn(!!token);

    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target as Node)
      ) {
        setIsNotificationOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      localStorage.removeItem("freelancingPlatformAuthToken");
      setIsLoggedIn(false);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const LoggedOutMenu = [
    {
      title: "Why Choose Us",
      href: "#why-choose-us",
    },
    {
      title: "Core Features",
      href: "#core-features",
    },
    {
      title: "Explore Plans",
      href: "#explore-plan",
    },
  ];
  const LoggedInMenu = [
    {
      title: "Find Talent",
      href: "/find-talent",
    },
    {
      title: "Messages",
      href: "/messages",
    },
    {
      title: "My Plan",
      href: "/subscription",
    },
    {
      title: "Project Overview",
      href: "/project-overview",
    },
    {
      title: "Post a new job",
      href: "/post-new-job",
    },
    {
      title: "Create Your Profile",
      href: "/set-profile",
    },
  ];

  return (
    <div
      className={`px-10 py-7 h-[10vh] relative flex flex-row items-center justify-between ${
        white ? "bg-white" : ""
      } ${round ? "rounded-b-[20px]" : ""}`}
    >
      <Link
        href="/"
        className="flex justify-center items-center gap-3 cursor-pointer"
      >
        <Image src="/image/logo.svg" alt="logo" width={50} height={50} />
        <span className="font-semibold text-black text-xl">
          The Freelance Website
        </span>
      </Link>

      {!isLoggedIn && (
        <button
          className="md:hidden text-2xl text-black"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      )}

      {!isLoggedIn ? (
        <>
          <ul
            className={`hidden md:flex gap-12 font-jost text-base capitalize list-none`}
          >
            {LoggedOutMenu.map((item, index) => (
              <li key={index} className="cursor-pointer">
                <Link href={item.href}>{item.title}</Link>
              </li>
            ))}
          </ul>
          <div className="hidden md:flex justify-end items-center gap-2 w-[265px]">
            <Link href="/sign-up">
              <button className="bg-gradient-to-r from-gradientStart to-gradientEnd px-7 py-3 rounded-lg font-jost text-base text-white">
                Register
              </button>
            </Link>
            <Link href="/sign-in">
              <button className="px-7 py-3 text-black">Login</button>
            </Link>
          </div>


{/* --------------- Mobile Manu -------------------- */}

<div
  className={`absolute top-[4.2rem] left-0 z-10 bg-[#f3f4f6] w-full overflow-hidden transition-all duration-500 ease-in-out ${
    menuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
  }`}
>
  <ul className="w-full flex items-center md:hidden flex-col gap-4 font-jost text-base capitalize list-none py-4 px-4">
    {LoggedOutMenu.map((item, index) => (
      <li key={index} className="cursor-pointer">
        <Link href={item.href}>{item.title}</Link>
      </li>
    ))}
    <li className="cursor-pointer">
      <Link href="/sign-up">
        <button className="bg-gradient-to-r from-gradientStart to-gradientEnd px-7 py-3 rounded-lg font-jost text-base text-white">
          Register
        </button>
      </Link>
    </li>
    <li className="cursor-pointer">
      <Link href="/sign-in">
        <button className="px-7 py-3 text-black">Login</button>
      </Link>
    </li>
  </ul>
</div>

        </>
      ) : (
        <>
          <ul className="flex gap-12 font-jost text-base capitalize list-none">
            {LoggedInMenu.map((item, index) => (
              <li key={index} className="group relative cursor-pointer">
                <Link href={item.href} className="leading-none">
                  {item.title}
                </Link>
                <div
                  className={`absolute -bottom-1 h-px w-16 bg-gradient-to-r from-gradientStart to-gradientEnd transition-all ${
                    pathname === item.href
                      ? "scale-x-100"
                      : "scale-x-0 group-hover:scale-x-100 origin-left"
                  }`}
                />
              </li>
            ))}
          </ul>
          <div className="flex justify-end items-center gap-8">
            {/* <Link href="/switch-to-buyer" className="text-black text-sm">
              Switch to Buyer
            </Link> */}
            <div className="relative flex items-center" ref={notificationRef}>
              <button
                className="relative"
                onClick={() => setIsNotificationOpen(!isNotificationOpen)}
              >
                <Icons.notification className="w-6 h-6" />
                <span className="top-0 right-0 absolute bg-red500 rounded-full w-2 h-2"></span>
              </button>

              {isNotificationOpen && <HeaderModal />}
            </div>
            <div className="relative" ref={dropdownRef}>
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <Image
                  src={user?.photoURL || "/image/default.png"}
                  alt="User Profile"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <span>{user?.displayName}</span>
              </div>
              {dropdownOpen && (
                <div className="top-full right-0 z-10 absolute pt-2">
                  <div className="bg-white drop-shadow-lg rounded-xl w-60">
                    <div className="flex items-center gap-2.5 px-5 py-3">
                      <div className="relative w-10 h-10">
                        <Image
                          src={user?.photoURL || "/image/default.png"}
                          alt="User Profile"
                          width={40}
                          height={40}
                          className="rounded-full"
                        />
                        <div className="right-0 bottom-0 absolute border-white bg-green400 border border-solid rounded-full w-2.5 h-2.5" />
                      </div>
                      <div>
                        <div className="font-medium text-context text-sm">
                          {user?.displayName}
                        </div>
                        <div className="font-light text-[10px] text-gray400">
                          Freelancer
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2.5 px-5 py-2.5">
                      <p className="text-sm">Online for messages</p>
                      <IOSSwitch sx={{ m: 1 }} defaultChecked />
                    </div>
                    <div className="bg-gray100 w-full h-px" />
                    <Link
                      href="/user-profile"
                      className="flex items-center gap-2.5 hover:bg-gray100 px-5 py-2.5 transition-all"
                    >
                      <Icons.user className="w-4 h-4" />
                      <p className="text-sm">Your profile</p>
                    </Link>
                    <Link
                      href="/stats-n-trends"
                      className="flex items-center gap-2.5 hover:bg-gray100 px-5 py-2.5 transition-all"
                    >
                      <Icons.zap className="w-4 h-4" />
                      <p className="text-sm">Stats and trends</p>
                    </Link>
                    <div className="bg-gray100 w-full h-px" />
                    <Link
                      href="/subscriptions"
                      className="flex items-center gap-2.5 hover:bg-gray100 px-5 py-2.5 transition-all"
                    >
                      <Icons.useraccount className="w-4 h-4" />
                      <p className="text-sm">Membership plan</p>
                    </Link>
                    <Link
                      href="/referral"
                      className="flex items-center gap-2.5 hover:bg-gray100 px-5 py-2.5 transition-all"
                    >
                      <Icons.userplus className="w-4 h-4" />
                      <p className="text-sm">Invite colleagues</p>
                    </Link>
                    <Link
                      href="/settings"
                      className="flex items-center gap-2.5 hover:bg-gray100 px-5 py-2.5 transition-all"
                    >
                      <Icons.settings className="w-4 h-4" />
                      <p className="text-sm">Account settings</p>
                    </Link>
                    <div className="bg-gray100 w-full h-px" />
                    <Link
                      href="/change-log"
                      className="flex items-center gap-2.5 hover:bg-gray100 px-5 py-2.5 transition-all"
                    >
                      <Icons.twolayers className="w-4 h-4" />
                      <p className="text-sm">Changelog</p>
                    </Link>
                    <Link
                      href="/help"
                      className="flex items-center gap-2.5 hover:bg-gray100 px-5 py-2.5 transition-all"
                    >
                      <Icons.help className="w-4 h-4" />
                      <p className="text-sm">Support</p>
                    </Link>
                    <div className="bg-gray100 w-full h-px" />
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2.5 hover:bg-gray100 px-5 py-2.5 rounded-b-xl w-full transition-all"
                    >
                      <Icons.logout className="w-4 h-4" />
                      <p className="text-sm">Log out</p>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Header;
