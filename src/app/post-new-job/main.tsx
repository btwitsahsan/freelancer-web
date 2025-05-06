"use client";

import { Icons } from "@/icons";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  InputAdornment,
  OutlinedInput,
  Radio,
  RadioGroup,
} from "@mui/material";
import Image from "next/image";
import { ReactElement, useState, useRef, useEffect } from "react";
import { FiPlus, FiSearch } from "react-icons/fi";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import skillsData from "@/utils/freelancingSkills.json";
import { apiUrl } from "@/utils/constant";

type Step = {
  step: number;
  subtitle: string;
  title: string;
  desc: string;
  button: string;
  component: ReactElement;
};

const skills = [
  "Web development",
  "WordPress",
  "JavaScript",
  "HTML",
  "CSS",
  "UI/UX Design",
  "React.js",
  "React Development",
  "Angular",
  "Angular.js",
  "Vue.js",
  "Next.js",
  "Nuxt.js",
  "Express.js",
  "Node.js",
  "Shopify",
  "Webflow",
  "Bubble.io",
];

interface Project {
  title: string;
  scope: string;
  level: string;
  location: string;
  type: string;
  skills: string[];
  minHourlyRate: string;
  maxHourlyRate: string;
  estimatedPrice: string;
  description: string;
}

const Main = () => {
  const [step, setStep] = useState(0);
  const router = useRouter();
  const [project, setProject] = useState<Project>({
    title: "",
    scope: "large",
    level: "expert",
    location: "local",
    type: "fixed",
    skills: [],
    minHourlyRate: "",
    maxHourlyRate: "",
    estimatedPrice: "",
    description: "",
  });
  const [inputValue, setInputValue] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const [filteredSkills, setFilteredSkills] = useState<string[]>([]);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setFilteredSkills([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleJobPosting = async () => {
    const token = localStorage.getItem("freelancingPlatformAuthToken");

    await axios
      .post(`${apiUrl}/api/projects/new`, project, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        toast.success("Congratulations! Job posting success.");
        router.push("/find-job");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Failed to post a new job.");
      });
  };

  const generateJobDescription = async () => {
    try {
      // Create form data from project state
      const formData = new URLSearchParams();
      formData.append("job_title", project.title);
      formData.append("skills", project.skills.join(","));
      formData.append("scope_of_work", project.scope);
      formData.append("experience_level", project.level);
      formData.append("talent_location", project.location);

      // Determine budget based on project type
      let budget = "";
      if (project.type === "hourly") {
        budget = `$${project.minHourlyRate}-$${project.maxHourlyRate}/hr`;
      } else {
        budget = `$${project.estimatedPrice}`;
      }
      formData.append("budget", budget);
      //////outside api call
      const response = await axios.post(
        "http://155.130.70.168:8001/generate_job_posting",
        formData,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      if (response.data && response.data.job_posting) {
        setProject((prev) => ({
          ...prev,
          description: response.data.job_posting,
        }));
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error generating job description:", error);
      toast.error("Failed to generate job description.");
      return false;
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && inputValue.trim()) {
      if (project.skills.length >= 10) {
        setErrors(["You can only add up to 10 skills."]);
        return;
      }
      if (!project.skills.includes(inputValue)) {
        setProject((prev) => ({
          ...prev,
          skills: [...prev.skills, inputValue],
        }));
        setInputValue("");
        setErrors([]);
      } else {
        setErrors(["Skill already added."]);
      }
    }
  };

  const handleSkillClick = (skill: string) => {
    if (project.skills.length < 10 && !project.skills.includes(skill)) {
      setProject((prev) => ({
        ...prev,
        skills: [...prev.skills, skill],
      }));
    }
  };

  const filterSkills = (value: string) => {
    if (!value) {
      setFilteredSkills([]);
      return;
    }
    const allSkills = Object.values(skillsData).flat();
    const matches = allSkills.filter(
      (skill) =>
        skill.toLowerCase().includes(value.toLowerCase()) &&
        !project.skills.includes(skill)
    );
    setFilteredSkills(matches);
  };

  const removeSkill = (skill: string) => {
    setProject((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== skill),
    }));
  };

  const validateStep = (): boolean => {
    let errorMessages: string[] = [];

    switch (step) {
      case 0:
        if (!project.title.trim()) {
          errorMessages.push("Title is required.");
        }
        break;
      case 1:
        if (project.skills.length === 0) {
          errorMessages.push("At least one skill is required.");
        }
        break;
      case 5:
        if (project.type === "hourly") {
          if (!project.minHourlyRate.trim() || !project.maxHourlyRate.trim()) {
            errorMessages.push(
              "Both minimum and maximum hourly rates are required."
            );
          } else if (
            Number(project.minHourlyRate) > Number(project.maxHourlyRate)
          ) {
            errorMessages.push(
              "Minimum hourly rate cannot be greater than maximum hourly rate."
            );
          }
        } else if (project.type === "fixed") {
          if (!project.estimatedPrice.trim()) {
            errorMessages.push("Maximum project budget is required.");
          }
        }
        break;
      default:
        break;
    }

    setErrors(errorMessages);
    return errorMessages.length === 0;
  };

  // Modify your handleBtn function to include the generation step
  const handleBtn = async () => {
    if (validateStep()) {
      if (step === 4) {
        // Before showing the description textarea, generate the job posting
        const success = await generateJobDescription();
        console.log(success, "success checked up ");
        if (success) {
          setStep(step + 1);
        }
      } else if (step === 5) {
        handleJobPosting();
      } else {
        setStep(step + 1);
      }
    }
  };

  const onboardingSteps: Step[] = [
    {
      step: 1,
      subtitle: "Job post",
      title: "Let’s start with a strong title.",
      desc: "This helps your job post stand out to the right candidates. It’s the first thing they’ll see, so make it count!",
      button: "Skills",
      component: (
        <div className="flex flex-col gap-10 text-black py-5">
          <div className="flex flex-col gap-2.5">
            <p className="text-xl">Write a title for your job post</p>
            <input
              className="w-full border border-black rounded-lg p-2.5 outline-none hover:border-blue400 hover:ring focus:border-blue400 focus:ring"
              onChange={(e) =>
                setProject({ ...project, title: e.target.value })
              }
            />
            {errors.includes("Title is required.") && (
              <span className="text-red-500">Title is required.</span>
            )}
          </div>
          <div className="px-5">
            <p className="text-2xl">Example titles</p>
            <div className="flex flex-col">
              <div className="flex text-xl leading-normal">
                <div className="flex items-center h-[30px] mx-3">
                  <div className="w-1.5 h-1.5 bg-black rounded-full" />
                </div>
                Build responsive WordPress site with booking/ payment
                functionality
              </div>
              <div className="flex text-xl leading-normal">
                <div className="flex items-center h-[30px] mx-3">
                  <div className="w-1.5 h-1.5 bg-black rounded-full" />
                </div>
                Graphic designer needed to design ad creative for multiple
                campaigns
              </div>
              <div className="flex text-xl leading-normal">
                <div className="flex items-center h-[30px] mx-3">
                  <div className="w-1.5 h-1.5 bg-black rounded-full" />
                </div>
                Facebook ad specialist needed for product launch
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      step: 2,
      subtitle: "SkillS",
      title: "What are the main skills required for your works?",
      desc: "",
      button: "Scope",
      component: (
        <div className="flex flex-col gap-10 text-black py-5">
          <div className="flex flex-col gap-2.5" ref={dropdownRef}>
            <p className="text-xl">Search or add up to 10 skills</p>
            <div className="flex items-center gap-2 w-full border border-black rounded-lg p-2.5 outline-none hover:border-blue400 hover:ring focus-within:border-blue400 focus-within:ring">
              <FiSearch className="w-5 h-5" />
              <input
                className="w-full outline-none"
                value={inputValue}
                onChange={(e) => {
                  setInputValue(e.target.value);
                  filterSkills(e.target.value);
                }}
                onKeyPress={handleKeyPress}
                placeholder="Type and press Enter to add..."
              />
            </div>
            {filteredSkills.length > 0 && (
              <ul className="absolute z-10 mt-[85px] bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                {filteredSkills.map((skill, index) => (
                  <li
                    key={`suggested-skill-${index}`}
                    className="flex justify-between items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleSkillClick(skill)}
                  >
                    {skill}
                    <FiPlus className="w-4 h-4" />
                  </li>
                ))}
              </ul>
            )}
            {errors.includes("At least one skill is required.") && (
              <span className="text-red-500">
                At least one skill is required.
              </span>
            )}
            {errors.includes("You can only add up to 10 skills.") && (
              <span className="text-red-500">
                You can only add up to 10 skills.
              </span>
            )}
          </div>

          {project?.skills.length > 0 && (
            <div className="flex flex-wrap gap-2.5 px-5">
              <p className="text-xl">Required Skills</p>
              {project?.skills.map((skill, index) => (
                <div
                  key={`project-skill-${index}`}
                  className="flex items-center gap-1 px-2.5 py-1 text-xs rounded-full bg-green200 leading-none"
                >
                  {skill}
                  <button
                    onClick={() => removeSkill(skill)}
                    className="ml-2 text-red-600 font-bold"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="flex flex-col gap-5 px-5">
            <p className="text-2xl">Popular skills</p>
            <div className="flex flex-wrap gap-2.5">
              {skills.map((item, index) => (
                <div
                  key={`skill-${index}`}
                  className="flex items-center gap-1 px-2.5 py-1 text-xs rounded-full bg-gray200 leading-none cursor-pointer"
                  onClick={() => handleSkillClick(item)}
                >
                  {item}
                  <FiPlus className="w-4 h-4" />
                </div>
              ))}
            </div>
          </div>
        </div>
      ),
    },
    {
      step: 3,
      subtitle: "Scope",
      title: "Next, estimate the scope of your work.",
      desc: "These aren’t final answers, but this information helps us recommend the right talent for what you need.",
      button: "Location",
      component: (
        <div className="flex flex-col gap-6 text-black pt-5">
          <FormControl className="flex flex-col gap-4">
            <FormLabel
              id="demo-radio-buttons-group-label"
              sx={{
                color: "var(--black-color)",
                fontSize: "20px",
                lineHeight: 1,
              }}
            >
              What the scope of your work?
            </FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="large"
              name="radio-buttons-group"
              className="gap-4"
              value={project?.scope}
              onChange={(e) =>
                setProject({ ...project, scope: e.target.value })
              }
            >
              <FormControlLabel
                value="large"
                control={<Radio />}
                label={
                  <div className="flex flex-col">
                    <p className="flex h-6 items-center">Large</p>
                    <p className="text-xs text-gray500">
                      Longer term or complex initiatives (ex. design and build a
                      full website)
                    </p>
                  </div>
                }
                sx={{
                  display: "flex",
                  margin: 0,
                  gap: "10px",
                  alignItems: "start",
                  ".MuiRadio-root": {
                    padding: 0,
                  },
                }}
              />
              <FormControlLabel
                value="medium"
                control={<Radio />}
                label={
                  <div className="flex flex-col">
                    <p className="flex h-6 items-center">Medium</p>
                    <p className="text-xs text-gray500">
                      Well-defined projects (ex. a landing page)
                    </p>
                  </div>
                }
                sx={{
                  display: "flex",
                  margin: 0,
                  gap: "10px",
                  alignItems: "start",
                  ".MuiRadio-root": {
                    padding: 0,
                  },
                }}
              />
              <FormControlLabel
                value="small"
                control={<Radio />}
                label={
                  <div className="flex flex-col">
                    <p className="flex h-6 items-center">Small</p>
                    <p className="text-xs text-gray500">
                      Quick and straightforward tasks (ex. update text and
                      images on a webpage)
                    </p>
                  </div>
                }
                sx={{
                  display: "flex",
                  margin: 0,
                  gap: "10px",
                  alignItems: "start",
                  ".MuiRadio-root": {
                    padding: 0,
                  },
                }}
              />
            </RadioGroup>
          </FormControl>
          <FormControl className="flex flex-col gap-4">
            <FormLabel
              id="demo-radio-buttons-group-label"
              sx={{
                color: "var(--black-color)",
                fontSize: "20px",
                lineHeight: 1,
              }}
            >
              What level of experience will it need?
            </FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="expert"
              name="radio-buttons-group"
              className="gap-4"
              value={project?.level}
              onChange={(e) =>
                setProject({ ...project, level: e.target.value })
              }
            >
              <FormControlLabel
                value="entry"
                control={<Radio />}
                label={
                  <div className="flex flex-col">
                    <p className="flex h-6 items-center">Entry</p>
                    <p className="text-xs text-gray500">
                      Looking for someone relatively new to this field
                    </p>
                  </div>
                }
                sx={{
                  display: "flex",
                  margin: 0,
                  gap: "10px",
                  alignItems: "start",
                  ".MuiRadio-root": {
                    padding: 0,
                  },
                }}
              />
              <FormControlLabel
                value="intermediate"
                control={<Radio />}
                label={
                  <div className="flex flex-col">
                    <p className="flex h-6 items-center">Intermediate</p>
                    <p className="text-xs text-gray500">
                      Looking for substantial experience in this field
                    </p>
                  </div>
                }
                sx={{
                  display: "flex",
                  margin: 0,
                  gap: "10px",
                  alignItems: "start",
                  ".MuiRadio-root": {
                    padding: 0,
                  },
                }}
              />
              <FormControlLabel
                value="expert"
                control={<Radio />}
                label={
                  <div className="flex flex-col">
                    <p className="flex h-6 items-center">Expert</p>
                    <p className="text-xs text-gray500">
                      Looking for comprehensive and deep expertise in this field
                    </p>
                  </div>
                }
                sx={{
                  display: "flex",
                  margin: 0,
                  gap: "10px",
                  alignItems: "start",
                  ".MuiRadio-root": {
                    padding: 0,
                  },
                }}
              />
            </RadioGroup>
          </FormControl>
        </div>
      ),
    },
    {
      step: 4,
      subtitle: "Location",
      title: "Select your preferred talent location.",
      desc: "This increases proposals from talent in a specific region, but still opens your job post to all candidates.",
      button: "Budget",
      component: (
        <div className="relative flex gap-5 text-black py-5">
          <div
            className={`relative flex flex-col gap-3 p-6 basis-1/2 rounded-lg border-2 transition-all hover:bg-green100 hover:border-green500 cursor-pointer ${
              project?.location === "local"
                ? "bg-green100 border-green500"
                : "bg-white border-gray200"
            }`}
            onClick={() => setProject({ ...project, location: "local" })}
          >
            <Icons.location />
            <p className="font-semibold text-xl leading-none">Local only</p>
            <p className="text-xs text-gray500 leading-normal">
              Only talent in your local area can submit proposals
            </p>
            <div className="absolute top-0 right-0">
              <Radio
                checked={project?.location === "local"}
                value="local"
                name="radio-buttons"
                inputProps={{ "aria-label": "Local" }}
                color="success"
              />
            </div>
          </div>

          <div
            className={`relative flex flex-col gap-3 p-6 basis-1/2 rounded-lg border-2 transition-all hover:bg-green100 hover:border-green500 cursor-pointer ${
              project?.location === "worldwide"
                ? "bg-green100 border-green500"
                : "bg-white border-gray200"
            }`}
            onClick={() => setProject({ ...project, location: "worldwide" })}
          >
            <Icons.earth />
            <p className="font-semibold text-xl leading-none">Worldwide</p>
            <p className="text-xs text-gray500 leading-normal">
              Talent in any location can submit proposals
            </p>
            <div className="absolute top-0 right-0">
              <Radio
                checked={project?.location === "worldwide"}
                value="worldwide"
                name="radio-buttons"
                inputProps={{ "aria-label": "Worldwide" }}
                color="success"
              />
            </div>
          </div>
        </div>
      ),
    },
    {
      step: 5,
      subtitle: "Budget",
      title: "Tell us about your budget.",
      desc: "This increases proposals from talent in a specific region, but still opens your job post to all candidates.",
      button: "Add Description",
      component: (
        <div className="relative flex flex-col gap-8 text-black py-5">
          <div className="flex gap-5">
            <div
              className={`relative flex flex-col gap-4 px-6 py-8 basis-1/2 rounded-lg border-2 hover:border-green500 hover:bg-green100 transition-all cursor-pointer ${
                project?.type === "hourly"
                  ? "bg-green100 border-green500"
                  : "bg-white border-gray200"
              }`}
              onClick={() => setProject({ ...project, type: "hourly" })}
            >
              <Icons.location />
              <p className="font-semibold text-xl leading-none">Hourly rate</p>
              <div className="absolute top-0 right-0">
                <Radio
                  checked={project?.type === "hourly"}
                  value="hourly"
                  name="radio-buttons"
                  inputProps={{ "aria-label": "Hourly" }}
                  color="success"
                />
              </div>
            </div>

            <div
              className={`relative flex flex-col gap-4 px-6 py-8 basis-1/2 rounded-lg border-2 hover:border-green500 hover:bg-green100 transition-all cursor-pointer ${
                project?.type === "fixed"
                  ? "bg-green100 border-green500"
                  : "bg-white border-gray200"
              }`}
              onClick={() => setProject({ ...project, type: "fixed" })}
            >
              <Icons.earth />
              <p className="font-semibold text-xl leading-none">
                Project budget
              </p>
              <div className="absolute top-0 right-0">
                <Radio
                  checked={project?.type === "fixed"}
                  value="fixed"
                  name="radio-buttons"
                  inputProps={{ "aria-label": "Fixed" }}
                  color="success"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            {project?.type === "hourly" ? (
              <>
                <div className="flex gap-5">
                  <div className="flex flex-col gap-2 basis-1/2">
                    <div className="text-black font-semibold leading-none">
                      From
                    </div>
                    <div className="flex gap-1 items-center">
                      <OutlinedInput
                        id="outlined-adornment-amount"
                        type="number"
                        startAdornment={
                          <InputAdornment position="start" sx={{ padding: 0 }}>
                            $
                          </InputAdornment>
                        }
                        label={null}
                        placeholder="0"
                        sx={{
                          paddingLeft: "10px",
                          "#outlined-adornment-amount": {
                            padding: "8px 10px 8px 0",
                          },
                          borderRadius: "8px",
                          maxWidth: "80px",
                          borderColor: "var(--context-color)",
                        }}
                        onChange={(e) =>
                          setProject({
                            ...project,
                            minHourlyRate: e.target.value,
                          })
                        }
                      />
                      <div>/hour</div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 basis-1/2">
                    <div className="text-black font-semibold leading-none">
                      To
                    </div>
                    <div className="flex gap-1 items-center">
                      <OutlinedInput
                        id="outlined-adornment-amount"
                        type="number"
                        startAdornment={
                          <InputAdornment position="start" sx={{ padding: 0 }}>
                            $
                          </InputAdornment>
                        }
                        label={null}
                        placeholder="0"
                        sx={{
                          paddingLeft: "10px",
                          "#outlined-adornment-amount": {
                            padding: "8px 10px 8px 0",
                          },
                          borderRadius: "8px",
                          maxWidth: "80px",
                          borderColor: "var(--context-color)",
                        }}
                        onChange={(e) =>
                          setProject({
                            ...project,
                            maxHourlyRate: e.target.value,
                          })
                        }
                      />
                      <div>/hour</div>
                    </div>
                  </div>
                </div>
                <p className="text-context">
                  This is the average rate for similar projects.
                </p>
              </>
            ) : (
              <div className="flex flex-col gap-2">
                <div className="text-black font-semibold leading-none">
                  Maximum project budget (USD)
                </div>
                <OutlinedInput
                  id="outlined-adornment-amount"
                  type="number"
                  startAdornment={
                    <InputAdornment position="start" sx={{ padding: 0 }}>
                      $
                    </InputAdornment>
                  }
                  label={null}
                  placeholder="0"
                  sx={{
                    paddingLeft: "10px",
                    "#outlined-adornment-amount": {
                      padding: "8px 10px 8px 0",
                    },
                    borderRadius: "8px",
                    maxWidth: "120px",
                    borderColor: "var(--context-color)",
                  }}
                  onChange={(e) =>
                    setProject({ ...project, estimatedPrice: e.target.value })
                  }
                />
              </div>
            )}
          </div>

          <p className="text-context">
            {project?.type === "hourly" ? (
              <>
                Professionals tend to charge{" "}
                <b>
                  ${project?.minHourlyRate} - ${project?.maxHourlyRate}
                </b>{" "}
                /hour (USD) for front-end development projects like yours.
              </>
            ) : (
              <>
                You will have the option to create milestones which divide your
                project into manageable phases.
              </>
            )}
          </p>
        </div>
      ),
    },
    {
      step: 6,
      subtitle: "Add Description",
      title: "Review and edit your draft.",
      desc: "Your draft was generated using advanced AI, but you can change it however you want. Please check the draft, and make it your own.",
      button: "Post This Job",
      component: (
        <div className="flex flex-col gap-3 text-black py-5">
          <p className="text-xl">Describe the work</p>
          <textarea
            className="p-5 border border-gray200 rounded-lg h-96"
            value={project.description}
            onChange={(e) =>
              setProject({ ...project, description: e.target.value })
            }
          />
        </div>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-[50px] w-[1200px] h-[720px] p-[50px] bg-white rounded-[10px]">
      <div className="flex items-center gap-3">
        <Image src="/image/logo.svg" alt="logo" width={50} height={50} />
        <span className="text-black">TheFreelanceWebsite</span>
      </div>
      <div className="flex flex-col h-full">
        <div className="flex flex-1 gap-10">
          <div className="flex flex-col gap-6 basis-1/2 leading-normal">
            <div className="text-xl">
              {onboardingSteps[step].step}/6 {onboardingSteps[step].subtitle}
            </div>
            <h2 className="text-[40px] font-semibold">
              {onboardingSteps[step].title}
            </h2>
            <p className="text-xl">{onboardingSteps[step].desc}</p>
          </div>
          <div className="basis-1/2">{onboardingSteps[step].component}</div>
        </div>
        <div className="flex w-full justify-end">
          <button
            onClick={handleBtn}
            className="min-w-32 px-8 py-2 bg-gradient-to-r from-gradientStart to-gradientEnd rounded text-white hover:drop-shadow"
          >
            {onboardingSteps[step].button}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Main;
