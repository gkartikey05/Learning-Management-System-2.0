import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import HomeLayout from "../../Layouts/HomeLayout";
import { getUserDetails } from "../../Redux/Slices/AuthSlice";
import { cancelCourseBundle } from "../../Redux/Slices/RazorpaySlice";

function Profile() {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state?.auth?.data);

  const handleCancelSubscription = async () => {
    await dispatch(cancelCourseBundle());
    await dispatch(getUserDetails());
  };

  useEffect(() => {
    dispatch(getUserDetails());
  }, []);

  return (
    <HomeLayout>
      <div className="flex items-center justify-center min-h-[92.4vh] py-8 px-4">
        <div className="flex flex-col justify-center gap-3 sm:gap-4 rounded-lg p-4 text-white w-full max-w-xs sm:max-w-sm shadow-[0_0_10px_black]">
          <img
            src={userData?.avatar?.secure_url}
            alt="User Profile Picture"
            className="w-40 m-auto rounded-full border border-black"
          />
          <h2 className="text-lg sm:text-xl font-semibold text-center capitalize">
            {userData?.fullName}
          </h2>
          <div className="grid grid-cols-2 gap-2">
            <p className="text-sm sm:text-[16px]">Email:</p>
            <p className="text-sm sm:text-[16px]">{userData?.email}</p>
            <p className="text-sm sm:text-[16px]">Role:</p>
            <p className="text-sm sm:text-[16px]">{userData?.role}</p>
            <p className="text-sm sm:text-[16px]">Subscription:</p>
            <p className="text-sm sm:text-[16px]">
              {userData?.subscription?.status === "active"
                ? "Active"
                : "Inactive"}
            </p>
          </div>

          <div className="flex items-center justify-between gap-2">
            <Link
              to={"/user/change-password"}
              className="w-1/2 bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm font-semibold py-2 cursor-pointer text-sm sm:text-[16px] text-center"
            >
              <button>Change Password</button>
            </Link>
            <Link
              to={"/user/edit-profile"}
              className="w-1/2 bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm font-semibold py-2 cursor-pointer text-sm sm:text-[16px] text-center"
            >
              <button>Edit Profile</button>
            </Link>
          </div>

          {userData?.subscription?.status === "active" && (
            <button
              onClick={handleCancelSubscription}
              className="w-full bg-red-600 hover:bg-red-500 transition-all ease-in-out duration-300 rounded-sm font-semibold py-2 cursor-pointer"
            >
              Cancel Subscription
            </button>
          )}
        </div>
      </div>
    </HomeLayout>
  );
}

export default Profile;
