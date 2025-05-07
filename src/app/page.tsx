"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Header from "@/components/Header";
import Landing from "@/components/Landing";
import ChooseUs from "@/components/ChooseUs";
import BuiltFor from "@/components/BuiltFor";
import Collaborate from "@/components/Collaborate";
import Plan from "@/components/Plan";
import Ready from "@/components/Ready";
import Feature from "@/components/Feature";
import Footer from "@/components/Footer";

const Home = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const mode = searchParams.get("mode") ?? "";
    const apiKey = searchParams.get("apiKey") ?? "";
    const oobCode = searchParams.get("oobCode") ?? "";
    const continueUrl = searchParams.get("continueUrl") ?? "";
    const lang = searchParams.get("lang") ?? "";

    if (mode === "resetPassword") {
      const newUrl = `/reset-password/?apiKey=${encodeURIComponent(
        apiKey
      )}&mode=${encodeURIComponent(mode)}&oobCode=${encodeURIComponent(
        oobCode
      )}&continueUrl=${encodeURIComponent(
        continueUrl
      )}&lang=${encodeURIComponent(lang)}`;

      router.replace(newUrl);
    } else if (mode === "verifyEmail") {
      const newUrl = `/email-verified/?apiKey=${encodeURIComponent(
        apiKey
      )}&mode=${encodeURIComponent(mode)}&oobCode=${encodeURIComponent(
        oobCode
      )}&continueUrl=${encodeURIComponent(
        continueUrl
      )}&lang=${encodeURIComponent(lang)}`;

      router.replace(newUrl);
    }
  }, [router, searchParams]);

  return (
    <main className="bg-gray100 overflow-hidden flex flex-col items-center gap-10 md:gap-20 lg:gap-28">
      <div className="w-full">
        <Header white={false} />
        <Landing />
      </div>
      <ChooseUs />
      <BuiltFor />
      <Collaborate />
      <Plan />
      <Ready />
      <Feature />
      <Footer />
    </main>
  );
};
export default Home;
