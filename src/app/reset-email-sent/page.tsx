import { Icons } from "@/icons";

const ResetEmailSent = () => {
  return (
    <div className="relative flex items-center justify-center w-full min-h-screen bg-gradient-to-r from-[#D8E5EE] to-[#EED4E9]">
      <div className="bg-white w-full max-w-xl rounded-lg flex flex-col gap-10 items-center px-12 py-20">
        <Icons.checkmark width="80" />

        <h1 className="font-semibold text-4xl leading-none h-[36px] text-black">
          Password Reset Email Sent
        </h1>

        <div className="flex flex-col gap-5">
          <p className="text-xl leading-normal text-center text-black">
            Please check your inbox and follow the instructions to reset your
            password. If you don’t see it, check your spam or junk folder.
          </p>

          <div className="flex justify-center">
            <button className="relative bg-gradient-to-r from-blue500 to-purple-500 bg-clip-text text-transparent text-sm sm:text-base underline hover:text-blue-700 transition-all">
              Send again
              <span className="absolute left-0 bottom-1 w-full h-[1px] bg-gradient-to-r from-blue500 to-purple-500"></span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetEmailSent;
