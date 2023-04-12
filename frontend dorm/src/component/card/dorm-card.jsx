import { Link } from "react-router-dom";

const Star = ({ rating }) => {
  console.log(rating);
  return (
    <div className="flex">
      {[...Array(rating).keys()].map((e) => (
        <button key={e} className="m-1">
          <i class="text-[#ffd700] fa-solid fa-star"></i>
        </button>
      ))}
      {[...Array(5 - rating).keys()].map((e) => (
        <button key={e} className="m-1">
          <i class="text-gray-300 fa-solid fa-star"></i>
        </button>
      ))}
    </div>
  );
};

const DormCard = ({
  name,
  review_count,
  avg_bathroom_rating,
  avg_building_rating,
  avg_location_rating,
  avg_room_rating,
  school,
  _id,
}) => (
  <Link to={`/dorm/${school}/${_id}`}>
    <div class="w-full mx-2 my-2  max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <img class="p-8 rounded-t-lg" src="/dorm.jpg" alt="" />
      <div class="px-5 pb-5">
        <h5 class="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
          {name}
        </h5>
        <p className="text flex justify-between">
          <Star
            rating={parseInt(
              (avg_bathroom_rating +
                avg_building_rating +
                avg_location_rating +
                avg_room_rating) /
                4
            )}
          />{" "}
          {review_count} reviews
        </p>
      </div>
    </div>
  </Link>
);

export default DormCard;
