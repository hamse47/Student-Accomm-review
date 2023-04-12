import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReviewCard from "../component/review-card";
import ReviewRange from "../component/review-range";
import ReviewStar from "../component/review-start";
import { useEffect } from "react";
import axios from "axios";
import AuthContext from "../context";

const DormDetail = () => {
  const { dormid, school } = useParams();
  const [data, setData] = useState({ dorm: {}, reviews: null });
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const {
    avg_bathroom_rating,
    avg_building_rating,
    avg_location_rating,
    avg_room_rating,
    name,
    review_count,
    total_freshman,
    total_junior,
    total_senior,
    total_sophomore,
  } = data.dorm;

  useEffect(() => {
    axios
      .get(`/api/dorm/detail/${dormid}`)
      .then((res) => {
        setData({ dorm: res.data.dorm[0], reviews: res.data.review });
      })
      .catch((err) => {
        if (err.response.status === 400) {
          alert(err.response.data.msg);
          window.location.href = "/";
        }
      });
  }, [dormid]);

  const handleWrite = () => {
    if (token) {
      navigate(`/add-review/${school}/${dormid}`);
    } else {
      alert("you must be loggein for writing review");
      navigate(`/login`);
    }
  };

  const getOverallRating = () => {
    return (
      (avg_building_rating +
        avg_location_rating +
        avg_room_rating +
        avg_bathroom_rating) /
      4
    ).toFixed(1);
  };
  if (data.reviews === null) {
    return (
      <div className="flex justify-center h-[100vh] items-center">
        <div role="status">
          <svg
            aria-hidden="true"
            class="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span class="sr-only">Loading...</span>
        </div>
      </div>
    );
  }
  return (
    <div>
      <div className="bg-blue-300 h-[400px] w-[100%] flex flex-col items-center justify-center">
        <div className="max-w-[800px] w-full">
          <p className="text-center font-bold text-2xl text-white ">{name}</p>
        </div>
      </div>
      <div className="w-full text-right">
        <button
          onClick={handleWrite}
          className="bg-blue-500 text-white px-4 py-2 rounded-md m-3"
        >
          write a review
        </button>
      </div>
      <div className="w-full container min-h-screen flex mx-auto mt-10 ">
        <div className="w-[30%] shadow-lg p-5 h-[max-content]">
          <div>
            <p className="text-2xl font-bold">Overall Rating</p>
            <p className="text-5xl font-bold mt-4 flex items-center">
              <i class="text-[#ffd700] fa-solid fa-star me-3"></i>
              {getOverallRating()}
            </p>
            <p className="text mt-3">base on {review_count} reviews</p>
            <p className="text-xl mt-10">Overall Rating</p>
            <ReviewStar title="Room" rating={parseInt(avg_room_rating)} />
            <ReviewStar
              title="Building"
              rating={parseInt(avg_building_rating)}
            />
            <ReviewStar
              title="Location"
              rating={parseInt(avg_location_rating)}
            />
            <ReviewStar
              title="Bathroom"
              rating={parseInt(avg_bathroom_rating)}
            />
            <p className="text-xl mt-10">When They Lived Here</p>
            <ReviewRange title={"Freshman"} value={total_freshman} />
            <ReviewRange title={"Sophomore"} value={total_sophomore} />
            <ReviewRange title={"Junior"} value={total_junior} />
            <ReviewRange title={"Senior"} value={total_senior} />
          </div>
        </div>
        <div className="w-[70%] p-3">
          {data.reviews.map((data) => (
            <ReviewCard {...data} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DormDetail;
