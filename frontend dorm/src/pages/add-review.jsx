import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AddSchoolDorm from "../component/review-steps/add-school-dorm";
import AddDorm from "../component/review-steps/add-dorm";
import RatingForm from "../component/review-steps/rating-form";
import CommentPhoto from "../component/review-steps/comment-photos";
import ClassYearRoomType from "../component/review-steps/classyear-roomtype";
import Confirmation from "../component/review-steps/confirm";
import axios from "axios";

const AddReview = () => {
  const [allStep, setAllStep] = useState([]);
  const { school, dorm } = useParams();
  const [data, setData] = useState({});
  const [active, setActive] = useState(0);

  const checkSchool = () => {
    axios
      .get("/api/dorm/valid/school/" + school)
      .then((res) => {
        if (res.data._id !== data.school_id) {
          setData((prev) => ({
            ...prev,
            school_id: res.data._id,
            school_verify: true,
            school_name: res.data.name,
          }));
        }
      })
      .catch(() => {
        alert("invalid dorm id");
      });
  };

  const checkDorm = () => {
    axios
      .get("/api/dorm/valid/dorm/" + dorm)
      .then((res) => {
        if (data.dorm_id !== res.data._id)
          setData((prev) => ({
            ...prev,
            dorm_id: res.data._id,
            dorm_verify: true,
            dorm_name: res.data.name,
          }));
      })
      .catch(() => {
        alert("invalid dorm id");
      });
  };
  useEffect(() => {
    let steps = [
      <RatingForm data={data} setData={setData} setActive={setActive} />,
      <CommentPhoto data={data} setData={setData} setActive={setActive} />,
      <ClassYearRoomType data={data} setData={setData} setActive={setActive} />,
      <Confirmation data={data} setData={setData} setActive={setActive} />,
    ];
    if (school === "new-school") {
      steps = [
        <AddSchoolDorm data={data} setData={setData} setActive={setActive} />,
        ...steps,
      ];
    } else if (dorm === "new-dorm") {
      steps = [
        <AddDorm data={data} setData={setData} setActive={setActive} />,
        ...steps,
      ];
      if (!data.school_verify) {
        checkSchool();
      }
    } else if (!data.school_id && !data.dorm_id) {
      if (!data.school_verify && !data.dorm_verify) {
        checkDorm();
        checkSchool();
      }
    }
    setAllStep(steps);
  }, [school, dorm, data]);
  console.log({ data });
  return (
    <div>
      <div className="bg-blue-300 h-[400px] w-[100%] flex flex-col items-center justify-center">
        <div className="max-w-[800px] w-full">
          <p className="text-center font-bold text-xl text-white ">
            Write a review for dorm
          </p>
        </div>
      </div>
      <div className="container my-10 max-w-[700px] mx-auto">
        <ol class="flex items-center w-full  font-medium text-center text-gray-500 dark:text-gray-400 sm:text-base">
          {[0, 1, 2, 3].map((num) => (
            <li
              class={`text-3xl flex ${
                active - (allStep.length - 4) >= num ? "text-blue-600" : ""
              }  items-center ${
                num !== 3 &&
                "md:w-full  dark:text-blue-500 sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700"
              } `}
            >
              <span class="flex items-center justify-end">
                {active - (allStep.length - 4) >= num && (
                  <i class="mr-2 text-lg fa-regular fa-circle-check"></i>
                )}
                {num + 1}
              </span>
            </li>
          ))}
        </ol>
      </div>
      <div className="container my-10 max-w-[700px] mx-auto">
        {allStep[active]}
      </div>
    </div>
  );
};

export default AddReview;
