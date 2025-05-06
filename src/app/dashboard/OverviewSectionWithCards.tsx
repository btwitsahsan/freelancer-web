import DraftJobPostCard from "./DraftJobPostCard";
import JobPostCard from "./JobPostCard";
import PostJobButton from "./PostJobButton";

const OverviewSectionWithCards = () => {
    return (
        <div className="w-full flex-col justify-start items-start gap-4 flex">
            <div className="w-full text-black text-2xl font-semibold">Overview</div>
            <div className="w-full justify-start gap-3 flex">
                <JobPostCard />
                <DraftJobPostCard />
                <PostJobButton />
            </div>
        </div>
    );
};

export default OverviewSectionWithCards