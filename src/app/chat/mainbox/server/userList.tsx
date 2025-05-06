import UserItem from "./userItem"

const UserList = () => {

  return (
    <div className="inline-flex flex-col items-center gap-2.5 bg-white pt-4 border-gray-100 border-l w-80 max-h-[calc(100vh-200px)] overflow-y-auto hide-scrollbar">

        <div className="flex flex-col justify-start items-start self-stretch h-36">
          <div className="inline-flex justify-center items-center self-stretch gap-2.5 px-5">
            <div className="font-['DM font-semibold text-gray-400 text-base leading-normal basis-0 grow Sans'] shrink">
              Administrators
            </div>
          </div>

          <UserItem />

          <UserItem />

        </div>
        <div className="flex flex-col justify-start items-start">
          <div className="inline-flex justify-center items-center gap-2.5 px-5 w-80">
            <div className="font-['DM font-semibold text-gray-400 text-base leading-normal basis-0 grow Sans'] shrink">
              Online
            </div>
          </div>

          <UserItem />

          <UserItem />

          <UserItem />

          <UserItem />

        </div>
        <div className="flex flex-col justify-start items-start">

          <div className="inline-flex justify-center items-center gap-2.5 px-5 w-80">
            <div className="font-['DM font-semibold text-gray-400 text-base leading-normal basis-0 grow Sans'] shrink">
              Offline
            </div>
          </div>

          <UserItem />

          <UserItem />

          <UserItem />

          <UserItem />

          <UserItem />

          <UserItem />

        </div>
      </div>

  );
};

export default UserList;
