import { FC } from "react";
import Link from "next/link";
import { Icons } from "@/icons";

const SuccessMessage: FC = () => {
  return (
    <div className="flex flex-col items-center justify-center bg-gray100 text-center p-6">
      <Icons.checkmark width="50" />

      <h1 className="text-2xl font-medium mt-2 mb-2">Proposal Submitted.</h1>

      <span className="flex flex-col text-gray500 mb-4 ">
        <span>Your proposal has been successfully submitted! You can</span>

        <span>
          <Link className="text-blue500 underline" href="/track">
            track
          </Link>{" "}
          its progress to ensure optimal results.
        </span>
      </span>

      <Link className="text-context underline" href="/find-job">
        Back to Find Jobs
      </Link>
    </div>
  );
};

export default SuccessMessage;
