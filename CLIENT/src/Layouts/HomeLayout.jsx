import toast from "react-hot-toast";
import { AiFillCloseCircle } from "react-icons/ai";
import { FiMenu } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import Footer from "../Components/Footer";
import { logoutAccount } from "../Redux/Slices/AuthSlice";

function HomeLayout({ children }) {
  const dispatch = useDispatch();

  // for checking if user is Logged in or not
  const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn);

  // for displaying the role according to the role
  const role = useSelector((state) => state?.auth?.role);

  const changeWidth = () => {
    const drawerSide = document.getElementsByClassName("drawer-side");
    drawerSide[0].style.width = "auto";
  };

  const hideDrawer = () => {
    const element = document.getElementsByClassName("drawer-toggle");
    element[0].checked = false;
  };

  const handleLogout = async (e) => {
    e.preventDefault();

    const res = await dispatch(logoutAccount());
    if (res?.payload?.success) {
      toast.success("Logout Successful");
    }
  };

  return (
    <div className="min-h-[90vh]">
      <div className="drawer absolute left-0 z-50 w-fit">
        <input type="checkbox" id="my-drawer" className="drawer-toggle" />
        <div className="drawer-content">
          <label htmlFor="my-drawer" className="cursor-pointer relative">
            <FiMenu
              onClick={changeWidth}
              size={32}
              className="font-bold text-white m-4"
            />
          </label>
        </div>
        <div className="drawer-side w-0">
          <label htmlFor="my-drawer" className="drawer-overlay"></label>
          <ul className="menu h-full p-4 w-48 sm:w-80 bg-base-200 text-base-content relative">
            <li className="w-fit absolute right-4 z-50">
              <button onClick={hideDrawer}>
                <AiFillCloseCircle size={24} />
              </button>
            </li>
            <li className="pb-2 text-[16px]">
              <Link className="pb-1.5" to={"/"}>Home</Link>
            </li>

            {isLoggedIn && role === "ADMIN" && (
              <li className="pb-2 text-[16px]">
                <Link className="pb-1.5" to={"/admin/dashboard"}>Admin Dashboard</Link>
              </li>
            )}

            <li className="pb-2 text-[16px]">
              <Link className="pb-1.5" to={"/about"}>About Us</Link>
            </li>
            <li className="pb-2 text-[16px]">
              <Link className="pb-1.5" to={"/courses"}>Courses</Link>
            </li>
            <li className="pb-2 text-[16px]">
              <Link className="pb-1.5" to={"/contact"}>Contact Us</Link>
            </li>

            {!isLoggedIn && (
              <li className="absolute bottom-4 w-[90%]">
                <div className="w-full flex items-center justify-center">
                  <Link to={"/login"} className="w-1/2">
                    <button className="btn btn-primary px-4 py-1 font-semibold rounded-md w-full">
                      Login
                    </button>
                  </Link>
                  <Link to={"/signup"} className="w-1/2">
                    <button className="btn btn-secondary px-4 py-1 font-semibold rounded-md w-full">
                      Signup
                    </button>
                  </Link>
                </div>
              </li>
            )}

            {isLoggedIn && (
              <li className="absolute bottom-4 w-[90%]">
                <div className="w-full flex items-center justify-center">
                  <Link to={"/user/profile"} className="w-1/2">
                    <button className="btn btn-info px-4 py-1 font-semibold rounded-md w-full">
                      Profile
                    </button>
                  </Link>
                  <Link onClick={handleLogout} className="w-1/2">
                    <button className="btn btn-warning px-4 py-1 font-semibold rounded-md w-full">
                      Logout
                    </button>
                  </Link>
                </div>
              </li>
            )}
          </ul>
        </div>
      </div>

      {children}

      <Footer />
    </div>
  );
}

export default HomeLayout;
