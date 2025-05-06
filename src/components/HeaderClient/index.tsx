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
  ];

  return (
    <div
      className={`px-10 py-7 flex flex-row items-center justify-between ${
        white ? "bg-white" : ""
      } ${round ? "rounded-b-[20px]" : ""}`}
    >
      <Link
        href="/"
        className="flex items-center justify-center gap-3 cursor-pointer"
      >
        <Image src="/image/logo.svg" alt="logo" width={50} height={50} />
        <span className="font-semibold text-xl text-black">
          The Freelance Website
        </span>
      </Link>

      {!isLoggedIn ? (
        <>
          <ul className="flex list-none gap-12 font-jost text-base capitalize">
            {LoggedOutMenu.map((item, index) => (
              <li key={index} className="cursor-pointer">
                <Link href={item.href}>{item.title}</Link>
              </li>
            ))}
          </ul>
          <div className="flex gap-2 w-[265px] items-center justify-end">
            <Link href="/sign-up">
              <button className="py-3 px-7 bg-gradient-to-r from-gradientStart to-gradientEnd rounded-lg font-jost text-base text-white">
                Register
              </button>
            </Link>
            <Link href="/sign-in">
              <button className="py-3 px-7 text-black">Login</button>
            </Link>
          </div>
        </>
      ) : (
        <>
          <ul className="flex list-none gap-12 font-jost text-base capitalize">
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
          <div className="flex gap-8 items-center justify-end">
            <Link href="/switch-to-buyer" className="text-black text-sm">
              Switch to Talent
            </Link>
            <div className="relative flex items-center" ref={notificationRef}>
              <button
                className="relative"
                onClick={() => setIsNotificationOpen(!isNotificationOpen)}
              >
                <Icons.notification className="w-6 h-6" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red500 rounded-full"></span>
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
                <div className="absolute right-0 top-full pt-2 z-10">
                  <div className="bg-white drop-shadow-lg w-60 rounded-xl">
                    <div className="flex px-5 py-3 gap-2.5 items-center">
                      <div className="relative w-10 h-10">
                        <Image
                          src={user?.photoURL || "/image/default.png"}
                          alt="User Profile"
                          width={40}
                          height={40}
                          className="rounded-full"
                        />
                        <div className="absolute w-2.5 h-2.5 bottom-0 right-0 bg-green400 rounded-full border border-solid border-white" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-context">
                          {user?.displayName}
                        </div>
                        <div className="text-[10px] font-light text-gray400">
                          Freelancer
                        </div>
                      </div>
                    </div>
                    <div className="flex px-5 py-2.5 gap-2.5">
                      <p className="text-sm">Online for messages</p>
                      <IOSSwitch sx={{ m: 1 }} defaultChecked />
                    </div>
                    <div className="w-full h-px bg-gray100" />
                    <Link
                      href="/user-profile"
                      className="flex items-center px-5 py-2.5 gap-2.5 hover:bg-gray100 transition-all"
                    >
                      <Icons.user className="w-4 h-4" />
                      <p className="text-sm">Your profile</p>
                    </Link>
                    <Link
                      href="/stats-n-trends"
                      className="flex items-center px-5 py-2.5 gap-2.5 hover:bg-gray100 transition-all"
                    >
                      <Icons.zap className="w-4 h-4" />
                      <p className="text-sm">Stats and trends</p>
                    </Link>
                    <div className="w-full h-px bg-gray100" />
                    <Link
                      href="/subscriptions"
                      className="flex items-center px-5 py-2.5 gap-2.5 hover:bg-gray100 transition-all"
                    >
                      <Icons.useraccount className="w-4 h-4" />
                      <p className="text-sm">Membership plan</p>
                    </Link>
                    <Link
                      href="/referral"
                      className="flex items-center px-5 py-2.5 gap-2.5 hover:bg-gray100 transition-all"
                    >
                      <Icons.userplus className="w-4 h-4" />
                      <p className="text-sm">Invite colleagues</p>
                    </Link>
                    <Link
                      href="/settings"
                      className="flex items-center px-5 py-2.5 gap-2.5 hover:bg-gray100 transition-all"
                    >
                      <Icons.settings className="w-4 h-4" />
                      <p className="text-sm">Account settings</p>
                    </Link>
                    <div className="w-full h-px bg-gray100" />
                    <Link
                      href="/change-log"
                      className="flex items-center px-5 py-2.5 gap-2.5 hover:bg-gray100 transition-all"
                    >
                      <Icons.twolayers className="w-4 h-4" />
                      <p className="text-sm">Changelog</p>
                    </Link>
                    <Link
                      href="/help"
                      className="flex items-center px-5 py-2.5 gap-2.5 hover:bg-gray100 transition-all"
                    >
                      <Icons.help className="w-4 h-4" />
                      <p className="text-sm">Support</p>
                    </Link>
                    <div className="w-full h-px bg-gray100" />
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full rounded-b-xl px-5 py-2.5 gap-2.5 hover:bg-gray100 transition-all"
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
