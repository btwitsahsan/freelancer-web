interface InviteLevelProps {
  name: string;
  invites: string;
  reward: string;
  selected: boolean;
  disabled: boolean;
}

const InviteLevel = () => {
  const InviteLevelCompoenent = ({
    name,
    invites,
    reward,
    selected,
    disabled,
  }: InviteLevelProps) => {
    return (
      <div
        className={`flex items-center justify-between ${
          disabled ? " backdrop-blur-md" : "bg-white"
        } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        <div className="flex items-center">
          <div
            className={`w-16 h-16 rounded-2xl mr-4 ${
              disabled ? "bg-gray300 blur-sm" : "bg-gray300"
            }`}
          ></div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-4">
              <div
                className={`font-semibold text-black ${disabled && "blur-sm"}`}
              >
                {name}
              </div>
              <div
                className={`text-gray500 text-center border px-2 py-1 text-sm rounded ${
                  disabled && "blur-sm"
                }`}
              >
                {invites}
              </div>
            </div>
            <div
              className={`text-context font-normal text-sm ${
                disabled && "blur-sm"
              }`}
            >
              {reward}
            </div>
          </div>
        </div>

        <div className="flex items-center">
          {!disabled && (
            <input
              type="radio"
              name="inviteLevel"
              disabled={disabled}
              checked={selected}
              className="w-6 h-6  accent-[gray] focus:ring-blue500 cursor-pointer"
            />
          )}

          {disabled && (
            <div className="text-gray500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.5 10.5V9a4.5 4.5 0 10-9 0v1.5M7.5 10.5h9A1.5 1.5 0 0118 12v6a1.5 1.5 0 01-1.5 1.5h-9A1.5 1.5 0 016 18v-6a1.5 1.5 0 011.5-1.5z"
                />
              </svg>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="flex flex-col gap-5 bg-white basis-3/5 p-5 rounded-2xl border">
        <InviteLevelCompoenent
          name="Connector"
          invites="1-5 Invites"
          reward="Get $25 per client"
          selected={false}
          disabled={false}
        />

        <hr />

        <InviteLevelCompoenent
          name="Influencer"
          invites="6-15 Invites"
          reward="Get $35 per client"
          selected={true}
          disabled={false}
        />

        <hr />

        <InviteLevelCompoenent
          name="Connector"
          invites="20+ Invites"
          reward="Get $50 per client"
          selected={false}
          disabled={true}
        />
      </div>
    </>
  );
};

export default InviteLevel;
