import { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import HomeLayout from "../../Layouts/HomeLayout";
import { changePassword } from "../../Redux/Slices/AuthSlice";

function ChangePassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userPassword, setUserPassword] = useState({
    oldPassword: "",
    newPassword: "",
  });
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  function toggleOldPasswordVisibility() {
    setShowOldPassword(!showOldPassword);
  }

  function toggleNewPasswordVisibility() {
    setShowNewPassword(!showNewPassword);
  }

  function handlePasswordChange(e) {
    const { name, value } = e.target;
    setUserPassword({
      ...userPassword,
      [name]: value,
    });
  }

  async function handleFormSubmit(e) {
    e.preventDefault();

    if (!userPassword.oldPassword || !userPassword.newPassword) {
      toast.error("All fields are required");
      return;
    } else if (!userPassword.newPassword.match(/^(?=.*[a-z]).+$/)) {
      toast.error("Password should have atleast one lowercase");
      return;
    } else if (!userPassword.newPassword.match(/^(?=.*[A-Z])/)) {
      toast.error("Password should have atleast one uppercase");
      return;
    } else if (!userPassword.newPassword.match(/^(?=.*[0-9])/)) {
      toast.error("Password should have atleast one digit");
      return;
    } else if (!userPassword.newPassword.match(/^.{8,}$/)) {
      toast.error("Password should have atleast 8 characters");
      return;
    } else if (
      !userPassword.newPassword.match(
        /^(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).*$/
      )
    ) {
      toast.error("Password should have atleast one special character");
      return;
    }

    const response = await dispatch(changePassword(userPassword));
    if (response.payload.success) {
      navigate("/user/profile");
      setUserPassword({
        oldPassword: "",
        newPassword: "",
      });
    }
  }

  return (
    <HomeLayout>
      <div className="flex items-center justify-center min-h-[92.4vh] py-8 px-4">
        <form
          noValidate
          onSubmit={handleFormSubmit}
          className="flex flex-col justify-center gap-3 sm:gap-4 rounded-lg p-4 text-white w-full max-w-xs sm:max-w-sm shadow-[0_0_10px_black]"
        >
          <h2 className="text-center text-xl sm:text-2xl font-bold">
            Change Password
          </h2>

          <div className="flex flex-col gap-1">
            <label
              htmlFor="oldPassword"
              title="Old Password"
              className="font-semibold text-base sm:text-lg"
            >
              Old Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <input
                required
                type={showOldPassword ? "text" : "password"}
                name="oldPassword"
                id="oldPassword"
                autoComplete="current-password"
                placeholder="Enter your old password"
                className="w-full pl-8 sm:pl-10 pr-8 bg-transparent px-2 py-1 sm:py-1.5 text-sm sm:text-base border outline-none rounded-sm"
                value={userPassword.oldPassword}
                onChange={handlePasswordChange}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={toggleOldPasswordVisibility}
                aria-label={showOldPassword ? "Hide password" : "Show password"}
              >
                {showOldPassword ? (
                  <svg
                    className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500 cursor-pointer"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path
                      fillRule="evenodd"
                      d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500 cursor-pointer"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z"
                      clipRule="evenodd"
                    />
                    <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label
              htmlFor="newPassword"
              title="New Password"
              className="font-semibold text-base sm:text-lg"
            >
              New Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <input
                required
                type={showNewPassword ? "text" : "password"}
                name="newPassword"
                id="newPassword"
                autoComplete="current-password"
                placeholder="Enter your new password"
                className="w-full pl-8 sm:pl-10 pr-8 bg-transparent px-2 py-1 sm:py-1.5 text-sm sm:text-base border outline-none rounded-sm"
                value={userPassword.newPassword}
                onChange={handlePasswordChange}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={toggleNewPasswordVisibility}
                aria-label={showNewPassword ? "Hide password" : "Show password"}
              >
                {showNewPassword ? (
                  <svg
                    className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500 cursor-pointer"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path
                      fillRule="evenodd"
                      d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500 cursor-pointer"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z"
                      clipRule="evenodd"
                    />
                    <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <button
            className="w-full bg-yellow-600 hover:bg-yellow-700 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold text-base sm:text-lg cursor-pointer"
            type="submit"
          >
            Change Password
          </button>

          <Link to={"/user/profile"}>
            <p className="link text-accent cursor-pointer flex items-center justify-center w-full gap-2 text-sm sm:text-base">
              <AiOutlineArrowLeft /> Back to Profile
            </p>
          </Link>
        </form>
      </div>
    </HomeLayout>
  );
}

export default ChangePassword;
