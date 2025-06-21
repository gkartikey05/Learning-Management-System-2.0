import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import CourseCard from "../../Components/CourseData";
import HomeLayout from "../../Layouts/HomeLayout";
import { getAllCourses } from "../../Redux/Slices/CourseSlice";

function CourseList() {
  const dispatch = useDispatch();

  const { courseData } = useSelector((state) => state.course);

  async function loadCourses() {
    await dispatch(getAllCourses());
  }

  useEffect(() => {
    loadCourses();
  }, []);

  return (
    <HomeLayout>
      <div className="min-h-[92.4vh] pt-12 px-4 sm:px-10 lg:px-20 flex flex-col gap-10 text-white">
        <h2 className="text-center text-2xl sm:text-3xl font-semibold">
          Explore the courses made by{" "}
          <span className="font-bold text-yellow-500">Industry Experts</span>
        </h2>

        <div className="mb-10 flex flex-wrap justify-center gap-5 xl:gap-8 ">
          {courseData?.map((e) => (
            <CourseCard key={e._id} data={e} />
          ))}
        </div>
      </div>
    </HomeLayout>
  );
}

export default CourseList;
