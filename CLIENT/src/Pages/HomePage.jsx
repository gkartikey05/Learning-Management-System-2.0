import { Link } from "react-router-dom";

import HomePageImge from "../Assets/images/homePageMainImage.png";
import HomeLayout from "../Layouts/HomeLayout";

function HomePage() {
  return (
    <HomeLayout>
      <div className="pt-10 text-white flex flex-col-reverse lg:flex-row items-center justify-center gap-10 mx-4 md:mx-8 lg:mx-16 min-h-[92.4vh]">
        <div className="w-full lg:w-[55%] space-y-6 text-center lg:text-left">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold">
            Find out best <br className="block sm:hidden" />
            <span className="text-yellow-500 font-bold">Online Courses</span>
          </h1>
          <p className="text-base md:text-lg lg:text-xl text-gray-200">
            We have a large library of courses taught by highly skilled and
            qualified faculties at a very affordable cost.
          </p>

          <div className="space-y-4 mb-5 md:space-y-0 md:space-x-6 flex flex-col md:flex-row justify-center lg:mb-0 lg:justify-start">
            <Link to={"/courses"}>
              <button className="border border-yellow-500 bg-yellow-500 px-5 py-3 rounded-md font-semibold text-base md:text-lg cursor-pointer hover:border-yellow-600 hover:bg-yellow-600 transition-all ease-in-out duration-200 w-full md:w-auto">
                Explore Courses
              </button>
            </Link>

            <Link to={"/contact"}>
              <button className="border border-yellow-500 px-5 py-3 rounded-md font-semibold text-base md:text-lg cursor-pointer hover:border-yellow-500 hover:bg-yellow-500 transition-all ease-in-out duration-200 w-full md:w-auto">
                Contact Us
              </button>
            </Link>
          </div>
        </div>

        <div className="w-full lg:w-[45%] flex items-center justify-center">
          <img
            src={HomePageImge}
            alt="Homepage image"
            className="max-w-full h-auto"
          />
        </div>
      </div>
    </HomeLayout>
  );
}

export default HomePage;
