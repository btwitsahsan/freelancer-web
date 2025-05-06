import { useState } from "react";
import { UserType } from "@/utils/constant";
import TalentDetails from "./talent-details";

type MainProps = {
  users: UserType[];
};

const Main = ({ users }: MainProps) => {
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  const handleUserSelect = (user: UserType) => {
    setSelectedUser(user);
    setShowDetails(true);
  };

  const handleCloseDetails = () => {
    setShowDetails(false);
  };

  // Ensure users is an array
  const safeUsers = Array.isArray(users) ? users : [];

  return (
    <div className="flex-1">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {safeUsers.map((user) => (
          <div
            key={user._id}
            className="bg-white rounded-lg shadow-sm p-6 cursor-pointer hover:shadow-md transition-all"
            onClick={() => handleUserSelect(user)}
          >
            <div className="flex items-center gap-4 mb-4">
              <img
                src={user.avatar || "/image/default.png"}
                alt={user.fullName}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <h3 className="text-lg font-medium">{user.fullName}</h3>
                <p className="text-sm text-gray-600">
                  {user.jotTitle || "Freelancer"}
                </p>
                <p className="text-sm text-gray-500">
                  {user.location || "Location not specified"}
                </p>
              </div>
            </div>
            <p className="mb-4 text-sm line-clamp-3">
              {user.description || "No description provided."}
            </p>
            <div className="flex justify-between items-center">
              <p className="font-medium">${user.hourlyRate || 0}/hr</p>
              <button
                className="text-blue-500 hover:underline"
                onClick={(e) => {
                  e.stopPropagation();
                  handleUserSelect(user);
                }}
              >
                View Profile
              </button>
            </div>
          </div>
        ))}
      </div>

      {showDetails && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-11/12 max-w-4xl max-h-[90vh] overflow-auto">
            <div className="flex justify-end p-4">
              <button
                className="text-gray-500 hover:text-gray-700"
                onClick={handleCloseDetails}
              >
                Close
              </button>
            </div>
            <TalentDetails
              userData={selectedUser}
              onclick={handleCloseDetails}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Main;
