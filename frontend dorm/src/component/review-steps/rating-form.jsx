import { useCallback, useMemo } from "react";
import ReviewInput from "../review-input";
const RatingForm = ({ data, setData, setActive }) => {
  const getRating = useCallback(() => {
    if (
      data.roomRating !== 0 &&
      data.buildingRating !== 0 &&
      data.bathroomRating !== 0 &&
      data.locationRating !== 0
    ) {
      let rating =
        (data.roomRating +
          data.buildingRating +
          data.bathroomRating +
          data.locationRating) /
        4;
      return (
        <p className="text-2xl text-center mt-6 font-bold">
          Your Rating {rating % 1 === 0 ? parseInt(rating) : rating.toFixed(1)}
          /5
        </p>
      );
    }
    return null;
  }, [data]);

  const handleSubmit = () => {
    setActive((prev) => prev + 1);
  };
  const review_data = useMemo(() => {
    return [
      {
        title: "Rate the room",
        description:
          "Consider the room's size, cleanliness, and availablilty of natural light.",
        name: "roomRating",
      },
      {
        title: "Rate the building",
        description: "Consider the building's amenities, cleanliness, and age.",
        name: "buildingRating",
      },
      {
        title: "Rate the bathroom",
        description:
          "Consider the bathroom's cleanliness, modernness, and features.",
        name: "bathroomRating",
      },
      {
        title: "Rate the location",
        description: "Consider the location's convenience and safety.",
        name: "locationRating",
      },
    ];
  }, []);
  return (
    <div>
      {review_data.map((obj) => (
        <ReviewInput {...obj} setData={setData} value={data[obj.name]} />
      ))}
      {getRating()}
      <div className="flex container justify-between">
        <button
          onClick={handleSubmit}
          disabled={getRating() ? false : true}
          className={`bg-blue-400 text-white px-10 py-2 mt-10 mx-auto rounded-md ${
            getRating() ? "bg-blue-400" : "bg-blue-200"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};
export default RatingForm;
