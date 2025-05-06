const PostJobButton = () => {
    return (
        <div className="flex-1 p-4 min-h-60 rounded-lg border border-gray-200 flex-col justify-center gap-2.5 flex">
            <div className="w-full justify-start items-center gap-2.5 flex">
                <div className="w-full px-2 py-1 rounded-lg flex-col justify-center items-center gap-2 flex overflow-hidden">
                    <div className="w-full text-center text-green500 font-normal">
                        + Post a job
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostJobButton