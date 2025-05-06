"use client"

import { Icons } from "@/icons";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { applyActionCode } from "firebase/auth";
import { auth } from "@/firebaseConfig";

const EmailVerified = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        const mode = searchParams.get('mode');
        const oobCode = searchParams.get('oobCode') ?? '';

        const verifyEmailWithCode = async () => {
            if (mode === "verifyEmail") {
                try {
                    await applyActionCode(auth, oobCode);
                    console.log("Email successfully verified!");
                } catch (error) {
                    console.error("Error verifying email:", error);
                }
            }
        };

        verifyEmailWithCode();
    }, [router, searchParams]);

    return (
        <div className="relative flex items-center justify-center w-full min-h-screen bg-gradient-to-r from-[#D8E5EE] to-[#EED4E9]">
            <div className="bg-white w-full max-w-lg rounded-lg flex items-center m-4 sm:m-8">
                <div className="px-6 py-8 sm:px-8 sm:py-12 flex flex-col items-center justify-center text-center">
                    <Icons.checkmark width="50" className="mb-6" />

                    <h1 className="font-semibold text-xl sm:text-2xl mb-4 text-black">
                        Verification Successful
                    </h1>

                    <p className="text-sm sm:text-base text-gray500 mb-6 sm:mb-8">
                        Your email verification was successful! You can now enjoy full access to your account. Please wait until page is redirected.
                    </p>

                    <a
                        href="/sign-in"
                        className="relative bg-gradient-to-r from-blue500 to-purple-500 bg-clip-text text-transparent text-sm sm:text-base underline hover:text-blue-700"
                    >
                        Sign In
                        <span className="absolute left-0 bottom-1 w-full h-[1px] bg-gradient-to-r from-blue500 to-purple-500"></span>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default EmailVerified;
