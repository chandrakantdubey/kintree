import { useSelector } from "react-redux";

function UserProfile() {
  const user = useSelector((state) => state.auth.user);

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="relative">
        <div className="h-32 bg-purple/20 rounded-t-lg"></div>
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
          <img
            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`}
            alt="Profile"
            className="w-24 h-24 rounded-full border-4 border-white"
          />
        </div>
      </div>

      <div className="pt-16 p-6">
        <h2 className="text-xl font-semibold text-center mb-2">{user.email}</h2>
        <p className="text-gray-500 text-center mb-4">@username</p>

        <div className="border-t pt-4">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="font-semibold">Posts</div>
              <div className="text-gray-500">24</div>
            </div>
            <div>
              <div className="font-semibold">Friends</div>
              <div className="text-gray-500">148</div>
            </div>
            <div>
              <div className="font-semibold">Family</div>
              <div className="text-gray-500">36</div>
            </div>
          </div>
        </div>

        <div className="border-t mt-4 pt-4">
          <h3 className="font-semibold mb-2">About</h3>
          <p className="text-gray-600 text-sm">
            This is a brief bio about the user. They can add more information
            about themselves here.
          </p>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
