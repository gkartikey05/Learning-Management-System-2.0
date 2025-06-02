import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import HomeLayout from "../../Layouts/HomeLayout";

function Profile() {
  const userData = useSelector((state) => state?.auth?.data);

  return (
    <HomeLayout>
      <div className="min-h-[90vh] flex items-center justify-center">
        <div className="flex flex-col gap-3 rounded-lg my-10 p-4 min-w-96 text-white shadow-[0_0_10px_black]">
          <img
            src={userData?.avatar?.secure_url}
            alt="User Profile Picture"
            className="w-40 m-auto rounded-full border border-black"
          />
          <h2 className="text-xl font-semibold text-center capitalize">
            {userData?.fullName}
          </h2>
          <div className="grid grid-cols-2 gap-2">
            <p>Email:</p>
            <p>{userData?.email}</p>
            <p>Role:</p>
            <p>{userData?.role}</p>
            <p>Subscription:</p>
            <p>
              {userData?.subscription?.status === "active"
                ? "Action"
                : "Inactive"}
            </p>
          </div>

          <div className="flex items-center justify-between gap-2">
            <Link
              to={"/user/change-password"}
              className="w-1/2 bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm font-semibold py-2 cursor-pointer text-center"
            >
              <button>Change Password</button>
            </Link>
            <Link
              to={"/user/edit-profile"}
              className="w-1/2 bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm font-semibold py-2 cursor-pointer text-center"
            >
              <button>Edit Profile</button>
            </Link>
          </div>

          {userData?.subscription?.status === "active" && (
            <button className="w-full bg-red-600 hover:bg-red-500 transition-all ease-in-out duration-300 rounded-sm font-semibold py-2 cursor-pointer">
              Cancel Subscription
            </button>
          )}
        </div>
      </div>
    </HomeLayout>
  );
}

export default Profile;
