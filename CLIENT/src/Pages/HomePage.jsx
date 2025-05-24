import { Link } from "react-router-dom";

import HomePageImge from "../Assets/images/homePageMainImage.png";
import HomeLayout from "../Layouts/HomeLayout";

function HomePage() {
  return (
    <HomeLayout>
      <div className="pt-10 text-white flex items-center justify-center gap-10 mx-16 h-[90vh]">
        <div className="w-[55%] space-y-6">
          <h1 className="text-5xl font-semibold ">
            Find out best{" "}
            <span className="text-yellow-500 font-bold">Online Courses</span>
          </h1>
          <p className="text-xl text-gray-200">
            We have large library of courses taught by highly skilled and
            qualified faculties at a very affordable cost.
          </p>

          <div className="space-x-6">
            <Link to={"/courses"}>
              <button className="border border-yellow-500 bg-yellow-500 px-5 py-3 rounded-md font-semibold text-lg cursor-pointer hover:border-yellow-600 hover:bg-yellow-600 transition-all ease-in-out duration-200">
                Explore Courses
              </button>
            </Link>

            <Link to={"/contact"}>
              <button className="border border-yellow-500 px-5 py-3 rounded-md font-semibold text-lg cursor-pointer hover:border-yellow-600 hover:bg-yellow-600 transition-all ease-in-out duration-200">
                Contact Us
              </button>
            </Link>
          </div>
        </div>

        <div className="w-[45%] flex items-center justify-center">
          <img src={HomePageImge} alt="Homepage image" />
        </div>
      </div>
    </HomeLayout>
  );
}

export default HomePage;
