"use client";

import { DM_Sans, Jost } from "@next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebaseConfig";
import { useAtom } from "jotai";
import { userAtom } from "@/store/auth";
import ReduxProvider from "@/store/reduxProvider";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-dm-sans",
});

const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-jost",
});

const metadata = {
  title: "The Freelance Website: Secure Platform with Crypto Payments & Task Management Tools for Freelancers & Clients",
  description: "Freelance website with secure payments, including crypto options, advanced tools for task management and global opportunities for freelancers and clients.",
  keywords: "freelance platform, secure payments, crypto payments, task management tools, freelance opportunities, global clients, freelance website, cryptocurrency, remote work, freelance jobs",
  authors: [{ name: "Cyber", url: "https://thefreelancewebsite.com" }],
  openGraph: {
    title: "The Freelance Website: Secure Platform with Crypto Payments & Task Management Tools for Freelancers & Clients",
    description: "Freelance website with secure payments, including crypto options, advanced tools for task management and global opportunities for freelancers and clients.",
    url: "https://thefreelancewebsite.com",
    siteName: "The Freelance Website",
    type: "website",
    images: [
      {
        url: "https://drive.google.com/file/d/1Ffki693v9YSadiymDjTTht_LflraGa6i/view",
        width: 800,
        height: 600,
        alt: "OpenGraph Image",
      },
    ],
  },
  twitterCard: {
    card: "summary_large_image",
    site: "@YourTwitterHandle",
    title: "The Freelance Website: Secure Platform with Crypto Payments & Task Management Tools for Freelancers & Clients",
    description: "Freelance website with secure payments, including crypto options, advanced tools for task management and global opportunities for freelancers and clients.",
    image: "https://drive.google.com/file/d/1LL0VqT7tfmYqg8UvT_DETpGSQhUjnv43/view",
  },
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [, setUser] = useAtom(userAtom);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      setUser(authUser);
    });

    return () => unsubscribe();
  }, [setUser]);

  return (
    <html lang="en">
      <head>{/* Add metadata here if needed */}</head>
      <body className={`${dmSans.variable} ${jost.variable} antialiased`}>
        <ReduxProvider>
          {children}
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
          />
        </ReduxProvider>
      </body>
    </html>
  );
};

export default RootLayout;
