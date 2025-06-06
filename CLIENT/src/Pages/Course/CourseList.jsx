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
      <div className="min-h-[89vh] pt-12 pl-20 flex flex-col flex-wrap gap-10 text-white">
        <h2 className="text-center text-3xl font-semibold">
          Explore the courses made by{" "}
          <span className="font-bold text-yellow-500">Industry Experts</span>
        </h2>

        <div className="mb-10 flex flex-wrap gap-14">
          {courseData?.map((e) => {
            return <CourseCard key={e._id} data={e} />;
          })}
        </div>
      </div>
    </HomeLayout>
  );
}

export default CourseList;
