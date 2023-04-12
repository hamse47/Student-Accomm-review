import ReviewStar from "../review-start";
const getColor = (total) => {
  if (total > 4) {
    return "bg-green-500";
  }
  if (total > 2.9) {
    return "bg-yellow-500";
  }
  if (total < 3) {
    return "bg-red-500";
  }
};
const ReviewCard = ({
  roomRating,
  buildingRating,
  bathroomRating,
  locationRating,
  comment,
  images,
  roomType,
  createdAt,
}) => {
  let total_avg =
    (buildingRating + bathroomRating + roomRating + locationRating) / 4;
  return (
    <figure class="flex  mt-2 shadow-md flex-col items-center justify-center p-8 text-center bg-white border-b border-gray-200 rounded-t-lg md:rounded-t-none md:rounded-tl-lg md:border-r dark:bg-gray-800 dark:border-gray-700">
      <div className="w-full flex justify-between">
        <div className="flex">
          <div className={`py-1 px-2 ${getColor(total_avg)} rounded-md`}>
            <p className="text-sm font-bold">Overall</p>
            <p className="text-xl font-bold">{total_avg}</p>
          </div>
          <div className="ml-3">
            <p className="text-sm  text-left font-bold">
              {new Date(createdAt).toLocaleDateString()}
            </p>
            <p className="text-sm font-bold">{roomType}</p>
          </div>
        </div>
        <div className="flex border-gray-500 border  items-center px-4 h-8 rounded-full">
          <p className="text-sm me-3">Verified Student</p>
          <i class="text-sm text-blue-500 font-bold fa-solid fa-check"></i>
        </div>
      </div>
      <div className="w-full text-left py-8">{comment}</div>
      <div className="w-[max-content]  mr-auto">
        <ReviewStar style={{ marginTop: 5 }} title="Room" rating={roomRating} />
        <ReviewStar
          style={{ marginTop: 5 }}
          title="Building"
          rating={buildingRating}
        />
        <ReviewStar
          style={{ marginTop: 5 }}
          title="Location"
          rating={locationRating}
        />
        <ReviewStar
          style={{ marginTop: 5 }}
          title="Bathroom"
          rating={bathroomRating}
        />
      </div>
      <div className="flex flex-wrap pt-4 w-full">
        {images.map((url) => (
          <img
            className="h-20 rounded-md m-2 border "
            src={`http://localhost:5000/public/image/${url}`}
            alt=""
          />
        ))}
      </div>
    </figure>
  );
};

export default ReviewCard;
