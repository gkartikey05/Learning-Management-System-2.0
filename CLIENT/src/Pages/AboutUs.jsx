import AboutImage from "../Assets/images/aboutMainImage.png";
import CarouselSlide from "../Components/CarouselSlide";
import { celebrities } from "../Constants/CelebritiesData";
import HomeLayout from "../Layouts/HomeLayout";

function AboutUs() {
  return (
    <HomeLayout>
      <div className="pl-20 pt-20 flex flex-col text-white">
        <div className="flex items-center gap-5 mx-10">
          <section className="w-[55%] space-y-10">
            <h2 className="text-5xl text-yellow-500 font-semibold">
              Affordable and Quality Education
            </h2>
            <p className="text-xl text-gray-200">
              Our goal is to provide the affordable and quality education to the
              world. We are providing the platform for the aspiring teachers and
              students to share their skills, creativity and knowledge to each
              other to empower and contribute in the growth and the wellness of
              mankind.
            </p>
          </section>

          <section className="w-[45%]">
            <img
              src={AboutImage}
              alt="About Us image"
              className="drop-shadow-2xl"
            />
          </section>
        </div>

        <div className="carousel w-1/2 my-16 mx-auto">
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
    </HomeLayout>
  );
}

export default AboutUs;
