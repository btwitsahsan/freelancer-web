import { DM_Sans, Jost } from "next/font/google";

export const DM_SansFont = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-DM_Sans",
  weight: ["300", "400", "500", "600", "700"],
});
export const JostFont = Jost({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jost",
  weight: ["300", "400", "500", "600", "700"],
});
