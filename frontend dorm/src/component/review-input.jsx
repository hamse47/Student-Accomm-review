import { useEffect, useState } from "react";

const ReviewInput = ({ title, description, name, value, setData }) => {
  const [rating, setRating] = useState(value || 0);
  useEffect(() => {
    setData((prev) => ({ ...prev, [name]: rating }));
  }, [rating, setData, name]);
  return (
    <div className="container mt-6 font-bold flex justify-between">
      <div>
        <p className="text-2xl text-blue-500">{title}</p>
        <p className="text-sm ">{description}</p>
      </div>
      <div className="flex">
        {[...Array(rating).keys()].map((e) => (
          <button key={e} onClick={() => setRating(e + 1)} className="m-1">
            <i class="text-[#ffd700] fa-solid fa-star"></i>
          </button>
        ))}
        {[...Array(5 - rating).keys()].map((e) => (
          <button
            key={e}
            onClick={() => setRating(e + 1 + rating)}
            className="m-1"
          >
            <i class="text-[#f0eee3ce] fa-solid fa-star"></i>
          </button>
        ))}
      </div>
    </div>
  );
};
export default ReviewInput;
