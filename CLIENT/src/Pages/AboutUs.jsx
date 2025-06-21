import AboutImage from "../Assets/images/aboutMainImage.png";
import CarouselSlide from "../Components/CarouselSlide";
import { celebrities } from "../Constants/CelebritiesData";
import HomeLayout from "../Layouts/HomeLayout";

function AboutUs() {
  return (
    <HomeLayout>
      <div className="pt-10 px-4 sm:px-8 md:px-16 text-white flex flex-col items-center min-h-[92.4vh]">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-10 w-full max-w-7xl">
          <section className="w-full lg:w-1/2 space-y-6">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl text-yellow-500 font-semibold text-center lg:text-left">
              Affordable and Quality Education
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-200 text-center lg:text-left">
              Our goal is to provide the affordable and quality education to the
              world. We are providing the platform for the aspiring teachers and
              students to share their skills, creativity and knowledge to each
              other to empower and contribute in the growth and the wellness of
              mankind.
            </p>
          </section>

          <section className="w-full lg:w-1/2 flex justify-center">
            <img
              src={AboutImage}
              alt="About Us"
              className="max-w-[90%] md:max-w-[80%] lg:max-w-full drop-shadow-2xl"
            />
          </section>
        </div>

        <div className="w-full max-w-4xl my-8 sm:my-16">
          <div className="carousel w-full">
            {celebrities &&
              celebrities.map((celebrity) => (
                <CarouselSlide
                  {...celebrity}
                  key={celebrity.slideNumber}
                  totalSlides={celebrities.length}
                />
              ))}
          </div>
        </div>
      </div>
    </HomeLayout>
  );
}

export default AboutUs;
