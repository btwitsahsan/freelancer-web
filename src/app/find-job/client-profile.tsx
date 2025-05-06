import { AiFillStar } from "react-icons/ai";
import Image from "next/image";
import { Icons } from "@/icons";

interface WorkItem {
  title: string;
  rating: number;
  billed: number;
  date: string;
  description: string;
}

const ClientProfile = () => {
  const workHistory: WorkItem[] = [
    {
      title: "Medical/scientific art",
      rating: 5.0,
      billed: 225.0,
      date: "July 2019",
      description:
        "Exceptional collaboration! The client provided clear instructions and valuable feedback, making the entire design process smooth and efficient. Looking forward to working together again!",
    },
    {
      title: "Graphic Design. Neuroscience/Neurology",
      rating: 5.0,
      billed: 225.0,
      date: "July 2019",
      description:
        "An absolute pleasure to work with! The client was responsive, open to suggestions, and highly communicative throughout the project. Their professionalism made the project successful.",
    },
    {
      title: "Design figures for scientific manuscripts/present...",
      rating: 5.0,
      billed: 225.0,
      date: "July 2019",
      description:
        "Working with this client was a great experience. They had a clear vision, provided all necessary details, and were receptive to design improvements. Highly recommend!",
    },
    {
      title: "Senior UI/UX Designer",
      rating: 5.0,
      billed: 225.0,
      date: "July 2019",
      description:
        "Fantastic client! They were prompt with feedback and gave me creative freedom while also ensuring all project requirements were met. A seamless collaboration from start to finish.",
    },
  ];

  return (
    <div className="flex flex-col gap-6 p-4 overflow-x-visible overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-thumb]:rounded-full">
      <div className="flex items-start gap-3">
        <Image
          width={50}
          height={50}
          src="/image/default.png"
          alt="Profile"
          className=" rounded-full object-cover"
        />
        <div className="flex flex-col gap-1">
          <div className="flex flex-col">
            <span className="text-context text-2xl font-medium">Raymond</span>
            <span className="text-gray500 text-md font-normal">
              San Francisco, CA
            </span>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <AiFillStar
                  key={i}
                  className="w-5 h-5 fill-[#F59E0B] text-yellow400"
                />
              ))}
            </div>
            <span className="text-gray500">(314 reviews)</span>
          </div>
        </div>
      </div>

      <hr />

      <div className="flex flex-col gap-4 text-context">
        <h2 className="text-2xl font-medium text-black">About</h2>
        <p className="font-normal text-base leading-tighter">
          As a passionate and detail-oriented professional, I value clear
          communication and collaboration throughout every project. With a
          strong focus on user experience and design quality, I work closely
          with freelancers to ensure that project goals are met efficiently. I
          appreciate creative input and am open to suggestions that enhance the
          overall outcome. My priority is building long-term relationships
          through mutual respect, timely feedback, and a shared commitment to
          excellence. Let&apos;s work together to bring innovative ideas to
          life!
        </p>
      </div>

      <div className="flex flex-col gap-4 text-context">
        <h2 className="text-2xl font-medium text-black"> Work history</h2>
        <div className="flex flex-col gap-4">
          {workHistory.map((item, index) => (
            <div key={index} className="flex flex-col gap-2 bg-gray100 p-6 rounded-lg">
              <div className="flex justify-between items-start">
                <div className="flex flex-col">
                  <h3 className="text-md font-medium">{item.title}</h3>
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <AiFillStar
                          key={i}
                          className="w-4 h-4 fill-[#F59E0B] text-yellow400"
                        />
                      ))}
                    </div>
                    <span className="text-gray500">{item.rating}.0</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-gray500">
                  <div className="flex items-center gap-1">
                    <Icons.dollarbag width="15" />

                    <span className="text-gray400">
                      Billed: ${item.billed.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Icons.calender width="15" />

                    <span className="text-gray400">{item.date}</span>
                  </div>
                </div>
              </div>

              <p className="text-context font-normal">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClientProfile;
