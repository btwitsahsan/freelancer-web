import { useEffect, useState } from "react";
import { RiAddBoxLine, RiDeleteBinLine } from "react-icons/ri";
import Input from "@/components/Input";
import { UserType } from "./page";

const ThirdStep: React.FC<{ user: UserType, setUser: any, formik: any }> = ({ user, setUser, formik }) => {
  const [portfolioLinks, setPortfolioLinks] = useState<string[]>([]);

  useEffect(() => {
    if (portfolioLinks.length) {
      setUser({ ...user, portfolio: [portfolioLinks] });
    }
  }, [portfolioLinks]);

  const addPortfolioLink = () => {
    setPortfolioLinks([...portfolioLinks, ""]);
  };

  const handlePortfolioLinkChange = (index: number, value: string) => {
    const updatedLinks = [...portfolioLinks];
    updatedLinks[index] = value;
    setPortfolioLinks(updatedLinks);
  };

  const removePortfolioLink = (index: number) => {
    setPortfolioLinks((prev) => prev.filter((_, i) => i !== index));
  };

  const handleHourlyRateChange = (value: number) => {
    setUser({ ...user, hourlyRate: value });
    formik.setFieldValue("hourlyRate", value);
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col">
        <p className="font-medium text-base text-black">Set Hourly Rate</p>
        <span className="text-base">
          Please note that your new hourly rate will only apply to new jobs.
        </span>
      </div>
      <div className="w-full pb-5 items-center justify-between border-b border-[#0302290e]">
        <div className="w-full flex items-center justify-between">
          <span className="text-base text-black">Hourly Rate</span>
          <Input
            type="number"
            value={user?.hourlyRate !== undefined ? String(user.hourlyRate) : ''}
            onChange={(e) => { handleHourlyRateChange(parseFloat(e.target.value)) }}
            placeholder="00.00/hr"
            icon={false}
          />

        </div>
        {formik.touched.hourlyRate && formik.errors.hourlyRate && (
          <p className="text-red500 text-sm">{formik.errors.hourlyRate}</p>
        )}
      </div>

      <div className="w-full pb-5 border-b border-[#0302290e]">
        <div className="flex items-center justify-between">
          <span className="text-base text-black">Add Portfolio</span>
          <div
            className="flex items-center gap-2 text-base cursor-pointer"
            onClick={addPortfolioLink}
          >
            <span>Add</span>
            <RiAddBoxLine className="rounded-xl" size={20} />
          </div>
        </div>
      </div>

      {portfolioLinks.length > 0 &&
        portfolioLinks.map((link, index) => (
          <div key={index} className="mt-3 w-full flex items-center">
            <Input
              onChange={(e) =>
                handlePortfolioLinkChange(index, e.target.value)
              }
              placeholder={`Portfolio Link ${index + 1}`}
              value={link}
            />
            <button
              className="ml-2 text-red-600"
              onClick={() => removePortfolioLink(index)}
            >
              <RiDeleteBinLine size={20} />
            </button>
          </div>
        ))}

      {/* <div className="w-full flex flex-col gap-3">
        <span className="text-base text-black">External Portfolio Link</span>
        <Input onChange={() => { }} placeholder="Behance" />
        <Input onChange={() => { }} placeholder="Dribbble" />
        <Input onChange={() => { }} placeholder="URL" />
      </div> */}
    </div >
  );
};

export default ThirdStep;