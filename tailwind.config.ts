import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.{js,ts}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        gradientStart: "#198BD8",
        gradientEnd: "#F03DCE",
        gradientStartReverse: "#F03DCE",
        gradientEndReverse: "#198BD8",
        black: "var(--black-color)",
        dark: "var(--context)",
        primaryBg: "var(--primary-bg)",
        context: "var(--context-color)",
        icons: "var(--icons-color)",
        gray100: "var(--gray-100)",
        gray200: "var(--gray-200)",
        gray300: "var(--gray-300)",
        gray400: "var(--gray-400)",
        gray500: "var(--gray-500)",
        red100: "var(--red-100)",
        red200: "var(--red-200)",
        red300: "var(--red-300)",
        red400: "var(--red-400)",
        red500: "var(--red-500)",
        yellow100: "var(--yellow-100)",
        yellow200: "var(--yellow-200)",
        yellow300: "var(--yellow-300)",
        yellow400: "var(--yellow-400)",
        yellow500: "var(--yellow-500)",
        green100: "var(--green-100)",
        green200: "var(--green-200)",
        green300: "var(--green-300)",
        green400: "var(--green-400)",
        green500: "var(--green-500)",
        blue100: "var(--blue-100)",
        blue200: "var(--blue-200)",
        blue300: "var(--blue-300)",
        blue400: "var(--blue-400)",
        blue500: "var(--blue-500)",
      },
      fontFamily: {
        DM_Sans: ["var(--font-dm-sans)", ...defaultTheme.fontFamily.sans],
        jost: ["var(--font-jost)", ...defaultTheme.fontFamily.sans],
      },
      scrollBehavior: ["smooth"],
      keyframes: {
        flowGradient: {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "100% 50%" },
        },
        pulse: {
          "50%": { opacity: "0.8" },
        },
        floatingY: {
          "0%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
          "100%": { transform: "translateY(0)" },
        },
      },
      animation: {
        bounce: 'bounce 0.6s infinite alternate',
        flow: "flowGradient 4s linear infinite",
        pulseQuick: "pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        floatingY: "floatingY 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
  plugins: [],
};
export default config;
